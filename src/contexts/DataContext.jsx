import React, { useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { db } from '../config/firebase';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, serverTimestamp, Timestamp, collectionGroup, where, runTransaction, doc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loans, setLoans] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  const [financedPurchases, setFinancedPurchases] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setTransactions([]);
      setCategories([]);
      setSubscriptions([]);
      setLoans([]);
      setCreditCards([]);
      setFinancedPurchases([]);
      setBudgets([]);
      setSavingsGoals([]);
      setContributions([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const collections = {
      transactions: collection(db, 'users', currentUser.uid, 'transactions'),
      categories: collection(db, 'users', currentUser.uid, 'categories'),
      subscriptions: collection(db, 'users', currentUser.uid, 'subscriptions'),
      loans: collection(db, 'users', currentUser.uid, 'loans'),
      creditCards: collection(db, 'users', currentUser.uid, 'creditCards'),
      financedPurchases: collection(db, 'users', currentUser.uid, 'financedPurchases'),
      budgets: collection(db, 'users', currentUser.uid, 'budgets'),
      savingsGoals: collection(db, 'users', currentUser.uid, 'savingsGoals'),
      contributions: query(collectionGroup(db, 'contributions'), where('userId', '==', currentUser.uid))
    };

    const unsubscribes = Object.keys(collections).map(key => {
      const ref = collections[key];
      return onSnapshot(ref, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        switch (key) {
          case 'transactions': setTransactions(data); break;
          case 'categories': setCategories(data); break;
          case 'subscriptions': setSubscriptions(data); break;
          case 'loans': setLoans(data); break;
          case 'creditCards': setCreditCards(data); break;
          case 'financedPurchases': setFinancedPurchases(data); break;
          case 'budgets': setBudgets(data); break;
          case 'savingsGoals': setSavingsGoals(data); break;
          case 'contributions': setContributions(data); break;
          default: break;
        }
      });
    });

    setLoading(false);

    return () => {
      unsubscribes.forEach(unsub => unsub());
    };
  }, [currentUser]);

  const addTransaction = useCallback((transactionData) => {
    if (!currentUser) return Promise.reject('No user logged in');
    const transactionsRef = collection(db, 'users', currentUser.uid, 'transactions');
    return addDoc(transactionsRef, {
      ...transactionData,
      date: serverTimestamp(),
      userId: currentUser.uid,
    });
  }, [currentUser]);

  const addSubscription = useCallback((subscriptionData) => {
    if (!currentUser) return Promise.reject('No user logged in');
    const subscriptionsRef = collection(db, 'users', currentUser.uid, 'subscriptions');
    const billingDate = Timestamp.fromDate(new Date(subscriptionData.nextBillingDate));

    return addDoc(subscriptionsRef, {
      name: subscriptionData.name,
      amount: Number(subscriptionData.amount),
      frequency: subscriptionData.frequency,
      nextBillingDate: billingDate,
      userId: currentUser.uid,
    });
  }, [currentUser]);

  const addLoan = useCallback((loanData) => {
    if (!currentUser) return Promise.reject('No user logged in');
    const loansRef = collection(db, 'users', currentUser.uid, 'loans');
    return addDoc(loansRef, {
      ...loanData,
      initialAmount: Number(loanData.initialAmount),
      interestRate: Number(loanData.interestRate),
      monthlyPayment: Number(loanData.monthlyPayment),
      totalInstallments: Number(loanData.totalInstallments),
      startDate: Timestamp.fromDate(new Date(loanData.startDate)),
      userId: currentUser.uid,
    });
  }, [currentUser]);

  const addCreditCard = useCallback((cardData) => {
    if (!currentUser) return Promise.reject('No user logged in');
    const creditCardsRef = collection(db, 'users', currentUser.uid, 'creditCards');
    return addDoc(creditCardsRef, {
      ...cardData,
      closingDay: Number(cardData.closingDay),
      paymentDay: Number(cardData.paymentDay),
      userId: currentUser.uid,
    });
  }, [currentUser]);

  const addFinancedPurchase = useCallback((purchaseData) => {
    if (!currentUser) return Promise.reject('No user logged in');
    const financedPurchasesRef = collection(db, 'users', currentUser.uid, 'financedPurchases');
    return addDoc(financedPurchasesRef, {
      ...purchaseData,
      totalAmount: Number(purchaseData.totalAmount),
      installmentsCount: Number(purchaseData.installmentsCount),
      monthlyPayment: Number(purchaseData.monthlyPayment),
      startDate: Timestamp.fromDate(new Date(purchaseData.startDate)),
      userId: currentUser.uid,
    });
  }, [currentUser]);

  const addBudget = useCallback((budgetData) => {
    if (!currentUser) return Promise.reject('No user logged in');
    const budgetsRef = collection(db, 'users', currentUser.uid, 'budgets');
    return addDoc(budgetsRef, {
      ...budgetData,
      amount: Number(budgetData.amount),
      userId: currentUser.uid,
    });
  }, [currentUser]);

  const addSavingsGoal = useCallback((goalData) => {
    if (!currentUser) return Promise.reject('No user logged in');
    const savingsGoalsRef = collection(db, 'users', currentUser.uid, 'savingsGoals');
    return addDoc(savingsGoalsRef, {
      name: goalData.name,
      targetAmount: Number(goalData.targetAmount),
      currentAmount: 0, // Initialize with 0
      deadline: goalData.deadline ? Timestamp.fromDate(new Date(goalData.deadline)) : null,
      userId: currentUser.uid,
      createdAt: serverTimestamp(),
    });
  }, [currentUser]);

  const addContribution = useCallback(async (goalId, contributionData) => {
    if (!currentUser) throw new Error('No user logged in');
    
    const goalRef = doc(db, 'users', currentUser.uid, 'savingsGoals', goalId);
    const contributionsRef = collection(db, 'users', currentUser.uid, 'savingsGoals', goalId, 'contributions');
    const contributionAmount = Number(contributionData.amount);

    if (isNaN(contributionAmount) || contributionAmount <= 0) {
      throw new Error('Invalid contribution amount');
    }

    try {
      await runTransaction(db, async (transaction) => {
        const goalDoc = await transaction.get(goalRef);
        if (!goalDoc.exists()) {
          throw new Error("Goal does not exist!");
        }

        const currentAmount = goalDoc.data().currentAmount || 0;
        const newCurrentAmount = currentAmount + contributionAmount;

        transaction.update(goalRef, { currentAmount: newCurrentAmount });
        
        const newContributionRef = doc(contributionsRef);
        transaction.set(newContributionRef, {
          amount: contributionAmount,
          date: serverTimestamp(),
          userId: currentUser.uid, // For collectionGroup queries
          goalId: goalId,
        });
      });
    } catch (e) {
      console.error("Transaction failed: ", e);
      throw e;
    }
  }, [currentUser]);

  const addCategory = useCallback((categoryData) => {
    if (!currentUser) return Promise.reject('No user logged in');
    const categoriesRef = collection(db, 'users', currentUser.uid, 'categories');
    return addDoc(categoriesRef, {
      ...categoryData,
      userId: currentUser.uid,
    });
  }, [currentUser]);

  const updateCategory = useCallback((categoryId, updatedData) => {
    if (!currentUser) return Promise.reject('No user logged in');
    const categoryRef = doc(db, 'users', currentUser.uid, 'categories', categoryId);
    return updateDoc(categoryRef, updatedData);
  }, [currentUser]);

  const deleteCategory = useCallback((categoryId) => {
    if (!currentUser) return Promise.reject('No user logged in');
    const categoryRef = doc(db, 'users', currentUser.uid, 'categories', categoryId);
    return deleteDoc(categoryRef);
  }, [currentUser]);

  const deleteSubscription = useCallback(async (id) => {
    if (!currentUser) return;
    const subDocRef = doc(db, 'users', currentUser.uid, 'subscriptions', id);
    await deleteDoc(subDocRef);
  }, [currentUser]);

  const deleteCreditCard = useCallback(async (id) => {
    if (!currentUser) return;
    const cardDocRef = doc(db, 'users', currentUser.uid, 'creditCards', id);
    await deleteDoc(cardDocRef);
  }, [currentUser]);

  const deleteFinancedPurchase = useCallback(async (id) => {
    if (!currentUser) return;
    const purchaseDocRef = doc(db, 'users', currentUser.uid, 'financedPurchases', id);
    await deleteDoc(purchaseDocRef);
  }, [currentUser]);
  
  const deleteSavingsGoal = useCallback(async (id) => {
    if (!currentUser) return;
    const goalDocRef = doc(db, 'users', currentUser.uid, 'savingsGoals', id);
    await deleteDoc(goalDocRef);
  }, [currentUser]);

  const deleteBudget = useCallback(async (id) => {
    if (!currentUser) return;
    const budgetDocRef = doc(db, 'users', currentUser.uid, 'budgets', id);
    await deleteDoc(budgetDocRef);
  }, [currentUser]);

  const budgetsWithSpent = useMemo(() => {
    if (!budgets.length) return [];

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return budgets
      .filter(b => b.year === currentYear && b.month === currentMonth + 1)
      .map(budget => {
        const spent = transactions
          .filter(t => 
            t.categoryId === budget.categoryId &&
            t.type === 'expense' &&
            t.date && typeof t.date.toDate === 'function' &&
            t.date.toDate().getMonth() === currentMonth &&
            t.date.toDate().getFullYear() === currentYear
          )
          .reduce((acc, curr) => acc + curr.amount, 0);
        
        const progress = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;

        return {
          ...budget,
          spent,
          progress: Math.min(progress, 100),
        };
      });
  }, [budgets, transactions]);

  const value = {
    loading,
    transactions,
    subscriptions,
    loans,
    creditCards,
    financedPurchases,
    budgets: budgetsWithSpent,
    categories,
    savingsGoals,
    contributions,
    addTransaction,
    addSubscription,
    deleteSubscription,
    addLoan,
    addCreditCard,
    deleteCreditCard,
    addFinancedPurchase,
    deleteFinancedPurchase,
    addBudget,
    deleteBudget,
    addCategory,
    updateCategory,
    deleteCategory,
    addSavingsGoal,
    deleteSavingsGoal,
    addContribution,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

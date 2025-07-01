import React, { useContext, useState, useEffect, useCallback } from 'react';
import { db } from '../config/firebase';
import { collection, query, onSnapshot, addDoc, serverTimestamp, Timestamp, collectionGroup, where, runTransaction, doc } from 'firebase/firestore';
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
    const transactionsRef = collection(db, 'users', currentUser.uid, 'transactions');
    const categoriesRef = collection(db, 'users', currentUser.uid, 'categories');
    const subscriptionsRef = collection(db, 'users', currentUser.uid, 'subscriptions');
    const loansRef = collection(db, 'users', currentUser.uid, 'loans');
    const creditCardsRef = collection(db, 'users', currentUser.uid, 'creditCards');
    const financedPurchasesRef = collection(db, 'users', currentUser.uid, 'financedPurchases');
    const budgetsRef = collection(db, 'users', currentUser.uid, 'budgets');
    const savingsGoalsRef = collection(db, 'users', currentUser.uid, 'savingsGoals');
    const contributionsQuery = query(collectionGroup(db, 'contributions'), where('userId', '==', currentUser.uid));

    const unsubscribeTransactions = onSnapshot(query(transactionsRef), (snapshot) => {
      const userTransactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(userTransactions);
    });

    const unsubscribeCategories = onSnapshot(query(categoriesRef), (snapshot) => {
      const userCategories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(userCategories);
    });

    const unsubscribeSubscriptions = onSnapshot(query(subscriptionsRef), (snapshot) => {
      const userSubscriptions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubscriptions(userSubscriptions);
    });

    const unsubscribeLoans = onSnapshot(query(loansRef), (snapshot) => {
      const userLoans = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLoans(userLoans);
    });

    const unsubscribeCreditCards = onSnapshot(query(creditCardsRef), (snapshot) => {
      const userCreditCards = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCreditCards(userCreditCards);
    });

    const unsubscribeFinancedPurchases = onSnapshot(query(financedPurchasesRef), (snapshot) => {
      const userFinancedPurchases = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFinancedPurchases(userFinancedPurchases);
    });

    const unsubscribeBudgets = onSnapshot(query(budgetsRef), (snapshot) => {
      const userBudgets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBudgets(userBudgets);
    });

    const unsubscribeSavingsGoals = onSnapshot(query(savingsGoalsRef), (snapshot) => {
      const userSavingsGoals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSavingsGoals(userSavingsGoals);
    });

    const unsubscribeContributions = onSnapshot(contributionsQuery, (snapshot) => {
      const userContributions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContributions(userContributions);
      setLoading(false); // Set loading to false after the last listener is ready
    });

    return () => {
      unsubscribeTransactions();
      unsubscribeCategories();
      unsubscribeSubscriptions();
      unsubscribeLoans();
      unsubscribeCreditCards();
      unsubscribeFinancedPurchases();
      unsubscribeBudgets();
      unsubscribeSavingsGoals();
      unsubscribeContributions();
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

        const newCurrentAmount = goalDoc.data().currentAmount + contributionAmount;

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

  const value = {
    transactions,
    categories,
    subscriptions,
    loans,
    creditCards,
    financedPurchases,
    budgets,
    savingsGoals,
    contributions,
    addTransaction,
    addSubscription,
    addLoan,
    addCreditCard,
    addFinancedPurchase,
    addBudget,
    addSavingsGoal,
    addContribution,
    loading,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

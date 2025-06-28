import React, { useContext, useState, useEffect, useCallback } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setTransactions([]);
      setCategories([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const transactionsRef = collection(db, 'users', currentUser.uid, 'transactions');
    const categoriesRef = collection(db, 'users', currentUser.uid, 'categories');

    const unsubscribeTransactions = onSnapshot(query(transactionsRef), (snapshot) => {
      const userTransactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(userTransactions);
    });

    const unsubscribeCategories = onSnapshot(query(categoriesRef), (snapshot) => {
      const userCategories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(userCategories);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribeTransactions();
      unsubscribeCategories();
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

  const value = {
    transactions,
    categories,
    addTransaction,
    loading,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

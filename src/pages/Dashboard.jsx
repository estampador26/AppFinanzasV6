import React, { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import TransactionForm from '../features/transactions/TransactionForm';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { transactions, loading } = useData();

  const balance = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        return acc + transaction.amount;
      }
      return acc - transaction.amount;
    }, 0);
  }, [transactions]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido, {currentUser?.email}</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>

      <hr />

      <h2>Balance Total: {balance.toFixed(2)} €</h2>

      <h3>Transacciones Recientes</h3>
      <ul>
        {transactions.slice(0, 5).map(t => (
          <li key={t.id}>
            {t.description || 'Sin descripción'} - 
            <span style={{ color: t.type === 'income' ? 'green' : 'red' }}>
              {t.type === 'income' ? '+' : '-'}{t.amount} €
            </span>
          </li>
        ))}
      </ul>

      <TransactionForm />

    </div>
  );
};

export default Dashboard;

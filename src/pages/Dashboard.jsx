import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import TransactionForm from '../features/transactions/TransactionForm';
import { PageContainer, Title, Card, Button } from '../styles/StyledComponents';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

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
    return <PageContainer>Cargando...</PageContainer>;
  }

  return (
    <PageContainer>
      <Header>
        <Title>Dashboard</Title>
        <Button onClick={handleLogout}>Cerrar Sesión</Button>
      </Header>
      <p>Bienvenido, {currentUser?.email}</p>

      <NavContainer>
        <Link to="/subscriptions">Gestionar Suscripciones</Link>
        <Link to="/loans">Gestionar Préstamos</Link>
        <Link to="/credit-cards">Gestionar Tarjetas</Link>
        <Link to="/financed-purchases">Compras Financiadas</Link>
        <Link to="/budgets">Gestionar Presupuestos</Link>
        <Link to="/savings-goals">Metas de Ahorro</Link>
        <Link to="/categories">Gestionar Categorías</Link>
      </NavContainer>

      <Card>
        <h2>Balance Total</h2>
        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{balance.toFixed(2)} €</p>
      </Card>

      <Card>
        <h3>Transacciones Recientes</h3>
        <ul>
          {transactions.slice(0, 5).map(t => (
            <li key={t.id}>
              {t.description || 'Sin descripción'} - 
              <span style={{ color: t.type === 'income' ? 'green' : 'red' }}>
                {t.type === 'income' ? '+' : '-'}{t.amount.toFixed(2)} €
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <TransactionForm />
      </Card>
    </PageContainer>
  );
};

export default Dashboard;

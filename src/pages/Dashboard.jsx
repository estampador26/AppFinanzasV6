import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import TransactionForm from '../features/transactions/TransactionForm';
import { PageContainer, Title, Card, Button } from '../styles/StyledComponents';
import styled from 'styled-components';

// --- Styled Components for Dashboard ---

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const WelcomeMessage = styled.p`
  margin-bottom: 2rem;
  color: #555;
`;

const NavGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const NavCard = styled(Link)`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
  padding: 1.5rem;
  text-align: center;
  text-decoration: none;
  color: #333;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.12);
  }
`;

const BalanceCard = styled(Card)`
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  text-align: center;
  margin-bottom: 2rem;
`;

const BalanceAmount = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 0.5rem;
`;

const TransactionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TransactionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const TransactionDescription = styled.span`
  color: #555;
`;

const TransactionAmount = styled.span`
  font-weight: 600;
  color: ${props => props.type === 'income' ? '#28a745' : '#dc3545'};
`;

// --- Dashboard Component ---

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
      <WelcomeMessage>Bienvenido, {currentUser?.email}</WelcomeMessage>

      <NavGrid>
        <NavCard to="/reports">Informes</NavCard>
        <NavCard to="/budgets">Presupuestos</NavCard>
        <NavCard to="/categories">Categorías</NavCard>
        <NavCard to="/savings-goals">Metas de Ahorro</NavCard>
        <NavCard to="/subscriptions">Suscripciones</NavCard>
        <NavCard to="/loans">Préstamos</NavCard>
        <NavCard to="/credit-cards">Tarjetas</NavCard>
        <NavCard to="/financed-purchases">Compras Financiadas</NavCard>
      </NavGrid>

      <BalanceCard>
        <h2>Balance Total</h2>
        <BalanceAmount>{balance.toFixed(2)} €</BalanceAmount>
      </BalanceCard>

      <Card>
        <h3>Transacciones Recientes</h3>
        <TransactionList>
          {transactions.slice(0, 5).map(t => (
            <TransactionItem key={t.id}>
              <TransactionDescription>{t.description || 'Sin descripción'}</TransactionDescription>
              <TransactionAmount type={t.type}>
                {t.type === 'income' ? '+' : '-'}{t.amount.toFixed(2)} €
              </TransactionAmount>
            </TransactionItem>
          ))}
        </TransactionList>
      </Card>

      <Card>
        <TransactionForm />
      </Card>
    </PageContainer>
  );
};

export default Dashboard;

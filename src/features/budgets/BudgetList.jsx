import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';

const ListContainer = styled.div`
  margin-top: 2rem;
`;

const BudgetItem = styled.div`
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const ItemHeader = styled.h3`
  margin: 0 0 1rem 0;
  color: #333;
`;

const ItemDetails = styled.p`
  margin: 0.2rem 0;
  color: #666;
  font-size: 1rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-top: 1rem;
`;

const getProgressBarColor = (progress) => {
  if (progress > 90) return '#dc3545'; // Red
  if (progress > 75) return '#ffc107'; // Yellow
  return '#28a745'; // Green
};

const ProgressBar = styled.div`
  height: 20px;
  background-color: ${props => getProgressBarColor(props.$progress)};
  width: ${props => props.$progress}%;
  border-radius: 4px;
  text-align: center;
  color: white;
  line-height: 20px;
  font-size: 0.9rem;
  transition: width 0.4s ease-in-out, background-color 0.4s ease;
`;

function BudgetList() {
  const { budgets, transactions, loading } = useData();

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyBudgets = useMemo(() => {
    return budgets
      .filter(b => b.year === currentYear && b.month === currentMonth + 1)
      .map(budget => {
        const spent = transactions
          .filter(t => 
            t.categoryId === budget.categoryId &&
            t.type === 'expense' &&
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
  }, [budgets, transactions, currentMonth, currentYear]);

  if (loading) {
    return <p>Cargando presupuestos...</p>;
  }

  return (
    <ListContainer>
      <h2>Presupuestos del Mes</h2>
      {monthlyBudgets.length === 0 ? (
        <p>No has definido presupuestos para este mes.</p>
      ) : (
        monthlyBudgets.map(budget => (
          <BudgetItem key={budget.id}>
            <ItemHeader>{budget.categoryName}</ItemHeader>
            <ItemDetails>
              Gastado: {budget.spent.toFixed(2)}€ de {budget.amount.toFixed(2)}€
            </ItemDetails>
            <ProgressBarContainer>
              <ProgressBar $progress={budget.progress}>
                {budget.progress.toFixed(0)}%
              </ProgressBar>
            </ProgressBarContainer>
          </BudgetItem>
        ))
      )}
    </ListContainer>
  );
}

export default BudgetList;

import React from 'react';
import { useData } from '../../contexts/DataContext';
import styled from 'styled-components';
import ContributionForm from './ContributionForm';

const ListContainer = styled.div`
  margin-top: 2rem;
`;

const GoalItem = styled.div`
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const GoalHeader = styled.h3`
  margin: 0 0 1rem 0;
  color: #333;
`;

const GoalDetails = styled.p`
  margin: 0.2rem 0;
  color: #666;
  font-size: 1rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e9ecef;
  border-radius: 4px;
  margin: 1rem 0;
`;

const ProgressBar = styled.div`
  height: 24px;
  background-color: #007bff; // Blue for savings
  width: ${props => props.$progress}%;
  border-radius: 4px;
  text-align: center;
  color: white;
  line-height: 24px;
  font-size: 0.9rem;
  transition: width 0.4s ease-in-out;
`;

function SavingsGoalList() {
  const { savingsGoals, loading } = useData();

  if (loading) {
    return <p>Cargando metas...</p>;
  }

  return (
    <ListContainer>
      <h2>Tus Metas</h2>
      {savingsGoals.length === 0 ? (
        <p>Aún no has definido ninguna meta de ahorro.</p>
      ) : (
        savingsGoals.map(goal => {
          const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;

          return (
            <GoalItem key={goal.id}>
              <GoalHeader>{goal.name}</GoalHeader>
              <GoalDetails>
                Ahorrado: {goal.currentAmount.toFixed(2)}€ de {goal.targetAmount.toFixed(2)}€
              </GoalDetails>
              <ProgressBarContainer>
                <ProgressBar $progress={Math.min(progress, 100)}>
                  {progress.toFixed(1)}%
                </ProgressBar>
              </ProgressBarContainer>
              <ContributionForm goalId={goal.id} />
            </GoalItem>
          );
        })
      )}
    </ListContainer>
  );
}

export default SavingsGoalList;

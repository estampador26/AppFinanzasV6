import React from 'react';
import SavingsGoalForm from './SavingsGoalForm';
import SavingsGoalList from './SavingsGoalList';
import { PageContainer, Title } from '../../styles/StyledComponents';

function SavingsGoalsPage() {
  return (
    <PageContainer>
      <Title>Metas de Ahorro</Title>
      <SavingsGoalForm />
      <SavingsGoalList />
    </PageContainer>
  );
}

export default SavingsGoalsPage;

import React from 'react';
import { Link } from 'react-router-dom';
import SavingsGoalForm from './SavingsGoalForm';
import SavingsGoalList from './SavingsGoalList';
import { PageContainer, Title, Card } from '../../styles/StyledComponents';

function SavingsGoalsPage() {
  return (
    <PageContainer>
      <Link to="/dashboard" style={{ marginBottom: '2rem', display: 'inline-block' }}>{'< Volver al Dashboard'}</Link>
      <Title>Metas de Ahorro</Title>
      <Card>
        <SavingsGoalForm />
      </Card>
      <Card>
        <SavingsGoalList />
      </Card>
    </PageContainer>
  );
}

export default SavingsGoalsPage;

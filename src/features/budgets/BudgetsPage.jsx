import React from 'react';
import { Link } from 'react-router-dom';
import BudgetForm from './BudgetForm';
import BudgetListClean from './BudgetListClean';
import { PageContainer, Title, Card } from '../../styles/StyledComponents';

const BudgetsPage = () => {
  return (
    <PageContainer>
      <Link to="/dashboard" style={{ marginBottom: '2rem', display: 'inline-block' }}>{'< Volver al Dashboard'}</Link>
      <Title>Gestión de Presupuestos</Title>
      <Card>
        <BudgetForm />
      </Card>
      <Card>
        <BudgetListClean />
      </Card>
    </PageContainer>
  );
};

export default BudgetsPage;

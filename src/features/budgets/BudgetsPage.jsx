import React from 'react';
import BudgetForm from './BudgetForm';
import BudgetList from './BudgetList';
import { PageContainer, Title } from '../../styles/StyledComponents';

const BudgetsPage = () => {
  return (
    <PageContainer>
      <Title>Gestión de Presupuestos</Title>
      <BudgetForm />
      <BudgetList />
    </PageContainer>
  );
};

export default BudgetsPage;

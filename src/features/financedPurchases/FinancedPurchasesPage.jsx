import React from 'react';
import styled from 'styled-components';
import FinancedPurchaseForm from './FinancedPurchaseForm';
import FinancedPurchaseList from './FinancedPurchaseList';

const PageContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

function FinancedPurchasesPage() {
  return (
    <PageContainer>
      <Title>Seguimiento de Compras Financiadas</Title>
      <FinancedPurchaseForm />
      <FinancedPurchaseList />
    </PageContainer>
  );
}

export default FinancedPurchasesPage;

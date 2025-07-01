import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer, Title, Card } from '../../styles/StyledComponents';
import FinancedPurchaseForm from './FinancedPurchaseForm';
import FinancedPurchaseList from './FinancedPurchaseList';

function FinancedPurchasesPage() {
  return (
    <PageContainer>
      <Link to="/dashboard" style={{ marginBottom: '2rem', display: 'inline-block' }}>{'< Volver al Dashboard'}</Link>
      <Title>Seguimiento de Compras Financiadas</Title>
      <Card>
        <FinancedPurchaseForm />
      </Card>
      <Card>
        <FinancedPurchaseList />
      </Card>
    </PageContainer>
  );
}

export default FinancedPurchasesPage;

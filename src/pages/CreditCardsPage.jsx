import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer, Title, Card } from '../styles/StyledComponents';
import CreditCardForm from '../components/CreditCard/CreditCardForm';
import CreditCardList from '../components/CreditCard/CreditCardList';

function CreditCardsPage() {
  return (
    <PageContainer>
      <Link to="/dashboard" style={{ marginBottom: '2rem', display: 'inline-block' }}>{'< Volver al Dashboard'}</Link>
      <Title>Gestión de Tarjetas de Crédito</Title>
      <Card>
        <CreditCardForm />
      </Card>
      <Card>
        <CreditCardList />
      </Card>
    </PageContainer>
  );
}

export default CreditCardsPage;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CreditCardForm from './CreditCardForm';
import CreditCardList from './CreditCardList';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function CreditCardsPage() {
  return (
    <PageContainer>
      <BackLink to="/dashboard">← Volver al Dashboard</BackLink>
      <Header>Gestión de Tarjetas de Crédito</Header>
      <CreditCardForm />
      <CreditCardList />
    </PageContainer>
  );
}

export default CreditCardsPage;

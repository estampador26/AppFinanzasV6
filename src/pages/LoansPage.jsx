import React from 'react';
import { Link } from 'react-router-dom';
import LoanForm from '../components/LoanForm';
import LoanList from '../components/LoanList';
import { PageContainer, Title, Card } from '../styles/StyledComponents';
import styled from 'styled-components';

const NavLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LoansPage = () => {
  return (
    <PageContainer>
      <NavLink to="/dashboard">← Volver al Dashboard</NavLink>
      <Title>Gestión de Préstamos</Title>
      <p>Registra y haz seguimiento de tus préstamos personales para mantener tus finanzas bajo control.</p>
      
      <Card>
        <LoanForm />
      </Card>
      
      <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #eee' }} />

      <Card>
        <LoanList />
      </Card>
    </PageContainer>
  );
};

export default LoansPage;

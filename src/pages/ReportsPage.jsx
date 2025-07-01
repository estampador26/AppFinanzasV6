import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ExpensesByCategoryPieChart from '../components/reports/ExpensesByCategoryPieChart';

const ReportsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
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

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
`;

const ChartWrapper = styled.div`
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ReportsPage = () => {
  return (
    <ReportsContainer>
      <BackLink to="/dashboard">&#8592; Volver al Dashboard</BackLink>
      <Title>Informes y Visualización</Title>
      <ChartsGrid>
        <ChartWrapper>
          <ExpensesByCategoryPieChart />
        </ChartWrapper>
        {/* Aquí se pueden añadir más gráficos en el futuro */}
      </ChartsGrid>
    </ReportsContainer>
  );
};

export default ReportsPage;

import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { parseISO, startOfDay, endOfDay } from 'date-fns';

import ExpensesByCategoryPieChart from '../components/reports/ExpensesByCategoryPieChart';
import IncomeVsExpensesBarChart from '../components/reports/IncomeVsExpensesBarChart';
import DateRangeSelector from '../components/reports/DateRangeSelector';

import 'react-datepicker/dist/react-datepicker.css';

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
  const { transactions } = useData();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filteredTransactions = useMemo(() => {
    if (!startDate || !endDate) {
      return transactions;
    }
    const start = startOfDay(startDate);
    const end = endOfDay(endDate);

    return transactions.filter(t => {
      const transactionDate = parseISO(t.date);
      return transactionDate >= start && transactionDate <= end;
    });
  }, [transactions, startDate, endDate]);

  return (
    <ReportsContainer>
      <BackLink to="/dashboard">&#8592; Volver al Dashboard</BackLink>
      <Title>Informes y Visualización</Title>

      <DateRangeSelector 
        startDate={startDate} 
        setStartDate={setStartDate} 
        endDate={endDate} 
        setEndDate={setEndDate} 
      />

      <ChartsGrid>
        <ChartWrapper>
          <ExpensesByCategoryPieChart transactions={filteredTransactions} />
        </ChartWrapper>
        <ChartWrapper>
          <IncomeVsExpensesBarChart transactions={filteredTransactions} />
        </ChartWrapper>
      </ChartsGrid>
    </ReportsContainer>
  );
};

export default ReportsPage;

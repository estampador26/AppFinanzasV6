import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';
import { format, parseISO } from 'date-fns';

const ChartTitle = styled.h3`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #888;
`;

const IncomeVsExpensesBarChart = () => {
  const { transactions } = useData();

  if (transactions.length === 0) {
    return (
      <>
        <ChartTitle>Ingresos vs. Gastos Mensuales</ChartTitle>
        <NoDataMessage>No hay transacciones para mostrar.</NoDataMessage>
      </>
    );
  }

  const monthlyData = transactions.reduce((acc, t) => {
    const month = format(parseISO(t.date), 'yyyy-MM');
    if (!acc[month]) {
      acc[month] = { month, income: 0, expense: 0 };
    }
    if (t.type === 'income') {
      acc[month].income += Number(t.amount);
    } else {
      acc[month].expense += Number(t.amount);
    }
    return acc;
  }, {});

  const chartData = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));

  return (
    <>
      <ChartTitle>Ingresos vs. Gastos Mensuales</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(tick) => format(parseISO(tick), 'MMM yy')} />
          <YAxis />
          <Tooltip formatter={(value) => `${value.toFixed(2)}€`} />
          <Legend />
          <Bar dataKey="income" fill="#00C49F" name="Ingresos" />
          <Bar dataKey="expense" fill="#FF8042" name="Gastos" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default IncomeVsExpensesBarChart;

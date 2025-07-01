import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';

const ChartTitle = styled.h3`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #888;
`;

// Paleta de colores para el gráfico
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A239EA', '#FF4560', '#775DD0', '#546E7A'];

const ExpensesByCategoryPieChart = ({ transactions }) => {
  const { categories } = useData();

  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  if (expenseTransactions.length === 0) {
    return (
      <>
        <ChartTitle>Gastos por Categoría</ChartTitle>
        <NoDataMessage>No hay datos de gastos para mostrar.</NoDataMessage>
      </>
    );
  }

  const data = categories.map(category => {
    const total = expenseTransactions
      .filter(t => t.categoryId === category.id)
      .reduce((acc, t) => acc + Number(t.amount), 0);
    
    return { name: category.name, value: total };
  }).filter(item => item.value > 0); // Solo mostrar categorías con gastos

  if (data.length === 0) {
    return (
      <>
        <ChartTitle>Gastos por Categoría</ChartTitle>
        <NoDataMessage>No hay gastos categorizados para mostrar.</NoDataMessage>
      </>
    );
  }

  return (
    <>
      <ChartTitle>Gastos por Categoría</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toFixed(2)}€`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default ExpensesByCategoryPieChart;

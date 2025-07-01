import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';

const ChartTitle = styled.h3`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: 600;
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #888;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomTooltipContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
  padding: 0.8rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A239EA', '#FF4560', '#775DD0', '#546E7A'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <CustomTooltipContainer>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{`${data.name}`}</p>
        <p style={{ margin: '4px 0 0', color: '#007bff' }}>{`Total: ${data.value.toFixed(2)}€`}</p>
        <p style={{ margin: '4px 0 0', color: '#888' }}>{`(${(data.percent * 100).toFixed(2)}%)`}</p>
      </CustomTooltipContainer>
    );
  }
  return null;
};

const ExpensesByCategoryPieChart = ({ transactions }) => {
  const { categories } = useData();

  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  const data = categories.map(category => {
    const total = expenseTransactions
      .filter(t => t.categoryId === category.id)
      .reduce((acc, t) => acc + Number(t.amount), 0);
    
    return { name: category.name, value: total };
  }).filter(item => item.value > 0);

  if (data.length === 0) {
    return (
      <>
        <ChartTitle>Gastos por Categoría</ChartTitle>
        <NoDataMessage>No hay datos de gastos para mostrar en el período seleccionado.</NoDataMessage>
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
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default ExpensesByCategoryPieChart;

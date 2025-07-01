import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const formattedLabel = format(parseISO(label), 'MMMM yyyy', { locale: es });
    return (
      <CustomTooltipContainer>
        <p style={{ margin: 0, fontWeight: 'bold', textTransform: 'capitalize' }}>{formattedLabel}</p>
        <p style={{ margin: '4px 0 0', color: '#00C49F' }}>{`Ingresos: ${payload[0].value.toFixed(2)}€`}</p>
        <p style={{ margin: '4px 0 0', color: '#FF8042' }}>{`Gastos: ${payload[1].value.toFixed(2)}€`}</p>
      </CustomTooltipContainer>
    );
  }
  return null;
};

const IncomeVsExpensesBarChart = ({ transactions }) => {
  const monthlyData = transactions.reduce((acc, t) => {
    // Ensure t.date is a valid string before parsing
    const date = t.date?.seconds ? new Date(t.date.seconds * 1000) : parseISO(t.date);
    const month = format(date, 'yyyy-MM');
    
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

  if (chartData.length === 0) {
    return (
      <>
        <ChartTitle>Ingresos vs. Gastos</ChartTitle>
        <NoDataMessage>No hay datos para mostrar en el período seleccionado.</NoDataMessage>
      </>
    );
  }

  return (
    <>
      <ChartTitle>Ingresos vs. Gastos</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="month" 
            tickFormatter={(tick) => format(parseISO(tick), 'MMM yy', { locale: es })} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis tickFormatter={(value) => `${value}€`} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 123, 255, 0.1)' }} />
          <Legend iconType="circle" />
          <Bar dataKey="income" fill="#00C49F" name="Ingresos" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" fill="#FF8042" name="Gastos" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default IncomeVsExpensesBarChart;

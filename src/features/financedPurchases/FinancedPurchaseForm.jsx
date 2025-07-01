import React, { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Title = styled.h2`
  margin-top: 0;
  text-align: center;
`;

function FinancedPurchaseForm() {
  const [itemName, setItemName] = useState('');
  const [store, setStore] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [installmentsCount, setInstallmentsCount] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [startDate, setStartDate] = useState('');
  const [error, setError] = useState('');

  const { addFinancedPurchase } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await addFinancedPurchase({
        itemName,
        store,
        totalAmount,
        installmentsCount,
        monthlyPayment,
        startDate,
      });
      // Reset form
      setItemName('');
      setStore('');
      setTotalAmount('');
      setInstallmentsCount('');
      setMonthlyPayment('');
      setStartDate('');
    } catch (err) {
      setError('Error al añadir la compra financiada.');
      console.error(err);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Añadir Nueva Compra Financiada</Title>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Input type="text" placeholder="Nombre del artículo" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
      <Input type="text" placeholder="Tienda" value={store} onChange={(e) => setStore(e.target.value)} />
      <Input type="number" placeholder="Monto Total (€)" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} required />
      <Input type="number" placeholder="Nº de Cuotas" value={installmentsCount} onChange={(e) => setInstallmentsCount(e.target.value)} required />
      <Input type="number" placeholder="Pago Mensual (€)" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} required />
      <Input type="date" placeholder="Fecha de Inicio" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <Button type="submit">Añadir Compra</Button>
    </FormContainer>
  );
}

export default FinancedPurchaseForm;


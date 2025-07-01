import React, { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../contexts/DataContext';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';

const FormTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
`;

const ErrorMessage = styled.p`
  color: #d9534f;
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  padding: 0.8rem;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const SubscriptionForm = () => {
  const { addSubscription } = useData();
  
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('mensual');
  const [nextBillingDate, setNextBillingDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !amount || !nextBillingDate) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await addSubscription({ name, amount: parseFloat(amount), frequency, nextBillingDate });
      setName('');
      setAmount('');
      setFrequency('mensual');
      setNextBillingDate('');
    } catch (err) {
      setError('Error al añadir la suscripción. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Añadir Nueva Suscripción</FormTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del servicio (Ej: Netflix)" required />
      <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Coste (€)" required min="0" step="0.01" />
      <Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
        <option value="mensual">Mensual</option>
        <option value="anual">Anual</option>
      </Select>
      <Input type="date" value={nextBillingDate} onChange={(e) => setNextBillingDate(e.target.value)} required />
      <Button type="submit" disabled={loading}>
        {loading ? 'Añadiendo...' : 'Añadir Suscripción'}
      </Button>
    </Form>
  );
};

export default SubscriptionForm;

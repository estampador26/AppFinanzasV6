import React, { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';
import { Button } from '../../styles/StyledComponents';

// --- Styled Components for TransactionForm ---

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormTitle = styled.h3`
  margin: 0;
  text-align: left;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.9rem;
  margin: 0;
`;

// --- TransactionForm Component ---

const TransactionForm = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense');
  const [categoryId, setCategoryId] = useState('');
  const [cardId, setCardId] = useState('');
  const [error, setError] = useState('');

  const { categories, creditCards, addTransaction } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryId) {
      setError('Por favor, selecciona una categoría.');
      return;
    }
    setError('');
    try {
      await addTransaction({
        amount: parseFloat(amount),
        description,
        type,
        categoryId,
        ...(cardId && { cardId }),
      });
      // Reset form
      setAmount('');
      setDescription('');
      setType('expense');
      setCategoryId('');
      setCardId('');
    } catch (err) {
      setError('Error al añadir la transacción.');
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Añadir Nueva Transacción</FormTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input
        type="number"
        placeholder="Importe (€)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Descripción (ej: Café con amigos)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Select value={type} onChange={(e) => {
        setType(e.target.value);
        if (e.target.value !== 'expense') {
          setCardId('');
        }
      }}>
        <option value="expense">Gasto</option>
        <option value="income">Ingreso</option>
      </Select>
      <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
        <option value="" disabled>Selecciona una categoría</option>
        {categories
          .filter(c => c.type === type)
          .map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
      </Select>
      {type === 'expense' && (
        <Select value={cardId} onChange={(e) => setCardId(e.target.value)}>
          <option value="">Pago con... (Efectivo/Otro)</option>
          {creditCards.map(card => (
            <option key={card.id} value={card.id}>{card.cardName} - {card.bank}</option>
          ))}
        </Select>
      )}
      <Button type="submit">Añadir Transacción</Button>
    </Form>
  );
};

export default TransactionForm;

import React, { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';

const FormContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

function CreditCardForm() {
  const [cardName, setCardName] = useState('');
  const [bank, setBank] = useState('');
  const [last4Digits, setLast4Digits] = useState('');
  const [closingDay, setClosingDay] = useState('');
  const [paymentDay, setPaymentDay] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { addCreditCard } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cardName || !bank || !last4Digits || !closingDay || !paymentDay) {
      return setError('Todos los campos son obligatorios.');
    }
    setError('');
    setLoading(true);
    try {
      await addCreditCard({
        cardName,
        bank,
        last4Digits,
        closingDay,
        paymentDay,
      });
      setCardName('');
      setBank('');
      setLast4Digits('');
      setClosingDay('');
      setPaymentDay('');
    } catch (err) {
      setError('Error al añadir la tarjeta. Inténtalo de nuevo.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <FormContainer>
      <h2>Añadir Nueva Tarjeta</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <StyledForm onSubmit={handleSubmit}>
        <Input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Nombre de la tarjeta (ej. Visa Gold)" />
        <Input type="text" value={bank} onChange={(e) => setBank(e.target.value)} placeholder="Banco" />
        <Input type="text" value={last4Digits} onChange={(e) => setLast4Digits(e.target.value)} placeholder="Últimos 4 dígitos" maxLength="4" />
        <Input type="number" value={closingDay} onChange={(e) => setClosingDay(e.target.value)} placeholder="Día de cierre (1-31)" min="1" max="31" />
        <Input type="number" value={paymentDay} onChange={(e) => setPaymentDay(e.target.value)} placeholder="Día de pago (1-31)" min="1" max="31" />
        <Button type="submit" disabled={loading}>
          {loading ? 'Añadiendo...' : 'Añadir Tarjeta'}
        </Button>
      </StyledForm>
    </FormContainer>
  );
}

export default CreditCardForm;

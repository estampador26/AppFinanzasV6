import React, { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';
import { Input, Button } from '../../styles/StyledComponents';

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

const CreditCardForm = () => {
  const { addCreditCard } = useData();
  const [formData, setFormData] = useState({
    cardName: '',
    bank: '',
    last4Digits: '',
    closingDay: '',
    paymentDay: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.cardName || !formData.bank || !formData.last4Digits || !formData.closingDay || !formData.paymentDay) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);

    const dataToSubmit = {
      ...formData,
      closingDay: parseInt(formData.closingDay, 10),
      paymentDay: parseInt(formData.paymentDay, 10),
      balance: 0, // Initialize balance
    };

    try {
      await addCreditCard(dataToSubmit);
      setFormData({ // Reset form
        cardName: '', bank: '', last4Digits: '', closingDay: '', paymentDay: ''
      });
    } catch (err) {
      setError('Error al añadir la tarjeta. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Añadir Nueva Tarjeta</FormTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input
        name="cardName"
        type="text"
        placeholder="Nombre de la tarjeta (ej. Visa Gold)"
        value={formData.cardName}
        onChange={handleChange}
        required
      />
      <Input
        name="bank"
        type="text"
        placeholder="Banco"
        value={formData.bank}
        onChange={handleChange}
        required
      />
      <Input
        name="last4Digits"
        type="text"
        placeholder="Últimos 4 dígitos"
        value={formData.last4Digits}
        onChange={handleChange}
        required
        maxLength="4"
        pattern="\\d{4}"
        title="Debe contener 4 dígitos"
      />
      <Input
        name="closingDay"
        type="number"
        placeholder="Día de cierre (1-31)"
        value={formData.closingDay}
        onChange={handleChange}
        required
        min="1"
        max="31"
      />
      <Input
        name="paymentDay"
        type="number"
        placeholder="Día de pago (1-31)"
        value={formData.paymentDay}
        onChange={handleChange}
        required
        min="1"
        max="31"
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Añadiendo...' : 'Añadir Tarjeta'}
      </Button>
    </Form>
  );
};

export default CreditCardForm;

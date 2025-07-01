import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';

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
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h4>Añadir Nueva Transacción</h4>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="number"
        placeholder="Monto"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={type} onChange={(e) => {
        setType(e.target.value);
        if (e.target.value !== 'expense') {
          setCardId('');
        }
      }}>
        <option value="expense">Gasto</option>
        <option value="income">Ingreso</option>
      </select>
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
        <option value="" disabled>Selecciona una categoría</option>
        {categories
          .filter(c => c.type === type)
          .map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
      </select>
      {type === 'expense' && (
        <select value={cardId} onChange={(e) => setCardId(e.target.value)}>
          <option value="">Pago con... (Efectivo/Otro)</option>
          {creditCards.map(card => (
            <option key={card.id} value={card.id}>{card.cardName} - {card.bank}</option>
          ))}
        </select>
      )}
      <button type="submit">Añadir</button>
    </form>
  );
};

export default TransactionForm;

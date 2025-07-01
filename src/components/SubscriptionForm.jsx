import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';



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
      return setError('Todos los campos son obligatorios.');
    }

    setError('');
    setLoading(true);

    try {
      await addSubscription({ name, amount, frequency, nextBillingDate });
      // Reset form on successful submission
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
    <form onSubmit={handleSubmit}>
      <h3>Añadir Nueva Suscripción</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del servicio" required />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Monto" required />
      <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
        <option value="mensual">Mensual</option>
        <option value="anual">Anual</option>
      </select>
      <input type="date" value={nextBillingDate} onChange={(e) => setNextBillingDate(e.target.value)} required />
      <button type="submit" disabled={loading}>
        {loading ? 'Añadiendo...' : 'Añadir Suscripción'}
      </button>
    </form>
  );
};

export default SubscriptionForm;

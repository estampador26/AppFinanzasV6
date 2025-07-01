import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Form, Input, Button } from '../../styles/StyledComponents';

function ContributionForm({ goalId }) {
  const [amount, setAmount] = useState('');
  const { addContribution } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return;

    try {
      await addContribution(goalId, { amount });
      setAmount('');
    } catch (error) {
      console.error('Error al añadir la aportación:', error);
      alert('Hubo un error al registrar la aportación.');
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <Input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Añadir aportación (€)"
      />
      <Button type="submit">Aportar</Button>
    </Form>
  );
}

export default ContributionForm;

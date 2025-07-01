import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Form, Input, Button } from '../../styles/StyledComponents';

function SavingsGoalForm() {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const { addSavingsGoal } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !targetAmount) {
      alert('Por favor, completa el nombre y el monto objetivo.');
      return;
    }
    try {
      await addSavingsGoal({ name, targetAmount, deadline });
      setName('');
      setTargetAmount('');
      setDeadline('');
    } catch (error) {
      console.error('Error al crear la meta de ahorro:', error);
      alert('Hubo un error al crear la meta.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Crear Nueva Meta de Ahorro</h3>
      <Input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Nombre de la meta (ej. Viaje a Japón)" 
      />
      <Input 
        type="number" 
        value={targetAmount} 
        onChange={(e) => setTargetAmount(e.target.value)} 
        placeholder="Monto Objetivo (€)" 
      />
      <Input 
        type="date" 
        value={deadline} 
        onChange={(e) => setDeadline(e.target.value)} 
      />
      <Button type="submit">Crear Meta</Button>
    </Form>
  );
}

export default SavingsGoalForm;

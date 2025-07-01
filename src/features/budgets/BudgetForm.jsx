import React, { useState, useMemo } from 'react';
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

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
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

function BudgetForm() {
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const { categories, budgets, addBudget } = useData();

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const existingBudgetForCategory = useMemo(() => {
    return budgets.find(b => 
      b.categoryId === categoryId && 
      b.month === currentMonth && 
      b.year === currentYear
    );
  }, [budgets, categoryId, currentMonth, currentYear]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!categoryId || !amount) {
      setError('Por favor, selecciona una categoría y un importe.');
      return;
    }

    const selectedCategory = categories.find(c => c.id === categoryId);

    try {
      await addBudget({
        categoryId,
        categoryName: selectedCategory.name,
        amount: parseFloat(amount),
        month: currentMonth,
        year: currentYear,
      });
      setCategoryId('');
      setAmount('');
    } catch (err) {
      setError('Error al guardar el presupuesto.');
      console.error(err);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>{existingBudgetForCategory ? 'Actualizar' : 'Crear'} Presupuesto para este mes</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
        <option value="">Selecciona una categoría</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </Select>
      <Input 
        type="number" 
        placeholder="Importe del presupuesto (€)" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        required 
      />
      <Button type="submit">Guardar Presupuesto</Button>
    </FormContainer>
  );
}

export default BudgetForm;

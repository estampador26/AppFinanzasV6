import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';
import { Input, Select, Button } from '../../styles/StyledComponents';

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

const BudgetForm = () => {
  const { categories, budgets, addBudget, loading } = useData();
  const [formData, setFormData] = useState({ categoryId: '', amount: '' });
  const [error, setError] = useState('');

  const expenseCategories = useMemo(() => 
    categories.filter(c => c.type === 'expense'), 
    [categories]
  );

  const currentMonthYear = useMemo(() => {
    const now = new Date();
    return { month: now.getMonth() + 1, year: now.getFullYear() };
  }, []);

  const existingBudget = useMemo(() => {
    if (!formData.categoryId) return null;
    return budgets.find(b => 
      b.categoryId === formData.categoryId && 
      b.month === currentMonthYear.month && 
      b.year === currentMonthYear.year
    );
  }, [budgets, formData.categoryId, currentMonthYear]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.categoryId || !formData.amount) {
      setError('Por favor, selecciona una categoría y un importe.');
      return;
    }

    const selectedCategory = categories.find(c => c.id === formData.categoryId);

    try {
      await addBudget({
        categoryId: formData.categoryId,
        categoryName: selectedCategory.name,
        amount: parseFloat(formData.amount),
        ...currentMonthYear,
      });
      setFormData({ categoryId: '', amount: '' });
    } catch (err) {
      setError('Error al guardar el presupuesto.');
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>{existingBudget ? 'Actualizar' : 'Crear'} Presupuesto Mensual</FormTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
        <option value="">Selecciona una categoría de gasto</option>
        {expenseCategories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </Select>
      <Input 
        name="amount"
        type="number" 
        placeholder="Importe del presupuesto (€)" 
        value={formData.amount} 
        onChange={handleChange} 
        required 
        min="0"
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : (existingBudget ? 'Actualizar Presupuesto' : 'Crear Presupuesto')}
      </Button>
    </Form>
  );
};

export default BudgetForm;

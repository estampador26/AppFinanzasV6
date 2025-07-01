import React, { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';
import { Card, Input, Select, Button } from '../../styles/StyledComponents';

const FormTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: #d9534f;
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  padding: 0.8rem;
  border-radius: 4px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('expense'); // 'gasto' a 'expense' para consistencia
  const [error, setError] = useState('');
  const { addCategory } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('El nombre de la categoría es obligatorio.');
      return;
    }
    try {
      await addCategory({ name, type });
      setName('');
      setType('expense');
      setError('');
    } catch (err) {
      setError('Error al añadir la categoría. Puede que ya exista.');
      console.error(err);
    }
  };

  return (
    <Card>
      <FormTitle>Añadir Nueva Categoría</FormTitle>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Supermercado, Nómina, etc."
          required
        />
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Gasto</option>
          <option value="income">Ingreso</option>
        </Select>
        <Button type="submit">Añadir Categoría</Button>
      </Form>
    </Card>
  );
};

export default CategoryForm;

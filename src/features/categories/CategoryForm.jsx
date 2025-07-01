import React, { useState } from 'react';
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

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('gasto');
  const [error, setError] = useState('');
  const { addCategory } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError('El nombre de la categoría es obligatorio.');
      return;
    }
    try {
      await addCategory({ name, type });
      setName('');
      setType('gasto');
      setError('');
    } catch (err) {
      setError('Error al añadir la categoría.');
      console.error(err);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Añadir Nueva Categoría</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la categoría"
        required
      />
      <Select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="gasto">Gasto</option>
        <option value="ingreso">Ingreso</option>
      </Select>
      <Button type="submit">Añadir Categoría</Button>
    </FormContainer>
  );
};

export default CategoryForm;

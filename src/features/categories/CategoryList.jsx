import React from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';

const ListContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`;

const CategoryList = () => {
  const { categories, deleteCategory } = useData();

  return (
    <ListContainer>
      <h2>Categorías Existentes</h2>
      {
        categories.length > 0 ? (
          categories.map(cat => (
            <CategoryItem key={cat.id}>
              <span>{cat.name} ({cat.type})</span>
              <Button onClick={() => deleteCategory(cat.id)}>Eliminar</Button>
            </CategoryItem>
          ))
        ) : (
          <p>No has añadido ninguna categoría todavía.</p>
        )
      }
    </ListContainer>
  );
};

export default CategoryList;

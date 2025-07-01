import React from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';
import { Card } from '../../styles/StyledComponents';
import { FaTrash } from 'react-icons/fa';

const ListTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.8rem;
  background-color: #f8f9fa;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
`;

const Td = styled.td`
  padding: 0.8rem;
  border-bottom: 1px solid #dee2e6;
  vertical-align: middle;
`;

const TypeBadge = styled.span`
  padding: 0.25em 0.6em;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  background-color: ${props => props.type === 'income' ? '#28a745' : '#dc3545'};
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f2dede;
  }
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #888;
  padding: 2rem;
`;

const CategoryList = () => {
  const { categories, deleteCategory } = useData();

  return (
    <Card>
      <ListTitle>Categorías Existentes</ListTitle>
      {categories.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <Th>Nombre</Th>
              <Th>Tipo</Th>
              <Th style={{ textAlign: 'right' }}>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id}>
                <Td>{cat.name}</Td>
                <Td>
                  <TypeBadge type={cat.type}>
                    {cat.type === 'income' ? 'Ingreso' : 'Gasto'}
                  </TypeBadge>
                </Td>
                <Td style={{ textAlign: 'right' }}>
                  <DeleteButton onClick={() => deleteCategory(cat.id)} aria-label={`Eliminar ${cat.name}`}>
                    <FaTrash />
                  </DeleteButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <NoDataMessage>No has añadido ninguna categoría todavía.</NoDataMessage>
      )}
    </Card>
  );
};

export default CategoryList;

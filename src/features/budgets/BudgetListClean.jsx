import React from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';
import { FaTrash } from 'react-icons/fa';

const BudgetListContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const BudgetItem = styled.div`
  background: var(--color-white);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
`;

const BudgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-dark-variant);
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--color-gray-400);
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-danger);
  }
`;

const BudgetInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--color-gray-500);
`;

const SpentAmount = styled.span`
  font-weight: 600;
  color: var(--color-primary);
`;

const TotalAmount = styled.span`
  font-weight: 500;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: var(--color-gray-200);
  border-radius: 5px;
  height: 10px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: ${props => props.progress > 100 ? 'var(--color-danger)' : 'var(--color-success)'};
  border-radius: 5px;
  transition: width 0.5s ease-in-out;
`;

const NoBudgetsMessage = styled.p`
  text-align: center;
  color: var(--color-gray-500);
  margin-top: 2rem;
  font-style: italic;
`;

const BudgetListClean = () => {
  const { budgets, categories, deleteBudget, loading } = useData();

  const getCategoryName = (id) => {
    const category = categories.find(c => c.id === id);
    return category ? category.name : 'Categoría no encontrada';
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este presupuesto?')) {
      try {
        await deleteBudget(id);
      } catch (error) {
        console.error("Error deleting budget:", error);
        alert('No se pudo eliminar el presupuesto.');
      }
    }
  };

  if (loading) {
    return <p>Cargando presupuestos...</p>;
  }

  if (!budgets || budgets.length === 0) {
    return <NoBudgetsMessage>No hay presupuestos definidos para el mes actual.</NoBudgetsMessage>;
  }

  return (
    <BudgetListContainer>
      {budgets.map(budget => (
        <BudgetItem key={budget.id}>
          <BudgetHeader>
            <span>{getCategoryName(budget.categoryId)}</span>
            <DeleteButton onClick={() => handleDelete(budget.id)} title="Eliminar presupuesto">
              <FaTrash />
            </DeleteButton>
          </BudgetHeader>
          <div>
            <BudgetInfo>
              <SpentAmount>${budget.spent.toFixed(2)}</SpentAmount>
              <TotalAmount>de ${budget.amount.toFixed(2)}</TotalAmount>
            </BudgetInfo>
            <ProgressBarContainer>
              <ProgressBar progress={budget.progress} />
            </ProgressBarContainer>
          </div>
        </BudgetItem>
      ))}
    </BudgetListContainer>
  );
};

export default BudgetListClean;

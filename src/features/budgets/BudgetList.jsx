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

const BudgetList = () => {
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

export default BudgetList;
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

const BudgetList = () => {
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

export default BudgetList;
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';
import { Card } from '../../components/ui/Card';
import { FaTrash } from 'react-icons/fa';

const ListTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
`;

const BudgetItem = styled(Card)`
  margin-bottom: 1.5rem;
  position: relative;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CategoryName = styled.h4`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f2dede;
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const Amount = styled.span`
  font-weight: bold;
  color: #333;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e9ecef;
  border-radius: 8px;
  overflow: hidden;
`;

const getProgressBarColor = (progress) => {
  if (progress > 100) return '#d9534f';
  if (progress > 85) return '#f0ad4e';
  return '#5cb85c';
};

const ProgressBar = styled.div`
  height: 24px;
  background-color: ${props => getProgressBarColor(props.$progress)};
  width: ${props => Math.min(props.$progress, 100)}%;
  border-radius: 8px 0 0 8px;
  text-align: right;
  padding-right: 8px;
  color: white;
  line-height: 24px;
  font-size: 0.9rem;
  font-weight: bold;
  transition: width 0.5s ease-in-out, background-color 0.5s ease;
  white-space: nowrap;
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #888;
  padding: 2rem;
`;

const BudgetList = () => {
  const { budgets, loading, deleteBudget } = useData();

  if (loading && budgets.length === 0) {
    return <NoDataMessage>Cargando presupuestos...</NoDataMessage>;
  }

  return (
    <div>
      <ListTitle>Presupuestos del Mes</ListTitle>
      {budgets.length === 0 ? (
        <NoDataMessage>No has definido presupuestos para este mes.</NoDataMessage>
      ) : (
        budgets.map(budget => (
          <BudgetItem key={budget.id}>
            <ItemHeader>
              <CategoryName>{budget.categoryName}</CategoryName>
              <DeleteButton onClick={() => deleteBudget(budget.id)} aria-label={`Eliminar presupuesto para ${budget.categoryName}`}>
                <FaTrash />
              </DeleteButton>
            </ItemHeader>
            <Details>
              <span>Gastado: <Amount>{(budget.spent || 0).toFixed(2)}€</Amount></span>
              <span>Objetivo: <Amount>{budget.amount.toFixed(2)}€</Amount></span>
            </Details>
            <ProgressBarContainer>
              <ProgressBar $progress={budget.progress}>
                {budget.progress > 15 && `${budget.progress.toFixed(0)}%`}
              </ProgressBar>
            </ProgressBarContainer>
          </BudgetItem>
        ))
      )}
    </div>
  );
};

export default BudgetList;

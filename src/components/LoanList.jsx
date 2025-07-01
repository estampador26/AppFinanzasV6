import React from 'react';
import styled from 'styled-components';
import { useData } from '../contexts/DataContext';
import { Card } from './ui/Card';
import { FaTrash } from 'react-icons/fa';

const ListTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
`;

const LoanCard = styled(Card)`
  margin-bottom: 1.5rem;
  position: relative;
`;

const LoanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const LoanName = styled.h4`
  margin: 0;
  color: #333;
  font-size: 1.2rem;
`;

const LoanEntity = styled.p`
  margin: 0;
  color: #6c757d;
  font-size: 0.9rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem 0;
`;

const ProgressBar = styled.div`
  height: 24px;
  width: ${props => props.percentage}%;
  background: linear-gradient(90deg, #28a745, #218838);
  border-radius: 8px 0 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
  transition: width 0.5s ease-in-out;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  font-size: 0.9rem;
`;

const DetailItem = styled.div`
  color: #495057;
  span {
    font-weight: bold;
    color: #333;
    display: block;
  }
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
  &:hover { background-color: #f2dede; }
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #888;
  padding: 2rem;
`;

const calculateProgress = (loan) => {
  const paidAmount = loan.paidAmount || 0;
  const initialAmount = loan.initialAmount || 1; // Evitar división por cero
  const progressPercentage = (paidAmount / initialAmount) * 100;
  const remainingAmount = initialAmount - paidAmount;

  return {
    paidAmount,
    remainingAmount,
    progressPercentage: Math.min(100, Math.max(0, progressPercentage)),
  };
};

const LoanList = () => {
  const { loans, loading, deleteLoan } = useData();

  if (loading) return <NoDataMessage>Cargando préstamos...</NoDataMessage>;
  if (!loans || loans.length === 0) return <NoDataMessage>Aún no has registrado ningún préstamo.</NoDataMessage>;

  return (
    <div>
      <ListTitle>Tus Préstamos</ListTitle>
      {loans.map(loan => {
        const progress = calculateProgress(loan);
        return (
          <LoanCard key={loan.id}>
            <LoanHeader>
              <div>
                <LoanName>{loan.name}</LoanName>
                <LoanEntity>{loan.entity}</LoanEntity>
              </div>
              <DeleteButton onClick={() => deleteLoan(loan.id)} aria-label={`Eliminar ${loan.name}`}>
                <FaTrash />
              </DeleteButton>
            </LoanHeader>
            <ProgressBarContainer>
              <ProgressBar percentage={progress.progressPercentage}>
                {`${progress.progressPercentage.toFixed(1)}%`}
              </ProgressBar>
            </ProgressBarContainer>
            <DetailsGrid>
              <DetailItem><span>Pagado:</span> {progress.paidAmount.toFixed(2)}€</DetailItem>
              <DetailItem><span>Restante:</span> {progress.remainingAmount.toFixed(2)}€</DetailItem>
              <DetailItem><span>Cuotas:</span> {loan.paidInstallments || 0} / {loan.totalInstallments}</DetailItem>
              <DetailItem><span>Cuota Mensual:</span> {loan.monthlyPayment.toFixed(2)}€</DetailItem>
            </DetailsGrid>
          </LoanCard>
        );
      })}
    </div>
  );
};

export default LoanList;

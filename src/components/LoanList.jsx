import React from 'react';
import { useData } from '../contexts/DataContext';
import { Card } from '../styles/StyledComponents';
import styled from 'styled-components';

const LoanItem = styled(Card)`
  margin-bottom: 1rem;
`;

const LoanHeader = styled.h4`
  margin-bottom: 0.5rem;
  color: #333;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin: 1rem 0;
`;

const ProgressBar = styled.div`
  height: 20px;
  width: ${props => props.percentage}%;
  background-color: #4caf50; /* Green */
  border-radius: 4px;
  text-align: center;
  line-height: 20px;
  color: white;
  font-weight: bold;
`;

const LoanDetails = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
`;

const calculateProgress = (loan) => {
    if (!loan.startDate?.toDate) return { paidAmount: 0, remainingAmount: loan.initialAmount, paidInstallments: 0, progressPercentage: 0 };

    const startDate = loan.startDate.toDate();
    const now = new Date();
    
    let monthsPassed = (now.getFullYear() - startDate.getFullYear()) * 12;
    monthsPassed -= startDate.getMonth();
    monthsPassed += now.getMonth();
    const paidInstallments = monthsPassed <= 0 ? 0 : Math.min(monthsPassed, loan.totalInstallments);

    const paidAmount = paidInstallments * loan.monthlyPayment;
    const remainingAmount = loan.initialAmount - paidAmount;
    const progressPercentage = (paidAmount / loan.initialAmount) * 100;

    return {
        paidAmount: Math.max(0, paidAmount),
        remainingAmount: Math.max(0, remainingAmount),
        paidInstallments,
        progressPercentage: Math.min(100, progressPercentage)
    };
};

const LoanList = () => {
  const { loans, loading } = useData();

  if (loading) {
    return <p>Cargando préstamos...</p>;
  }

  if (!loans || loans.length === 0) {
    return <p>Aún no has registrado ningún préstamo.</p>;
  }

  return (
    <div>
      <h3>Tus Préstamos</h3>
      {loans.map(loan => {
        const progress = calculateProgress(loan);
        return (
          <LoanItem key={loan.id}>
            <LoanHeader>{loan.name} - {loan.entity}</LoanHeader>
            <ProgressBarContainer>
                <ProgressBar percentage={progress.progressPercentage}>
                    {progress.progressPercentage.toFixed(1)}%
                </ProgressBar>
            </ProgressBarContainer>
            <LoanDetails>
                <span>Pagado: {progress.paidAmount.toFixed(2)}€</span>
                <span>Restante: {progress.remainingAmount.toFixed(2)}€</span>
            </LoanDetails>
            <LoanDetails>
                 <span>Cuotas: {progress.paidInstallments} / {loan.totalInstallments}</span>
                 <span>Cuota Mensual: {loan.monthlyPayment.toFixed(2)}€</span>
            </LoanDetails>
          </LoanItem>
        )
      })}
    </div>
  );
};

export default LoanList;

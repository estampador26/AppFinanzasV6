import React from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';

const ListContainer = styled.div`
  margin-top: 2rem;
`;

const PurchaseItem = styled.div`
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border-left: 5px solid #28a745;
`;

const ItemHeader = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const ItemDetails = styled.p`
  margin: 0.2rem 0;
  color: #666;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-top: 1rem;
`;

const ProgressBar = styled.div`
  height: 20px;
  background-color: #28a745;
  width: ${props => props.$progress}%;
  border-radius: 4px;
  text-align: center;
  color: white;
  line-height: 20px;
  font-size: 0.8rem;
`;

function FinancedPurchaseList() {
  const { financedPurchases, loading } = useData();

  const calculateProgress = (purchase) => {
    const startDate = purchase.startDate.toDate();
    const today = new Date();
    
    let monthsPassed = (today.getFullYear() - startDate.getFullYear()) * 12;
    monthsPassed -= startDate.getMonth();
    monthsPassed += today.getMonth();
    
    const installmentsPaid = monthsPassed < 0 ? 0 : monthsPassed + 1;
    const progressPercentage = (installmentsPaid / purchase.installmentsCount) * 100;
    const remainingBalance = purchase.totalAmount - (installmentsPaid * purchase.monthlyPayment);

    return {
      installmentsPaid: Math.min(installmentsPaid, purchase.installmentsCount),
      progress: Math.min(progressPercentage, 100),
      remainingBalance: Math.max(0, remainingBalance),
    };
  };

  if (loading) {
    return <p>Cargando compras...</p>;
  }

  return (
    <ListContainer>
      <h2>Compras Registradas</h2>
      {financedPurchases.length === 0 ? (
        <p>Aún no has añadido ninguna compra financiada.</p>
      ) : (
        financedPurchases.map(purchase => {
          const { installmentsPaid, progress, remainingBalance } = calculateProgress(purchase);
          return (
            <PurchaseItem key={purchase.id}>
              <ItemHeader>{purchase.itemName} - {purchase.store}</ItemHeader>
              <ItemDetails>Cuota: {purchase.monthlyPayment.toFixed(2)} €</ItemDetails>
              <ItemDetails>Progreso: {installmentsPaid} de {purchase.installmentsCount} cuotas pagadas</ItemDetails>
              <ItemDetails>Saldo pendiente: {remainingBalance.toFixed(2)} €</ItemDetails>
              <ProgressBarContainer>
                <ProgressBar $progress={progress}>{progress.toFixed(0)}%</ProgressBar>
              </ProgressBarContainer>
            </PurchaseItem>
          );
        })
      )}
    </ListContainer>
  );
}

export default FinancedPurchaseList;


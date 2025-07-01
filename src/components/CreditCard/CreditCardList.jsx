import React from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';

const ListContainer = styled.div`
  margin-top: 2rem;
`;

const CardItem = styled.div`
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border-left: 5px solid #007bff;
`;

const CardHeader = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const CardDetails = styled.p`
  margin: 0.2rem 0;
  color: #666;
`;

const BalanceDetail = styled.p`
  margin: 0.5rem 0;
  color: #333;
  font-weight: bold;
`;

function CreditCardList() {
  const { creditCards, transactions, loading } = useData();

  const calculateCardBalance = (cardId, closingDay) => {
    const today = new Date();
    let startDate = new Date(today.getFullYear(), today.getMonth(), closingDay + 1);

    if (today.getDate() <= closingDay) {
      // We are in the period before the closing day of the current month
      // So the cycle started last month
      startDate.setMonth(startDate.getMonth() - 1);
    }

    const balance = transactions
      .filter(t => 
        t.cardId === cardId && 
        t.type === 'expense' && 
        t.date.toDate() >= startDate
      )
      .reduce((acc, t) => acc + t.amount, 0);

    return balance;
  };

  if (loading) {
    return <p>Cargando tarjetas...</p>;
  }

  return (
    <ListContainer>
      <h2>Tarjetas Registradas</h2>
      {creditCards.length === 0 ? (
        <p>Aún no has añadido ninguna tarjeta de crédito.</p>
      ) : (
        creditCards.map(card => {
          const balance = calculateCardBalance(card.id, card.closingDay);
          return (
            <CardItem key={card.id}>
              <CardHeader>{card.cardName} ({card.bank})</CardHeader>
              <CardDetails>Terminada en: **** **** **** {card.last4Digits}</CardDetails>
              <CardDetails>Día de cierre: {card.closingDay}</CardDetails>
              <CardDetails>Día de pago: {card.paymentDay}</CardDetails>
              <BalanceDetail>Saldo del ciclo actual: {balance.toFixed(2)} €</BalanceDetail>
            </CardItem>
          );
        })
      )}
    </ListContainer>
  );
}

export default CreditCardList;

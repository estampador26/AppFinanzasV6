import React from 'react';
import styled from 'styled-components';
import { useData } from '../../contexts/DataContext';
import { Card } from '../../styles/StyledComponents';
import { FaTrash } from 'react-icons/fa';

const ListTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
`;

const CreditCardItem = styled(Card)`
  margin-bottom: 1.5rem;
  position: relative;
  border-left: 5px solid ${props => props.color || '#007bff'};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CardName = styled.h4`
  margin: 0;
  color: #333;
  font-size: 1.2rem;
  span {
    font-size: 0.9rem;
    color: #6c757d;
    font-weight: normal;
    margin-left: 0.5rem;
  }
`;

const CardDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const DetailItem = styled.div`
  font-size: 0.9rem;
  color: #495057;
  
  strong {
    display: block;
    color: #333;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
`;

const Balance = styled.div`
  text-align: right;
  font-size: 1.4rem;
  font-weight: bold;
  color: #dc3545;
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

const NoDataMessage = styled.p`
  text-align: center;
  color: #888;
  padding: 2rem;
`;

const cardColors = ['#007bff', '#6f42c1', '#20c997', '#fd7e14', '#17a2b8'];

const CreditCardList = () => {
  const { creditCards, loading, deleteCreditCard } = useData();

  if (loading) {
    return <NoDataMessage>Cargando tarjetas...</NoDataMessage>;
  }

  return (
    <div>
      <ListTitle>Tarjetas Registradas</ListTitle>
      {creditCards.length === 0 ? (
        <NoDataMessage>Aún no has añadido ninguna tarjeta de crédito.</NoDataMessage>
      ) : (
        creditCards.map((card, index) => (
          <CreditCardItem key={card.id} color={cardColors[index % cardColors.length]}>
            <CardHeader>
              <CardName>
                {card.cardName}
                <span>({card.bank})</span>
              </CardName>
              <DeleteButton onClick={() => deleteCreditCard(card.id)} aria-label={`Eliminar ${card.cardName}`}>
                <FaTrash />
              </DeleteButton>
            </CardHeader>
            <DetailItem>
              <strong>Saldo del Ciclo Actual</strong>
              <Balance>{(card.balance || 0).toFixed(2)} €</Balance>
            </DetailItem>
            <CardDetailsGrid>
              <DetailItem>
                <strong>Terminación</strong>
                **** **** **** {card.last4Digits}
              </DetailItem>
              <DetailItem>
                <strong>Día de Cierre</strong>
                {card.closingDay}
              </DetailItem>
              <DetailItem>
                <strong>Día de Pago</strong>
                {card.paymentDay}
              </DetailItem>
            </CardDetailsGrid>
          </CreditCardItem>
        ))
      )}
    </div>
  );
};

export default CreditCardList;

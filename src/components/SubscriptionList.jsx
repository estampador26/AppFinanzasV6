import React from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListContainer = styled.div`
  margin-top: 2rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const SubscriptionInfo = styled.div`
  flex-grow: 1;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 1rem;

  &:hover {
    color: #007bff;
  }
`;

const SubscriptionList = ({ subscriptions, loading }) => {
  if (loading) {
    return <p>Cargando suscripciones...</p>;
  }

  return (
    <ListContainer>
      <h3>Tus Suscripciones</h3>
      {subscriptions && subscriptions.length > 0 ? (
        <List>
          {subscriptions.map(sub => (
            <ListItem key={sub.id}>
              <SubscriptionInfo>
                <strong>{sub.name}</strong> - {sub.amount}€ ({sub.frequency})<br />
                <small>Próximo cobro: {sub.nextBillingDate && sub.nextBillingDate.toDate().toLocaleDateString('es-ES')}</small>
              </SubscriptionInfo>
              <Actions>
                <IconButton onClick={() => console.log('Edit', sub.id)}><FaEdit /></IconButton>
                <IconButton onClick={() => console.log('Delete', sub.id)}><FaTrash /></IconButton>
              </Actions>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No tienes ninguna suscripción registrada.</p>
      )}
    </ListContainer>
  );
};

export default SubscriptionList;

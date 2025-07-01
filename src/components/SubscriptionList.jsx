import React from 'react';
import styled from 'styled-components';
import { useData } from '../contexts/DataContext';
import { FaTrash } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';

const ListTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
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
  font-size: 0.9rem;
`;

const Td = styled.td`
  padding: 0.8rem;
  border-bottom: 1px solid #dee2e6;
  vertical-align: middle;
  font-size: 0.95rem;
`;

const FrequencyBadge = styled.span`
  padding: 0.25em 0.6em;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  background-color: ${props => props.frequency === 'anual' ? '#17a2b8' : '#6c757d'};
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

const LoadingMessage = styled(NoDataMessage)``;

const SubscriptionList = ({ subscriptions, loading }) => {
  const { deleteSubscription } = useData();

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy');
    } catch (error) {
      return 'Fecha inválida';
    }
  };

  if (loading) {
    return <LoadingMessage>Cargando suscripciones...</LoadingMessage>;
  }

  return (
    <div>
      <ListTitle>Tus Suscripciones</ListTitle>
      {subscriptions && subscriptions.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <Th>Nombre</Th>
              <Th>Coste</Th>
              <Th>Frecuencia</Th>
              <Th>Próximo Cobro</Th>
              <Th style={{ textAlign: 'right' }}>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(sub => (
              <tr key={sub.id}>
                <Td><strong>{sub.name}</strong></Td>
                <Td>{Number(sub.amount).toFixed(2)}€</Td>
                <Td>
                  <FrequencyBadge frequency={sub.frequency}>
                    {sub.frequency.charAt(0).toUpperCase() + sub.frequency.slice(1)}
                  </FrequencyBadge>
                </Td>
                <Td>{formatDate(sub.nextBillingDate)}</Td>
                <Td style={{ textAlign: 'right' }}>
                  <DeleteButton onClick={() => deleteSubscription(sub.id)} aria-label={`Eliminar ${sub.name}`}>
                    <FaTrash />
                  </DeleteButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <NoDataMessage>No tienes ninguna suscripción registrada.</NoDataMessage>
      )}
    </div>
  );
};

export default SubscriptionList;

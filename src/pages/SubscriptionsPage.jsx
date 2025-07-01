import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { PageContainer, Title, Card } from '../styles/StyledComponents';
import SubscriptionForm from '../components/SubscriptionForm';
import SubscriptionList from '../components/SubscriptionList';

const SubscriptionsPage = () => {
    const { subscriptions, loading } = useData();

  const totalAnual = useMemo(() => {
    if (!subscriptions) return 0;
    return subscriptions.reduce((total, sub) => {
      if (sub.frequency === 'mensual') {
        return total + Number(sub.amount) * 12;
      } else if (sub.frequency === 'anual') {
        return total + Number(sub.amount);
      }
      return total;
    }, 0);
  }, [subscriptions]);
  
  

  return (
    <PageContainer>
      <Link to="/dashboard" style={{ marginBottom: '2rem', display: 'inline-block' }}>{'< Volver al Dashboard'}</Link>
      <Title>Gestión de Suscripciones</Title>
      <p>Aquí podrás añadir, ver y gestionar todas tus suscripciones y servicios recurrentes.</p>

      <Card>
        <h3>Coste Anual Total</h3>
        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalAnual.toFixed(2)}€</p>
      </Card>

      <Card>
        <SubscriptionForm />
      </Card>

      <Card>
        <SubscriptionList subscriptions={subscriptions} loading={loading} />
      </Card>
    </PageContainer>
  );
};

export default SubscriptionsPage;

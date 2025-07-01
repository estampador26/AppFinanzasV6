import React, { useMemo } from 'react';
import { useData } from '../contexts/DataContext';


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
    <div>
      <h2>Gestión de Suscripciones</h2>
                  <p>Aquí podrás añadir, ver y gestionar todas tus suscripciones y servicios recurrentes.</p>

      <div>
        <h3>Coste Anual Total</h3>
        <p>{totalAnual.toFixed(2)}€</p>
      </div>

      <hr />

      <SubscriptionForm />
      <SubscriptionList subscriptions={subscriptions} loading={loading} />
    </div>
  );
};

export default SubscriptionsPage;

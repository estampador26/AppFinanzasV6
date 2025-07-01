import React from 'react';

const SubscriptionList = ({ subscriptions, loading }) => {
  if (loading) {
    return <p>Cargando suscripciones...</p>;
  }

  return (
    <div>
      <h3>Tus Suscripciones</h3>
      {subscriptions && subscriptions.length > 0 ? (
        <ul>
          {subscriptions.map(sub => (
            <li key={sub.id}>
                            {sub.name} - {sub.amount}€ ({sub.frequency}) - Próximo cobro: {sub.nextBillingDate && sub.nextBillingDate.toDate().toLocaleDateString('es-ES')}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes ninguna suscripción registrada.</p>
      )}
    </div>
  );
};

export default SubscriptionList;

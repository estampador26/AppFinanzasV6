import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Form, Input, Button } from '../styles/StyledComponents';

const LoanForm = () => {
  const { addLoan } = useData();
  const [loanData, setLoanData] = useState({
    name: '',
    entity: '',
    initialAmount: '',
    interestRate: '',
    monthlyPayment: '',
    totalInstallments: '',
    startDate: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await addLoan(loanData);
      // Reset form on success
      setLoanData({
        name: '', entity: '', initialAmount: '', interestRate: '', 
        monthlyPayment: '', totalInstallments: '', startDate: ''
      });
    } catch (err) {
      setError('Error al añadir el préstamo. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Añadir Nuevo Préstamo</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Input name="name" type="text" placeholder="Nombre (ej. Préstamo Coche)" value={loanData.name} onChange={handleChange} required />
      <Input name="entity" type="text" placeholder="Entidad (ej. Banco XYZ)" value={loanData.entity} onChange={handleChange} required />
      <Input name="initialAmount" type="number" placeholder="Monto inicial del préstamo (€)" value={loanData.initialAmount} onChange={handleChange} required />
      <Input name="interestRate" type="number" step="0.01" placeholder="Tasa de Interés Anual (TAE %)" value={loanData.interestRate} onChange={handleChange} required />
      <Input name="monthlyPayment" type="number" placeholder="Cuota mensual (€)" value={loanData.monthlyPayment} onChange={handleChange} required />
      <Input name="totalInstallments" type="number" placeholder="Número total de cuotas (meses)" value={loanData.totalInstallments} onChange={handleChange} required />
      <Input name="startDate" type="date" placeholder="Fecha de inicio" value={loanData.startDate} onChange={handleChange} required />
      <Button type="submit" disabled={loading}>
        {loading ? 'Añadiendo...' : 'Añadir Préstamo'}
      </Button>
    </Form>
  );
};

export default LoanForm;

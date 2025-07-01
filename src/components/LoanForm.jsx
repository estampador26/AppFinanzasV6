import React, { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../contexts/DataContext';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

const FormTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
`;

const ErrorMessage = styled.p`
  color: #d9534f;
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  padding: 0.8rem;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

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

    const dataToSubmit = {
      ...loanData,
      initialAmount: parseFloat(loanData.initialAmount),
      interestRate: parseFloat(loanData.interestRate),
      monthlyPayment: parseFloat(loanData.monthlyPayment),
      totalInstallments: parseInt(loanData.totalInstallments, 10),
      paidAmount: 0, // Initialize paid amount
      paidInstallments: 0, // Initialize paid installments
    };

    try {
      await addLoan(dataToSubmit);
      setLoanData({ // Reset form
        name: '', entity: '', initialAmount: '', interestRate: '', 
        monthlyPayment: '', totalInstallments: '', startDate: ''
      });
    } catch (err) {
      setError('Error al añadir el préstamo. Revisa los datos e inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Añadir Nuevo Préstamo</FormTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input name="name" type="text" placeholder="Nombre (ej. Préstamo Coche)" value={loanData.name} onChange={handleChange} required />
      <Input name="entity" type="text" placeholder="Entidad (ej. Banco XYZ)" value={loanData.entity} onChange={handleChange} required />
      <Input name="initialAmount" type="number" placeholder="Monto inicial del préstamo (€)" value={loanData.initialAmount} onChange={handleChange} required min="0" />
      <Input name="interestRate" type="number" step="0.01" placeholder="Tasa de Interés Anual (TAE %)" value={loanData.interestRate} onChange={handleChange} required min="0" />
      <Input name="monthlyPayment" type="number" placeholder="Cuota mensual (€)" value={loanData.monthlyPayment} onChange={handleChange} required min="0" />
      <Input name="totalInstallments" type="number" placeholder="Número total de cuotas (meses)" value={loanData.totalInstallments} onChange={handleChange} required min="1" />
      <Input name="startDate" type="date" placeholder="Fecha de inicio" value={loanData.startDate} onChange={handleChange} required />
      <Button type="submit" disabled={loading}>
        {loading ? 'Añadiendo...' : 'Añadir Préstamo'}
      </Button>
    </Form>
  );
};

export default LoanForm;

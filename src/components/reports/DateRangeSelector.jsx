import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import styled from 'styled-components';
import { es } from 'date-fns/locale';

registerLocale('es', es);

const SelectorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    display: inline-block;
  }
  .react-datepicker__input-container input {
    padding: 0.8rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    text-align: center;
    font-size: 1rem;
    width: 150px;
    transition: border-color 0.2s;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }
`;

const ClearButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5a6268;
  }
`;

const DateRangeSelector = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <SelectorContainer>
      <DatePickerWrapper>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Fecha de inicio"
          locale="es"
          isClearable
        />
      </DatePickerWrapper>
      <span style={{color: '#6c757d'}}>-</span>
      <DatePickerWrapper>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Fecha de fin"
          locale="es"
          isClearable
        />
      </DatePickerWrapper>
      <ClearButton onClick={handleClear}>Limpiar Filtro</ClearButton>
    </SelectorContainer>
  );
};

export default DateRangeSelector;

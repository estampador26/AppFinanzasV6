import React from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

const SelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    display: inline-block;
  }
  .react-datepicker__input-container input {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    text-align: center;
  }
`;

const DateRangeSelector = ({ startDate, setStartDate, endDate, setEndDate }) => {
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
        />
      </DatePickerWrapper>
      <span>-</span>
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
        />
      </DatePickerWrapper>
    </SelectorContainer>
  );
};

export default DateRangeSelector;

import styled from 'styled-components';
import { Link } from 'react-router-dom';

// General Layout
export const PageContainer = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
`;

// Card for lists
export const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

// Form Elements
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const Button = styled.button`
  padding: 0.8rem 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Error message
export const Error = styled.p`
  color: #d9534f;
  background-color: #f2dede;
  border-color: #ebccd1;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
  text-align: center;
`;

// Styled Link
export const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

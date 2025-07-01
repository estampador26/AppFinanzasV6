import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { PageContainer, Title, Form, Input, Button, Error, StyledLink } from '../styles/StyledComponents';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error("Firebase Error Code:", err.code);
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No se encontró ningún usuario con este correo electrónico.');
          break;
        case 'auth/wrong-password':
          setError('La contraseña es incorrecta. Por favor, inténtalo de nuevo.');
          break;
        case 'auth/invalid-email':
          setError('El formato del correo electrónico no es válido.');
          break;
        default:
          setError('Error al iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.');
          break;
      }
    }
  };

  return (
    <PageContainer>
      <Title>Iniciar Sesión</Title>
      {error && <Error>{error}</Error>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Iniciar Sesión</Button>
      </Form>
      <p>¿No tienes una cuenta? <StyledLink to="/register">Regístrate</StyledLink></p>
    </PageContainer>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Title, Form, Input, Button, Error, StyledLink } from '../styles/StyledComponents';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Las contraseñas no coinciden');
    }
    setError('');
    try {
      await signup(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error("Firebase Error Code:", err.code);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Este correo electrónico ya está registrado. Por favor, inicia sesión.');
          break;
        case 'auth/invalid-email':
          setError('El formato del correo electrónico no es válido.');
          break;
        case 'auth/weak-password':
          setError('La contraseña es demasiado débil. Debe tener al menos 6 caracteres.');
          break;
        default:
          setError('Error al crear la cuenta. Por favor, inténtalo de nuevo.');
          break;
      }
    }
  };

  return (
    <Container>
      <Title>Crear Cuenta</Title>
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
          placeholder="Contraseña (mín. 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit">Registrarse</Button>
      </Form>
      <p>¿Ya tienes una cuenta? <StyledLink to="/login">Inicia Sesión</StyledLink></p>
    </Container>
  );
};

export default RegisterPage;

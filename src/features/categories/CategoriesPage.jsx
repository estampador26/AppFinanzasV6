import React from 'react';
import { Link } from 'react-router-dom';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { PageContainer, Title, Card } from '../../styles/StyledComponents';

const CategoriesPage = () => {
  return (
    <PageContainer>
      <Link to="/dashboard" style={{ marginBottom: '2rem', display: 'inline-block' }}>{'< Volver al Dashboard'}</Link>
      <Title>Gestión de Categorías</Title>
      <Card>
        <CategoryForm />
      </Card>
      <Card>
        <CategoryList />
      </Card>
    </PageContainer>
  );
};

export default CategoriesPage;

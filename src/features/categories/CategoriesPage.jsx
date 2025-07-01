import React from 'react';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { PageContainer, Title } from '../../styles/StyledComponents';

const CategoriesPage = () => {
  return (
    <PageContainer>
      <Title>Gestión de Categorías</Title>
      <CategoryForm />
      <CategoryList />
    </PageContainer>
  );
};

export default CategoriesPage;

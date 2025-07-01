import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import SubscriptionsPage from './pages/SubscriptionsPage';
import LoansPage from './pages/LoansPage';
import CreditCardsPage from './components/CreditCard/CreditCardsPage';
import FinancedPurchasesPage from './features/financedPurchases/FinancedPurchasesPage';
import BudgetsPage from './features/budgets/BudgetsPage';
import SavingsGoalsPage from './features/savings/SavingsGoalsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './contexts/AuthContext';
import './App.css';

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <nav>
        {!currentUser && <Link to="/login">Login</Link>}
        {!currentUser && <Link to="/register" style={{ marginLeft: '10px' }}>Register</Link>}
      </nav>
      <Routes>
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route 
          path="/subscriptions" 
          element={
            <PrivateRoute>
              <SubscriptionsPage />
            </PrivateRoute>
          }
        />
        <Route 
          path="/loans" 
          element={
            <PrivateRoute>
              <LoansPage />
            </PrivateRoute>
          }
        />
        <Route 
          path="/credit-cards" 
          element={
            <PrivateRoute>
              <CreditCardsPage />
            </PrivateRoute>
          }
        />
        <Route 
          path="/financed-purchases" 
          element={
            <PrivateRoute>
              <FinancedPurchasesPage />
            </PrivateRoute>
          }
        />
        <Route 
          path="/budgets" 
          element={
            <PrivateRoute>
              <BudgetsPage />
            </PrivateRoute>
          }
        />
        <Route 
          path="/savings-goals" 
          element={
            <PrivateRoute>
              <SavingsGoalsPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;

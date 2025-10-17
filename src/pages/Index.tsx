import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      navigate('/dashboard');
    }
  }, [auth.isAuthenticated, auth.user, navigate]);

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (auth.isAuthenticated) {
    return null; // Will be redirected by useEffect
  }

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default Index;

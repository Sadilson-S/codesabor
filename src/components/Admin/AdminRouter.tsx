import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';

interface AdminRouterProps {
  onBack: () => void;
}

const AdminRouter: React.FC<AdminRouterProps> = ({ onBack }) => {
  const { user } = useAuth();

  return user ? <AdminDashboard /> : <LoginPage onBack={onBack} />;
};

export default AdminRouter;

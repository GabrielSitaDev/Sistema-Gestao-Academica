import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';
import { TeacherDashboard } from '@/components/dashboard/TeacherDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { DeveloperDashboard } from '@/components/dashboard/DeveloperDashboard';

const Dashboard: React.FC = () => {
  const { auth } = useAuth();

  if (!auth.user) {
    return null;
  }

  const renderDashboard = () => {
    switch (auth.user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'developer':
        return <DeveloperDashboard />;
      default:
        return <div>Tipo de usuário não reconhecido</div>;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
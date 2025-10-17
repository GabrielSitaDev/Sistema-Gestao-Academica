import { useState, useEffect, createContext, useContext } from 'react';
import { User, UserRole, LoginCredentials, AuthState } from '@/types/auth';

const AuthContext = createContext<{
  auth: AuthState;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
} | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: null,
  });

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setAuth({
          user,
          isAuthenticated: true,
          isLoading: false,
          token,
        });
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        setAuth(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuth(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuth(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on credentials
      const mockUser: User = {
        id: generateUserId(credentials.userType),
        name: getMockUserName(credentials.userType, credentials.identifier),
        email: `${credentials.identifier}@escola.edu.br`,
        role: credentials.userType,
        unitId: credentials.unitId,
        unitName: getUnitName(credentials.unitId),
        avatar: `/avatars/${credentials.userType}-default.png`,
        rm: credentials.userType === 'student' ? credentials.identifier : undefined,
        course: credentials.userType === 'student' ? getMockCourse() : undefined,
        status: 'active',
        registrationDate: new Date().toISOString(),
      };

      const token = generateMockToken();
      
      // Store auth data
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      
      setAuth({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        token,
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setAuth(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setAuth({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
    });
  };

  return {
    auth,
    login,
    logout,
    isLoading: auth.isLoading,
  };
};

// Helper functions for mock data
const generateUserId = (role: UserRole): string => {
  const prefixes = { student: 'STU', teacher: 'TEA', admin: 'ADM', developer: 'DEV' };
  return `${prefixes[role]}${Date.now().toString().slice(-6)}`;
};

const getMockUserName = (role: UserRole, identifier: string): string => {
  const names = {
    student: ['Ana Silva', 'Carlos Santos', 'Maria Oliveira', 'João Ferreira'],
    teacher: ['Prof. Roberto Lima', 'Prof. Patricia Costa', 'Prof. Daniel Rocha'],
    admin: ['Coordenador Silva', 'Diretora Santos', 'Secretário Oliveira'],
    developer: ['Dev Master', 'System Admin', 'Tech Lead']
  };
  return names[role][Math.floor(Math.random() * names[role].length)];
};

const getUnitName = (unitId: string): string => {
  const units: { [key: string]: string } = {
    '001': 'Escola Estadual Central',
    '002': 'Colégio Municipal Norte',
    '003': 'Instituto Educacional Sul',
    '004': 'Campus Universitário Leste'
  };
  return units[unitId] || 'Unidade Escolar';
};

const getMockCourse = (): string => {
  const courses = [
    '3º Ano - Ensino Médio',
    '2º Ano - Ensino Médio', 
    '1º Ano - Ensino Médio',
    '9º Ano - Ensino Fundamental',
    '8º Ano - Ensino Fundamental'
  ];
  return courses[Math.floor(Math.random() * courses.length)];
};

const generateMockToken = (): string => {
  return `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export { AuthContext };
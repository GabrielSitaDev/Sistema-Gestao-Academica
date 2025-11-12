export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  unitId: string;
  unitName: string;
  avatar?: string;
  rm?: string; // Registro de matrícula para alunos
  course?: string; // Curso/série para alunos
  status?: 'active' | 'inactive' | 'suspended';
  registrationDate?: string;
  biometricId?: string;
}

export type UserRole = 'student' | 'teacher' | 'coordinator' | 'secretary' | 'director' | 'developer';

export interface LoginCredentials {
  identifier: string; // RM para aluno, ID para outros
  password: string;
  unitId: string;
  userType: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresIn: number;
}
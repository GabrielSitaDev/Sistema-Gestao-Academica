import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiService {
  private api: AxiosInstance;
  
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    this.setupInterceptors();
  }
  
  private setupInterceptors() {
    // Request interceptor - attach token
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor - handle 401 and refresh token
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            // Tenta refresh do token
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
              const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                refreshToken,
              });
              
              const { token } = response.data;
              localStorage.setItem('auth_token', token);
              
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            // Se refresh falhar, limpa tokens e redireciona para login
            localStorage.removeItem('auth_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_data');
            window.location.href = '/';
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }
  
  // Auth endpoints
  async login(identifier: string, password: string, unitId: string, userType: string) {
    const response = await this.api.post('/auth/login', {
      identifier,
      password,
      unitId,
      userType,
    });
    return response.data;
  }
  
  async logout() {
    const response = await this.api.post('/auth/logout');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    return response.data;
  }
  
  async getCurrentUser() {
    const response = await this.api.get('/user/me');
    return response.data;
  }
  
  // Student endpoints
  async getStudent(id: string) {
    const response = await this.api.get(`/student/${id}`);
    return response.data;
  }
  
  async getStudentAttendance(id: string) {
    const response = await this.api.get(`/student/${id}/attendance`);
    return response.data;
  }
  
  async getStudentActivities(id: string) {
    const response = await this.api.get(`/student/${id}/activities`);
    return response.data;
  }
  
  async getStudentGrades(studentId: string) {
    const response = await this.api.get('/grades', { params: { studentId } });
    return response.data;
  }
  
  // Teacher endpoints
  async getTeacherClasses(id: string) {
    const response = await this.api.get(`/teacher/${id}/classes`);
    return response.data;
  }
  
  async submitGrades(grades: any[]) {
    const response = await this.api.post('/grades/bulk', { grades });
    return response.data;
  }
  
  async submitAttendance(attendance: any[]) {
    const response = await this.api.post('/attendance/bulk', { attendance });
    return response.data;
  }
  
  // Generic GET
  get<T = any>(url: string, config?: any) {
    return this.api.get<T>(url, config);
  }
  
  // Generic POST
  post<T = any>(url: string, data?: any, config?: any) {
    return this.api.post<T>(url, data, config);
  }
  
  // Generic PUT
  put<T = any>(url: string, data?: any, config?: any) {
    return this.api.put<T>(url, data, config);
  }
  
  // Generic DELETE
  delete<T = any>(url: string, config?: any) {
    return this.api.delete<T>(url, config);
  }
}

export const apiService = new ApiService();
export default apiService;

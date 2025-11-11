import apiService from './api';

interface BiometricEnrollmentResult {
  success: boolean;
  biometricId: string;
  message: string;
}

interface BiometricVerificationResult {
  success: boolean;
  studentId?: string;
  studentName?: string;
  confidence: number;
  message: string;
}

class BiometricsService {
  /**
   * Cadastra impressão digital de um aluno
   * Em produção, conecta com dispositivo biométrico (ESP32)
   */
  async enrollFingerprint(studentId: string, studentName: string): Promise<BiometricEnrollmentResult> {
    try {
      const response = await apiService.post('/biometrics/enroll', {
        studentId,
        studentName,
        timestamp: new Date().toISOString(),
      });
      
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Erro ao cadastrar impressão digital. Verifique o dispositivo biométrico.'
      );
    }
  }
  
  /**
   * Verifica impressão digital para registro de presença
   * Em produção, conecta com leitor biométrico
   */
  async verifyFingerprint(): Promise<BiometricVerificationResult> {
    try {
      const response = await apiService.post('/biometrics/verify', {
        timestamp: new Date().toISOString(),
      });
      
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Erro ao verificar impressão digital. Tente novamente.'
      );
    }
  }
  
  /**
   * Remove cadastro biométrico de um aluno
   */
  async deleteBiometric(studentId: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiService.delete(`/biometrics/${studentId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Erro ao remover dados biométricos.'
      );
    }
  }
  
  /**
   * Lista todos os alunos com biometria cadastrada
   */
  async listEnrolledStudents(): Promise<any[]> {
    try {
      const response = await apiService.get('/biometrics/enrolled');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Erro ao listar alunos cadastrados.'
      );
    }
  }
  
  /**
   * Verifica status do dispositivo biométrico
   */
  async checkDeviceStatus(): Promise<{ connected: boolean; model?: string; message: string }> {
    try {
      const response = await apiService.get('/biometrics/device/status');
      return response.data;
    } catch (error: any) {
      return {
        connected: false,
        message: 'Dispositivo biométrico não conectado',
      };
    }
  }
}

export const biometricsService = new BiometricsService();
export default biometricsService;

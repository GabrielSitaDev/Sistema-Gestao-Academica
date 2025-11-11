import { createClient, SupabaseClient } from '@supabase/supabase-js';
import apiService from './api';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

class StorageService {
  private supabase: SupabaseClient | null = null;
  
  constructor() {
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
  }
  
  /**
   * Upload de arquivo - usa Supabase se configurado, senão usa endpoint mock
   */
  async uploadFile(
    file: File,
    bucket: string = 'uploads',
    path?: string
  ): Promise<{ path: string; signedUrl: string }> {
    if (this.supabase) {
      return this.uploadToSupabase(file, bucket, path);
    } else {
      return this.uploadToMockApi(file);
    }
  }
  
  /**
   * Upload usando Supabase Storage
   */
  private async uploadToSupabase(
    file: File,
    bucket: string,
    path?: string
  ): Promise<{ path: string; signedUrl: string }> {
    const fileName = path || `${Date.now()}-${file.name}`;
    
    const { data, error } = await this.supabase!.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
    
    if (error) {
      throw new Error(`Erro ao fazer upload: ${error.message}`);
    }
    
    // Obter URL pública ou assinada
    const { data: urlData } = this.supabase!.storage
      .from(bucket)
      .getPublicUrl(data.path);
    
    return {
      path: data.path,
      signedUrl: urlData.publicUrl,
    };
  }
  
  /**
   * Upload usando API mock
   */
  private async uploadToMockApi(file: File): Promise<{ path: string; signedUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiService.post('/storage/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }
  
  /**
   * Download de arquivo
   */
  async downloadFile(bucket: string, path: string): Promise<Blob> {
    if (this.supabase) {
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .download(path);
      
      if (error) {
        throw new Error(`Erro ao fazer download: ${error.message}`);
      }
      
      return data;
    } else {
      const response = await apiService.get(`/storage/download/${path}`, {
        responseType: 'blob',
      });
      return response.data;
    }
  }
  
  /**
   * Deletar arquivo
   */
  async deleteFile(bucket: string, path: string): Promise<void> {
    if (this.supabase) {
      const { error } = await this.supabase.storage
        .from(bucket)
        .remove([path]);
      
      if (error) {
        throw new Error(`Erro ao deletar arquivo: ${error.message}`);
      }
    } else {
      await apiService.delete(`/storage/${path}`);
    }
  }
  
  /**
   * Listar arquivos em um bucket/pasta
   */
  async listFiles(bucket: string, path?: string): Promise<any[]> {
    if (this.supabase) {
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .list(path);
      
      if (error) {
        throw new Error(`Erro ao listar arquivos: ${error.message}`);
      }
      
      return data || [];
    } else {
      const response = await apiService.get('/storage/list', {
        params: { bucket, path },
      });
      return response.data;
    }
  }
}

export const storageService = new StorageService();
export default storageService;

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Camera, Upload, Download, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import apiService from '@/services/api';
import storageService from '@/services/storage.service';

interface StudentData {
  id: string;
  name: string;
  rm: string;
  email: string;
  course: string;
  avatar?: string;
  age: number;
  enrollmentDate: string;
  status: 'active' | 'inactive';
  address?: string;
  phone?: string;
  guardianName?: string;
  guardianPhone?: string;
}

export const StudentProfile: React.FC = () => {
  const { auth } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      setLoading(true);
      const response = await apiService.get(`/student/${auth.user?.id}`);
      setStudent(response.data);
    } catch (error) {
      toast({
        title: 'Erro ao carregar dados',
        description: 'Não foi possível carregar os dados do perfil.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo e tamanho
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Arquivo inválido',
        description: 'Por favor, selecione uma imagem.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Arquivo muito grande',
        description: 'A imagem deve ter no máximo 5MB.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setUploading(true);
      const result = await storageService.uploadFile(file, 'avatars');
      
      // Atualizar foto no backend
      await apiService.put(`/student/${auth.user?.id}`, {
        avatar: result.signedUrl,
      });

      setStudent(prev => prev ? { ...prev, avatar: result.signedUrl } : null);

      toast({
        title: 'Foto atualizada',
        description: 'Sua foto 3x4 foi atualizada com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao fazer upload',
        description: 'Não foi possível atualizar a foto.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadProfile = () => {
    toast({
      title: 'Download iniciado',
      description: 'O perfil completo será baixado em PDF.',
    });
    // Implementar download PDF
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-muted-foreground">Carregando perfil...</div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-muted-foreground">Perfil não encontrado</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Meu Perfil</h1>
        <p className="text-muted-foreground">Visualize e edite suas informações</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Foto 3x4 */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Foto 3x4</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-[3/4] relative rounded-lg overflow-hidden border-2 border-border bg-muted flex items-center justify-center">
              {student.avatar ? (
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="h-12 w-12 text-muted-foreground" />
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="h-4 w-4" />
              {uploading ? 'Enviando...' : 'Carregar Foto'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Formato 3x4, máximo 5MB
            </p>
          </CardContent>
        </Card>

        {/* Dados pessoais */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Dados Pessoais</CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Editar
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nome Completo</label>
                <p className="text-base font-medium mt-1">{student.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">RM</label>
                <p className="text-base font-mono font-medium mt-1">{student.rm}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Idade</label>
                <p className="text-base font-medium mt-1">{student.age} anos</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="mt-1">
                  <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                    {student.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-base font-medium mt-1">{student.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Curso</label>
                <p className="text-base font-medium mt-1">{student.course}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                <p className="text-base font-medium mt-1">{student.phone || 'Não informado'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Data de Matrícula</label>
                <p className="text-base font-medium mt-1">
                  {new Date(student.enrollmentDate).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            {student.address && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Endereço</label>
                  <p className="text-base font-medium mt-1">{student.address}</p>
                </div>
              </>
            )}

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Responsável</label>
                <p className="text-base font-medium mt-1">{student.guardianName || 'Não informado'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Telefone do Responsável</label>
                <p className="text-base font-medium mt-1">{student.guardianPhone || 'Não informado'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Ações</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button variant="outline" className="gap-2" onClick={handleDownloadProfile}>
            <Download className="h-4 w-4" />
            Baixar Perfil Completo (PDF)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

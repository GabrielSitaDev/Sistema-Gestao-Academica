import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { Camera, Save, Lock, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const UserProfile: React.FC = () => {
  const { auth } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!auth.user) return null;

  const handleSave = () => {
    toast.success('Perfil atualizado com sucesso!');
    setIsEditing(false);
  };

  const handlePhotoUpload = () => {
    toast.info('Funcionalidade de upload em desenvolvimento');
  };

  const getUserRoleLabel = () => {
    const labels = {
      student: 'Aluno',
      teacher: 'Professor',
      coordinator: 'Coordenador',
      secretary: 'Secretaria',
      director: 'Diretor',
      developer: 'Desenvolvedor',
    };
    return labels[auth.user?.role as keyof typeof labels] || 'Usuário';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e configurações de conta
          </p>
        </div>

        {/* Profile Card */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Dados cadastrais e foto de perfil</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Photo Section */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                    {auth.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full"
                  onClick={handlePhotoUpload}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{auth.user.name}</h3>
                <p className="text-muted-foreground">{auth.user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{getUserRoleLabel()}</Badge>
                  {auth.user.rm && (
                    <Badge variant="outline">RM: {auth.user.rm}</Badge>
                  )}
                  <Badge className="bg-success/10 text-success">Ativo</Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Personal Info Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  defaultValue={auth.user.name}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="inline h-4 w-4 mr-1" />
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={auth.user.email}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  defaultValue="(11) 98765-4321"
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthdate">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Data de Nascimento
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  defaultValue="2005-03-15"
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Endereço
                </Label>
                <Input
                  id="address"
                  defaultValue="Rua Exemplo, 123 - São Paulo, SP"
                  disabled={!isEditing}
                />
              </div>

              {auth.user.rm && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="rm">Registro de Matrícula (RM)</Label>
                    <Input
                      id="rm"
                      defaultValue={auth.user.rm}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course">Curso/Série</Label>
                    <Input
                      id="course"
                      defaultValue={auth.user.course}
                      disabled
                    />
                  </div>
                </>
              )}

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="unit">Unidade</Label>
                <Input
                  id="unit"
                  defaultValue={auth.user.unitName}
                  disabled
                />
              </div>
            </div>

            <div className="flex gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  Editar Perfil
                </Button>
              ) : (
                <>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Segurança
            </CardTitle>
            <CardDescription>Altere sua senha e gerencie a segurança da conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button variant="outline">
              <Lock className="mr-2 h-4 w-4" />
              Alterar Senha
            </Button>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Histórico de acessos e ações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">Login realizado</p>
                  <p className="text-xs text-muted-foreground">Hoje às 08:30</p>
                </div>
                <Badge variant="outline">Web</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">Perfil atualizado</p>
                  <p className="text-xs text-muted-foreground">Ontem às 14:20</p>
                </div>
                <Badge variant="outline">Web</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">Senha alterada</p>
                  <p className="text-xs text-muted-foreground">3 dias atrás</p>
                </div>
                <Badge variant="outline">Web</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
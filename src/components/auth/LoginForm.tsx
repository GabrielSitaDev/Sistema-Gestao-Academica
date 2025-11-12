import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserRole, LoginCredentials } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, School, GraduationCap, Users, Settings, Briefcase, Crown } from 'lucide-react';
import logo from '@/assets/logo.png';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    identifier: '',
    password: '',
    unitId: '',
    userType: 'student'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!credentials.identifier || !credentials.password || !credentials.unitId) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    const success = await login(credentials);
    if (success) {
      onLoginSuccess();
    } else {
      setError('Credenciais inválidas. Verifique seus dados e tente novamente.');
    }
  };

  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const userTypeConfig = {
    student: {
      icon: GraduationCap,
      title: 'Acesso do Aluno',
      description: 'Entre com seu RM, senha e unidade escolar',
      identifierLabel: 'Registro de Matrícula (RM)',
      identifierPlaceholder: 'Digite seu RM'
    },
    teacher: {
      icon: Users,
      title: 'Acesso do Professor',
      description: 'Entre com seu identificador e senha',
      identifierLabel: 'Identificador do Professor',
      identifierPlaceholder: 'Digite seu identificador'
    },
    coordinator: {
      icon: Briefcase,
      title: 'Acesso da Coordenação',
      description: 'Painel de coordenação pedagógica',
      identifierLabel: 'Identificador do Coordenador',
      identifierPlaceholder: 'Digite seu identificador'
    },
    secretary: {
      icon: School,
      title: 'Acesso da Secretaria',
      description: 'Painel administrativo da secretaria',
      identifierLabel: 'Identificador da Secretaria',
      identifierPlaceholder: 'Digite seu identificador'
    },
    director: {
      icon: Crown,
      title: 'Acesso da Direção',
      description: 'Painel executivo da direção',
      identifierLabel: 'Identificador do Diretor',
      identifierPlaceholder: 'Digite seu identificador'
    },
    developer: {
      icon: Settings,
      title: 'Acesso do Desenvolvedor',
      description: 'Painel de desenvolvimento e sistema',
      identifierLabel: 'Identificador do Desenvolvedor',
      identifierPlaceholder: 'Digite seu identificador'
    }
  };

  const config = userTypeConfig[credentials.userType];
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="h-16 w-16 mx-auto mb-4 animate-scale-in" />
          <h1 className="text-3xl font-bold text-white mb-2">Sistema Acadêmico</h1>
          <p className="text-white/90">Gestão Escolar Integrada</p>
        </div>

        <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <IconComponent className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl">{config.title}</CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={credentials.userType} onValueChange={(value) => handleInputChange('userType', value as UserRole)}>
              <TabsList className="grid w-full grid-cols-6 mb-6">
                <TabsTrigger value="student" className="text-xs">Aluno</TabsTrigger>
                <TabsTrigger value="teacher" className="text-xs">Professor</TabsTrigger>
                <TabsTrigger value="coordinator" className="text-xs">Coordenação</TabsTrigger>
                <TabsTrigger value="secretary" className="text-xs">Secretaria</TabsTrigger>
                <TabsTrigger value="director" className="text-xs">Direção</TabsTrigger>
                <TabsTrigger value="developer" className="text-xs">Dev</TabsTrigger>
              </TabsList>

              <TabsContent value={credentials.userType}>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="identifier">{config.identifierLabel}</Label>
                    <Input
                      id="identifier"
                      placeholder={config.identifierPlaceholder}
                      value={credentials.identifier}
                      onChange={(e) => handleInputChange('identifier', e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Digite sua senha"
                      value={credentials.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unidade Escolar</Label>
                    <Select 
                      value={credentials.unitId} 
                      onValueChange={(value) => handleInputChange('unitId', value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a unidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="001">Escola Estadual Central (001)</SelectItem>
                        <SelectItem value="002">Colégio Municipal Norte (002)</SelectItem>
                        <SelectItem value="003">Instituto Educacional Sul (003)</SelectItem>
                        <SelectItem value="004">Campus Universitário Leste (004)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      'Entrar no Sistema'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Esqueceu sua senha? <span className="text-primary cursor-pointer hover:underline">Clique aqui</span></p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-white/80 text-sm">
          <p>© 2024 Sistema Acadêmico - Gestão Escolar Integrada</p>
        </div>
      </div>
    </div>
  );
};
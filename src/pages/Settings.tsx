import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  Lock,
  Eye,
  Mail,
  MessageSquare,
  Smartphone
} from 'lucide-react';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    grades: true,
    attendance: true,
    activities: true,
    messages: true,
  });

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    toast.success(!darkMode ? 'Tema escuro ativado' : 'Tema claro ativado');
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof notifications] }));
    toast.success('Preferência de notificação atualizada');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">
            Personalize sua experiência e gerencie preferências do sistema
          </p>
        </div>

        {/* Appearance */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              Aparência
            </CardTitle>
            <CardDescription>Personalize o tema e a interface visual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Modo Escuro</Label>
                <p className="text-sm text-muted-foreground">
                  Ative para reduzir o brilho da tela
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Tema de Cores</Label>
              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" className="h-12 bg-blue-500/10 border-blue-500">
                  Azul
                </Button>
                <Button variant="outline" className="h-12">
                  Verde
                </Button>
                <Button variant="outline" className="h-12">
                  Roxo
                </Button>
                <Button variant="outline" className="h-12">
                  Vermelho
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
            <CardDescription>Gerencie como você recebe notificações</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Notification Channels */}
            <div>
              <h4 className="font-medium mb-3">Canais de Notificação</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label htmlFor="email-notif">E-mail</Label>
                      <p className="text-sm text-muted-foreground">Receber notificações por e-mail</p>
                    </div>
                  </div>
                  <Switch
                    id="email-notif"
                    checked={notifications.email}
                    onCheckedChange={() => handleNotificationToggle('email')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label htmlFor="push-notif">Push (Navegador)</Label>
                      <p className="text-sm text-muted-foreground">Notificações no navegador</p>
                    </div>
                  </div>
                  <Switch
                    id="push-notif"
                    checked={notifications.push}
                    onCheckedChange={() => handleNotificationToggle('push')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label htmlFor="sms-notif">SMS</Label>
                      <p className="text-sm text-muted-foreground">Receber SMS importantes</p>
                    </div>
                  </div>
                  <Switch
                    id="sms-notif"
                    checked={notifications.sms}
                    onCheckedChange={() => handleNotificationToggle('sms')}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Notification Types */}
            <div>
              <h4 className="font-medium mb-3">Tipos de Notificação</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="grades-notif">Notas e Boletins</Label>
                  <Switch
                    id="grades-notif"
                    checked={notifications.grades}
                    onCheckedChange={() => handleNotificationToggle('grades')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="attendance-notif">Frequência e Faltas</Label>
                  <Switch
                    id="attendance-notif"
                    checked={notifications.attendance}
                    onCheckedChange={() => handleNotificationToggle('attendance')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="activities-notif">Trabalhos e Atividades</Label>
                  <Switch
                    id="activities-notif"
                    checked={notifications.activities}
                    onCheckedChange={() => handleNotificationToggle('activities')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="messages-notif">Mensagens</Label>
                  <Switch
                    id="messages-notif"
                    checked={notifications.messages}
                    onCheckedChange={() => handleNotificationToggle('messages')}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Privacidade e Segurança
            </CardTitle>
            <CardDescription>Controle quem pode ver suas informações</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="profile-visibility">Perfil Público</Label>
                <p className="text-sm text-muted-foreground">
                  Permitir que outros usuários vejam seu perfil
                </p>
              </div>
              <Switch id="profile-visibility" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-email">Mostrar E-mail</Label>
                <p className="text-sm text-muted-foreground">
                  Tornar seu e-mail visível para outros
                </p>
              </div>
              <Switch id="show-email" />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="activity-status">Status de Atividade</Label>
                <p className="text-sm text-muted-foreground">
                  Mostrar quando você está online
                </p>
              </div>
              <Switch id="activity-status" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Idioma e Região
            </CardTitle>
            <CardDescription>Preferências de idioma e localização</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Idioma do Sistema</Label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Português (BR)
                  <Badge className="ml-2" variant="secondary">Ativo</Badge>
                </Button>
                <Button variant="outline" className="flex-1" disabled>
                  English
                </Button>
                <Button variant="outline" className="flex-1" disabled>
                  Español
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Fuso Horário</Label>
              <Button variant="outline" className="w-full justify-start">
                (GMT-3) Brasília, São Paulo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-2">
          <Button variant="outline">Resetar Padrões</Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            Salvar Configurações
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
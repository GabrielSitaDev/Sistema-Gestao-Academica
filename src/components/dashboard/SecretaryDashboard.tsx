import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { 
  Users, 
  UserPlus, 
  FileText, 
  Download, 
  Upload,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const SecretaryDashboard: React.FC = () => {
  const { auth } = useAuth();

  if (!auth.user) return null;

  // Mock data
  const enrollmentData = [
    { month: 'Jan', enrolled: 45, transferred: 5 },
    { month: 'Fev', enrolled: 38, transferred: 3 },
    { month: 'Mar', enrolled: 52, transferred: 7 },
    { month: 'Abr', enrolled: 41, transferred: 4 },
    { month: 'Mai', enrolled: 35, transferred: 2 },
  ];

  const stats = {
    totalStudents: 1248,
    activeEnrollments: 1205,
    pendingEnrollments: 15,
    recentTransfers: 28,
    documentsToVerify: 7,
    activeTeachers: 86,
  };

  const recentActivities = [
    { type: 'enrollment', student: 'Ana Paula Silva', action: 'Matrícula confirmada', time: '2h atrás', status: 'success' },
    { type: 'transfer', student: 'Carlos Eduardo', action: 'Transferência solicitada', time: '4h atrás', status: 'pending' },
    { type: 'document', student: 'Maria Santos', action: 'Documentos enviados', time: '1 dia atrás', status: 'pending' },
    { type: 'update', student: 'João Pedro', action: 'Dados atualizados', time: '2 dias atrás', status: 'success' },
  ];

  const pendingTasks = [
    { description: 'Verificar documentos de novos alunos', count: 7, urgent: true },
    { description: 'Processar transferências pendentes', count: 3, urgent: true },
    { description: 'Atualizar cadastros desatualizados', count: 12, urgent: false },
    { description: 'Emitir declarações solicitadas', count: 5, urgent: false },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Painel da Secretaria</h1>
          <p className="text-muted-foreground">
            Gerencie matrículas, cadastros e documentação escolar
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Dados
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Cadastro
          </Button>
        </div>
      </div>

      {/* Quick Search */}
      <Card className="border-0 shadow-md">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome, RM ou CPF do aluno..." 
                className="pl-10"
              />
            </div>
            <Button>Buscar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">{stats.activeEnrollments} matrículas ativas</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matrículas Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pendingEnrollments}</div>
            <p className="text-xs text-muted-foreground">Aguardando processamento</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transferências (Mês)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentTransfers}</div>
            <p className="text-xs text-muted-foreground">Entradas e saídas</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos Pendentes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.documentsToVerify}</div>
            <p className="text-xs text-muted-foreground">Para verificação</p>
          </CardContent>
        </Card>
      </div>

      {/* Enrollment Trend Chart */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Evolução de Matrículas e Transferências
          </CardTitle>
          <CardDescription>Últimos 5 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="enrolled" fill="hsl(var(--primary))" name="Matrículas" radius={[8, 8, 0, 0]} />
              <Bar dataKey="transferred" fill="hsl(var(--warning))" name="Transferências" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activities & Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimas movimentações de cadastro</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="mt-1">
                  {activity.status === 'success' && <CheckCircle className="h-4 w-4 text-success" />}
                  {activity.status === 'pending' && <Clock className="h-4 w-4 text-warning" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.student}</p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
                <Badge 
                  variant={activity.status === 'success' ? 'default' : 'secondary'}
                  className={activity.status === 'success' ? 'bg-success/10 text-success' : ''}
                >
                  {activity.status === 'success' ? 'Concluído' : 'Pendente'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Tarefas Pendentes</CardTitle>
            <CardDescription>Ações que requerem atenção</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div>
                  {task.urgent ? (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  ) : (
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{task.description}</p>
                  <p className="text-xs text-muted-foreground">{task.count} itens</p>
                </div>
                <div className="flex gap-2">
                  {task.urgent && (
                    <Badge variant="destructive" className="text-xs">Urgente</Badge>
                  )}
                  <Button size="sm" variant="outline">Ver</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Acesse rapidamente as funcionalidades mais usadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <UserPlus className="h-6 w-6" />
              <span className="text-sm">Cadastrar Aluno</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Upload className="h-6 w-6" />
              <span className="text-sm">Upload Documentos</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Emitir Relatório</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Transferências</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { 
  Users, 
  GraduationCap, 
  School, 
  UserPlus, 
  BarChart3, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  MessageCircle,
  Settings,
  Shield,
  Clock,
  FileText
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { auth } = useAuth();

  if (!auth.user) return null;

  // Mock data - replace with API calls
  const mockData = {
    stats: {
      totalStudents: 1250,
      totalTeachers: 65,
      totalClasses: 42,
      pendingEnrollments: 8,
      systemAlerts: 3,
      attendance: 96,
      performance: 85
    },
    alerts: [
      { type: 'urgent', message: 'Sistema biométrico offline na Sala 205', time: '30 min atrás' },
      { type: 'warning', message: '15 alunos com frequência abaixo de 75%', time: '2h atrás' },
      { type: 'info', message: 'Backup do banco de dados concluído', time: '4h atrás' }
    ],
    recentActivities: [
      { description: 'Nova matrícula: Ana Silva - 3º Ano A', time: '1h atrás', type: 'enrollment' },
      { description: 'Professor João Santos adicionado ao sistema', time: '2h atrás', type: 'teacher' },
      { description: 'Relatório mensal de frequência gerado', time: '5h atrás', type: 'report' }
    ],
    performance: {
      byGrade: [
        { grade: '1º Ano', average: 8.2, students: 320 },
        { grade: '2º Ano', average: 7.9, students: 298 },
        { grade: '3º Ano', average: 8.5, students: 285 }
      ],
      topSubjects: [
        { subject: 'Matemática', average: 8.7, improvement: '+0.3' },
        { subject: 'Português', average: 8.4, improvement: '+0.1' },
        { subject: 'História', average: 8.1, improvement: '-0.2' }
      ]
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'text-destructive bg-destructive/10 border-destructive/30';
      case 'warning': return 'text-warning bg-warning/10 border-warning/30';
      case 'info': return 'text-primary bg-primary/10 border-primary/30';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Painel Administrativo</h1>
          <p className="text-muted-foreground">
            Gestão completa da unidade escolar {auth.user.unitName}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Relatórios
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <UserPlus className="mr-2 h-4 w-4" />
            Nova Matrícula
          </Button>
        </div>
      </div>

      {/* System Alerts */}
      {mockData.stats.systemAlerts > 0 && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Alertas do Sistema ({mockData.stats.systemAlerts})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockData.alerts.slice(0, 2).map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs opacity-70 mt-1">{alert.time}</p>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              Ver Todos os Alertas
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">+12 novos este mês</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Professores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">{mockData.stats.totalClasses} turmas ativas</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequência Geral</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{mockData.stats.attendance}%</div>
            <Progress value={mockData.stats.attendance} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desempenho Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockData.stats.performance}%</div>
            <p className="text-xs text-muted-foreground">+2% desde o último mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance by Grade */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Desempenho por Série
            </CardTitle>
            <CardDescription>Média geral de cada série</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.performance.byGrade.map((grade, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{grade.grade}</span>
                    <span className="text-sm text-muted-foreground">{grade.students} alunos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={grade.average * 10} className="flex-1" />
                    <Badge variant="secondary">{grade.average}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>Últimas ações administrativas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockData.recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="mt-1">
                  {activity.type === 'enrollment' && <UserPlus className="h-4 w-4 text-success" />}
                  {activity.type === 'teacher' && <Users className="h-4 w-4 text-primary" />}
                  {activity.type === 'report' && <FileText className="h-4 w-4 text-secondary" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              Ver Todas as Atividades
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Management Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Management */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Gestão de Alunos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Matrículas Pendentes</span>
              <Badge variant="warning">{mockData.stats.pendingEnrollments}</Badge>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <UserPlus className="mr-2 h-4 w-4" />
                Nova Matrícula
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Relatórios de Alunos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Teacher Management */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Gestão de Professores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Professores Ativos</span>
              <Badge variant="secondary">{mockData.stats.totalTeachers}</Badge>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Gerenciar Professores
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Horários e Turmas
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Management */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Status do Sistema</span>
              <Badge variant="success">Online</Badge>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="mr-2 h-4 w-4" />
                Mensagens em Massa
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
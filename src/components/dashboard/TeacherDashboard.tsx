import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { 
  Users, 
  ClipboardList, 
  BookOpen, 
  Award, 
  MessageCircle, 
  Calendar,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { auth } = useAuth();

  if (!auth.user) return null;

  // Mock data - replace with API calls
  const mockData = {
    classes: [
      { name: '3º A - Matemática', students: 32, nextClass: '08:00', room: 'Sala 101' },
      { name: '3º B - Matemática', students: 28, nextClass: '10:00', room: 'Sala 102' },
      { name: '2º A - Matemática', students: 30, nextClass: '14:00', room: 'Sala 101' },
    ],
    stats: {
      totalStudents: 90,
      pendingGrades: 15,
      assignmentsToReview: 8,
      recentMessages: 5,
      attendanceRate: 94
    },
    recentActivities: [
      { type: 'assignment', description: 'Trabalho de Geometria entregue por Ana Silva', time: '2h atrás' },
      { type: 'message', description: 'Mensagem de Carlos Santos sobre dúvidas', time: '4h atrás' },
      { type: 'grade', description: 'Notas lançadas para 3º A - Prova Bimestral', time: '1 dia atrás' },
    ],
    upcomingDeadlines: [
      { description: 'Lançar notas - Prova Bimestral 3º B', date: '2024-01-20', urgent: true },
      { description: 'Entregar relatório mensal', date: '2024-01-25', urgent: false },
      { description: 'Reunião pedagógica', date: '2024-01-28', urgent: false },
    ]
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard do Professor</h1>
          <p className="text-muted-foreground">
            Gerencie suas turmas, atividades e acompanhe o desempenho dos alunos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ClipboardList className="mr-2 h-4 w-4" />
            Lista de Chamada
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <BookOpen className="mr-2 h-4 w-4" />
            Nova Atividade
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Em {mockData.classes.length} turmas</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notas Pendentes</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{mockData.stats.pendingGrades}</div>
            <p className="text-xs text-muted-foreground">Para lançamento</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trabalhos para Revisar</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockData.stats.assignmentsToReview}</div>
            <p className="text-xs text-muted-foreground">Aguardando correção</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.recentMessages}</div>
            <p className="text-xs text-muted-foreground">Não lidas</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequência Média</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{mockData.stats.attendanceRate}%</div>
            <Progress value={mockData.stats.attendanceRate} className="mt-1" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Classes */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Minhas Turmas
            </CardTitle>
            <CardDescription>Turmas sob sua responsabilidade</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockData.classes.map((class_, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium">{class_.name}</h4>
                  <p className="text-sm text-muted-foreground">{class_.students} alunos • {class_.room}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{class_.nextClass}</Badge>
                  <Button size="sm" variant="ghost">
                    <ClipboardList className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              Ver Todas as Turmas
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>Últimas interações e atividades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockData.recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="mt-1">
                  {activity.type === 'assignment' && <BookOpen className="h-4 w-4 text-primary" />}
                  {activity.type === 'message' && <MessageCircle className="h-4 w-4 text-secondary" />}
                  {activity.type === 'grade' && <Award className="h-4 w-4 text-success" />}
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

      {/* Upcoming Deadlines & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Próximos Prazos
            </CardTitle>
            <CardDescription>Tarefas e compromissos importantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockData.upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div>
                  {deadline.urgent ? (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  ) : (
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{deadline.description}</p>
                  <p className="text-xs text-muted-foreground">{deadline.date}</p>
                </div>
                {deadline.urgent && (
                  <Badge variant="destructive" className="text-xs">Urgente</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesse rapidamente as funcionalidades mais usadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <ClipboardList className="h-6 w-6" />
                <span className="text-sm">Chamada</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BookOpen className="h-6 w-6" />
                <span className="text-sm">Atividades</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Award className="h-6 w-6" />
                <span className="text-sm">Notas</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <MessageCircle className="h-6 w-6" />
                <span className="text-sm">Mensagens</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
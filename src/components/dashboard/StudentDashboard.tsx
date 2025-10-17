import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { 
  Calendar, 
  Award, 
  Clock, 
  BookOpen, 
  FileText, 
  MessageCircle, 
  Download,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { auth } = useAuth();

  if (!auth.user) return null;

  // Mock data - replace with API calls
  const mockData = {
    grades: {
      current: 8.5,
      previousBimester: 7.8,
      subjects: [
        { name: 'Matemática', grade: 9.2, status: 'excellent' },
        { name: 'Português', grade: 8.7, status: 'good' },
        { name: 'História', grade: 7.5, status: 'average' },
        { name: 'Física', grade: 6.8, status: 'needs_attention' },
      ]
    },
    attendance: {
      percentage: 92,
      totalClasses: 120,
      absences: 10
    },
    assignments: {
      pending: 3,
      submitted: 15,
      graded: 12
    },
    nextClasses: [
      { subject: 'Matemática', time: '08:00', room: 'Sala 101' },
      { subject: 'Português', time: '09:00', room: 'Sala 203' },
      { subject: 'História', time: '10:00', room: 'Sala 105' },
    ],
    recentMessages: 2
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-success text-success-foreground';
      case 'good': return 'bg-primary text-primary-foreground';
      case 'average': return 'bg-warning text-warning-foreground';
      case 'needs_attention': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard do Aluno</h1>
          <p className="text-muted-foreground">
            Acompanhe seu desempenho acadêmico e atividades
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Download className="mr-2 h-4 w-4" />
          Declaração de Matrícula
        </Button>
      </div>

      {/* Student Info Card */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {auth.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{auth.user.name}</h3>
              <p className="text-muted-foreground">RM: {auth.user.rm}</p>
              <p className="text-muted-foreground">{auth.user.course}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-success/10 text-success">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Matrícula Ativa
                </Badge>
                <Badge variant="outline">{auth.user.unitName}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Average Grade */}
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockData.grades.current}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-success" />
              +{(mockData.grades.current - mockData.grades.previousBimester).toFixed(1)} desde o último bimestre
            </div>
          </CardContent>
        </Card>

        {/* Attendance */}
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequência</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.attendance.percentage}%</div>
            <Progress value={mockData.attendance.percentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {mockData.attendance.absences} faltas de {mockData.attendance.totalClasses} aulas
            </p>
          </CardContent>
        </Card>

        {/* Pending Assignments */}
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trabalhos Pendentes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{mockData.assignments.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockData.assignments.submitted} entregues • {mockData.assignments.graded} avaliados
            </p>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.recentMessages}</div>
            <p className="text-xs text-muted-foreground mt-1">Não lidas</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Aulas de Hoje
            </CardTitle>
            <CardDescription>Seu horário para hoje</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockData.nextClasses.map((class_, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{class_.subject}</p>
                  <p className="text-sm text-muted-foreground">{class_.room}</p>
                </div>
                <Badge variant="outline">{class_.time}</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              Ver Horário Completo
            </Button>
          </CardContent>
        </Card>

        {/* Grades by Subject */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Notas por Disciplina
            </CardTitle>
            <CardDescription>Desempenho atual por matéria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockData.grades.subjects.map((subject, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">{subject.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(subject.grade / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Badge 
                    variant="secondary" 
                    className={getStatusColor(subject.status)}
                  >
                    {subject.grade}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              Ver Boletim Completo
            </Button>
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
              <FileText className="h-6 w-6" />
              <span className="text-sm">Trabalhos</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Horários</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-sm">Materiais</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <MessageCircle className="h-6 w-6" />
              <span className="text-sm">Mensagens</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
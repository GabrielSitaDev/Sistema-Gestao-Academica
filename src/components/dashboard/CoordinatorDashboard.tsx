import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  Users, 
  TrendingUp, 
  Award, 
  Clock, 
  Calendar,
  FileText,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  BookOpen
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const CoordinatorDashboard: React.FC = () => {
  const { auth } = useAuth();

  if (!auth.user) return null;

  // Mock data
  const classPerformanceData = [
    { name: '3º A', average: 8.5, attendance: 95 },
    { name: '3º B', average: 7.8, attendance: 92 },
    { name: '3º C', average: 8.2, attendance: 88 },
    { name: '2º A', average: 7.5, attendance: 90 },
    { name: '2º B', average: 8.0, attendance: 94 },
    { name: '1º A', average: 7.2, attendance: 87 },
  ];

  const attendanceTrendData = [
    { month: 'Jan', rate: 92 },
    { month: 'Fev', rate: 90 },
    { month: 'Mar', rate: 93 },
    { month: 'Abr', rate: 91 },
    { month: 'Mai', rate: 94 },
  ];

  const performanceDistribution = [
    { name: 'Excelente (9-10)', value: 25, color: 'hsl(var(--success))' },
    { name: 'Bom (7-8.9)', value: 45, color: 'hsl(var(--primary))' },
    { name: 'Regular (5-6.9)', value: 22, color: 'hsl(var(--warning))' },
    { name: 'Insuficiente (<5)', value: 8, color: 'hsl(var(--destructive))' },
  ];

  const highlightClasses = [
    { name: '3º A', type: 'best', metric: 'Média 8.5', icon: Award, color: 'text-success' },
    { name: '1º A', type: 'attendance', metric: '87% presença', icon: AlertTriangle, color: 'text-warning' },
    { name: '3º B', type: 'improved', metric: '+0.5 em média', icon: TrendingUp, color: 'text-primary' },
  ];

  const stats = {
    totalClasses: 12,
    totalStudents: 360,
    averageGrade: 7.9,
    averageAttendance: 92,
    teachers: 24,
    pendingReports: 3,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Painel de Coordenação</h1>
          <p className="text-muted-foreground">
            Acompanhe o desempenho das turmas e gerencie relatórios pedagógicos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Relatórios
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Calendar className="mr-2 h-4 w-4" />
            Gerenciar Horários
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Turmas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">{stats.totalStudents} alunos</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.averageGrade}</div>
            <p className="text-xs text-muted-foreground">Todas as turmas</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequência Média</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.averageAttendance}%</div>
            <p className="text-xs text-muted-foreground">Taxa de presença</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Professores Ativos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.teachers}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingReports} relatórios pendentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance by Class */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Desempenho por Turma
            </CardTitle>
            <CardDescription>Média de notas e frequência</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Bar dataKey="average" fill="hsl(var(--primary))" name="Média" radius={[8, 8, 0, 0]} />
                <Bar dataKey="attendance" fill="hsl(var(--success))" name="Frequência %" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Trend */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Evolução da Frequência
            </CardTitle>
            <CardDescription>Tendência nos últimos meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Taxa de Frequência (%)"
                  dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Distribution & Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Distribution */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Distribuição de Desempenho</CardTitle>
            <CardDescription>Classificação dos alunos por faixa de nota</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Highlight Classes */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Turmas em Destaque</CardTitle>
            <CardDescription>Desempenho e alertas importantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {highlightClasses.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div className={`p-3 rounded-lg bg-background ${item.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.metric}</p>
                  </div>
                  <Button size="sm" variant="ghost">Ver Detalhes</Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Acesse rapidamente as funcionalidades de coordenação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Turmas</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-sm">Professores</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Relatórios</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Horários</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
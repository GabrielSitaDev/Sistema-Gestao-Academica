import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  TrendingUp,
  Award,
  Clock,
  Building2,
  FileText,
  Download,
  Target,
  DollarSign
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const DirectorDashboard: React.FC = () => {
  const { auth } = useAuth();

  if (!auth.user) return null;

  // Mock data
  const monthlyPerformance = [
    { month: 'Jan', average: 7.8, attendance: 91 },
    { month: 'Fev', average: 7.9, attendance: 90 },
    { month: 'Mar', average: 8.1, attendance: 92 },
    { month: 'Abr', average: 7.7, attendance: 89 },
    { month: 'Mai', average: 8.2, attendance: 94 },
  ];

  const classDistribution = [
    { name: 'Ensino Fundamental', value: 45, color: 'hsl(var(--primary))' },
    { name: 'Ensino Médio', value: 35, color: 'hsl(var(--success))' },
    { name: 'EJA', value: 15, color: 'hsl(var(--warning))' },
    { name: 'Técnico', value: 5, color: 'hsl(var(--secondary))' },
  ];

  const classRanking = [
    { name: '3º A', average: 8.5, attendance: 95, status: 'excellent' },
    { name: '3º B', average: 8.2, attendance: 94, status: 'excellent' },
    { name: '2º A', average: 8.0, attendance: 92, status: 'good' },
    { name: '2º B', average: 7.8, attendance: 90, status: 'good' },
    { name: '1º A', average: 7.5, attendance: 88, status: 'average' },
  ];

  const teacherPerformance = [
    { name: 'Prof. Silva', classes: 5, average: 8.3 },
    { name: 'Prof. Costa', classes: 4, average: 8.1 },
    { name: 'Prof. Lima', classes: 6, average: 7.9 },
    { name: 'Prof. Santos', classes: 5, average: 8.0 },
    { name: 'Prof. Oliveira', classes: 4, average: 7.8 },
  ];

  const stats = {
    totalStudents: 1248,
    totalTeachers: 86,
    totalClasses: 42,
    averageGrade: 8.1,
    attendanceRate: 92,
    budget: 2500000,
    capacity: 85,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-success/10 text-success">Excelente</Badge>;
      case 'good':
        return <Badge className="bg-primary/10 text-primary">Bom</Badge>;
      case 'average':
        return <Badge className="bg-warning/10 text-warning">Regular</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Painel do Diretor</h1>
          <p className="text-muted-foreground">
            Visão executiva e indicadores estratégicos da instituição
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Relatório Anual
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Download className="mr-2 h-4 w-4" />
            Exportar Dados
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Em {stats.totalClasses} turmas</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Corpo Docente</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">Professores ativos</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Institucional</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.averageGrade}</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              +0.3 vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Frequência</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.attendanceRate}%</div>
            <Progress value={stats.attendanceRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orçamento Anual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {(stats.budget / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">Disponível: R$ 1.2M</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ocupação</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.capacity}%</div>
            <Progress value={stats.capacity} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta do Ano</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Em dia</div>
            <p className="text-xs text-muted-foreground">78% dos objetivos atingidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Evolução de Desempenho
            </CardTitle>
            <CardDescription>Média e frequência mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyPerformance}>
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
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="average" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Média Geral"
                />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  name="Frequência %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Class Distribution */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Distribuição de Alunos
            </CardTitle>
            <CardDescription>Por modalidade de ensino</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={classDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {classDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Ranking */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Ranking de Turmas</CardTitle>
            <CardDescription>Top 5 turmas por desempenho</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {classRanking.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Média: {item.average} • Frequência: {item.attendance}%
                  </p>
                </div>
                {getStatusBadge(item.status)}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Teacher Performance */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Desempenho dos Professores</CardTitle>
            <CardDescription>Média das turmas por professor</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={teacherPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" domain={[0, 10]} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="average" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
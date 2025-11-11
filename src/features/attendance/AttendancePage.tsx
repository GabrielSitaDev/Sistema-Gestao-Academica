import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export const AttendancePage: React.FC = () => {
  // Mock data - substituir com API
  const attendanceData = {
    summary: {
      totalClasses: 120,
      presences: 110,
      absences: 10,
      percentage: 91.67,
    },
    bySubject: [
      { subject: 'Matemática', total: 24, present: 23, absent: 1, percentage: 95.83 },
      { subject: 'Português', total: 24, present: 22, absent: 2, percentage: 91.67 },
      { subject: 'História', total: 16, present: 15, absent: 1, percentage: 93.75 },
      { subject: 'Física', total: 24, present: 21, absent: 3, percentage: 87.50 },
      { subject: 'Química', total: 16, present: 15, absent: 1, percentage: 93.75 },
      { subject: 'Biologia', total: 16, present: 14, absent: 2, percentage: 87.50 },
    ],
    recentAbsences: [
      { date: '2024-01-15', subject: 'Física', period: 'Manhã', justified: false },
      { date: '2024-01-12', subject: 'Matemática', period: 'Tarde', justified: false },
      { date: '2024-01-08', subject: 'Português', period: 'Manhã', justified: true, reason: 'Atestado médico' },
    ],
  };
  
  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-destructive';
  };
  
  const getPercentageStatus = (percentage: number) => {
    if (percentage >= 90) return 'Excelente';
    if (percentage >= 75) return 'Atenção';
    return 'Crítico';
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Faltas e Presenças</h1>
        <p className="text-muted-foreground">
          Acompanhe seu histórico de presença nas aulas
        </p>
      </div>
      
      {/* Summary Card */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Resumo Geral
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-muted/50">
              <div className={`text-4xl font-bold ${getPercentageColor(attendanceData.summary.percentage)}`}>
                {attendanceData.summary.percentage.toFixed(1)}%
              </div>
              <p className="text-sm text-muted-foreground mt-2">Frequência Geral</p>
              <Badge 
                variant="secondary" 
                className={`mt-2 ${
                  attendanceData.summary.percentage >= 90 
                    ? 'bg-success/10 text-success' 
                    : attendanceData.summary.percentage >= 75
                    ? 'bg-warning/10 text-warning'
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {getPercentageStatus(attendanceData.summary.percentage)}
              </Badge>
            </div>
            
            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-muted/50">
              <Calendar className="h-8 w-8 text-muted-foreground mb-2" />
              <div className="text-2xl font-bold">{attendanceData.summary.totalClasses}</div>
              <p className="text-sm text-muted-foreground">Total de Aulas</p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-success/10">
              <CheckCircle className="h-8 w-8 text-success mb-2" />
              <div className="text-2xl font-bold text-success">{attendanceData.summary.presences}</div>
              <p className="text-sm text-muted-foreground">Presenças</p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-destructive/10">
              <XCircle className="h-8 w-8 text-destructive mb-2" />
              <div className="text-2xl font-bold text-destructive">{attendanceData.summary.absences}</div>
              <p className="text-sm text-muted-foreground">Faltas</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Attendance by Subject */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Frequência por Disciplina</CardTitle>
          <CardDescription>
            Veja seu desempenho de presença em cada matéria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {attendanceData.bySubject.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{item.subject}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.present} presenças de {item.total} aulas
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${getPercentageColor(item.percentage)}`}>
                    {item.percentage.toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">{item.absent} faltas</p>
                </div>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Recent Absences */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Faltas Recentes
          </CardTitle>
          <CardDescription>
            Últimas ausências registradas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {attendanceData.recentAbsences.map((absence, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-destructive/10">
                  <span className="text-xs text-muted-foreground">
                    {new Date(absence.date).toLocaleDateString('pt-BR', { day: '2-digit' })}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(absence.date).toLocaleDateString('pt-BR', { month: 'short' })}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-medium">{absence.subject}</h4>
                  <p className="text-sm text-muted-foreground">
                    {absence.period} • {new Date(absence.date).toLocaleDateString('pt-BR')}
                  </p>
                  {absence.justified && absence.reason && (
                    <p className="text-xs text-success mt-1">
                      Justificado: {absence.reason}
                    </p>
                  )}
                </div>
              </div>
              
              <Badge
                variant={absence.justified ? 'secondary' : 'destructive'}
                className={absence.justified ? 'bg-success/10 text-success' : ''}
              >
                {absence.justified ? 'Justificado' : 'Não Justificado'}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Alert */}
      {attendanceData.summary.percentage < 75 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <h4 className="font-semibold text-destructive">Atenção: Frequência Abaixo do Mínimo</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Sua frequência está abaixo de 75%. É necessário manter ao menos 75% de presença para aprovação.
                  Entre em contato com a coordenação se houver algum problema.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

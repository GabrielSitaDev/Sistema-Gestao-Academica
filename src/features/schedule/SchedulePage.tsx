import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/services/api';

interface ClassSchedule {
  time: string;
  subject: string;
  teacher: string;
  room: string;
  status?: 'normal' | 'vaga' | 'apresentacao' | 'correcao';
}

interface DaySchedule {
  day: string;
  classes: ClassSchedule[];
}

export const SchedulePage: React.FC = () => {
  const { toast } = useToast();
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSchedule();
  }, []);

  const loadSchedule = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/schedule');
      setSchedule(response.data);
    } catch (error) {
      toast({
        title: 'Erro ao carregar horário',
        description: 'Não foi possível carregar o horário de aulas.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'vaga':
        return <Badge variant="secondary">Vaga</Badge>;
      case 'apresentacao':
        return <Badge variant="default">Apresentação</Badge>;
      case 'correcao':
        return <Badge className="bg-amber-500">Correção</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-muted-foreground">Carregando horário...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Horário de Aulas</h1>
        <p className="text-muted-foreground">Confira seu horário semanal completo</p>
      </div>

      <div className="space-y-6">
        {schedule.map((daySchedule) => (
          <Card key={daySchedule.day}>
            <CardHeader>
              <CardTitle>{daySchedule.day}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {daySchedule.classes.map((classItem, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-muted-foreground min-w-32">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">{classItem.time}</span>
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{classItem.subject}</h3>
                        {getStatusBadge(classItem.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{classItem.teacher}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{classItem.room}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legenda */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Legenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-background border" />
              <span className="text-sm">Aula Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Vaga</Badge>
              <span className="text-sm">Aula Vaga</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">Apresentação</Badge>
              <span className="text-sm">Apresentação de Trabalho</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500">Correção</Badge>
              <span className="text-sm">Correção de Atividade</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

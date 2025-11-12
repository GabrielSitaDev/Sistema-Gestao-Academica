import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Fingerprint, FileText, Calendar, AlertCircle, BookOpen, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/services/api';
import biometricsService from '@/services/biometrics.service';

interface Student {
  id: string;
  name: string;
  rm: string;
  callNumber: number;
  avatar: string;
  age: number;
  observations: string;
  biometricEnrolled: boolean;
  attendance?: { [key: string]: 'P' | 'F' | 'J' };
}

export const ClassRoomPage: React.FC = () => {
  const { classId } = useParams();
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifyingBiometric, setVerifyingBiometric] = useState(false);

  useEffect(() => {
    loadClassStudents();
  }, [classId]);

  const loadClassStudents = async () => {
    try {
      setLoading(true);
      const response = await apiService.get(`/classes/${classId}/students`);
      setStudents(response.data);
      if (response.data.length > 0) {
        setSelectedStudent(response.data[0]);
      }
    } catch (error) {
      toast({
        title: 'Erro ao carregar alunos',
        description: 'Não foi possível carregar a lista de alunos.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricAttendance = async () => {
    try {
      setVerifyingBiometric(true);
      const result = await biometricsService.verifyFingerprint();
      
      if (result.success) {
        // Registrar presença
        await apiService.post('/attendance/bulk', {
          attendance: [{
            studentId: result.studentId,
            classId,
            date: new Date().toISOString(),
            status: 'present',
            verifiedBy: 'biometric',
          }],
        });

        toast({
          title: 'Presença registrada',
          description: `${result.studentName} - Presença confirmada por biometria`,
        });

        await loadClassStudents();
      }
    } catch (error) {
      toast({
        title: 'Erro na verificação',
        description: 'Não foi possível verificar a digital.',
        variant: 'destructive',
      });
    } finally {
      setVerifyingBiometric(false);
    }
  };

  const toggleAttendance = (studentId: string, date: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const current = s.attendance?.[date] || 'F';
        const next = current === 'P' ? 'F' : current === 'F' ? 'J' : 'P';
        return {
          ...s,
          attendance: { ...s.attendance, [date]: next },
        };
      }
      return s;
    }));
  };

  const dates = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-muted-foreground">Carregando sala de aula...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-6">
        {/* Tabela piloto - Lista de chamada */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Lista Piloto - Sala de Aula</span>
                <Button
                  onClick={handleBiometricAttendance}
                  disabled={verifyingBiometric}
                  className="gap-2"
                >
                  <Fingerprint className="h-4 w-4" />
                  {verifyingBiometric ? 'Verificando...' : 'Chamada Biométrica'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left">Nº</th>
                      <th className="p-2 text-left">RM</th>
                      <th className="p-2 text-left">Nome</th>
                      {dates.map(d => (
                        <th key={d} className="p-2 text-center w-12">{d}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr
                        key={student.id}
                        className={`border-b hover:bg-muted/30 cursor-pointer ${
                          selectedStudent?.id === student.id ? 'bg-primary/10' : ''
                        }`}
                        onClick={() => setSelectedStudent(student)}
                      >
                        <td className="p-2">{student.callNumber}</td>
                        <td className="p-2 font-mono">{student.rm}</td>
                        <td className="p-2">{student.name}</td>
                        {dates.map(date => {
                          const status = student.attendance?.[date] || 'F';
                          return (
                            <td
                              key={date}
                              className="p-2 text-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleAttendance(student.id, date);
                              }}
                            >
                              <Badge
                                variant={
                                  status === 'P' ? 'default' :
                                  status === 'J' ? 'secondary' : 'destructive'
                                }
                                className="cursor-pointer w-8 justify-center"
                              >
                                {status}
                              </Badge>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="default">P</Badge>
                  <span>Presente</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">F</Badge>
                  <span>Falta</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">J</Badge>
                  <span>Justificado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Painel lateral do aluno */}
        {selectedStudent && (
          <div className="w-80">
            <Card>
              <CardHeader>
                <CardTitle>Dados do Aluno</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center">
                  <img
                    src={selectedStudent.avatar || '/placeholder.svg'}
                    alt={selectedStudent.name}
                    className="w-32 h-32 rounded-lg object-cover border-2 border-border"
                  />
                  <h3 className="mt-2 font-semibold text-center">{selectedStudent.name}</h3>
                  <p className="text-sm text-muted-foreground">RM: {selectedStudent.rm}</p>
                  <p className="text-sm text-muted-foreground">Idade: {selectedStudent.age} anos</p>
                </div>

                {selectedStudent.observations && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">Observações:</p>
                    <p className="text-sm text-muted-foreground">{selectedStudent.observations}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Button variant="outline" className="w-full gap-2">
                    <FileText className="h-4 w-4" />
                    PTD - Plano de Trabalho
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Calendar className="h-4 w-4" />
                    Frequência
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Ocorrência
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <BookOpen className="h-4 w-4" />
                    Caderno de Classe
                  </Button>
                  <Button variant="default" className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    Enviar Relatório
                  </Button>
                </div>

                {selectedStudent.biometricEnrolled && (
                  <div className="flex items-center gap-2 p-2 bg-primary/10 rounded text-sm">
                    <Fingerprint className="h-4 w-4 text-primary" />
                    <span>Biometria cadastrada</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  BookOpen, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  FileText,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import storageService from '@/services/storage.service';

export const ActivitiesPage: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Mock data - substituir com API
  const activitiesData = {
    pending: [
      {
        id: 'ACT_001',
        title: 'Trabalho de Geometria Analítica',
        subject: 'Matemática',
        description: 'Resolver os exercícios 1 a 15 do capítulo 5 sobre plano cartesiano e distância entre pontos.',
        dueDate: '2024-01-25',
        weight: 2.0,
        maxGrade: 10,
        acceptsFiles: true,
        teacher: 'Prof. Roberto Lima',
      },
      {
        id: 'ACT_002',
        title: 'Lista de Física - Cinemática',
        subject: 'Física',
        description: 'Resolução de problemas sobre movimento uniforme e acelerado.',
        dueDate: '2024-01-22',
        weight: 1.5,
        maxGrade: 10,
        acceptsFiles: true,
        teacher: 'Prof. Maria Costa',
      },
    ],
    submitted: [
      {
        id: 'ACT_003',
        title: 'Redação sobre Modernismo',
        subject: 'Português',
        description: 'Análise crítica de uma obra do período modernista brasileiro.',
        dueDate: '2024-01-20',
        submittedDate: '2024-01-18',
        weight: 1.5,
        grade: 8.5,
        maxGrade: 10,
        status: 'graded',
        teacher: 'Prof. Ana Silva',
        feedback: 'Excelente análise! Você demonstrou boa compreensão do contexto histórico.',
      },
      {
        id: 'ACT_004',
        title: 'Relatório de Química',
        subject: 'Química',
        description: 'Relatório do experimento de reações químicas.',
        dueDate: '2024-01-15',
        submittedDate: '2024-01-14',
        weight: 2.0,
        maxGrade: 10,
        status: 'pending_review',
        teacher: 'Prof. João Santos',
      },
    ],
    late: [
      {
        id: 'ACT_005',
        title: 'Exercícios de História',
        subject: 'História',
        description: 'Questões sobre a República Velha no Brasil.',
        dueDate: '2024-01-10',
        weight: 1.0,
        maxGrade: 10,
        acceptsFiles: true,
        teacher: 'Prof. Carlos Oliveira',
      },
    ],
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'graded':
        return <Badge className="bg-success/10 text-success">Avaliado</Badge>;
      case 'pending_review':
        return <Badge className="bg-warning/10 text-warning">Em Revisão</Badge>;
      default:
        return null;
    }
  };
  
  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };
  
  const getDueDateColor = (dueDate: string) => {
    const days = getDaysUntilDue(dueDate);
    if (days < 0) return 'text-destructive';
    if (days <= 2) return 'text-warning';
    return 'text-muted-foreground';
  };
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  
  const handleSubmitActivity = async () => {
    if (!selectedFile || !selectedActivity) {
      toast.error('Selecione um arquivo para enviar');
      return;
    }
    
    setIsUploading(true);
    try {
      const result = await storageService.uploadFile(selectedFile, 'assignments');
      
      // Aqui chamaria a API para registrar a submissão
      // await apiService.post('/activities/submit', { activityId: selectedActivity.id, fileUrl: result.signedUrl });
      
      toast.success('Trabalho enviado com sucesso!');
      setIsDialogOpen(false);
      setSelectedFile(null);
      setSelectedActivity(null);
    } catch (error) {
      toast.error('Erro ao enviar trabalho. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const renderActivityCard = (activity: any, type: 'pending' | 'submitted' | 'late') => (
    <Card key={activity.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{activity.title}</CardTitle>
            <CardDescription className="mt-1">
              <Badge variant="outline" className="mr-2">{activity.subject}</Badge>
              {activity.teacher}
            </CardDescription>
          </div>
          {type === 'submitted' && activity.status && getStatusBadge(activity.status)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{activity.description}</p>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className={getDueDateColor(activity.dueDate)}>
              Prazo: {new Date(activity.dueDate).toLocaleDateString('pt-BR')}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Peso: {activity.weight}</span>
          </div>
        </div>
        
        {type === 'submitted' && activity.grade !== undefined && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5">
            <span className="font-medium">Nota obtida:</span>
            <span className="text-2xl font-bold text-primary">
              {activity.grade} / {activity.maxGrade}
            </span>
          </div>
        )}
        
        {type === 'submitted' && activity.feedback && (
          <div className="p-3 rounded-lg bg-muted/50">
            <p className="text-sm font-medium mb-1">Feedback do professor:</p>
            <p className="text-sm text-muted-foreground">{activity.feedback}</p>
          </div>
        )}
        
        {type === 'submitted' && activity.submittedDate && (
          <p className="text-xs text-muted-foreground">
            Entregue em: {new Date(activity.submittedDate).toLocaleDateString('pt-BR')}
          </p>
        )}
        
        {(type === 'pending' || type === 'late') && (
          <Button
            onClick={() => {
              setSelectedActivity(activity);
              setIsDialogOpen(true);
            }}
            className="w-full"
            variant={type === 'late' ? 'destructive' : 'default'}
          >
            <Upload className="mr-2 h-4 w-4" />
            Enviar Trabalho
          </Button>
        )}
      </CardContent>
    </Card>
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Trabalhos e Atividades</h1>
        <p className="text-muted-foreground">
          Gerencie e envie seus trabalhos escolares
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{activitiesData.pending.length}</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enviados</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{activitiesData.submitted.length}</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atrasados</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{activitiesData.late.length}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Activities Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pendentes ({activitiesData.pending.length})
          </TabsTrigger>
          <TabsTrigger value="submitted">
            Enviados ({activitiesData.submitted.length})
          </TabsTrigger>
          <TabsTrigger value="late">
            Atrasados ({activitiesData.late.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activitiesData.pending.map((activity) => renderActivityCard(activity, 'pending'))}
          </div>
        </TabsContent>
        
        <TabsContent value="submitted" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activitiesData.submitted.map((activity) => renderActivityCard(activity, 'submitted'))}
          </div>
        </TabsContent>
        
        <TabsContent value="late" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activitiesData.late.map((activity) => renderActivityCard(activity, 'late'))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Submit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Trabalho</DialogTitle>
            <DialogDescription>
              {selectedActivity?.title} - {selectedActivity?.subject}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="file">Arquivo do Trabalho</Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.txt,.zip"
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Arquivo selecionado: {selectedFile.name}
                </p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmitActivity} disabled={isUploading || !selectedFile}>
              {isUploading ? 'Enviando...' : 'Enviar Trabalho'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Award, TrendingUp, TrendingDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import pdfService from '@/services/pdf.service';

export const GradesPage: React.FC = () => {
  const { auth } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  
  // Mock data - substituir com API
  const gradesData = {
    bimester1: [
      { subject: 'Matemática', grade: 9.2, weight: 2, status: 'excellent' },
      { subject: 'Português', grade: 8.5, weight: 2, status: 'good' },
      { subject: 'História', grade: 7.5, weight: 1, status: 'average' },
      { subject: 'Física', grade: 6.8, weight: 2, status: 'needs_attention' },
      { subject: 'Química', grade: 8.0, weight: 2, status: 'good' },
    ],
    bimester2: [
      { subject: 'Matemática', grade: 8.7, weight: 2, status: 'good' },
      { subject: 'Português', grade: 8.0, weight: 2, status: 'good' },
      { subject: 'História', grade: 7.8, weight: 1, status: 'average' },
      { subject: 'Física', grade: 7.2, weight: 2, status: 'average' },
      { subject: 'Química', grade: 8.5, weight: 2, status: 'good' },
    ],
    bimester3: [
      { subject: 'Matemática', grade: 9.0, weight: 2, status: 'excellent' },
      { subject: 'Português', grade: 8.8, weight: 2, status: 'good' },
      { subject: 'História', grade: 8.0, weight: 1, status: 'good' },
      { subject: 'Física', grade: 7.5, weight: 2, status: 'average' },
      { subject: 'Química', grade: 8.8, weight: 2, status: 'good' },
    ],
  };
  
  const calculateAverage = (bimester: any[]) => {
    const total = bimester.reduce((acc, item) => acc + item.grade * item.weight, 0);
    const weights = bimester.reduce((acc, item) => acc + item.weight, 0);
    return (total / weights).toFixed(2);
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
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'excellent': return 'Excelente';
      case 'good': return 'Bom';
      case 'average': return 'Regular';
      case 'needs_attention': return 'Atenção';
      default: return '';
    }
  };
  
  const handleExportPDF = async () => {
    if (!auth.user?.id) return;
    
    setIsExporting(true);
    try {
      const result = await pdfService.generateBoletimPDF(auth.user.id);
      
      // Abrir PDF em nova aba
      window.open(result.url, '_blank');
      
      toast.success('Boletim exportado com sucesso!');
    } catch (error) {
      toast.error('Erro ao exportar boletim. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };
  
  const renderGradesTable = (grades: any[], bimesterNum: number) => (
    <div className="space-y-3">
      {grades.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
        >
          <div className="flex-1">
            <h4 className="font-medium">{item.subject}</h4>
            <p className="text-sm text-muted-foreground">Peso: {item.weight}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className={getStatusColor(item.status)}>
              {getStatusLabel(item.status)}
            </Badge>
            
            <div className="text-right">
              <div className="text-2xl font-bold">{item.grade}</div>
              <p className="text-xs text-muted-foreground">Nota</p>
            </div>
          </div>
        </div>
      ))}
      
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-lg">Média do {bimesterNum}º Bimestre</h4>
              <p className="text-sm text-muted-foreground">Média ponderada</p>
            </div>
            <div className="text-3xl font-bold text-primary">
              {calculateAverage(grades)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notas e Boletim</h1>
          <p className="text-muted-foreground">
            Acompanhe seu desempenho acadêmico por bimestre
          </p>
        </div>
        <Button 
          onClick={handleExportPDF} 
          disabled={isExporting}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? 'Gerando PDF...' : 'Exportar Boletim em PDF'}
        </Button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">8.5</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-success" />
              +0.3 desde o último bimestre
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Melhor Disciplina</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Matemática</div>
            <div className="text-xs text-muted-foreground mt-1">
              Média: 8.97
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Precisa Melhorar</CardTitle>
            <TrendingDown className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Física</div>
            <div className="text-xs text-muted-foreground mt-1">
              Média: 7.17
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Grades by Bimester */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Notas por Bimestre
          </CardTitle>
          <CardDescription>
            Visualize seu desempenho em cada período avaliativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bimester1" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="bimester1">1º Bimestre</TabsTrigger>
              <TabsTrigger value="bimester2">2º Bimestre</TabsTrigger>
              <TabsTrigger value="bimester3">3º Bimestre</TabsTrigger>
              <TabsTrigger value="bimester4" disabled>4º Bimestre</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bimester1" className="mt-6">
              {renderGradesTable(gradesData.bimester1, 1)}
            </TabsContent>
            
            <TabsContent value="bimester2" className="mt-6">
              {renderGradesTable(gradesData.bimester2, 2)}
            </TabsContent>
            
            <TabsContent value="bimester3" className="mt-6">
              {renderGradesTable(gradesData.bimester3, 3)}
            </TabsContent>
            
            <TabsContent value="bimester4" className="mt-6">
              <div className="text-center py-8 text-muted-foreground">
                Notas do 4º bimestre ainda não foram lançadas
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

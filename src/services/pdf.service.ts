import apiService from './api';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

class PdfService {
  /**
   * Gera PDF do boletim do aluno via backend
   * Se backend não disponível, usa fallback client-side
   */
  async generateBoletimPDF(studentId: string): Promise<{ url: string }> {
    try {
      const response = await apiService.post('/pdf/boletim', {
        studentId,
        timestamp: new Date().toISOString(),
      });
      
      return { url: response.data.url };
    } catch (error) {
      console.warn('Backend PDF não disponível, usando geração client-side');
      return this.generateBoletimClientSide(studentId);
    }
  }
  
  /**
   * Gera PDF do boletim usando jsPDF (fallback client-side)
   */
  private async generateBoletimClientSide(studentId: string): Promise<{ url: string }> {
    try {
      // Buscar dados do aluno
      const studentResponse = await apiService.get(`/student/${studentId}`);
      const gradesResponse = await apiService.get('/grades', { params: { studentId } });
      
      const student = studentResponse.data;
      const grades = gradesResponse.data;
      
      const doc = new jsPDF();
      
      // Cabeçalho
      doc.setFontSize(18);
      doc.text('Boletim Escolar', 105, 20, { align: 'center' });
      
      doc.setFontSize(12);
      doc.text(`Aluno: ${student.name}`, 20, 40);
      doc.text(`RM: ${student.rm}`, 20, 47);
      doc.text(`Curso: ${student.course}`, 20, 54);
      
      // Tabela de notas
      const tableData = grades.map((g: any) => [
        g.subject,
        g.bimester1 || '-',
        g.bimester2 || '-',
        g.bimester3 || '-',
        g.bimester4 || '-',
        g.average || '-',
      ]);
      
      autoTable(doc, {
        head: [['Disciplina', '1º Bim', '2º Bim', '3º Bim', '4º Bim', 'Média']],
        body: tableData,
        startY: 65,
        theme: 'grid',
        headStyles: { fillColor: [33, 150, 243] },
      });
      
      // Rodapé
      const pageCount = (doc as any).internal.getNumberOfPages();
      doc.setFontSize(10);
      doc.text(
        `Gerado em: ${new Date().toLocaleDateString('pt-BR')}`,
        20,
        doc.internal.pageSize.height - 10
      );
      
      // Converter para blob e criar URL
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      
      return { url };
    } catch (error) {
      throw new Error('Erro ao gerar PDF do boletim');
    }
  }
  
  /**
   * Gera relatório de presença
   */
  async generateAttendanceReport(classId: string, month: string): Promise<{ url: string }> {
    try {
      const response = await apiService.post('/pdf/attendance', {
        classId,
        month,
        timestamp: new Date().toISOString(),
      });
      
      return { url: response.data.url };
    } catch (error) {
      console.warn('Backend PDF não disponível');
      throw new Error('Serviço de PDF temporariamente indisponível');
    }
  }
  
  /**
   * Gera relatório pedagógico
   */
  async generatePedagogicalReport(data: any): Promise<{ url: string }> {
    try {
      const response = await apiService.post('/pdf/pedagogical-report', data);
      return { url: response.data.url };
    } catch (error) {
      console.warn('Backend PDF não disponível');
      throw new Error('Serviço de PDF temporariamente indisponível');
    }
  }
}

export const pdfService = new PdfService();
export default pdfService;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Search, FileIcon, File } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/services/api';

interface Material {
  id: string;
  title: string;
  subject: string;
  type: 'pdf' | 'pptx' | 'docx' | 'xlsx' | 'txt' | 'zip';
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  size?: string;
}

export const MaterialsPage: React.FC = () => {
  const { toast } = useToast();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  useEffect(() => {
    loadMaterials();
  }, []);

  useEffect(() => {
    filterMaterials();
  }, [searchQuery, selectedSubject, materials]);

  const loadMaterials = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/materials');
      setMaterials(response.data);
      setFilteredMaterials(response.data);
    } catch (error) {
      toast({
        title: 'Erro ao carregar materiais',
        description: 'Não foi possível carregar os materiais de estudo.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterMaterials = () => {
    let filtered = materials;

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(m => m.subject === selectedSubject);
    }

    if (searchQuery) {
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMaterials(filtered);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'pptx':
        return <FileIcon className="h-5 w-5 text-orange-500" />;
      case 'docx':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'xlsx':
        return <FileIcon className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const handleDownload = (material: Material) => {
    toast({
      title: 'Download iniciado',
      description: `Baixando ${material.title}`,
    });
    window.open(material.url, '_blank');
  };

  const subjects = Array.from(new Set(materials.map(m => m.subject)));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-muted-foreground">Carregando materiais...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Biblioteca de Materiais</h1>
        <p className="text-muted-foreground">Acesse os materiais disponibilizados pelos professores</p>
      </div>

      {/* Busca */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título ou disciplina..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Filtro por disciplina */}
      <Tabs value={selectedSubject} onValueChange={setSelectedSubject} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          {subjects.map(subject => (
            <TabsTrigger key={subject} value={subject}>
              {subject}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Lista de materiais */}
      {filteredMaterials.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {searchQuery || selectedSubject !== 'all'
                ? 'Nenhum material encontrado com os filtros aplicados.'
                : 'Nenhum material disponível no momento.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMaterials.map(material => (
            <Card key={material.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getFileIcon(material.type)}
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base line-clamp-2">
                        {material.title}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {material.subject}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <p>Por: {material.uploadedBy}</p>
                    <p>
                      {new Date(material.uploadedAt).toLocaleDateString('pt-BR')}
                    </p>
                    {material.size && <p>Tamanho: {material.size}</p>}
                  </div>
                  <Button
                    variant="default"
                    className="w-full gap-2"
                    onClick={() => handleDownload(material)}
                  >
                    <Download className="h-4 w-4" />
                    Baixar Material
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

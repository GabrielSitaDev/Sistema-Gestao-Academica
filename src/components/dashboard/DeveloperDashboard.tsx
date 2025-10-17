import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { 
  Monitor, 
  Database, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Server,
  Activity,
  FileText,
  Settings,
  Wifi,
  HardDrive,
  Cpu,
  Users
} from 'lucide-react';

export const DeveloperDashboard: React.FC = () => {
  const { auth } = useAuth();

  if (!auth.user) return null;

  // Mock data - replace with API calls
  const mockData = {
    systemHealth: {
      status: 'operational',
      uptime: '99.9%',
      responseTime: '145ms',
      apiCalls: 2847,
      activeUsers: 156
    },
    servers: [
      { name: 'Web Server', status: 'healthy', cpu: 23, memory: 45, load: 'low' },
      { name: 'Database Server', status: 'healthy', cpu: 67, memory: 78, load: 'medium' },
      { name: 'API Server', status: 'warning', cpu: 89, memory: 92, load: 'high' },
    ],
    database: {
      totalRecords: 125000,
      todayInserts: 342,
      todayUpdates: 158,
      queryPerformance: 95,
      backupStatus: 'completed',
      lastBackup: '2024-01-20 03:00'
    },
    security: {
      threatLevel: 'low',
      blockedAttempts: 15,
      activeTokens: 89,
      sslStatus: 'valid',
      firewallStatus: 'active'
    },
    recentLogs: [
      { level: 'error', message: 'Database connection timeout on server-03', time: '14:32', source: 'API' },
      { level: 'warning', message: 'High CPU usage detected on web-server-01', time: '14:15', source: 'Monitor' },
      { level: 'info', message: 'Successful backup completed', time: '03:00', source: 'Backup' },
      { level: 'info', message: 'New user registration: teacher-456', time: '12:45', source: 'Auth' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': case 'operational': return 'text-success bg-success/10 border-success/30';
      case 'warning': return 'text-warning bg-warning/10 border-warning/30';
      case 'error': case 'critical': return 'text-destructive bg-destructive/10 border-destructive/30';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-destructive';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Painel do Desenvolvedor</h1>
          <p className="text-muted-foreground">
            Monitoramento e gestão técnica do sistema acadêmico
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Logs Completos
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Database className="mr-2 h-4 w-4" />
            Backup Manual
          </Button>
        </div>
      </div>

      {/* System Status Overview */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Status Geral do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-lg font-semibold text-success">Operacional</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{mockData.systemHealth.uptime}</div>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{mockData.systemHealth.responseTime}</div>
              <p className="text-sm text-muted-foreground">Tempo de Resposta</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{mockData.systemHealth.apiCalls}</div>
              <p className="text-sm text-muted-foreground">Chamadas API (hoje)</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{mockData.systemHealth.activeUsers}</div>
              <p className="text-sm text-muted-foreground">Usuários Ativos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Servers Status */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Status dos Servidores
          </CardTitle>
          <CardDescription>Monitoramento em tempo real dos servidores</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockData.servers.map((server, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Monitor className="h-5 w-5" />
                <div>
                  <p className="font-medium">{server.name}</p>
                  <Badge variant="secondary" className={getStatusColor(server.status)}>
                    {server.status}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">CPU</p>
                <div className="flex items-center gap-2">
                  <Progress value={server.cpu} className="flex-1" />
                  <span className="text-sm font-medium">{server.cpu}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Memória</p>
                <div className="flex items-center gap-2">
                  <Progress value={server.memory} className="flex-1" />
                  <span className="text-sm font-medium">{server.memory}%</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Badge variant={server.load === 'low' ? 'secondary' : server.load === 'medium' ? 'default' : 'destructive'}>
                  Load: {server.load}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Database Status */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Base de Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total de Registros</span>
              <Badge variant="secondary">{mockData.database.totalRecords.toLocaleString()}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Inserções Hoje</span>
              <Badge variant="primary">{mockData.database.todayInserts}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Atualizações Hoje</span>
              <Badge variant="secondary">{mockData.database.todayUpdates}</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Performance</span>
                <span className="text-sm font-medium">{mockData.database.queryPerformance}%</span>
              </div>
              <Progress value={mockData.database.queryPerformance} />
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm">Último backup: {mockData.database.lastBackup}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Status */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Nível de Ameaça</span>
              <Badge variant="success">{mockData.security.threatLevel}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Tentativas Bloqueadas</span>
              <Badge variant="warning">{mockData.security.blockedAttempts}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Tokens Ativos</span>
              <Badge variant="secondary">{mockData.security.activeTokens}</Badge>
            </div>
            <div className="space-y-2 pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm">SSL</span>
                <Badge variant="success">Válido</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Firewall</span>
                <Badge variant="success">Ativo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Analytics */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Usuários Online</span>
                <Badge variant="primary">{mockData.systemHealth.activeUsers}</Badge>
              </div>
              <Progress value={65} />
              <span className="text-xs text-muted-foreground">65% da capacidade</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Requisições/min</span>
                <Badge variant="secondary">247</Badge>
              </div>
              <Progress value={35} />
              <span className="text-xs text-muted-foreground">35% do limite</span>
            </div>
            <div className="pt-2 border-t">
              <Button variant="outline" size="sm" className="w-full">
                <TrendingUp className="mr-2 h-4 w-4" />
                Analytics Completos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Logs */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Logs Recentes
          </CardTitle>
          <CardDescription>Últimas atividades e eventos do sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockData.recentLogs.map((log, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 font-mono text-sm">
              <Badge variant="outline" className={`mt-0.5 ${getLogLevelColor(log.level)}`}>
                {log.level}
              </Badge>
              <div className="flex-1">
                <p>{log.message}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{log.time}</span>
                  <span>•</span>
                  <span>{log.source}</span>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full mt-4">
            Ver Todos os Logs
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  useSidebar
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Users, 
  GraduationCap, 
  FileText, 
  MessageCircle, 
  Settings, 
  ClipboardList,
  TrendingUp,
  Bell,
  Database,
  Shield,
  Monitor,
  BarChart3,
  UserPlus,
  School,
  Award,
  Clock
} from 'lucide-react';
import logo from '@/assets/logo.png';

export const DashboardSidebar: React.FC = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  if (!auth.user) return null;

  const getMenuItems = () => {
    switch (auth.user?.role) {
      case 'student':
        return [
          { title: 'Dashboard', url: '/dashboard', icon: Home },
          { title: 'Horário de Aulas', url: '/schedule', icon: Calendar },
          { title: 'Notas e Boletim', url: '/grades', icon: Award },
          { title: 'Faltas e Presenças', url: '/attendance', icon: Clock },
          { title: 'Trabalhos', url: '/assignments', icon: ClipboardList },
          { title: 'Materiais de Estudo', url: '/materials', icon: BookOpen },
          { title: 'Histórico Escolar', url: '/transcript', icon: FileText },
          { title: 'Mensagens', url: '/messages', icon: MessageCircle },
          { title: 'Notificações', url: '/notifications', icon: Bell },
        ];
      
      case 'teacher':
        return [
          { title: 'Dashboard', url: '/dashboard', icon: Home },
          { title: 'Minhas Turmas', url: '/classes', icon: Users },
          { title: 'Lista de Chamada', url: '/attendance', icon: ClipboardList },
          { title: 'Atividades', url: '/assignments', icon: BookOpen },
          { title: 'Notas e Avaliações', url: '/grades', icon: Award },
          { title: 'Materiais', url: '/materials', icon: FileText },
          { title: 'Relatórios', url: '/reports', icon: BarChart3 },
          { title: 'Mensagens', url: '/messages', icon: MessageCircle },
          { title: 'Ocorrências', url: '/incidents', icon: Bell },
        ];
      
      case 'admin':
        return [
          { title: 'Dashboard', url: '/dashboard', icon: Home },
          { title: 'Gestão de Alunos', url: '/students', icon: GraduationCap },
          { title: 'Gestão de Professores', url: '/teachers', icon: Users },
          { title: 'Turmas e Horários', url: '/classes', icon: Calendar },
          { title: 'Matrículas', url: '/enrollments', icon: UserPlus },
          { title: 'Relatórios', url: '/reports', icon: BarChart3 },
          { title: 'Recursos Escolares', url: '/resources', icon: School },
          { title: 'Mensagens', url: '/messages', icon: MessageCircle },
          { title: 'Configurações', url: '/settings', icon: Settings },
        ];
      
      case 'developer':
        return [
          { title: 'Dashboard', url: '/dashboard', icon: Home },
          { title: 'Monitoramento', url: '/monitoring', icon: Monitor },
          { title: 'Logs do Sistema', url: '/logs', icon: FileText },
          { title: 'Base de Dados', url: '/database', icon: Database },
          { title: 'APIs e Tokens', url: '/apis', icon: Shield },
          { title: 'Analytics', url: '/analytics', icon: TrendingUp },
          { title: 'Configurações', url: '/settings', icon: Settings },
        ];
      
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-8 w-8 rounded-lg" />
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-sidebar-foreground">Sistema Acadêmico</h2>
              <p className="text-xs text-sidebar-foreground/70">{auth.user.unitName}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {auth.user.role === 'student' && 'Área do Aluno'}
            {auth.user.role === 'teacher' && 'Área do Professor'}
            {auth.user.role === 'admin' && 'Área Administrativa'}
            {auth.user.role === 'developer' && 'Área do Desenvolvedor'}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
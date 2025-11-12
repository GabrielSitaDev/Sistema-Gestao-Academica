# Plano de Desenvolvimento - Sistema Acadêmico

## Sprint 1 - Concluído ✓
- [x] Serviços base (API, Storage, Biometrics, PDF)
- [x] MSW configurado com handlers essenciais
- [x] Design tokens
- [x] Páginas: Notas, Faltas, Atividades

## Sprint 2 - Concluído ✓
### Perfis e Dashboards
- [x] Novos perfis: Coordenação, Secretaria, Direção
- [x] CoordinatorDashboard com gráficos
- [x] SecretaryDashboard com gestão de cadastros
- [x] DirectorDashboard com visão executiva

### Professor
- [x] ClassRoomPage - Sala de aula com lista piloto
- [x] Tabela de chamada com biometria (mock)
- [ ] GradeEntry - Lançamento de notas
- [ ] ActivityCreate/Correction

### Aluno
- [x] SchedulePage - Horário completo
- [x] MaterialsPage - Biblioteca de materiais
- [x] StudentProfile - Perfil com foto 3x4
- [x] GradesPage - Boletim com exportação PDF
- [x] AttendancePage - Histórico de faltas
- [x] ActivitiesPage - Trabalhos e submissões

### Páginas Gerais
- [x] UserProfile - Perfil do usuário
- [x] Settings - Configurações e preferências

## Sprint 3 - Próximas Funcionalidades

### Professor (Prioridade Alta)
- [ ] GradeEntry - Lançamento de notas com validação
- [ ] ActivityCreate - Criar atividades e trabalhos
- [ ] ActivityCorrection - Corrigir submissões
- [ ] PTD (Plano de Trabalho Docente)
- [ ] Caderno de Classe Digital
- [ ] Sistema de Ocorrências

### Secretaria (Prioridade Alta)
- [ ] StudentAdmin - CRUD completo de alunos
- [ ] Enrollment - Sistema de matrículas
- [ ] Transfers - Gestão de transferências
- [ ] Documents - Upload e gestão de documentos
- [ ] Export CSV/PDF - Relatórios administrativos
- [ ] Lista Piloto Generator

### Coordenação (Prioridade Média)
- [ ] Schedule Management - Edição de horários
- [ ] Teacher Management - Gestão de professores
- [ ] Pedagogical Reports - Relatórios pedagógicos
- [ ] Performance Analytics - Análises detalhadas
- [ ] Substitutions - Sistema de substituições

### Direção (Prioridade Média)
- [ ] Budget Management - Gestão orçamentária
- [ ] Strategic Reports - Relatórios estratégicos
- [ ] Resources Management - Gestão de recursos
- [ ] Goals Tracking - Acompanhamento de metas

### Comunicação (Prioridade Média)
- [ ] Messages System - Sistema de mensagens interno
- [ ] Notifications Center - Centro de notificações
- [ ] Announcements - Avisos e comunicados
- [ ] Parent Portal - Portal dos pais

### Integrações (Prioridade Baixa)
- [ ] Supabase Integration - Integração real com backend
- [ ] Biometric Device - Integração com leitor biométrico
- [ ] Email Service - Serviço de envio de emails
- [ ] SMS Gateway - Envio de SMS

## Sprint 4 - Melhorias e Testes
- [ ] Testes Vitest para componentes críticos
- [ ] Testes E2E com Playwright
- [ ] Otimização de performance
- [ ] Acessibilidade (WCAG 2.1)
- [ ] Documentação completa
- [ ] Deploy e CI/CD

## Backlog
- [ ] Mobile App (React Native)
- [ ] PWA Support
- [ ] Offline Mode
- [ ] Multi-language Support
- [ ] Analytics Dashboard
- [ ] API Documentation


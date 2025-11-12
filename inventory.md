# Inventário do Sistema Acadêmico

## Arquivos Criados/Modificados

### Serviços (src/services/)
- **api.ts** - Cliente Axios com interceptors para autenticação e refresh token
- **storage.service.ts** - Serviço de upload/download com suporte a Supabase e mock
- **biometrics.service.ts** - Serviço de biometria (ESP32) com endpoints mock
- **pdf.service.ts** - Geração de PDF (backend + fallback jsPDF client-side)

### Mocks (src/mocks/)
- **data.ts** - Dados mockados (usuários, turmas, alunos, notas, etc)
- **handlers.ts** - MSW handlers cobrindo endpoints essenciais
- **browser.ts** - Configuração do MSW worker

### Features (src/features/)
- **grades/GradesPage.tsx** - Página de notas e boletim com export PDF
- **attendance/AttendancePage.tsx** - Página de faltas e presenças
- **activities/ActivitiesPage.tsx** - Página de trabalhos com upload
- **schedule/SchedulePage.tsx** - Horário de aulas com status e legenda
- **materials/MaterialsPage.tsx** - Biblioteca de materiais por disciplina
- **students/StudentProfile.tsx** - Perfil com foto 3x4 e dados completos
- **teacher/ClassRoomPage.tsx** - Sala de aula com lista piloto e chamada biométrica

### Design System
- **styles/design-tokens.ts** - Tokens semânticos do design system

### Configurações
- **main.tsx** - Integração do MSW em modo desenvolvimento
- **App.tsx** - Novas rotas adicionadas

## Dependências Adicionadas
- axios
- @supabase/supabase-js
- msw
- jspdf
- jspdf-autotable

## Próximos Passos
Ver plan.md para roadmap detalhado.

# Changelog - Sistema Acadêmico

## [Sprint 1] - 2024-01-17

### Adicionado
- Serviço de API com Axios e interceptors
- Serviço de Storage com suporte Supabase + mock
- Serviço de Biometria (ESP32 mock)
- Serviço de PDF com jsPDF fallback
- MSW configurado para desenvolvimento
- Handlers mock para endpoints principais
- Design tokens semânticos
- Página de Notas e Boletim com export PDF
- Página de Faltas e Presenças
- Página de Atividades com upload
- Rotas protegidas no App.tsx

### Dependências
- axios@latest
- @supabase/supabase-js@latest
- msw@latest
- jspdf@latest
- jspdf-autotable@latest

## [Sprint 2] - 2024-01-18

### Adicionado
- Página de Sala de Aula (ClassRoomPage) com lista piloto e chamada biométrica
- Página de Horário de Aulas (SchedulePage) com status das aulas
- Página de Perfil do Aluno (StudentProfile) com upload de foto 3x4
- Página de Materiais de Estudo (MaterialsPage) com filtros por disciplina
- Rotas atualizadas para novas páginas
- Integração com serviços de biometria e storage

### Próximo Sprint
- Implementar GradeEntry (lançamento de notas pelo professor)
- Implementar ActivityCreate/Correction
- Adicionar áreas de Coordenação, Secretaria, Diretor e Admin

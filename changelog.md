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

### Próximo Sprint
- Implementar área do Professor (ClassRoom, GradeEntry)
- Completar área do Aluno (Schedule, Materials, Profile)

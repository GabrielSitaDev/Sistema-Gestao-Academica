// Mock data para MSW handlers

export const mockUsers = [
  {
    id: 'STU001',
    name: 'Ana Silva Santos',
    email: '123456@escola.edu.br',
    role: 'student',
    unitId: '001',
    unitName: 'Escola Estadual Central',
    rm: '123456',
    course: '3º Ano - Ensino Médio',
    status: 'active',
    avatar: '/avatars/student-default.png',
    biometricId: 'BIO_001',
  },
  {
    id: 'TEA001',
    name: 'Prof. Roberto Lima',
    email: 'roberto.lima@escola.edu.br',
    role: 'teacher',
    unitId: '001',
    unitName: 'Escola Estadual Central',
    status: 'active',
    avatar: '/avatars/teacher-default.png',
  },
];

export const mockClasses = [
  {
    id: 'CLASS_001',
    name: '3º A',
    subject: 'Matemática',
    teacherId: 'TEA001',
    teacherName: 'Prof. Roberto Lima',
    students: 32,
    schedule: '08:00 - 09:40',
    room: 'Sala 101',
  },
  {
    id: 'CLASS_002',
    name: '3º B',
    subject: 'Matemática',
    teacherId: 'TEA001',
    teacherName: 'Prof. Roberto Lima',
    students: 28,
    schedule: '10:00 - 11:40',
    room: 'Sala 102',
  },
];

export const mockStudents = [
  {
    id: 'STU001',
    name: 'Ana Silva Santos',
    rm: '123456',
    callNumber: 1,
    course: '3º Ano A',
    avatar: '/avatars/student-1.png',
    age: 17,
    observations: 'Aluna dedicada, participa ativamente das aulas.',
    biometricEnrolled: true,
  },
  {
    id: 'STU002',
    name: 'Carlos Oliveira',
    rm: '123457',
    callNumber: 2,
    course: '3º Ano A',
    avatar: '/avatars/student-2.png',
    age: 17,
    observations: 'Bom desempenho em exatas.',
    biometricEnrolled: true,
  },
  {
    id: 'STU003',
    name: 'Maria Fernandes',
    rm: '123458',
    callNumber: 3,
    course: '3º Ano A',
    avatar: '/avatars/student-3.png',
    age: 18,
    observations: '',
    biometricEnrolled: false,
  },
];

export const mockGrades = [
  {
    id: 'GRD_001',
    studentId: 'STU001',
    studentName: 'Ana Silva Santos',
    subject: 'Matemática',
    bimester1: 9.2,
    bimester2: 8.7,
    bimester3: 9.0,
    bimester4: null,
    average: 8.97,
    status: 'excellent',
  },
  {
    id: 'GRD_002',
    studentId: 'STU001',
    studentName: 'Ana Silva Santos',
    subject: 'Português',
    bimester1: 8.5,
    bimester2: 8.0,
    bimester3: 8.8,
    bimester4: null,
    average: 8.43,
    status: 'good',
  },
];

export const mockAttendance = [
  {
    id: 'ATT_001',
    studentId: 'STU001',
    date: '2024-01-15',
    classId: 'CLASS_001',
    subject: 'Matemática',
    status: 'present',
    verifiedBy: 'biometric',
  },
  {
    id: 'ATT_002',
    studentId: 'STU001',
    date: '2024-01-16',
    classId: 'CLASS_001',
    subject: 'Matemática',
    status: 'absent',
    justification: '',
  },
];

export const mockActivities = [
  {
    id: 'ACT_001',
    title: 'Trabalho de Geometria Analítica',
    subject: 'Matemática',
    description: 'Resolver exercícios do capítulo 5',
    dueDate: '2024-01-25',
    status: 'pending',
    weight: 2.0,
    maxGrade: 10,
  },
  {
    id: 'ACT_002',
    title: 'Redação sobre Modernismo',
    subject: 'Português',
    description: 'Análise de obra modernista',
    dueDate: '2024-01-20',
    status: 'submitted',
    submittedDate: '2024-01-18',
    weight: 1.5,
    grade: 8.5,
    maxGrade: 10,
  },
];

export const mockMaterials = [
  {
    id: 'MAT_001',
    title: 'Apostila de Geometria Analítica',
    subject: 'Matemática',
    type: 'pdf',
    url: '/materials/geometria-analitica.pdf',
    uploadedAt: '2024-01-10',
    uploadedBy: 'Prof. Roberto Lima',
  },
  {
    id: 'MAT_002',
    title: 'Slides - Funções Quadráticas',
    subject: 'Matemática',
    type: 'pptx',
    url: '/materials/funcoes-quadraticas.pptx',
    uploadedAt: '2024-01-12',
    uploadedBy: 'Prof. Roberto Lima',
  },
];

export const mockSchedule = [
  {
    day: 'Segunda-feira',
    classes: [
      { time: '07:30 - 08:20', subject: 'Matemática', teacher: 'Prof. Roberto', room: '101' },
      { time: '08:20 - 09:10', subject: 'Português', teacher: 'Prof. Ana', room: '203' },
      { time: '09:30 - 10:20', subject: 'História', teacher: 'Prof. Carlos', room: '105' },
      { time: '10:20 - 11:10', subject: 'Física', teacher: 'Prof. Maria', room: '301' },
    ],
  },
  {
    day: 'Terça-feira',
    classes: [
      { time: '07:30 - 08:20', subject: 'Química', teacher: 'Prof. João', room: '302' },
      { time: '08:20 - 09:10', subject: 'Biologia', teacher: 'Prof. Paula', room: '303' },
      { time: '09:30 - 10:20', subject: 'Geografia', teacher: 'Prof. Pedro', room: '106' },
      { time: '10:20 - 11:10', subject: 'Inglês', teacher: 'Prof. Laura', room: '204' },
    ],
  },
];

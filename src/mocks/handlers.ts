import { http, HttpResponse, delay } from 'msw';
import {
  mockUsers,
  mockClasses,
  mockStudents,
  mockGrades,
  mockAttendance,
  mockActivities,
  mockMaterials,
  mockSchedule,
} from './data';

const API_BASE = 'http://localhost:8080/api';

export const handlers = [
  // Auth endpoints
  http.post(`${API_BASE}/auth/login`, async ({ request }) => {
    await delay(800);
    const body = await request.json() as any;
    
    const user = mockUsers[0]; // Simplified mock login
    
    return HttpResponse.json({
      token: `mock_token_${Date.now()}`,
      refreshToken: `mock_refresh_${Date.now()}`,
      user,
      expiresIn: 3600,
    });
  }),
  
  http.post(`${API_BASE}/auth/logout`, async () => {
    await delay(300);
    return HttpResponse.json({ success: true });
  }),
  
  http.post(`${API_BASE}/auth/refresh`, async () => {
    await delay(300);
    return HttpResponse.json({
      token: `mock_token_refreshed_${Date.now()}`,
      expiresIn: 3600,
    });
  }),
  
  http.get(`${API_BASE}/user/me`, async () => {
    await delay(500);
    return HttpResponse.json(mockUsers[0]);
  }),
  
  // Student endpoints
  http.get(`${API_BASE}/student/:id`, async ({ params }) => {
    await delay(500);
    const student = mockStudents.find((s) => s.id === params.id) || mockStudents[0];
    return HttpResponse.json(student);
  }),
  
  http.get(`${API_BASE}/student/:id/attendance`, async ({ params }) => {
    await delay(500);
    const attendance = mockAttendance.filter((a) => a.studentId === params.id);
    return HttpResponse.json(attendance);
  }),
  
  http.get(`${API_BASE}/student/:id/activities`, async ({ params }) => {
    await delay(500);
    return HttpResponse.json(mockActivities);
  }),
  
  // Teacher endpoints
  http.get(`${API_BASE}/teacher/:id/classes`, async () => {
    await delay(500);
    return HttpResponse.json(mockClasses);
  }),
  
  // Grades endpoints
  http.get(`${API_BASE}/grades`, async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const studentId = url.searchParams.get('studentId');
    
    if (studentId) {
      const grades = mockGrades.filter((g) => g.studentId === studentId);
      return HttpResponse.json(grades);
    }
    
    return HttpResponse.json(mockGrades);
  }),
  
  http.post(`${API_BASE}/grades/bulk`, async ({ request }) => {
    await delay(800);
    const body = await request.json() as any;
    return HttpResponse.json({
      success: true,
      count: body.grades?.length || 0,
      message: 'Notas lançadas com sucesso',
    });
  }),
  
  // Attendance endpoints
  http.post(`${API_BASE}/attendance/bulk`, async ({ request }) => {
    await delay(800);
    const body = await request.json() as any;
    return HttpResponse.json({
      success: true,
      count: body.attendance?.length || 0,
      message: 'Presenças registradas com sucesso',
    });
  }),
  
  // Storage endpoints
  http.post(`${API_BASE}/storage/upload`, async ({ request }) => {
    await delay(1000);
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    return HttpResponse.json({
      path: `uploads/${Date.now()}-${file?.name || 'file'}`,
      signedUrl: `https://mock-storage.com/uploads/${Date.now()}-${file?.name || 'file'}`,
    });
  }),
  
  http.get(`${API_BASE}/storage/list`, async () => {
    await delay(500);
    return HttpResponse.json(mockMaterials);
  }),
  
  http.delete(`${API_BASE}/storage/:path`, async () => {
    await delay(500);
    return HttpResponse.json({ success: true });
  }),
  
  // Biometrics endpoints
  http.post(`${API_BASE}/biometrics/enroll`, async ({ request }) => {
    await delay(2000); // Simula tempo de leitura biométrica
    const body = await request.json() as any;
    
    return HttpResponse.json({
      success: true,
      biometricId: `BIO_${Date.now()}`,
      message: `Impressão digital cadastrada para ${body.studentName}`,
    });
  }),
  
  http.post(`${API_BASE}/biometrics/verify`, async () => {
    await delay(1500); // Simula tempo de verificação
    
    // Simula sucesso na verificação
    const student = mockStudents[0];
    return HttpResponse.json({
      success: true,
      studentId: student.id,
      studentName: student.name,
      confidence: 0.98,
      message: 'Aluno identificado com sucesso',
    });
  }),
  
  http.delete(`${API_BASE}/biometrics/:studentId`, async () => {
    await delay(500);
    return HttpResponse.json({
      success: true,
      message: 'Dados biométricos removidos',
    });
  }),
  
  http.get(`${API_BASE}/biometrics/enrolled`, async () => {
    await delay(500);
    return HttpResponse.json(
      mockStudents.filter((s) => s.biometricEnrolled)
    );
  }),
  
  http.get(`${API_BASE}/biometrics/device/status`, async () => {
    await delay(300);
    return HttpResponse.json({
      connected: true,
      model: 'ESP32 Fingerprint Reader',
      message: 'Dispositivo conectado e operacional',
    });
  }),
  
  // PDF endpoints
  http.post(`${API_BASE}/pdf/boletim`, async ({ request }) => {
    await delay(2000);
    const body = await request.json() as any;
    
    return HttpResponse.json({
      url: `https://mock-pdf.com/boletim-${body.studentId}-${Date.now()}.pdf`,
    });
  }),
  
  http.post(`${API_BASE}/pdf/attendance`, async () => {
    await delay(1500);
    return HttpResponse.json({
      url: `https://mock-pdf.com/attendance-${Date.now()}.pdf`,
    });
  }),
  
  http.post(`${API_BASE}/pdf/pedagogical-report`, async () => {
    await delay(1500);
    return HttpResponse.json({
      url: `https://mock-pdf.com/report-${Date.now()}.pdf`,
    });
  }),
  
  // Activities endpoints
  http.get(`${API_BASE}/activities`, async () => {
    await delay(500);
    return HttpResponse.json(mockActivities);
  }),
  
  http.post(`${API_BASE}/activities`, async ({ request }) => {
    await delay(800);
    const body = await request.json() as any;
    
    return HttpResponse.json({
      id: `ACT_${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    });
  }),
  
  // Materials endpoints
  http.get(`${API_BASE}/materials`, async () => {
    await delay(500);
    return HttpResponse.json(mockMaterials);
  }),
  
  // Schedule endpoints
  http.get(`${API_BASE}/schedule`, async () => {
    await delay(500);
    return HttpResponse.json(mockSchedule);
  }),
  
  // Classes endpoints
  http.get(`${API_BASE}/classes`, async () => {
    await delay(500);
    return HttpResponse.json(mockClasses);
  }),
  
  http.get(`${API_BASE}/classes/:id`, async ({ params }) => {
    await delay(500);
    const classData = mockClasses.find((c) => c.id === params.id) || mockClasses[0];
    return HttpResponse.json(classData);
  }),
  
  http.get(`${API_BASE}/classes/:id/students`, async () => {
    await delay(500);
    return HttpResponse.json(mockStudents);
  }),
];

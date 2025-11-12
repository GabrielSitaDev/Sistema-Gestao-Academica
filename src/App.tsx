import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { GradesPage } from "./features/grades/GradesPage";
import { AttendancePage } from "./features/attendance/AttendancePage";
import { ActivitiesPage } from "./features/activities/ActivitiesPage";
import { SchedulePage } from "./features/schedule/SchedulePage";
import { MaterialsPage } from "./features/materials/MaterialsPage";
import { StudentProfile } from "./features/students/StudentProfile";
import { ClassRoomPage } from "./features/teacher/ClassRoomPage";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Aluno */}
            <Route path="/grades" element={<GradesPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/assignments" element={<ActivitiesPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/profile" element={<StudentProfile />} />
            
            {/* Professor */}
            <Route path="/classes/:classId/room" element={<ClassRoomPage />} />
            
            {/* Geral */}
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

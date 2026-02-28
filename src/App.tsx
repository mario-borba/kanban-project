import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthContext";
import { AuthForm } from "./features/auth/AuthForm";
import { useAuth } from "./features/auth/useAuth";
import { SettingsPage } from "./features/dashboard/SettingsPage";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { CreateTaskForm } from "./components/CreateTaskForm";
import { TaskBoard } from "./components/TaskBoard";
import { PrivateLayout } from "./features/dashboard/PrivateLayout";

function DashboardPage() {
  return (
    <Box maxWidth="80rem" mx="auto" className="flex-1 w-full px-4 py-8">
      <Box height="4rem" mb="8">
        <Flex align="center" gap="4" height="100%">
          <Heading as="h1" size="8" weight="light">
            Quadro de Tarefas
          </Heading>
          <CreateTaskForm />
        </Flex>
      </Box>

      <TaskBoard />
    </Box>
  );
}
function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <AuthForm />}
        />

        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route
          path="/"
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

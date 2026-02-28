import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { TaskContextProvider } from "@/contexts/TasksContext";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UserSideBar } from "./UserSideBar";

export function PrivateLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <TaskContextProvider>
      <SidebarProvider defaultOpen>
        <UserSideBar />

        <SidebarInset className="flex flex-col min-h-screen">
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </TaskContextProvider>
  );
}

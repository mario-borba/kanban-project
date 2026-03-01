import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { TaskContextProvider } from "@/contexts/TasksContext";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserSideBar } from "./UserSideBar";

export function PrivateLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <TaskContextProvider>
      <SidebarProvider defaultOpen={false}>
        <UserSideBar />
        <SidebarInset className="flex items-center ">
          <header className="flex h-16 items-center px-4">
            <SidebarTrigger className="md:hidden" />
          </header>
          <main className="flex-1">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TaskContextProvider>
  );
}

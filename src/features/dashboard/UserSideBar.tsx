import { Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar, Text } from "@radix-ui/themes";
import { Settings, LogOut, Home } from "lucide-react";
import { useAuth } from "../auth/useAuth";
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarRail,
} from "../../components/ui/sidebar";

export const UserSideBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarRail />
      <SidebarHeader className="px-2">
        <div className="flex items-center gap-2">
          <Avatar
            src={user.avatar}
            fallback={user.username.charAt(0).toUpperCase()}
            radius="full"
            className="size-8"
          />

          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <Text as="p" weight="medium" size="2">
              {user.username}
            </Text>
            <Text as="p" size="1" color="gray">
              {user.email}
            </Text>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu className="m-2 justify-center">
          <SidebarMenuItem>
            <SidebarMenuButton
              className="justify-start"
              asChild
              isActive={location.pathname === "/dashboard"}
            >
              <Link to="/dashboard">
                <Home className="size-4" /> <span>Quadro</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={location.pathname === "/settings"}
            >
              <Link to="/settings">
                <Settings className="size-4" /> <span>Configurações</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              variant="outline"
              size="sm"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <LogOut className="size-4" /> <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

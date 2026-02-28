import React, { useState } from "react";
import { Avatar, Box, Button, Flex, Text } from "@radix-ui/themes";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";
import { MenuIcon, XIcon } from "@radix-ui/react-icons";

export const UserSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  return (
    <div className={`h-screen bg-card border-r border-border transition-all ${collapsed ? "w-16" : "w-56"}`}>
      <Flex direction="column" className="h-full p-4" gap="4">
        <Flex align="center" justify="between">
          <Flex align="center" gap="3">
            <Avatar size={collapsed ? "2" : "3"} src={user.avatar} fallback={user.username.charAt(0).toUpperCase()} radius="full" />
            {!collapsed && (
              <div>
                <Text weight="medium">{user.username}</Text>
                <Text size="1" color="gray">{user.email}</Text>
              </div>
            )}
          </Flex>
          <Button variant="ghost" onClick={() => setCollapsed((s) => !s)} aria-label="toggle sidebar">
            {collapsed ? <MenuIcon /> : <XIcon />}
          </Button>
        </Flex>

        <Box className="mt-4 flex-1">
          <nav className="flex flex-col gap-2">
            <NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-3 px-2 py-2 rounded ${isActive ? "bg-accent" : "hover:bg-accent/30"}`}>
              <span className="ml-1">🏠</span>
              {!collapsed && <span>Tarefas</span>}
            </NavLink>
            <NavLink to="/dashboard/settings" className={({ isActive }) => `flex items-center gap-3 px-2 py-2 rounded ${isActive ? "bg-accent" : "hover:bg-accent/30"}`}>
              <span>⚙️</span>
              {!collapsed && <span>Configurações</span>}
            </NavLink>
          </nav>
        </Box>

        <Flex direction="column" gap="2">
          <Button variant="soft" color="gray" onClick={() => (window.location.href = "/")}>Sair</Button>
          <Button color="red" variant="soft" onClick={logout}>Logout</Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default UserSidebar;

import { useState, type ReactNode } from "react";
import type { User } from "../../entities/User";
import { authService } from "../../services/auth";
import { AuthContext } from "./AuthContextBase";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    const found = await authService.login(username, password);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const loginWithGoogle = async () => {
    const googleUser = await authService.loginWithGoogle();
    setUser(googleUser);
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    const newUser = await authService.register(username, email, password);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user?.id) return;
    const updated = await authService.updateUser(user.id, updates);
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, loginWithGoogle, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

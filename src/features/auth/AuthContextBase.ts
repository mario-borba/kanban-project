import { createContext } from "react";
import type { User } from "../../entities/User";

export interface AuthContextData {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<User>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

import { Flex, Heading, Text } from "@radix-ui/themes";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useAuth } from "./useAuth";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const AuthForm: React.FC = () => {
  const { login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    const ok = await login(username, password);
    console.log("Login attempt:", { ok });
    if (!ok) {
      setError("Usuário ou senha inválidos");
    } else {
      navigate("/dashboard");
    }
  };

  const handleRegister = async () => {
    try {
      await register(username, email, password);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (e) {
      console.log(e);
      setError("Falha ao criar usuário");
    }
  };

  const handleGoogle = async () => {
    await loginWithGoogle();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg">
        <div className="mb-8">
          <Heading as="h1" size="7" align="center" className="font-bold">
            Entrar
          </Heading>
        </div>

        <Flex direction="column" gap="4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email ou usuário
            </label>
            <Input
              placeholder="seu@email.com"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              className="w-full"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Senha
            </label>
            <div className="relative">
              <Input
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-border cursor-pointer"
              />
              <span className="text-sm text-muted-foreground">Lembrar-me</span>
            </label>
            <button
              onClick={() => {}}
              className="text-sm text-blue-500 hover:text-blue-600 font-medium"
            >
              Esqueci a senha
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <Text color="tomato" className="text-sm">
              {error}
            </Text>
          )}

          {/* Sign In Button */}
          <Button
            onClick={handleLogin}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md"
          >
            Entrar
          </Button>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">
                Ou continue com
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleGoogle}
              variant="outline"
              className="flex items-center justify-center gap-2 border border-border hover:bg-accent"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Google</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 border border-border hover:bg-accent"
            >
              <FaGithub className="w-5 h-5" />
              <span>GitHub</span>
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center pt-4">
            <Text size="2" className="text-muted-foreground">
              Não tem conta?{" "}
              <button
                onClick={handleRegister}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Criar uma agora
              </button>
            </Text>
          </div>
        </Flex>
      </div>
    </div>
  );
};

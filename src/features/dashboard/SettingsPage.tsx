import { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Text, Avatar } from "@radix-ui/themes";
import z from "zod";
import { useAuth } from "../auth/useAuth";
import { Input } from "../../components/ui/input";

export const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // keep avatar in sync if user changes externally
    setAvatar(user?.avatar);
  }, [user?.avatar]);

  if (!user) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password && password !== confirmPassword) {
      setError("As senhas não conferem");
      return;
    }

    const updates: Record<string, any> = {};
    if (avatar) updates.avatar = avatar;
    if (password) updates.password = password;

    try {
      await updateUser(updates);
      setSuccess("Perfil atualizado com sucesso");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setError("Falha ao atualizar perfil");
    }
  };

  return (
    <Box className="p-8">
      <Heading as="h2" size="7" className="mb-4">
        Configurações do Usuário
      </Heading>

      <form onSubmit={handleSubmit} className="max-w-md">
        <Flex direction="column" gap="4">
          <div>
            <Text as="label" htmlFor="avatar" className="block mb-2">
              Avatar (base64)
            </Text>
            <div className="flex items-center gap-4">
              <Avatar
                src={avatar}
                fallback={user.username.charAt(0).toUpperCase()}
                radius="full"
                className="size-12"
              />
              <Input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div>
            <Text as="label" htmlFor="password" className="block mb-2">
              Nova senha
            </Text>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Text as="label" htmlFor="confirmPassword" className="block mb-2">
              Confirmar senha
            </Text>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && (
            <Text color="tomato" className="text-sm">
              {error}
            </Text>
          )}
          {success && (
            <Text color="green" className="text-sm">
              {success}
            </Text>
          )}

          <Button type="submit">Salvar alterações</Button>
        </Flex>
      </form>
    </Box>
  );
};

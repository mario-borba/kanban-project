# Kanban Project

Aplicação simples de quadro Kanban em React + Vite, usando `json-server` como backend de desenvolvimento.

## Funcionalidades atuais

- Cadastro/Autenticação de usuário (usuário+senha ou simulado via Google)
- CRUD de tarefas (status, prioridade, descrição)
- Confirmação de exclusão com diálogo estilizado

## Estrutura

- `src/entities` — tipos (Task, User)
- `src/services/api.ts` — chamadas HTTP para tarefas e autenticação
- `src/contexts` — `TasksContext` e `AuthContext` para estado global
- `src/components` — formulários, cards e layout

## Como rodar

1. **Instale dependências**
   ```bash
   npm install
   ```
2. **Inicie o servidor fake**
   ```bash
   npm run json-server
   ```
   Ele serve `db.json` em `http://localhost:3000`
3. **Inicie o front-end**
   ```bash
   npm run dev
   # ou, se preferir usar Bun:
   # bun install            # instala dependências (cria bun.lockb)
   # bun run dev           # inicia o Vite
   ```
4. Abra `http://localhost:5173` no navegador.

> Se quiser levantar o servidor JSON junto com o dev server: `npm run dev:all` ou `bun run dev:all`.

> O login é obrigatório; a primeira tela exibe um formulário com entradas para usuário, email e senha.
> O botão "Entrar com Google" retorna um usuário mock automaticamente.

## API de autenticação

O backend fake expõe os seguintes endpoints via `json-server`:

- `GET /users?username=...&password=...` — valida login
- `POST /users` — registra novo usuário (campos: `username`, `email`, `password`)

Os dados de usuários ficam em `db.json` dentro da chave `users`.

## Observações

- Não há persistência de sessão (refresh da página limpa o usuário);
- Recuperação de senha é apenas placeholder;
- Para melhorar, pode-se integrar um verdadeiro OAuth ou JWT.

## Estrutura de desenvolvimento

- Componentes usam `@radix-ui/themes`; inputs são `TextField.Root`
- Hook `useConfirm` exibe diálogos de confirmação reutilizáveis.

---

Qualquer dúvida, abra uma issue ou me pergunte diretamente! 😄
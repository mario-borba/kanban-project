import type { Task } from "../entities/Task";
import type { User } from "../entities/User";

export const taskService = {
  async fetchTasksByUserId(userId: string): Promise<Task[]> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks?userId=${userId}`
    );
    const data: Task[] = await response.json();
    return data;
  },

  async fetchTasks(): Promise<Task[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
    const data: Task[] = await response.json();
    return data;
  },

  async createTask(attributes: Omit<Task, "id">): Promise<Task> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attributes),
    });
    const newTask: Task = await response.json();
    return newTask;
  },

  async updateTask(
    id: string,
    attributes: Partial<Omit<Task, "id">>
  ): Promise<Task> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attributes),
      }
    );
    const updateTask: Task = await response.json();
    return updateTask;
  },

  async deleteTask(id: string): Promise<void> {
    await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
  },
};

export const authService = {
  async login(identifier: string, password: string): Promise<User | null> {
    // Accept either username or email as identifier. json-server only supports
    // filtering via query params (AND), so we try username first, then email.
    const api = import.meta.env.VITE_API_URL;

    // Try by username
    const respByUsername = await fetch(
      `${api}/users?username=${encodeURIComponent(identifier)}&password=${encodeURIComponent(
        password
      )}`
    );
    const usersByUsername: Array<User & { password?: string }> = await respByUsername.json();
    if (usersByUsername.length > 0) return usersByUsername[0];

    // Try by email
    const respByEmail = await fetch(
      `${api}/users?email=${encodeURIComponent(identifier)}&password=${encodeURIComponent(
        password
      )}`
    );
    const usersByEmail: Array<User & { password?: string }> = await respByEmail.json();
    return usersByEmail.length > 0 ? usersByEmail[0] : null;
  },

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const user: User = await response.json();
    return user;
  },

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${userId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      }
    );
    const user: User = await response.json();
    return user;
  },

  async getUserById(userId: string): Promise<User | null> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${userId}`
    );
    if (!response.ok) return null;
    const user: User = await response.json();
    return user;
  },

  async loginWithGoogle(): Promise<User> {
    // In a real app we'd call an OAuth endpoint. Here we just return a mock user.
    return {
      id: Math.random().toString(36).substring(2, 9),
      username: "google_user",
      email: "user@gmail.com",
    };
  },
};

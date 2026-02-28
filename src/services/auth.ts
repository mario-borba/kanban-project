import type { User } from "../entities/User";

export const authService = {
  async login(
    identifier: string,
    password: string,
  ): Promise<(User & { password?: string }) | null> {
    const api = import.meta.env.VITE_API_URL;

    console.log(
      "authService.login: api=",
      api,
      "identifier(length)=",
      String(identifier).length,
    );

    try {
      const respByUsername = await fetch(
        `${api}/users?username=${encodeURIComponent(identifier)}&password=${encodeURIComponent(
          password,
        )}`,
      );

      console.log("respByUsername", {
        status: respByUsername.status,
        ok: respByUsername.ok,
        url: respByUsername.url,
      });

      if (respByUsername.ok) {
        const usersByUsername: Array<User & { password?: string }> =
          await respByUsername.json();
        console.log("usersByUsername.count", usersByUsername.length);
        if (usersByUsername.length > 0) return usersByUsername[0];
      } else {
        const text = await respByUsername.text().catch(() => null);
        console.warn("respByUsername not ok", respByUsername.status, text);
      }

      const respByEmail = await fetch(
        `${api}/users?email=${encodeURIComponent(identifier)}&password=${encodeURIComponent(
          password,
        )}`,
      );

      console.log("respByEmail", {
        status: respByEmail.status,
        ok: respByEmail.ok,
        url: respByEmail.url,
      });

      if (respByEmail.ok) {
        const usersByEmail: Array<User & { password?: string }> =
          await respByEmail.json();
        console.log("usersByEmail.count", usersByEmail.length);
        if (usersByEmail.length > 0) return usersByEmail[0];
        // Fallback: se as buscas por query retornaram vazias, busque todos e valide localmente
        try {
          const respAll = await fetch(`${api}/users`);
          if (respAll.ok) {
            const allUsers: Array<User & { password?: string }> =
              await respAll.json();
            console.warn("authService.debug: all users count", allUsers.length);
            const found = allUsers.find(
              (u) =>
                (u.username === identifier || u.email === identifier) &&
                u.password === password,
            );
            if (found) {
              console.log("authService.debug: found by fallback", found);
              return found;
            }
          } else {
            console.warn(
              "authService.debug: failed to fetch all users",
              respAll.status,
            );
          }
        } catch (e) {
          console.warn("authService.debug: error fetching all users", e);
        }
        return null;
      } else {
        const text = await respByEmail.text().catch(() => null);
        console.warn("respByEmail not ok", respByEmail.status, text);
        return null;
      }
    } catch (err) {
      console.error("authService.login error", err);
      return null;
    }
  },

  async register(
    username: string,
    email: string,
    password: string,
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
      },
    );
    const user: User = await response.json();
    return user;
  },

  async getUserById(userId: string): Promise<User | null> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${userId}`,
    );
    if (!response.ok) return null;
    const user: User = await response.json();
    return user;
  },

  async loginWithGoogle(): Promise<User> {
    return {
      id: Math.random().toString(36).substring(2, 9),
      username: "google_user",
      email: "user@gmail.com",
    } as User;
  },
};

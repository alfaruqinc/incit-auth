import type {
  CheckAuth,
  LoginForm,
  LoginResponse,
  LogoutResponse,
  RegisterForm,
  RegisterResponse,
} from "../types/auth";

const BASE_URL = "http://localhost:3000/auth";

export const checkAuth = async (): Promise<CheckAuth> => {
  const res = await fetch(BASE_URL, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    if (res.status === 401) {
      return {
        isAuthenticated: false,
      };
    }

    throw new Error("something went wrong");
  }

  return await res.json();
};

export const register = async (
  register: RegisterForm,
): Promise<RegisterResponse> => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(register),
    credentials: "include",
  });

  if (!res.ok) {
    const error = (await res.json()) as { error: string };

    throw new Error(error.error);
  }

  return res.json();
};

export const login = async (login: LoginForm): Promise<LoginResponse> => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(login),
    credentials: "include",
  });

  if (!res.ok) {
    const error = (await res.json()) as { error: string };
    throw new Error(error.error);
  }

  return res.json();
};

export const logout = async (): Promise<LogoutResponse> => {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const error = (await res.json()) as { error: string };
    throw new Error(error.error);
  }

  return res.json();
};

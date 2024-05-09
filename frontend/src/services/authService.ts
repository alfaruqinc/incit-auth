import type { RegisterForm, RegisterResponse } from "../types/auth";

const BASE_URL = "http://localhost:3000/auth";

export const register = async (
  register: RegisterForm,
): Promise<RegisterResponse> => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(register),
  });

  if (!res.ok) {
    const error = (await res.json()) as { error: string };

    throw new Error(error.error);
  }

  return res.json();
};

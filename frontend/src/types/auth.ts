export interface CheckAuth {
  isAuthenticated: boolean;
}

export interface RegisterForm {
  email: string;
  name: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  token: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface LogoutResponse {
  message: string;
}
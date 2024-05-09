export interface RegisterForm {
  email: string;
  name: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  token: string;
}

}

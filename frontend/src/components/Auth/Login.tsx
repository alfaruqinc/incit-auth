import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { login } from "../../services/authService";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      setEmail("");
      setPassword("");
      alert("success login");

      window.location.reload();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({ email, password });
  };

  const loginForm = () => {
    return (
      <div>
        <h1>LOGIN</h1>
        <form onSubmit={handleLogin}>
          <label>
            <span>email</span>
            <input
              type="text"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            <span>password</span>
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  return loginForm();
};

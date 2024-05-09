import { FormEvent, useState } from "react";
import { register } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      setEmail("");
      setPassword("");
      alert("success create account");
      window.location.reload();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({ email, name, password });
  };

  const registerForm = () => {
    return (
      <div>
        <h1>REGISTER</h1>
        <form onSubmit={handleRegister}>
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
            <span>name</span>
            <input
              type="text"
              value={name}
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
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
          <button type="submit">register</button>
        </form>
      </div>
    );
  };

  return <>{registerForm()}</>;
};

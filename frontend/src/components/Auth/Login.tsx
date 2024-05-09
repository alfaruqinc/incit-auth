import { FormEvent, useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

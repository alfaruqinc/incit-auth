import { FormEvent, useState } from "react";

function App() {
  const [show, setShow] = useState("");

  const authBtn = () => {
    return (
      <div>
        <button onClick={() => setShow("login")}>login</button>
        <button onClick={() => setShow("register")}>register</button>
      </div>
    );
  };

  return (
    <>
      <h1>Auth</h1>
      {authBtn()}
      {show === "login" && <Login />}
      {show === "register" && <Register />}
    </>
  );
}

export default App;

const Login = () => {
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

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

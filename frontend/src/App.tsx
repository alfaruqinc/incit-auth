import { useState } from "react";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";

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

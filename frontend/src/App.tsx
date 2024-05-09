import { useState } from "react";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { useMutation } from "@tanstack/react-query";
import { logout } from "./services/authService";

function App() {
  const [show, setShow] = useState("");

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      console.log(data);
      alert("success logout");

      window.location.reload();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const authBtn = () => {
    return (
      <div>
        <button onClick={() => setShow("login")}>login</button>
        <button onClick={() => setShow("register")}>register</button>
        <button onClick={() => mutation.mutate()}>logout</button>
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

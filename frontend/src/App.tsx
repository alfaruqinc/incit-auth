import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Register } from "./components/Auth/Register";
import { checkAuth, logout } from "./services/authService";

function App() {
  const [show, setShow] = useState("");

  const { data } = useQuery({ queryKey: ["auth"], queryFn: checkAuth });

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      alert("success logout");
      window.location.reload();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const authBtn = () => {
    if (data?.isAuthenticated) {
      return <button onClick={() => mutation.mutate()}>logout</button>;
    }

    return (
      <div>
        <Link to="login">login</Link>
        <button onClick={() => setShow("register")}>register</button>
      </div>
    );
  };

  const header = () => {
    if (data?.isAuthenticated) return <h1>Dashboard</h1>;

    return <h1>INCIT Auth</h1>;
  };

  return (
    <>
      {header()}
      {authBtn()}
      {show === "register" && <Register />}
    </>
  );
}

export default App;

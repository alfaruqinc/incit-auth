import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { checkAuth, logout } from "./services/authService";

function App() {
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
        <Link to="register">register</Link>
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
    </>
  );
}

export default App;

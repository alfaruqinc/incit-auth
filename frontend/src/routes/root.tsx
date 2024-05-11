import { redirect } from "react-router-dom";
import App from "../App";
import { checkAuth } from "../services/authService";

export async function loader() {
  const data = await checkAuth();
  if (data.isAuthenticated) return redirect("/dashboard");
  return data;
}

export const Root = () => {
  return <App />;
};

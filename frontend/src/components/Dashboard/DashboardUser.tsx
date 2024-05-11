import { redirect, useLoaderData } from "react-router-dom";
import { checkAuth } from "../../services/authService";
import { CheckAuth } from "../../types/auth";

export const loader = async () => {
  const data = await checkAuth();

  if (!data.isAuthenticated) {
    return redirect("/");
  }

  return data;
};

export const DashboardUser = () => {
  const data = useLoaderData() as CheckAuth;

  return (
    <>
      <h1>Dashboard User</h1>
      <h4>hello, {data.user.name}</h4>
    </>
  );
};

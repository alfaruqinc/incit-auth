import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./components/Auth/Login.tsx";
import { Register } from "./components/Auth/Register.tsx";
import {
  DashboardUser,
  loader as dashboardLoader,
} from "./components/Dashboard/DashboardUser.tsx";
import { Root } from "./routes/root.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    loader: dashboardLoader,
    element: <DashboardUser />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);

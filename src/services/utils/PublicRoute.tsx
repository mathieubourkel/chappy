import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
 // const token = localStorage.getItem('token');
  const token = true;
  return token ? <Navigate to="/dashboard" /> : <Outlet />;
}
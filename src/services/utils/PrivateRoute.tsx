import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {

  //const token = localStorage.getItem('token');
  const token = true;
  return token ? <Outlet /> : <Navigate to="/" />;
  
}
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  setLogged: (bool:boolean) => void;
}
export default function PrivateRoute({setLogged}:Props) {

  const token = localStorage.getItem('token')
  token && setLogged(true)
  return token ? 
  <>
    <Outlet /> 
  </>
  : 
  <>
    <Navigate to="/" />
  </>

}

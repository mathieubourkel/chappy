import { Navigate, Outlet } from "react-router-dom";

type Props = {
  isLogged: boolean
}

export default function PrivateRoute({isLogged}:Props) {


  
  return isLogged ? 
  <>
    <Outlet /> 
  </>
  : 
  <>
    <Navigate to="/" />
  </>

}

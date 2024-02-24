import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { socket } from "./WebSocket";
import { Popup } from "../../components/Layers/Popup/Popup";

export default function PrivateRoute() {
  const [popUp, setPopUp] = useState<string[]>([])
  useEffect(() => {
    socket.on('connect', () => {
      console.log("Connected...")
    });

    socket.on('disconnect', () => {
      console.log("You have been disconnected")
    });

    socket.on('notifToClient', (e) => {
      console.log(e)
      setPopUp((prevPopups) => [...prevPopups, e])
      setTimeout(() => {
        removePopup(e);
      }, 10000);
    });

    const removePopup = (newPopup:string) => {
      setPopUp((prevPopups) => prevPopups.filter((popup) => popup !== newPopup));
    };

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('notifToClient');
    };
  }, []);

  const token = localStorage.getItem('token');
  return token ? <>
  <Outlet/>
  <Popup popUp={popUp}/>
  </> : <Navigate to="/" />;
  
}
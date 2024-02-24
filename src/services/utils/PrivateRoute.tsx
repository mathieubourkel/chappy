import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Popup } from "../../components/Layers/Popup/Popup";
import { ManageWebSocket } from "./ManageWebSocket";

export default function PrivateRoute() {
  const [popUp, setPopUp] = useState<string[]>([])
  const socket = new ManageWebSocket().socket
  useEffect(() => {
    socket.on('connect', () => {
      console.log("Connected...")
    });

    socket.on('disconnect', () => {
      console.log("You have been disconnected")
    });

    socket.off("disconnect", () => {
      console.log("client disconnect..")
    })

    socket.on('notifToClient', (e) => {
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
  }, [socket]);

  const token = localStorage.getItem('token');
  return token ? <>
  <Outlet/>
  <Popup popUp={popUp}/>
  </> : <Navigate to="/" />;
  
}
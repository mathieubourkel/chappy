/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket, io } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../interfaces/chat.interface";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3000");

const userId = localStorage.getItem("id") ||""
const userName = localStorage.getItem("name") ||""

export const sendMessage = (content:any) => {
    if (userId) {
      socket.emit('notif', {
        user: {
          userId,
          userName
        },
        timeSent: new Date(Date.now()).toLocaleString('fr-FR'),
        message:  content,
      });
    }
  };
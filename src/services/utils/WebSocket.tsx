/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket, io } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../interfaces/websocket.interface";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_WEB_SOCKET_HOST}:${import.meta.env.VITE_WEB_SOCKET_PORT}`, {path: '/websocket', auth: {token: localStorage.getItem("token")}});
export const sendMessage = (content:string, receivers: string | string[]) => {
      socket.emit('notifFromClient', {
        message:  content,
        users: receivers
      });
  };
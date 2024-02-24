import { Socket, io } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../interfaces/websocket.interface";


export class ManageWebSocket {

    socket: Socket<ServerToClientEvents, ClientToServerEvents>
    
    constructor(){
        this.socket = io(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_WEB_SOCKET_HOST}:${import.meta.env.VITE_WEB_SOCKET_PORT}`, {path: '/websocket', auth: {token: localStorage.getItem("token")}});
    }
    
    sendMessage = (content:string, receivers: string | string[]) => {
    this.socket.emit('notifFromClient', {
        message:  content,
        users: receivers
    });
    };

}
export interface ServerToClientEvents {
    notif: (e: Message) => void;
  }
  
  // Interface for when clients emit events to the server.
  export interface ClientToServerEvents {
    notif: (e: Message) => void;
  }

  export interface User {
    userId: string;
    userName: string;
  }
  
  export interface Message {
    user: User;
    timeSent: string;
    message: string;
  }
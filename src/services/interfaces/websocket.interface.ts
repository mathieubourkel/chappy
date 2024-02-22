export interface ServerToClientEvents {
    notifToClient: (e: string) => void;
  }
  
  // Interface for when clients emit events to the server.
  export interface ClientToServerEvents {
    notifFromClient: (e: Message) => void;
  }

  export interface Message {
    users: string | string[]
    message: string;
  }
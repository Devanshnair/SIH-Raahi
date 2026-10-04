import React, { createContext, useMemo, useContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ?? "https://raahi-socket.onrender.com/";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("Socket must be used within a SocketProvider");
  }
  return socket;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useMemo(() => io(SOCKET_URL), []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

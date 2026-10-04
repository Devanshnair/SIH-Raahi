import React, {
  createContext,
  useMemo,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type SocketEventHandler<T = unknown> = (data: T) => void;

type SignalingSocket = {
  emit: (event: string, data: unknown) => void;
  on: <T = unknown>(event: string, handler: SocketEventHandler<T>) => void;
  off: <T = unknown>(event: string, handler: SocketEventHandler<T>) => void;
  disconnect: () => void;
};

const toWebSocketUrl = (url: string): string => {
  if (url.startsWith("ws://") || url.startsWith("wss://")) {
    return url;
  }

  if (url.startsWith("https://")) {
    return url.replace("https://", "wss://");
  }

  if (url.startsWith("http://")) {
    return url.replace("http://", "ws://");
  }

  return url;
};

class BunSocketClient implements SignalingSocket {
  private socket: WebSocket;
  private readonly listeners = new Map<string, Set<SocketEventHandler>>();
  private readonly messageQueue: string[] = [];

  constructor(url: string) {
    this.socket = new WebSocket(url);

    this.socket.addEventListener("open", () => {
      while (this.messageQueue.length > 0) {
        const message = this.messageQueue.shift();
        if (message) {
          this.socket.send(message);
        }
      }
    });

    this.socket.addEventListener("message", (messageEvent) => {
      try {
        const payload = JSON.parse(String(messageEvent.data));
        const handlers = this.listeners.get(payload.event);

        if (handlers) {
          handlers.forEach((handler) => handler(payload.data));
        }
      } catch {
        // Ignore malformed payloads.
      }
    });
  }

  emit(event: string, data: unknown): void {
    const payload = JSON.stringify({ event, data });

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(payload);
      return;
    }

    this.messageQueue.push(payload);
  }

  on<T = unknown>(event: string, handler: SocketEventHandler<T>): void {
    const handlers = this.listeners.get(event) ?? new Set();
    handlers.add(handler as SocketEventHandler);
    this.listeners.set(event, handlers);
  }

  off<T = unknown>(event: string, handler: SocketEventHandler<T>): void {
    const handlers = this.listeners.get(event);

    if (!handlers) {
      return;
    }

    handlers.delete(handler as SocketEventHandler);

    if (handlers.size === 0) {
      this.listeners.delete(event);
    }
  }

  disconnect(): void {
    this.messageQueue.length = 0;
    this.listeners.clear();
    this.socket.close();
  }
}

const SOCKET_URL = toWebSocketUrl(
  import.meta.env.VITE_SOCKET_URL ?? "wss://raahi-socket.onrender.com/",
);

const SocketContext = createContext<SignalingSocket | null>(null);

export const useSocket = (): SignalingSocket => {
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
  const socket = useMemo(() => new BunSocketClient(SOCKET_URL), []);

  useEffect(() => {
    return () => socket.disconnect();
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

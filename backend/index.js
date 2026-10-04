const DEFAULT_PORT = 8000;

const socketTopic = (socketId) => `socket:${socketId}`;
const roomTopic = (room) => `room:${room}`;

const toJson = (event, data) => JSON.stringify({ event, data });

const parseClientMessage = (rawMessage) => {
  const message = typeof rawMessage === "string" ? rawMessage : rawMessage.toString();
  const payload = JSON.parse(message);

  if (!payload || typeof payload !== "object" || typeof payload.event !== "string") {
    throw new Error("Invalid message format");
  }

  return payload;
};

export const createSignalingServer = (options = {}) => {
  const port = Number(options.port ?? Bun.env.PORT ?? DEFAULT_PORT);
  const allowedOrigins = options.allowedOrigins ?? Bun.env.ALLOWED_ORIGINS ?? "*";
  const silent = options.silent ?? false;

  const emailToSocketIdMap = new Map();
  const socketIdToEmailMap = new Map();
  const socketIdToSocketMap = new Map();

  const parsedOrigins = String(allowedOrigins)
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  const isOriginAllowed = (origin) => {
    if (parsedOrigins.length === 0 || parsedOrigins.includes("*")) {
      return true;
    }

    return origin ? parsedOrigins.includes(origin) : false;
  };

  const sendEvent = (socket, event, data) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(toJson(event, data));
    }
  };

  let server;

  const publishToSocket = (socketId, event, data) => {
    if (!socketId) {
      return;
    }

    server.publish(socketTopic(socketId), toJson(event, data));
  };

  const publishToRoom = (room, event, data) => {
    if (!room) {
      return;
    }

    server.publish(roomTopic(room), toJson(event, data));
  };

  server = Bun.serve({
    port,
    fetch(request, serverRef) {
      if (request.headers.get("upgrade")?.toLowerCase() === "websocket") {
        const origin = request.headers.get("origin");

        if (!isOriginAllowed(origin)) {
          return new Response("Origin not allowed", { status: 403 });
        }

        if (serverRef.upgrade(request)) {
          return;
        }

        return new Response("WebSocket upgrade failed", { status: 500 });
      }

      return new Response("OK", { status: 200 });
    },
    websocket: {
      open(socket) {
        const socketId = crypto.randomUUID();
        socket.data = { socketId, email: null };

        socketIdToSocketMap.set(socketId, socket);
        socket.subscribe(socketTopic(socketId));

        if (!silent) {
          console.log("Socket Connected", socketId);
        }
      },
      message(socket, rawMessage) {
        let payload;

        try {
          payload = parseClientMessage(rawMessage);
        } catch (error) {
          sendEvent(socket, "error", { message: "Invalid message payload" });
          return;
        }

        const { event, data = {} } = payload;
        const from = socket.data?.socketId;

        switch (event) {
          case "room:join": {
            const { email, room } = data;

            if (typeof email !== "string" || typeof room !== "string") {
              sendEvent(socket, "error", { message: "Invalid room join payload" });
              return;
            }

            emailToSocketIdMap.set(email, from);
            socketIdToEmailMap.set(from, email);
            socket.data = { ...socket.data, email };

            publishToRoom(room, "user:joined", { email, id: from });
            socket.subscribe(roomTopic(room));
            sendEvent(socket, "room:join", { email, room });
            break;
          }
          case "user:call": {
            const { to, offer } = data;
            publishToSocket(to, "incomming:call", { from, offer });
            break;
          }
          case "call:accepted": {
            const { to, ans } = data;
            publishToSocket(to, "call:accepted", { from, ans });
            break;
          }
          case "peer:nego:needed": {
            const { to, offer } = data;
            publishToSocket(to, "peer:nego:needed", { from, offer });
            break;
          }
          case "peer:nego:done": {
            const { to, ans } = data;
            publishToSocket(to, "peer:nego:final", { from, ans });
            break;
          }
          default:
            sendEvent(socket, "error", { message: `Unsupported event: ${event}` });
        }
      },
      close(socket) {
        const socketId = socket.data?.socketId;
        const email = socketIdToEmailMap.get(socketId);

        socketIdToSocketMap.delete(socketId);
        socketIdToEmailMap.delete(socketId);

        if (email !== undefined && emailToSocketIdMap.get(email) === socketId) {
          emailToSocketIdMap.delete(email);
        }

        if (!silent) {
          console.log("Socket Disconnected", socketId);
        }
      },
    },
  });

  if (!silent) {
    console.log(`Socket server listening on port ${server.port}`);
  }

  return {
    port: server.port,
    stop: (closeActiveConnections = true) => server.stop(closeActiveConnections),
  };
};

if (import.meta.main) {
  createSignalingServer();
}

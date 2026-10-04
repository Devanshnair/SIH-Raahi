import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { createSignalingServer } from "./index.js";

const TEST_TIMEOUT_MS = 2_000;

const createClient = async (url) => {
  const socket = new WebSocket(url);
  const eventQueue = [];
  const waiters = new Map();

  socket.addEventListener("message", (event) => {
    const payload = JSON.parse(event.data);
    const queue = waiters.get(payload.event);

    if (queue && queue.length > 0) {
      const resolve = queue.shift();
      resolve(payload.data);
      return;
    }

    eventQueue.push(payload);
  });

  await new Promise((resolve, reject) => {
    const timeoutId = setTimeout(
      () => reject(new Error("Timed out waiting for websocket open")),
      TEST_TIMEOUT_MS,
    );

    socket.addEventListener("open", () => {
      clearTimeout(timeoutId);
      resolve();
    });

    socket.addEventListener("error", (error) => {
      clearTimeout(timeoutId);
      reject(error);
    });
  });

  return {
    send(event, data) {
      socket.send(JSON.stringify({ event, data }));
    },
    waitFor(eventName, timeout = TEST_TIMEOUT_MS) {
      const queued = eventQueue.find((item) => item.event === eventName);
      if (queued) {
        eventQueue.splice(eventQueue.indexOf(queued), 1);
        return Promise.resolve(queued.data);
      }

      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          const queue = waiters.get(eventName) ?? [];
          waiters.set(
            eventName,
            queue.filter((resolver) => resolver !== wrappedResolve),
          );
          reject(new Error(`Timed out waiting for event ${eventName}`));
        }, timeout);

        const wrappedResolve = (payload) => {
          clearTimeout(timeoutId);
          resolve(payload);
        };

        const queue = waiters.get(eventName) ?? [];
        queue.push(wrappedResolve);
        waiters.set(eventName, queue);
      });
    },
    close() {
      socket.close();
    },
  };
};

describe("signaling websocket server", () => {
  let server;
  let socketUrl;

  beforeAll(() => {
    server = createSignalingServer({ port: 0, silent: true });
    socketUrl = `ws://127.0.0.1:${server.port}`;
  });

  afterAll(() => {
    server.stop(true);
  });

  test("routes room join, direct call, and negotiation events", async () => {
    const alice = await createClient(socketUrl);
    const bob = await createClient(socketUrl);

    alice.send("room:join", { email: "alice@example.com", room: "r1" });
    bob.send("room:join", { email: "bob@example.com", room: "r1" });

    await expect(alice.waitFor("room:join")).resolves.toEqual({
      email: "alice@example.com",
      room: "r1",
    });
    await expect(bob.waitFor("room:join")).resolves.toEqual({
      email: "bob@example.com",
      room: "r1",
    });

    const bobJoined = await alice.waitFor("user:joined");
    expect(bobJoined.email).toBe("bob@example.com");
    expect(typeof bobJoined.id).toBe("string");

    alice.send("user:call", { to: bobJoined.id, offer: { sdp: "offer" } });
    const incomingCall = await bob.waitFor("incomming:call");
    expect(incomingCall.offer).toEqual({ sdp: "offer" });

    bob.send("call:accepted", { to: incomingCall.from, ans: { sdp: "answer" } });
    await expect(alice.waitFor("call:accepted")).resolves.toEqual({
      from: bobJoined.id,
      ans: { sdp: "answer" },
    });

    alice.send("peer:nego:needed", { to: bobJoined.id, offer: { sdp: "nego-offer" } });
    const negoNeeded = await bob.waitFor("peer:nego:needed");
    expect(negoNeeded).toEqual({
      from: incomingCall.from,
      offer: { sdp: "nego-offer" },
    });

    bob.send("peer:nego:done", { to: negoNeeded.from, ans: { sdp: "nego-answer" } });
    await expect(alice.waitFor("peer:nego:final")).resolves.toEqual({
      from: bobJoined.id,
      ans: { sdp: "nego-answer" },
    });

    alice.close();
    bob.close();
  });
});

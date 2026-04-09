type ClientInfo = {
  username: string;
  roomId: string;
};

type JoinMessage = { type: "join"; username?: string; roomId?: string };
type ChatMessage = { type: "message"; message?: string; timestamp?: string };
type ReactionMessage = { type: "reaction"; reaction?: string };

type ClientAttachment = ClientInfo;

function toText(message: string | ArrayBuffer): string {
  if (typeof message === "string") return message;
  return new TextDecoder().decode(message);
}

function json(obj: unknown): string {
  return JSON.stringify(obj);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isClientAttachment(value: unknown): value is ClientAttachment {
  return (
    isRecord(value) && typeof value["username"] === "string" && typeof value["roomId"] === "string"
  );
}

function isJoinMessage(value: unknown): value is JoinMessage {
  return isRecord(value) && value["type"] === "join";
}

function isChatMessage(value: unknown): value is ChatMessage {
  return isRecord(value) && value["type"] === "message";
}

function isReactionMessage(value: unknown): value is ReactionMessage {
  return isRecord(value) && value["type"] === "reaction";
}

function safeDeserializeAttachment(ws: WebSocket): unknown {
  const anyWs = ws as unknown as { deserializeAttachment?: () => unknown };
  try {
    return anyWs.deserializeAttachment?.();
  } catch {
    return undefined;
  }
}

function safeSerializeAttachment(ws: WebSocket, attachment: unknown) {
  const anyWs = ws as unknown as { serializeAttachment?: (value: unknown) => void };
  try {
    anyWs.serializeAttachment?.(attachment);
  } catch {
    // Best-effort only.
  }
}

export class ChatHub implements DurableObject {
  private readonly rooms = new Map<string, Set<WebSocket>>();
  private readonly clients = new Map<WebSocket, ClientInfo>();

  constructor(private readonly state: DurableObjectState) {
    this.rehydrateWebSockets();
  }

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected WebSocket", { status: 426 });
    }

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];

    this.state.acceptWebSocket(server);
    const attachment: ClientAttachment = { username: "", roomId: "" };
    safeSerializeAttachment(server, attachment);
    this.clients.set(server, attachment);

    return new Response(null, { status: 101, webSocket: client });
  }

  webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
    const text = toText(message);

    let data: unknown;
    try {
      data = JSON.parse(text) as unknown;
    } catch {
      ws.send(
        json({
          type: "error",
          message: "Invalid message format",
        }),
      );
      return;
    }

    this.handleMessage(ws, data);
  }

  webSocketClose(ws: WebSocket) {
    this.handleDisconnect(ws);
  }

  webSocketError(ws: WebSocket) {
    this.handleDisconnect(ws);
  }

  private handleMessage(ws: WebSocket, data: unknown) {
    if (isJoinMessage(data)) {
      this.handleJoin(ws, data);
      return;
    }

    if (isChatMessage(data)) {
      this.handleChatMessage(ws, data);
      return;
    }

    if (isReactionMessage(data)) {
      this.handleReaction(ws, data);
      return;
    }

    ws.send(
      json({
        type: "error",
        message: "Unknown message type",
      }),
    );
  }

  private handleJoin(ws: WebSocket, data: { username?: string; roomId?: string }) {
    const username = (data.username ?? "").trim();
    const roomId = (data.roomId ?? "").trim();

    if (!username || !roomId) {
      ws.send(
        json({
          type: "error",
          message: "Username and room ID are required",
        }),
      );
      return;
    }

    const existing = this.clients.get(ws);
    if (existing?.roomId && existing.roomId !== roomId) {
      this.leaveRoom(ws, existing);
    }

    const nextClient: ClientAttachment = { username, roomId };
    safeSerializeAttachment(ws, nextClient);
    this.clients.set(ws, nextClient);

    if (!this.rooms.has(roomId)) this.rooms.set(roomId, new Set());
    this.rooms.get(roomId)!.add(ws);

    this.broadcastToRoom(
      roomId,
      {
        type: "userJoined",
        username,
        timestamp: new Date().toISOString(),
      },
      ws,
    );

    ws.send(
      json({
        type: "joined",
        roomId,
        username,
        userCount: this.rooms.get(roomId)!.size,
      }),
    );
  }

  private handleChatMessage(ws: WebSocket, data: { message?: string; timestamp?: string }) {
    const client = this.getClient(ws);
    if (!client?.roomId || !client.username) {
      ws.send(
        json({
          type: "error",
          message: "Not connected to a room",
        }),
      );
      return;
    }

    const messageText = (data.message ?? "").toString();
    if (!messageText) return;

    const messageData = {
      type: "message",
      username: client.username,
      message: messageText,
      timestamp: data.timestamp ?? new Date().toISOString(),
      roomId: client.roomId,
    };

    this.broadcastToRoom(client.roomId, messageData, ws);
  }

  private handleReaction(ws: WebSocket, data: { reaction?: string }) {
    const client = this.getClient(ws);
    if (!client?.roomId || !client.username) {
      ws.send(
        json({
          type: "error",
          message: "Not connected to a room",
        }),
      );
      return;
    }

    const reaction = (data.reaction ?? "").toString();
    if (!reaction) return;

    const reactionData = {
      type: "reaction",
      reaction,
      username: client.username,
      roomId: client.roomId,
      timestamp: new Date().toISOString(),
    };

    this.broadcastToRoom(client.roomId, reactionData, ws);
  }

  private handleDisconnect(ws: WebSocket) {
    const client = this.getClient(ws);
    if (!client) return;

    this.leaveRoom(ws, client);
    this.clients.delete(ws);
  }

  private leaveRoom(ws: WebSocket, client: ClientInfo) {
    const { roomId, username } = client;
    if (!roomId) return;

    const room = this.rooms.get(roomId);
    if (!room) return;

    room.delete(ws);
    safeSerializeAttachment(ws, { username, roomId: "" } satisfies ClientAttachment);

    if (room.size === 0) {
      this.rooms.delete(roomId);
      return;
    }

    this.broadcastToRoom(roomId, {
      type: "userLeft",
      username,
      timestamp: new Date().toISOString(),
    });
  }

  private broadcastToRoom(roomId: string, message: unknown, excludeWs: WebSocket | null = null) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const payload = json(message);
    for (const clientWs of room) {
      if (excludeWs && clientWs === excludeWs) continue;
      try {
        clientWs.send(payload);
      } catch {
        // Best-effort; close handlers will clean up.
      }
    }
  }

  private getClient(ws: WebSocket): ClientInfo | undefined {
    const existing = this.clients.get(ws);
    if (existing) return existing;

    const attachment = safeDeserializeAttachment(ws);
    if (!isClientAttachment(attachment)) return undefined;

    this.clients.set(ws, attachment);
    if (attachment.roomId) {
      if (!this.rooms.has(attachment.roomId)) this.rooms.set(attachment.roomId, new Set());
      this.rooms.get(attachment.roomId)!.add(ws);
    }
    return attachment;
  }

  private rehydrateWebSockets() {
    for (const ws of this.state.getWebSockets()) {
      const attachment = safeDeserializeAttachment(ws);
      const client = isClientAttachment(attachment) ? attachment : { username: "", roomId: "" };
      this.clients.set(ws, client);
      if (client.roomId) {
        if (!this.rooms.has(client.roomId)) this.rooms.set(client.roomId, new Set());
        this.rooms.get(client.roomId)!.add(ws);
      }
    }
  }
}

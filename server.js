const WebSocket = require('ws');
const http = require('http');
const url = require('url');

class MovieChatServer {
  constructor(port = process.env.PORT || 3000) {
    this.port = port;
    this.server = http.createServer(this.handleHttpRequest.bind(this));
    this.wss = new WebSocket.Server({ server: this.server });
    this.rooms = new Map(); // roomId -> Set of clients
    this.clients = new Map(); // client -> {username, roomId, ws}
    
    this.setupServer();
  }

  handleHttpRequest(req, res) {
    // Add CORS headers for production
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      res.end();
      return;
    }
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Movie Chat Server Running');
  }

  setupServer() {
    this.wss.on('connection', (ws, req) => {
      console.log('New client connected');
      
      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          this.handleMessage(ws, data);
        } catch (error) {
          console.error('Error parsing message:', error);
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Invalid message format'
          }));
        }
      });

      ws.on('close', () => {
        this.handleDisconnect(ws);
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        this.handleDisconnect(ws);
      });
    });

    this.server.listen(this.port, () => {
      console.log(`🎬 Movie Chat Server running on port ${this.port}`);
      console.log(`WebSocket endpoint: ws://localhost:${this.port}`);
    });
  }

  handleMessage(ws, data) {
    switch (data.type) {
      case 'join':
        this.handleJoin(ws, data);
        break;
      case 'message':
        this.handleChatMessage(ws, data);
        break;
      case 'reaction':
        this.handleReaction(ws, data);
        break;
      default:
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Unknown message type'
        }));
    }
  }

  handleJoin(ws, data) {
    const { username, roomId } = data;
    
    if (!username || !roomId) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Username and room ID are required'
      }));
      return;
    }

    // Store client info
    this.clients.set(ws, {
      username: username,
      roomId: roomId,
      ws: ws
    });

    // Add to room
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }
    this.rooms.get(roomId).add(ws);

    console.log(`${username} joined room ${roomId}`);

    // Notify all clients in the room
    this.broadcastToRoom(roomId, {
      type: 'userJoined',
      username: username,
      timestamp: new Date().toISOString()
    }, ws);

    // Send confirmation to the joining client
    ws.send(JSON.stringify({
      type: 'joined',
      roomId: roomId,
      username: username,
      userCount: this.rooms.get(roomId).size
    }));
  }

  handleChatMessage(ws, data) {
    const client = this.clients.get(ws);
    if (!client) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Not connected to a room'
      }));
      return;
    }

    const messageData = {
      type: 'message',
      username: client.username,
      message: data.message,
      timestamp: data.timestamp || new Date().toISOString(),
      roomId: client.roomId
    };

    // Broadcast to all clients in the room
    this.broadcastToRoom(client.roomId, messageData);
    
    console.log(`Message from ${client.username} in ${client.roomId}: ${data.message}`);
  }

  handleReaction(ws, data) {
    const client = this.clients.get(ws);
    if (!client) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Not connected to a room'
      }));
      return;
    }

    const reactionData = {
      type: 'reaction',
      reaction: data.reaction,
      username: client.username,
      roomId: client.roomId,
      timestamp: new Date().toISOString()
    };

    // Broadcast to all clients in the room
    this.broadcastToRoom(client.roomId, reactionData);
    
    console.log(`Reaction from ${client.username} in ${client.roomId}: ${data.reaction}`);
  }

  handleDisconnect(ws) {
    const client = this.clients.get(ws);
    if (client) {
      const { username, roomId } = client;
      
      // Remove from room
      if (this.rooms.has(roomId)) {
        this.rooms.get(roomId).delete(ws);
        
        // If room is empty, remove it
        if (this.rooms.get(roomId).size === 0) {
          this.rooms.delete(roomId);
        } else {
          // Notify remaining clients
          this.broadcastToRoom(roomId, {
            type: 'userLeft',
            username: username,
            timestamp: new Date().toISOString()
          });
        }
      }

      // Remove client
      this.clients.delete(ws);
      
      console.log(`${username} left room ${roomId}`);
    }
  }

  broadcastToRoom(roomId, message, excludeWs = null) {
    if (!this.rooms.has(roomId)) return;

    const roomClients = this.rooms.get(roomId);
    const messageStr = JSON.stringify(message);

    roomClients.forEach(client => {
      if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
        client.send(messageStr);
      }
    });
  }

  getRoomInfo(roomId) {
    if (!this.rooms.has(roomId)) return null;
    
    const clients = Array.from(this.rooms.get(roomId))
      .map(ws => this.clients.get(ws))
      .filter(client => client);
    
    return {
      roomId: roomId,
      userCount: clients.length,
      users: clients.map(client => client.username)
    };
  }

  getAllRooms() {
    const rooms = [];
    this.rooms.forEach((clients, roomId) => {
      rooms.push(this.getRoomInfo(roomId));
    });
    return rooms;
  }
}

// Start the server
const server = new MovieChatServer(3000);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = MovieChatServer;

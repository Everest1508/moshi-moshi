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
    
    const url = new URL(req.url, `http://${req.headers.host}`);
    
    // Serve update.xml for extension updates
    if (url.pathname === '/updates/update.xml') {
      res.writeHead(200, {'Content-Type': 'application/xml'});
      res.end(`<?xml version="1.0" encoding="UTF-8"?>
<updates>
  <update>
    <version>1.0.0</version>
    <required>true</required>
    <url>https://api.moshi-moshi.encryptedbar.com/updates/moshi-moshi-1.0.0.crx</url>
    <hash>sha256:YOUR_EXTENSION_HASH_HERE</hash>
    <size>123456</size>
    <release_notes>
      <![CDATA[
      <h3>Moshi Moshi v1.0.0 - Initial Release</h3>
      <p>🎉 Welcome to Moshi Moshi! The perfect extension for long-distance movie nights.</p>
      
      <h4>✨ Features:</h4>
      <ul>
        <li>Real-time chat with friends while watching movies</li>
        <li>Room-based system for private group chats</li>
        <li>Stream-style popup notifications when chat is closed</li>
        <li>Floating toggle button for easy access</li>
        <li>Resizable chat window (double-click header)</li>
        <li>Emoji reactions for messages</li>
        <li>Cross-tab chat on any webpage</li>
      </ul>
      
      <h4>🚀 How to Use:</h4>
      <ol>
        <li>Click the Moshi Moshi icon in your Chrome toolbar</li>
        <li>Enter your name and a room ID</li>
        <li>Share the room ID with friends</li>
        <li>Start chatting while watching movies together!</li>
      </ol>
      
      <p>Perfect for couples, friends, and families who want to stay connected while enjoying movies together! 🍿✨</p>
      ]]>
    </release_notes>
    <date>2024-01-15</date>
    <min_browser_version>88.0</min_browser_version>
    <max_browser_version>999.0</max_browser_version>
  </update>
</updates>`);
      return;
    }
    
    // Serve privacy policy
    if (url.pathname === '/privacy') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(`<!DOCTYPE html>
<html>
<head>
    <title>Privacy Policy - Moshi Moshi</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2 { color: #333; }
        .header { text-align: center; margin-bottom: 30px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📞 Moshi Moshi</h1>
        <h2>Privacy Policy</h2>
    </div>
    
    <p><strong>Last updated: October 21, 2025</strong></p>
    
    <h3>Overview</h3>
    <p>Moshi Moshi is a Chrome extension that enables real-time chat functionality while browsing the web. This privacy policy explains how we handle your data.</p>
    
    <h3>Data Collection and Usage</h3>
    <h4>What We Collect</h4>
    <ul>
        <li><strong>Username</strong>: The display name you choose for chat</li>
        <li><strong>Room ID</strong>: The chat room identifier you enter</li>
        <li><strong>Messages</strong>: Chat messages you send and receive</li>
        <li><strong>Connection Status</strong>: Whether you're connected to the chat server</li>
    </ul>
    
    <h4>What We DON'T Collect</h4>
    <ul>
        <li>Personal information (name, email, phone)</li>
        <li>Browsing history or website data</li>
        <li>Location data</li>
        <li>Device information</li>
        <li>Analytics or tracking data</li>
    </ul>
    
    <h3>Data Storage</h3>
    <h4>Local Storage</h4>
    <p>Your username and room ID are stored locally in Chrome's storage. This data remains on your device and is not transmitted to external servers.</p>
    
    <h4>Server Communication</h4>
    <p>Messages are transmitted through WebSocket connections. No messages are permanently stored on our servers. Messages are only delivered to active users in the same room.</p>
    
    <h3>Data Security</h3>
    <p>All communication uses WebSocket protocol. No sensitive data is transmitted. Messages are only visible to users in the same room.</p>
    
    <h3>Your Rights</h3>
    <ul>
        <li>You can disconnect from chat rooms at any time</li>
        <li>You can change your username in the extension settings</li>
        <li>You can uninstall the extension to remove all local data</li>
    </ul>
    
    <h3>Contact Information</h3>
    <p>For questions about this privacy policy, please contact us at support@moshi-moshi.encryptedbar.com</p>
    
    <p><em>This extension complies with Chrome Web Store policies and Google's privacy requirements.</em></p>
</body>
</html>`);
      return;
    }
    
    // Serve support page
    if (url.pathname === '/support') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(`<!DOCTYPE html>
<html>
<head>
    <title>Support - Moshi Moshi</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2 { color: #333; }
        .header { text-align: center; margin-bottom: 30px; }
        .faq { margin: 20px 0; }
        .faq h3 { color: #667eea; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📞 Moshi Moshi</h1>
        <h2>Support & FAQ</h2>
    </div>
    
    <div class="faq">
        <h3>How do I connect to a chat room?</h3>
        <p>Click the Moshi Moshi icon in your Chrome toolbar, enter your name and a room ID, then click "Connect to Room". Share the same room ID with your friends to chat together.</p>
    </div>
    
    <div class="faq">
        <h3>Why can't I connect to the server?</h3>
        <p>Make sure you have an internet connection and that the server is running. If you're still having issues, try refreshing the page or restarting the extension.</p>
    </div>
    
    <div class="faq">
        <h3>How do I resize the chat window?</h3>
        <p>Double-click the chat header to toggle between big and small sizes. You can also use the floating toggle button in the bottom-right corner.</p>
    </div>
    
    <div class="faq">
        <h3>Can I use this on any website?</h3>
        <p>Yes! Moshi Moshi works on any website. The chat window will appear on any webpage you visit while connected.</p>
    </div>
    
    <div class="faq">
        <h3>Are my messages private?</h3>
        <p>Messages are only visible to people in the same room. We don't store or log your messages permanently.</p>
    </div>
    
    <h3>Still need help?</h3>
    <p>Contact us at support@moshi-moshi.encryptedbar.com</p>
</body>
</html>`);
      return;
    }
    
    // Default response
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Moshi Moshi Server Running');
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

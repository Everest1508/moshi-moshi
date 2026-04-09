// Content script for Chrome extension
class MovieChat {
  constructor() {
    this.ws = null;
    this.isConnected = false;
    this.username = '';
    this.roomId = '';
    this.chatVisible = false;
    this.chatSize = 'big'; // 'big' or 'small'
    this.messages = [];
    this.streamMessageQueue = [];
    this.keepAliveTimer = null;
    this.shouldReconnect = false;
    this.reconnectAttempts = 0;
    this.reconnectTimer = null;
    this.soundEnabled = true;
    
    this.init();
  }

  init() {
    this.createChatWindow();
    this.createFloatingToggle();
    this.createStreamMessageQueue();
    this.setupMessageListener();
    this.loadStoredData();
  }

  createChatWindow() {
    // Create connection status indicator
    const statusDiv = document.createElement('div');
    statusDiv.className = 'connection-status moshi-theme disconnected';
    statusDiv.textContent = 'Disconnected';
    statusDiv.id = 'movie-chat-status';
    document.body.appendChild(statusDiv);

    // Create main chat container
    const chatContainer = document.createElement('div');
    chatContainer.className = 'movie-chat-container moshi-theme';
    chatContainer.id = 'movie-chat-container';
    
    chatContainer.innerHTML = `
      <div class="chat-header">
        <h3 class="chat-title">📞 Moshi Moshi</h3>
        <button class="chat-close" id="chat-close">×</button>
      </div>
      <div class="chat-messages" id="chat-messages">
        <div class="message other">
          <div class="message-sender">System</div>
          <div class="message-content">Welcome to Moshi Moshi! Connect to a room to start chatting.</div>
        </div>
      </div>
      <div class="chat-input-container">
        <div class="chat-input-row">
          <button class="emoji-btn" id="emoji-btn">😊</button>
          <input type="text" class="chat-input" id="chat-input" placeholder="Type your message..." />
          <button class="send-btn" id="send-btn">📤</button>
        </div>
      </div>
    `;

    document.body.appendChild(chatContainer);
    this.setupChatEventListeners();
  }

  createFloatingToggle() {
    const toggleDiv = document.createElement('div');
    toggleDiv.className = 'floating-toggle moshi-theme';
    toggleDiv.id = 'floating-toggle';
    
    toggleDiv.innerHTML = `
      <div class="toggle-icon chat-closed">📞</div>
    `;
    
    document.body.appendChild(toggleDiv);
    
    toggleDiv.addEventListener('click', () => this.toggleChat());
  }

  createStreamMessageQueue() {
    const queueDiv = document.createElement('div');
    queueDiv.className = 'stream-message-queue';
    queueDiv.id = 'stream-message-queue';
    document.body.appendChild(queueDiv);
  }

  setupChatEventListeners() {
    const chatContainer = document.getElementById('movie-chat-container');
    const closeBtn = document.getElementById('chat-close');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const emojiBtn = document.getElementById('emoji-btn');
    const chatHeader = chatContainer.querySelector('.chat-header');

    closeBtn.addEventListener('click', () => this.toggleChat());
    
    sendBtn.addEventListener('click', () => this.sendMessage());
    
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });

    emojiBtn.addEventListener('click', () => this.showEmojiPicker());
    
    // Double-click header to toggle size
    chatHeader.addEventListener('dblclick', () => this.toggleChatSize());
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      switch (request.action) {
        case 'connect':
          this.connect(request.username, request.roomId);
          break;
        case 'disconnect':
          this.disconnect();
          break;
        case 'toggleChat':
          this.toggleChat();
          break;
        case 'showChat':
          this.showChat();
          break;
        case 'setSoundEnabled':
          this.soundEnabled = !!request.enabled;
          chrome.storage.local.set({ soundEnabled: this.soundEnabled });
          break;
      }
    });
  }

  loadStoredData() {
    chrome.storage.local.get(['username', 'roomId', 'isConnected', 'soundEnabled'], (data) => {
      if (typeof data.soundEnabled === 'boolean') this.soundEnabled = data.soundEnabled;
      if (data.isConnected && data.username && data.roomId) {
        this.connect(data.username, data.roomId);
      }
    });
  }

  connect(username, roomId) {
    this.username = username;
    this.roomId = roomId;
    this.shouldReconnect = true;
    this.reconnectAttempts = 0;
    
    // Connect to WebSocket server using config
    const serverUrl = window.MOVIE_CHAT_CONFIG.websocketUrl;
    if (this.ws) {
      try { this.ws.close(); } catch (_) {}
      this.ws = null;
    }
    this.ws = new WebSocket(serverUrl);
    
    this.ws.onopen = () => {
      this.isConnected = true;
      this.updateConnectionStatus(true);
      this.startKeepAlive();
      this.ws.send(JSON.stringify({
        type: 'join',
        username: username,
        roomId: roomId
      }));
      this.addSystemMessage(`Connected to room: ${roomId}`);
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };

    this.ws.onclose = () => {
      this.isConnected = false;
      this.updateConnectionStatus(false);
      this.stopKeepAlive();
      this.addSystemMessage('Disconnected from server');
      this.scheduleReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.addSystemMessage('Connection error. Make sure the server is running.');
    };
  }

  disconnect() {
    this.shouldReconnect = false;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;
    if (this.ws) {
      try { this.ws.close(); } catch (_) {}
      this.ws = null;
    }
    this.isConnected = false;
    this.updateConnectionStatus(false);
    this.stopKeepAlive();
    this.addSystemMessage('Disconnected');
  }

  startKeepAlive() {
    this.stopKeepAlive();
    this.keepAliveTimer = setInterval(() => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
      try {
        this.ws.send(JSON.stringify({ type: 'ping', timestamp: new Date().toISOString() }));
      } catch (_) {}
    }, 25000);
  }

  stopKeepAlive() {
    if (this.keepAliveTimer) clearInterval(this.keepAliveTimer);
    this.keepAliveTimer = null;
  }

  scheduleReconnect() {
    if (!this.shouldReconnect) return;
    if (this.reconnectTimer) return;

    const attempt = this.reconnectAttempts;
    const backoffMs = Math.min(60000, 1000 * Math.pow(2, attempt));
    const jitterMs = Math.floor(Math.random() * 500);
    const delayMs = Math.max(1500, backoffMs + jitterMs);

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (!this.shouldReconnect) return;
      this.reconnectAttempts += 1;
      this.addSystemMessage('Reconnecting…');
      this.connect(this.username, this.roomId);
    }, delayMs);
  }

  handleMessage(data) {
    switch (data.type) {
      case 'message':
        this.addMessage(data.username, data.message, data.timestamp, false);
        this.notifyIncomingSound();
        // Show stream message if chat is not visible
        if (!this.chatVisible) {
          this.showStreamMessage(data.username, data.message);
        }
        break;
      case 'userJoined':
        this.addSystemMessage(`${data.username} joined the room`);
        break;
      case 'userLeft':
        this.addSystemMessage(`${data.username} left the room`);
        break;
      case 'pong':
        break;
    }
  }

  sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message || !this.isConnected) return;

    const messageData = {
      type: 'message',
      username: this.username,
      message: message,
      roomId: this.roomId,
      timestamp: new Date().toISOString()
    };

    this.ws.send(JSON.stringify(messageData));
    this.addMessage(this.username, message, messageData.timestamp, true);
    input.value = '';
  }

  addMessage(username, message, timestamp, isOwn) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isOwn ? 'own' : 'other'}`;
    
    const time = new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageDiv.innerHTML = `
      <div class="message-sender">${username}</div>
      <div class="message-content">${this.escapeHtml(message)}</div>
      <div class="message-time">${time}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  addSystemMessage(message) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message system';
    
    messageDiv.innerHTML = `
      <div class="message-sender">System</div>
      <div class="message-content">${this.escapeHtml(message)}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  notifyIncomingSound() {
    if (!this.soundEnabled) return;
    try {
      chrome.runtime.sendMessage({ action: 'playIncomingSound' });
    } catch (_) {}
  }

  showEmojiPicker() {
    // Simple emoji picker - you can enhance this later
    const emojis = ['😊', '😂', '❤️', '😮', '😢', '👍', '👎', '🎉', '🔥', '💯'];
    const input = document.getElementById('chat-input');
    
    // For now, just add a random emoji
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    input.value += randomEmoji;
    input.focus();
  }

  toggleChat() {
    const chatContainer = document.getElementById('movie-chat-container');
    const toggleIcon = document.querySelector('#floating-toggle .toggle-icon');
    
    this.chatVisible = !this.chatVisible;
    
    if (this.chatVisible) {
      chatContainer.classList.add('visible');
      toggleIcon.textContent = '💬';
      toggleIcon.className = 'toggle-icon chat-open';
    } else {
      chatContainer.classList.remove('visible');
      toggleIcon.textContent = '📞';
      toggleIcon.className = 'toggle-icon chat-closed';
    }
  }

  showChat() {
    const chatContainer = document.getElementById('movie-chat-container');
    const toggleIcon = document.querySelector('#floating-toggle .toggle-icon');
    this.chatVisible = true;
    chatContainer.classList.add('visible');
    if (toggleIcon) {
      toggleIcon.textContent = '💬';
      toggleIcon.className = 'toggle-icon chat-open';
    }
  }

  toggleChatSize() {
    const chatContainer = document.getElementById('movie-chat-container');
    this.chatSize = this.chatSize === 'big' ? 'small' : 'big';
    
    if (this.chatSize === 'small') {
      chatContainer.classList.add('small');
    } else {
      chatContainer.classList.remove('small');
    }
  }

  showStreamMessage(username, message) {
    const queueDiv = document.getElementById('stream-message-queue');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'stream-message moshi-theme';
    messageDiv.setAttribute('role', 'status');
    messageDiv.setAttribute('aria-live', 'polite');
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const initial = (username || '?').trim().slice(0, 1).toUpperCase();
    messageDiv.innerHTML = `
      <div class="stream-toast">
        <div class="stream-top">
          <div class="stream-avatar" aria-hidden="true">${this.escapeHtml(initial)}</div>
          <div class="stream-meta">
            <div class="stream-sender">${this.escapeHtml(username)}</div>
            <div class="stream-time">${this.escapeHtml(time)}</div>
          </div>
          <div class="stream-cta">Open</div>
        </div>
        <div class="stream-text">${this.escapeHtml(message)}</div>
      </div>
    `;
    
    queueDiv.appendChild(messageDiv);

    messageDiv.addEventListener('click', () => this.showChat(), { once: true });

    // Keep the queue tidy (avoid huge stacks)
    while (queueDiv.children.length > 4) {
      queueDiv.removeChild(queueDiv.firstElementChild);
    }
    
    // Remove the message after animation completes
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.parentNode.removeChild(messageDiv);
      }
    }, 4000);
  }

  updateConnectionStatus(connected) {
    const statusDiv = document.getElementById('movie-chat-status');
    statusDiv.textContent = connected ? 'Connected' : 'Disconnected';
    statusDiv.classList.toggle('connected', connected);
    statusDiv.classList.toggle('disconnected', !connected);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the chat when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new MovieChat());
} else {
  new MovieChat();
}

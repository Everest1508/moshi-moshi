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
    this.reactions = {};
    this.streamMessageQueue = [];
    
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
    statusDiv.className = 'connection-status disconnected';
    statusDiv.textContent = 'Disconnected';
    statusDiv.id = 'movie-chat-status';
    document.body.appendChild(statusDiv);

    // Create main chat container
    const chatContainer = document.createElement('div');
    chatContainer.className = 'movie-chat-container';
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
    toggleDiv.className = 'floating-toggle';
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
        case 'toggleChat':
          this.toggleChat();
          break;
      }
    });
  }

  loadStoredData() {
    chrome.storage.local.get(['username', 'roomId', 'isConnected'], (data) => {
      if (data.isConnected && data.username && data.roomId) {
        this.connect(data.username, data.roomId);
      }
    });
  }

  connect(username, roomId) {
    this.username = username;
    this.roomId = roomId;
    
    // Connect to WebSocket server using config
    const serverUrl = window.MOVIE_CHAT_CONFIG.websocketUrl;
    this.ws = new WebSocket(serverUrl);
    
    this.ws.onopen = () => {
      this.isConnected = true;
      this.updateConnectionStatus(true);
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
      this.addSystemMessage('Disconnected from server');
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.addSystemMessage('Connection error. Make sure the server is running.');
    };
  }

  handleMessage(data) {
    switch (data.type) {
      case 'message':
        this.addMessage(data.username, data.message, data.timestamp, false);
        // Show stream message if chat is not visible
        if (!this.chatVisible) {
          this.showStreamMessage(data.username, data.message);
        }
        break;
      case 'reaction':
        this.addReaction(data.messageId, data.reaction, data.username);
        break;
      case 'userJoined':
        this.addSystemMessage(`${data.username} joined the room`);
        break;
      case 'userLeft':
        this.addSystemMessage(`${data.username} left the room`);
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
      <div class="reactions" id="reactions-${Date.now()}"></div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add reaction buttons
    this.addReactionButtons(messageDiv);
  }

  addSystemMessage(message) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message other';
    
    messageDiv.innerHTML = `
      <div class="message-sender">System</div>
      <div class="message-content" style="background: #e3f2fd; color: #1976d2; font-style: italic;">${this.escapeHtml(message)}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  addReactionButtons(messageDiv) {
    const reactionsDiv = messageDiv.querySelector('.reactions');
    const reactions = ['❤️', '😂', '😮', '😢', '👍', '👎'];
    
    reactions.forEach(reaction => {
      const reactionBtn = document.createElement('span');
      reactionBtn.className = 'reaction';
      reactionBtn.textContent = reaction;
      reactionBtn.addEventListener('click', () => this.sendReaction(reaction, messageDiv));
      reactionsDiv.appendChild(reactionBtn);
    });
  }

  sendReaction(reaction, messageDiv) {
    if (!this.isConnected) return;
    
    const reactionData = {
      type: 'reaction',
      reaction: reaction,
      roomId: this.roomId,
      username: this.username
    };
    
    this.ws.send(JSON.stringify(reactionData));
    
    // Add visual feedback
    const reactionBtn = messageDiv.querySelector(`.reaction:contains("${reaction}")`);
    if (reactionBtn) {
      reactionBtn.classList.add('active');
      setTimeout(() => reactionBtn.classList.remove('active'), 200);
    }
  }

  addReaction(messageId, reaction, username) {
    // Implementation for receiving reactions
    console.log(`Reaction received: ${reaction} from ${username}`);
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
    messageDiv.className = 'stream-message';
    
    messageDiv.innerHTML = `
      <div class="stream-sender">${this.escapeHtml(username)}</div>
      <div class="stream-text">${this.escapeHtml(message)}</div>
    `;
    
    queueDiv.appendChild(messageDiv);
    
    // Remove the message after animation completes
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.parentNode.removeChild(messageDiv);
      }
    }, 4000);
  }

  updateConnectionStatus(connected) {
    const statusDiv = document.getElementById('movie-chat-status');
    if (connected) {
      statusDiv.textContent = 'Connected';
      statusDiv.className = 'connection-status connected';
    } else {
      statusDiv.textContent = 'Disconnected';
      statusDiv.className = 'connection-status disconnected';
    }
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

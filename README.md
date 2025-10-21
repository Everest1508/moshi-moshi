# 📞 Moshi Moshi

A Chrome extension that allows you to chat with friends while watching movies together! Perfect for long-distance movie nights and shared viewing experiences.

## Features

- 🎥 **Floating Chat Window**: Appears on any webpage in the bottom-right corner
- 🏠 **Room-based Chat**: Join rooms to chat with specific groups of people
- ⚡ **Real-time Messaging**: Instant message delivery using WebSocket technology
- 😊 **Emoji Reactions**: React to messages with emojis
- 🎨 **Beautiful UI**: Modern, responsive design that doesn't interfere with your browsing
- 🔒 **Privacy**: Messages are only visible to people in the same room

## Installation

### 1. Install the WebSocket Server

```bash
# Install dependencies
npm install

# Start the server
npm start
```

The server will run on `http://localhost:3000`

### 2. Install the Chrome Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `chatty` folder
4. The extension icon should appear in your Chrome toolbar

## Usage

1. **Start the Server**: Make sure the WebSocket server is running (`npm start`)
2. **Open Extension**: Click the Movie Chat icon in your Chrome toolbar
3. **Enter Details**: 
   - Enter your username
   - Enter a room ID (share this with your friends)
4. **Connect**: Click "Connect to Room"
5. **Start Chatting**: The chat window will appear on any webpage you visit
6. **Toggle Chat**: Use the "Toggle Chat Window" button to show/hide the chat

## How It Works

- **Room System**: Each room has a unique ID. Share the same room ID with friends to chat together
- **Real-time Communication**: Uses WebSocket technology for instant message delivery
- **Cross-tab Chat**: The chat window appears on every webpage you visit
- **Persistent Connection**: Stays connected as you browse different websites

## Technical Details

- **Frontend**: Chrome Extension with Content Scripts
- **Backend**: Node.js WebSocket Server
- **Communication**: WebSocket protocol for real-time messaging
- **Storage**: Chrome Storage API for user preferences

## Development

### Running in Development Mode

```bash
# Start server with auto-restart
npm run dev
```

### File Structure

```
chatty/
├── manifest.json          # Chrome extension manifest
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── content.js            # Content script for chat window
├── styles.css            # Chat window styles
├── server.js             # WebSocket server
├── package.json          # Node.js dependencies
└── icons/                # Extension icons
```

## Troubleshooting

- **Can't connect**: Make sure the server is running (`npm start`)
- **Chat not appearing**: Check if the extension is enabled in Chrome
- **Messages not sending**: Verify you're connected to the same room as your friends

## Future Enhancements

- [ ] Voice messages
- [ ] File sharing
- [ ] Screen sharing integration
- [ ] Mobile app companion
- [ ] Message history
- [ ] User avatars
- [ ] Typing indicators

## License

MIT License - feel free to use and modify!

---

Enjoy your movie nights with friends! 🍿✨

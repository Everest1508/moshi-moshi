export function updatesXml(): string {
  // Keep this in sync with server.js (extension update feed).
  return `<?xml version="1.0" encoding="UTF-8"?>
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
      <p>Welcome to Moshi Moshi! The perfect extension for long-distance movie nights.</p>
      ]]>
    </release_notes>
    <date>2024-01-15</date>
    <min_browser_version>88.0</min_browser_version>
    <max_browser_version>999.0</max_browser_version>
  </update>
</updates>`;
}

export function privacyHtml(): string {
  return `<!DOCTYPE html>
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
</html>`;
}

export function supportHtml(): string {
  return `<!DOCTYPE html>
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
</html>`;
}

export function landingHtml(origin: string): string {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Moshi Moshi API</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; }
        h1, h2 { color: #333; }
        .header { text-align: center; margin-bottom: 20px; }
        code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; }
        .routes { margin-top: 18px; }
        .routes li { margin: 10px 0; }
        .note { color: #555; font-size: 14px; margin-top: 14px; }
        a { color: #2b6cb0; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📞 Moshi Moshi</h1>
        <h2>Cloudflare Worker</h2>
        <div class="note">Base URL: <code>${origin}</code></div>
    </div>

    <h3>Routes</h3>
    <ul class="routes">
        <li><code>GET /</code> — This page</li>
        <li><code>GET /privacy</code> — <a href="/privacy">Privacy policy</a></li>
        <li><code>GET /support</code> — <a href="/support">Support & FAQ</a></li>
        <li><code>GET /updates/update.xml</code> — <a href="/updates/update.xml">Extension update feed (XML)</a></li>
        <li><code>GET /</code> with <code>Upgrade: websocket</code> — WebSocket entrypoint (Durable Object)</li>
        <li><code>OPTIONS *</code> — CORS preflight</li>
    </ul>

    <p class="note">WebSocket clients should connect to <code>${origin.replace(
      /^http:/,
      "ws:",
    ).replace(/^https:/, "wss:")}/</code> and send a <code>{"type":"join","username":"...","roomId":"..."}</code> message.</p>
</body>
</html>`;
}

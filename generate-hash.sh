#!/bin/bash

# Generate extension hash for update.xml
# This script creates a SHA256 hash of the extension package

echo "🔐 Generating extension hash for update.xml"
echo "==========================================="

# Check if the extension package exists
if [ ! -f "movie-chat-extension.zip" ]; then
    echo "❌ Extension package not found. Run ./package-for-store.sh first."
    exit 1
fi

# Generate SHA256 hash
HASH=$(sha256sum movie-chat-extension.zip | cut -d' ' -f1)
SIZE=$(stat -c%s movie-chat-extension.zip)

echo "📦 Extension package: movie-chat-extension.zip"
echo "📏 Size: $SIZE bytes"
echo "🔐 SHA256 Hash: $HASH"
echo ""

# Update the update.xml file with the actual hash and size
echo "📝 Updating update.xml with actual values..."

# Create updated update.xml
cat > update.xml << EOF
<?xml version="1.0" encoding="UTF-8"?>
<updates>
  <update>
    <version>1.0.0</version>
    <required>true</required>
    <url>https://api.moshi-moshi.encryptedbar.com/updates/moshi-moshi-1.0.0.crx</url>
    <hash>sha256:$HASH</hash>
    <size>$SIZE</size>
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
    <date>$(date +%Y-%m-%d)</date>
    <min_browser_version>88.0</min_browser_version>
    <max_browser_version>999.0</max_browser_version>
  </update>
</updates>
EOF

echo "✅ update.xml updated with actual hash and size"
echo ""
echo "🔗 Update URL: https://api.moshi-moshi.encryptedbar.com/updates/update.xml"
echo "📦 Extension URL: https://api.moshi-moshi.encryptedbar.com/updates/moshi-moshi-1.0.0.crx"
echo ""
echo "💡 Note: You'll need to upload the .crx file to your server for auto-updates to work"

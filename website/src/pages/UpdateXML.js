import React from 'react';

const UpdateXML = () => {
  const updateXML = `<?xml version="1.0" encoding="UTF-8"?>
<updates>
  <update>
    <version>1.0.0</version>
    <required>true</required>
    <url>https://api.moshi-moshi.encryptedbar.com/updates/moshi-moshi-1.0.0.crx</url>
    <hash>sha256:9d5b12160c6fd21b6c221c556ab5db2bfeff467425977f5439265f8964634ecc</hash>
    <size>665623</size>
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
    <date>2025-10-21</date>
    <min_browser_version>88.0</min_browser_version>
    <max_browser_version>999.0</max_browser_version>
  </update>
</updates>`;

  return (
    <div className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">🔄 Extension Updates</h1>
          <p className="text-xl text-gray-600">Auto-update information for Moshi Moshi</p>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Update XML</h2>
          <p className="text-gray-600 mb-6">
            This endpoint provides update information for the Moshi Moshi Chrome extension. 
            Chrome automatically checks this URL for new versions.
          </p>
          
          <div style={{background: '#f3f4f6', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem'}}>
            <h3 className="font-semibold text-gray-700 mb-2">Update URL:</h3>
            <code className="text-sm text-gray-600" style={{wordBreak: 'break-all'}}>
              https://moshi-moshi.encryptedbar.com/updates/update.xml
            </code>
          </div>

          <div className="code-block">
            <pre style={{whiteSpace: 'pre-wrap'}}>{updateXML}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateXML;

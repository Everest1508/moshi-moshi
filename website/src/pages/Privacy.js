import React from 'react';

const Privacy = () => {
  return (
    <div className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">🔒 Privacy Policy</h1>
          <p className="text-xl text-gray-600">How we handle your data and protect your privacy</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: October 21, 2025</p>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Overview</h2>
          <p className="text-gray-600 mb-6">
            Moshi Moshi is a Chrome extension that enables real-time chat functionality while browsing the web. 
            This privacy policy explains how we handle your data.
          </p>

          <h3 className="text-xl font-bold mb-4">Data Collection and Usage</h3>
          
          <h4 className="text-lg font-semibold text-gray-700 mb-3">What We Collect</h4>
          <ul style={{listStyle: 'disc', listStylePosition: 'inside', color: '#6b7280', marginBottom: '1.5rem'}}>
            <li><strong>Username</strong>: The display name you choose for chat</li>
            <li><strong>Room ID</strong>: The chat room identifier you enter</li>
            <li><strong>Messages</strong>: Chat messages you send and receive</li>
            <li><strong>Connection Status</strong>: Whether you're connected to the chat server</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-700 mb-3">What We DON'T Collect</h4>
          <ul style={{listStyle: 'disc', listStylePosition: 'inside', color: '#6b7280', marginBottom: '1.5rem'}}>
            <li>Personal information (name, email, phone)</li>
            <li>Browsing history or website data</li>
            <li>Location data</li>
            <li>Device information</li>
            <li>Analytics or tracking data</li>
          </ul>

          <h3 className="text-xl font-bold mb-4">Data Storage</h3>
          
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Local Storage</h4>
          <p className="text-gray-600 mb-4">
            Your username and room ID are stored locally in Chrome's storage. This data remains on your device 
            and is not transmitted to external servers.
          </p>

          <h4 className="text-lg font-semibold text-gray-700 mb-3">Server Communication</h4>
          <p className="text-gray-600 mb-6">
            Messages are transmitted through WebSocket connections. No messages are permanently stored on our servers. 
            Messages are only delivered to active users in the same room.
          </p>

          <h3 className="text-xl font-bold mb-4">Third-Party Services</h3>
          
          <h4 className="text-lg font-semibold text-gray-700 mb-3">WebSocket Server</h4>
          <p className="text-gray-600 mb-6">
            We operate our own WebSocket server for real-time communication. Messages are not logged or stored permanently. 
            Server is hosted at api.moshi-moshi.encryptedbar.com
          </p>

          <h3 className="text-xl font-bold mb-4">Data Security</h3>
          <ul style={{listStyle: 'disc', listStylePosition: 'inside', color: '#6b7280', marginBottom: '1.5rem'}}>
            <li>All communication uses WebSocket protocol</li>
            <li>No sensitive data is transmitted</li>
            <li>Messages are only visible to users in the same room</li>
          </ul>

          <h3 className="text-xl font-bold mb-4">Your Rights</h3>
          <ul style={{listStyle: 'disc', listStylePosition: 'inside', color: '#6b7280', marginBottom: '1.5rem'}}>
            <li>You can disconnect from chat rooms at any time</li>
            <li>You can change your username in the extension settings</li>
            <li>You can uninstall the extension to remove all local data</li>
          </ul>

          <h3 className="text-xl font-bold mb-4">Children's Privacy</h3>
          <p className="text-gray-600 mb-6">
            This extension is not intended for children under 13. We do not knowingly collect personal information from children.
          </p>

          <h3 className="text-xl font-bold mb-4">Changes to This Policy</h3>
          <p className="text-gray-600 mb-6">
            We may update this privacy policy. Changes will be posted here with an updated date.
          </p>

          <h3 className="text-xl font-bold mb-4">Contact Information</h3>
          <p className="text-gray-600 mb-6">
            For questions about this privacy policy, please visit our <a href="/support" style={{color: '#fc8eac', textDecoration: 'none'}}>Support Page</a>.
          </p>

          <div style={{background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: '0.5rem', padding: '1rem'}}>
            <p style={{color: '#1e40af', fontWeight: '600'}}>
              This extension complies with Chrome Web Store policies and Google's privacy requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

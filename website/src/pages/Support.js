import React from 'react';
import SupportForm from '../components/SupportForm';

const Support = () => {
  return (
    <div className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">🆘 Support & FAQ</h1>
          <p className="text-xl text-gray-600">Get help with Moshi Moshi and find answers to common questions</p>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div style={{borderBottom: '1px solid #e5e7eb', paddingBottom: '1.5rem'}}>
              <h3 className="text-lg font-semibold mb-3">How do I connect to a chat room?</h3>
              <p className="text-gray-600">
                Click the Moshi Moshi icon in your Chrome toolbar, enter your name and a room ID, then click "Connect to Room". 
                Share the same room ID with your friends to chat together.
              </p>
            </div>

            <div style={{borderBottom: '1px solid #e5e7eb', paddingBottom: '1.5rem'}}>
              <h3 className="text-lg font-semibold mb-3">Why can't I connect to the server?</h3>
              <p className="text-gray-600">
                Make sure you have an internet connection and that the server is running. If you're still having issues, 
                try refreshing the page or restarting the extension.
              </p>
            </div>

            <div style={{borderBottom: '1px solid #e5e7eb', paddingBottom: '1.5rem'}}>
              <h3 className="text-lg font-semibold mb-3">How do I resize the chat window?</h3>
              <p className="text-gray-600">
                Double-click the chat header to toggle between big and small sizes. You can also use the floating toggle 
                button in the bottom-right corner.
              </p>
            </div>

            <div style={{borderBottom: '1px solid #e5e7eb', paddingBottom: '1.5rem'}}>
              <h3 className="text-lg font-semibold mb-3">Can I use this on any website?</h3>
              <p className="text-gray-600">
                Yes! Moshi Moshi works on any website. The chat window will appear on any webpage you visit while connected.
              </p>
            </div>

            <div style={{borderBottom: '1px solid #e5e7eb', paddingBottom: '1.5rem'}}>
              <h3 className="text-lg font-semibold mb-3">Are my messages private?</h3>
              <p className="text-gray-600">
                Messages are only visible to people in the same room. We don't store or log your messages permanently.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">How do I uninstall the extension?</h3>
              <p className="text-gray-600">
                Go to chrome://extensions/, find Moshi Moshi, and click the "Remove" button. This will also delete 
                all local data stored by the extension.
              </p>
            </div>
          </div>
        </div>

        {/* Support Form */}
        <SupportForm />

        <div className="card">
          <h3 className="text-xl font-bold mb-4">📞 Contact Information</h3>
          <div className="grid grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Support</h4>
              <p className="text-gray-600 mb-2">
                <a href="/support" style={{color: '#fc8eac', textDecoration: 'none'}}>Visit Support Page</a>
              </p>
              <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Server Information</h4>
              <p className="text-gray-600 mb-2">api.moshi-moshi.encryptedbar.com</p>
              <p className="text-sm text-gray-500">WebSocket server for real-time chat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;

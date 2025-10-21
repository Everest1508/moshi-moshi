import React from 'react';

const Download = () => {
  return (
    <div className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">🚀 Download Moshi Moshi</h1>
          <p className="text-xl text-gray-600">Get the Chrome extension and start chatting with friends!</p>
        </div>

        <div className="card mb-8">
          <div className="text-center">
            <div style={{width: '6rem', height: '6rem', background: 'var(--moshi-primary)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 4px 15px rgba(252, 142, 172, 0.4)'}}>
              <img 
                src="/moshi-moshi-icon.png" 
                alt="Moshi Moshi" 
                style={{
                  width: '48px', 
                  height: '48px',
                  filter: 'brightness(0) invert(1)'
                }} 
              />
            </div>
            <h2 className="text-2xl font-bold mb-4">Developer Installation</h2>
            <p className="text-gray-600 mb-6">
              Download Moshi Moshi source code and install it as a developer extension. This is the most reliable method.
            </p>
            <a 
              href="/downloads/moshi-moshi-source.zip" 
              download="moshi-moshi-source.zip"
              className="btn btn-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem', verticalAlign: 'middle'}}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Source Code (.zip)
            </a>
          </div>
        </div>

        <div className="card mb-8">
          <h3 className="text-xl font-bold mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem', verticalAlign: 'middle'}}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
            Installation Instructions
          </h3>
          <p className="text-gray-600 mb-4">
            Follow these simple steps to install Moshi Moshi:
          </p>
          <ol style={{listStyle: 'decimal', listStylePosition: 'inside', color: '#6b7280', marginBottom: '1.5rem'}}>
            <li>Download the source code zip file above</li>
            <li>Extract the zip file to a folder on your computer</li>
            <li>Open Chrome and go to chrome://extensions/</li>
            <li>Enable "Developer mode" (toggle in top-right)</li>
            <li>Click "Load unpacked" and select the extracted folder</li>
            <li>Click "Select Folder" to install the extension</li>
          </ol>
          <div style={{background: '#d1fae5', border: '1px solid #10b981', borderRadius: '0.5rem', padding: '1rem'}}>
            <p style={{color: '#065f46', fontSize: '0.875rem', margin: 0}}>
              <strong>✅ This method works 100% of the time!</strong> No signing issues or compatibility problems.
            </p>
          </div>
        </div>

        <div className="card mb-8">
          <h3 className="text-xl font-bold mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem', verticalAlign: 'middle'}}>
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M3 21v-5h5"/>
            </svg>
            Auto-Updates
          </h3>
          <p className="text-gray-600 mb-4">
            Moshi Moshi automatically checks for updates and notifies you when a new version is available.
          </p>
          <div style={{background: '#f0f9ff', border: '1px solid #0ea5e9', borderRadius: '0.5rem', padding: '1rem'}}>
            <p style={{color: '#0c4a6e', fontSize: '0.875rem'}}>
              <strong>Update URL:</strong> https://api.moshi-moshi.encryptedbar.com/updates/update.xml
            </p>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4">System Requirements</h3>
          <div className="grid grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Browser Support</h4>
              <ul style={{color: '#6b7280'}}>
                <li>Chrome 88+</li>
                <li>Microsoft Edge (Chromium)</li>
                <li>Other Chromium-based browsers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Requirements</h4>
              <ul style={{color: '#6b7280'}}>
                <li>Internet connection</li>
                <li>JavaScript enabled</li>
                <li>WebSocket support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;

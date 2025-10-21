import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>
            <img 
              src="/moshi-moshi-icon.png" 
              alt="Moshi Moshi" 
              style={{
                width: '80px', 
                height: '80px', 
                marginRight: '1rem', 
                verticalAlign: 'middle',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
              }} 
            />
            Moshi Moshi
          </h1>
          <p className="text-xl mb-6">Chat with friends while watching movies together!</p>
          <p className="text-lg mb-12" style={{opacity: 0.9}}>
            Perfect for long-distance movie nights with real-time messaging and stream-style popup notifications.
          </p>
          
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link to="/download" className="btn btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem', verticalAlign: 'middle'}}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Extension
            </Link>
            <a href="#features" className="btn btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem', verticalAlign: 'middle'}}>
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">✨ Features</h2>
            <p className="text-xl text-gray-600">Everything you need for the perfect movie night chat experience</p>
          </div>
          
          <div className="grid grid-cols-3">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Real-time Chat</h3>
              <p className="text-gray-600">Instant messaging with friends while watching movies on any website.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Room-based System</h3>
              <p className="text-gray-600">Join private rooms to chat with specific groups of people.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Stream-style Popups</h3>
              <p className="text-gray-600">Messages appear as popup notifications when chat is closed.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Floating Toggle</h3>
              <p className="text-gray-600">Always-visible chat toggle in bottom-right corner.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Resizable Chat</h3>
              <p className="text-gray-600">Double-click header to toggle between big and small sizes.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-6 0v4"/>
                  <rect x="2" y="9" width="20" height="12" rx="2" ry="2"/>
                  <circle cx="12" cy="15" r="1"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Emoji Reactions</h3>
              <p className="text-gray-600">React to messages with emojis for more fun interactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🚀 How It Works</h2>
            <p className="text-xl text-gray-600">Get started in just a few simple steps</p>
          </div>
          
          <div className="grid grid-cols-4">
            <div className="step">
              <div className="step-number">1</div>
              <h3 className="text-lg font-semibold mb-2">Install Extension</h3>
              <p className="text-gray-600">Download from Chrome Web Store</p>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <h3 className="text-lg font-semibold mb-2">Enter Details</h3>
              <p className="text-gray-600">Your name and room ID</p>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <h3 className="text-lg font-semibold mb-2">Share Room ID</h3>
              <p className="text-gray-600">With friends to chat together</p>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <h3 className="text-lg font-semibold mb-2">Start Chatting</h3>
              <p className="text-gray-600">While watching movies!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Movie Night?</h2>
          <p className="text-xl mb-8" style={{opacity: 0.9}}>
            Join thousands of users who are already enjoying Moshi Moshi!
          </p>
          <Link to="/download" className="btn btn-primary" style={{background: 'white', color: '#fc8eac'}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '0.5rem', verticalAlign: 'middle'}}>
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            Download Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

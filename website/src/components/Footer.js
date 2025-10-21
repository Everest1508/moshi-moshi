import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <div className="footer-brand">
            <img 
              src="/moshi-moshi-icon.png" 
              alt="Moshi Moshi" 
              style={{
                width: '24px', 
                height: '24px', 
                marginRight: '0.5rem', 
                verticalAlign: 'middle'
              }} 
            />
            Moshi Moshi
          </div>
          <p style={{color: '#d1d5db', marginBottom: '1rem'}}>
            Chat with friends while watching movies together! Perfect for long-distance movie nights with real-time messaging.
          </p>
        </div>
        
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/download">Download</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div>
          <h3>Contact</h3>
          <p style={{color: '#d1d5db', marginBottom: '0.5rem'}}>
            <a href="/support" style={{color: '#fc8eac', textDecoration: 'none'}}>Visit Support Page</a>
          </p>
          <p style={{color: '#d1d5db'}}>Server: api.moshi-moshi.encryptedbar.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {currentYear} Moshi Moshi. All rights reserved. Made with love for movie lovers.</p>
      </div>
    </footer>
  );
};

export default Footer;

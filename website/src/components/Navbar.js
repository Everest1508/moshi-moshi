import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img 
            src="/moshi-moshi-icon.png" 
            alt="Moshi Moshi" 
            style={{
              width: '32px', 
              height: '32px', 
              marginRight: '0.5rem', 
              verticalAlign: 'middle'
            }} 
          />
          Moshi Moshi
        </Link>
        
        <ul className="navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/download">Download</Link></li>
          <li><Link to="/support">Support</Link></li>
          <li><Link to="/privacy">Privacy</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Support from './pages/Support';
import Download from './pages/Download';
import UpdateXML from './pages/UpdateXML';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/support" element={<Support />} />
          <Route path="/download" element={<Download />} />
          <Route path="/updates/update.xml" element={<UpdateXML />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
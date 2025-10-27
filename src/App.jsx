import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GameHub from './components/GameHub';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0b0b12] text-white">
      <Navbar />
      <Hero />
      <GameHub />
      <Footer />
    </div>
  );
}

export default App;

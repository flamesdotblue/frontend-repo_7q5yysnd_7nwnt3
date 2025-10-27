import React from 'react';
import { Gamepad2 } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <span className="font-semibold tracking-tight text-white">Arcade Nova</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-white/70">
          <a href="#games" className="hover:text-white transition">Jeux</a>
          <a href="#how" className="hover:text-white transition">Comment jouer</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
      </div>
    </header>
  );
}

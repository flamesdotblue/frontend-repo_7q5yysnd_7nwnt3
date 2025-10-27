import React from 'react';

export default function Footer() {
  return (
    <footer id="contact" className="mt-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-white/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Arcade Nova — Fait avec ❤️ pour le jeu.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white">Mentions légales</a>
          <a href="#" className="hover:text-white">Support</a>
        </div>
      </div>
    </footer>
  );
}

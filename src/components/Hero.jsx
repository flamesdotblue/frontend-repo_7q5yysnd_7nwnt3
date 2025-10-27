import React from 'react';
import { Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-700/30 via-fuchsia-600/20 to-emerald-500/20 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 py-20 sm:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Votre mini-arcade moderne
            </h1>
            <p className="mt-4 text-white/80 text-lg">
              Jouez à des jeux rapides directement dans votre navigateur. Pas d'inscription, juste du fun.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href="#games" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition">
                <Rocket className="w-4 h-4" />
                Commencer à jouer
              </a>
              <a href="#how" className="inline-flex px-5 py-3 rounded-xl border border-white/20 text-white/90 hover:bg-white/10 transition">
                En savoir plus
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-black p-1">
              <div className="h-full w-full rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.35),transparent_45%)]" />
            </div>
            <p className="text-xs text-white/60 mt-3 text-center">Des jeux légers, rapides et élégants</p>
          </div>
        </div>
      </div>
    </section>
  );
}

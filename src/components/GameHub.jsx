import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Timer, Brain } from 'lucide-react';

function ReactionGame() {
  const [status, setStatus] = useState('idle'); // idle | waiting | go | result
  const [message, setMessage] = useState("Cliquez sur démarrer");
  const [startTime, setStartTime] = useState(0);
  const [reaction, setReaction] = useState(null);
  const timeoutRef = useRef(null);

  const start = () => {
    setReaction(null);
    setStatus('waiting');
    setMessage('Patientez...');
    const delay = 800 + Math.random() * 3000;
    timeoutRef.current = setTimeout(() => {
      setStatus('go');
      setMessage('Cliquez !');
      setStartTime(performance.now());
    }, delay);
  };

  const click = () => {
    if (status === 'waiting') {
      clearTimeout(timeoutRef.current);
      setStatus('idle');
      setMessage("Trop tôt ! Réessayez.");
    } else if (status === 'go') {
      const t = Math.round(performance.now() - startTime);
      setReaction(t);
      setStatus('result');
      setMessage(`Réaction: ${t} ms`);
    }
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-white/80">
        <Timer className="w-4 h-4" />
        <span className="text-sm">Testez vos réflexes</span>
      </div>
      <div className="rounded-2xl overflow-hidden border border-white/10">
        <button
          onClick={status === 'idle' || status === 'result' ? start : click}
          onMouseDown={status === 'waiting' ? click : undefined}
          className={
            'w-full h-64 sm:h-80 flex items-center justify-center text-2xl font-semibold transition-colors ' +
            (status === 'go'
              ? 'bg-emerald-500 text-black'
              : status === 'waiting'
              ? 'bg-yellow-500 text-black'
              : 'bg-white/5 text-white')
          }
        >
          {message}
        </button>
      </div>
      {reaction !== null && (
        <p className="text-white/70 text-sm">
          Astuce: visez moins de 250 ms pour des réflexes supérieurs à la moyenne.
        </p>
      )}
    </div>
  );
}

function MemoryGame() {
  const icons = ['🍎','🍌','🍒','🍇','🥝','🍊','🍓','🥥'];
  const deck = useMemo(() => {
    const base = [...icons, ...icons]
      .map((value, i) => ({ id: i + 1 + '-' + value + '-' + Math.random(), value }))
      .sort(() => Math.random() - 0.5);
    return base;
  }, []);

  const [cards, setCards] = useState(deck.map(c => ({ ...c, flipped: false, matched: false })));
  const [selected, setSelected] = useState([]); // ids
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const lockingRef = useRef(false);

  const flip = (id) => {
    if (lockingRef.current) return;
    setCards(prev => prev.map(c => (c.id === id && !c.matched ? { ...c, flipped: !c.flipped } : c)));
  };

  useEffect(() => {
    const open = cards.filter(c => c.flipped && !c.matched);
    if (open.length === 2) {
      lockingRef.current = true;
      setMoves(m => m + 1);
      const [a, b] = open;
      const isMatch = a.value === b.value;
      setTimeout(() => {
        setCards(prev => prev.map(c => {
          if (c.id === a.id || c.id === b.id) {
            return isMatch ? { ...c, matched: true } : { ...c, flipped: false };
          }
          return c;
        }));
        lockingRef.current = false;
      }, 600);
    }
  }, [cards]);

  useEffect(() => {
    if (cards.every(c => c.matched)) {
      setWon(true);
    }
  }, [cards]);

  const reset = () => {
    const reshuffled = [...cards]
      .map(c => ({ value: c.value }))
      .concat([]) // noop to keep pattern explicit
      .slice(0, 16);
    const newDeck = [...reshuffled]
      .map((c, i) => ({ id: i + 1 + '-' + c.value + '-' + Math.random(), value: c.value }))
      .sort(() => Math.random() - 0.5)
      .map(c => ({ ...c, flipped: false, matched: false }));
    setCards(newDeck);
    setMoves(0);
    setWon(false);
    lockingRef.current = false;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-white/80">
        <Brain className="w-4 h-4" />
        <span className="text-sm">Jeu de mémoire (trouvez les paires)</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => !card.matched && !card.flipped && flip(card.id)}
            className={
              'aspect-square rounded-xl border border-white/10 flex items-center justify-center text-2xl transition ' +
              (card.matched ? 'bg-emerald-500 text-black scale-[0.98]' : card.flipped ? 'bg-white text-black' : 'bg-white/5 text-white hover:bg-white/10')
            }
          >
            {card.flipped || card.matched ? card.value : '❓'}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between text-white/80 text-sm">
        <span>Coups: {moves}</span>
        <div className="flex items-center gap-2">
          <button onClick={reset} className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white">Recommencer</button>
        </div>
      </div>
      {won && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
          Bravo ! Vous avez trouvé toutes les paires.
        </div>
      )}
    </div>
  );
}

export default function GameHub() {
  const [tab, setTab] = useState('reaction');

  return (
    <section id="games" className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Jouez maintenant</h2>
        <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            onClick={() => setTab('reaction')}
            className={'px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition ' + (tab === 'reaction' ? 'bg-white text-black' : 'text-white/80 hover:text-white')}
          >
            Réflexes
          </button>
          <button
            onClick={() => setTab('memory')}
            className={'px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition ' + (tab === 'memory' ? 'bg-white text-black' : 'text-white/80 hover:text-white')}
          >
            Mémoire
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {tab === 'reaction' ? (
          <div className="lg:col-span-2">
            <ReactionGame />
          </div>
        ) : (
          <div className="lg:col-span-2">
            <MemoryGame />
          </div>
        )}

        <div id="how" className="rounded-2xl border border-white/10 p-6 bg-white/5">
          <h3 className="text-white font-semibold mb-2">Conseils rapides</h3>
          <ul className="list-disc list-inside text-white/70 text-sm space-y-1">
            <li>Utilisez un écran en plein écran pour de meilleures performances.</li>
            <li>Désactivez les notifications pour éviter les interruptions.</li>
            <li>Rejouez pour battre votre record personnel.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 p-6 bg-white/5">
          <h3 className="text-white font-semibold mb-2">À venir</h3>
          <p className="text-white/70 text-sm">De nouveaux mini-jeux arrivent bientôt: casse-briques, 2048, et plus encore.</p>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useState } from 'react';
import { Mic, PhoneOff } from 'lucide-react';
import { PETAL } from '../site';

// A short, looping picture of a call: Lotus is mid-sentence, you cut in, it stops and answers the new
// question. Drawn in HTML so it stays sharp and needs no video. The server renders the last frame.
const LINES: { who: 'lotus' | 'you'; text: string; cut?: boolean }[] = [
  { who: 'you', text: 'Can you plan my study week? Exams start Monday.' },
  { who: 'lotus', text: 'Sure. Monday morning, start with the subject you find hardest, then take a short walk, and in the afternoon go over', cut: true },
  { who: 'you', text: 'Wait, I only have three days, not five.' },
  { who: 'lotus', text: 'Got it, three days. Day one is maths and physics, day two is chemistry, and day three is a full practice exam.' },
];

export const VoiceCallDemo: React.FC = () => {
  const [shown, setShown] = useState(LINES.length);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    if (mq.matches) return;
    setShown(1);
    let n = 1;
    const t = window.setInterval(() => {
      n = n >= LINES.length + 1 ? 1 : n + 1;
      setShown(Math.min(n, LINES.length));
    }, 2200);
    return () => window.clearInterval(t);
  }, []);

  const speaking = !reduced && shown < LINES.length + 1 && LINES[shown - 1]?.who === 'lotus';

  return (
    <div className="apple-material-card rounded-[20px] p-5 sm:p-6" role="img" aria-label="A voice call in Lotus: Lotus is planning a study week, the user cuts in to say they only have three days, and Lotus stops and changes the plan.">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full" style={{ background: `${PETAL.yellow}22` }}>
            <span className="h-3 w-3 rounded-full" style={{ background: PETAL.yellow }} />
          </span>
          <div>
            <div className="text-[0.9375rem] font-semibold text-white">Call with Lotus</div>
            <div className="text-[0.8125rem] text-[#86868b]">Offline · voice: Kokoro · Heart</div>
          </div>
        </div>
        <span className="rounded-full bg-[#30d158]/15 px-2.5 py-1 text-[0.75rem] font-medium text-[#30d158]">00:42</span>
      </div>

      <div className="mt-5 flex h-10 items-end justify-center gap-[3px]" aria-hidden="true">
        {Array.from({ length: 36 }, (_, i) => (
          <span
            key={i}
            className="w-[4px] rounded-full transition-[height] duration-300"
            style={{
              background: speaking ? PETAL.yellow : '#3a3a3c',
              height: speaking ? `${10 + Math.abs(Math.sin(i * 1.7 + shown)) * 30}px` : '6px',
            }}
          />
        ))}
      </div>

      <ol className="mt-5 space-y-3">
        {LINES.slice(0, shown).map((l, i) => (
          <li key={i} className={`flex ${l.who === 'you' ? 'justify-end' : ''}`}>
            <p className={`max-w-[85%] rounded-[14px] px-3.5 py-2.5 text-[0.9375rem] leading-snug ${l.who === 'you' ? 'bg-[#0A84FF] text-white' : 'bg-white/[0.07] text-[#e5e5ea]'}`}>
              {l.text}
              {l.cut && <span className="ml-1 whitespace-nowrap text-[0.8125rem] text-[#FF9F0A]">… (you cut in)</span>}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex justify-center gap-4" aria-hidden="true">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10"><Mic className="h-5 w-5 text-white" /></span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff453a]"><PhoneOff className="h-5 w-5 text-white" /></span>
      </div>
    </div>
  );
};

import React from 'react';
import { asset } from '../site';

const SMALL = [
  ['Floating island', 'A small black island at the top of the screen shows running agents and jobs, opens for quick questions and lets you answer Lotus. Off until you turn it on.'],
  ['Sized to your GPU', 'Lotus checks free video memory every few seconds and adjusts context length and how many agents run at once, so nothing runs out of memory.'],
  ['Everything in one folder', 'Chats, models, engines, images, audio and work files all live in Lotus Studio, in your Documents. Move it, back it up, open anything yourself.'],
  ['At home on every system', 'Native menus and window buttons on macOS, Windows and Linux. Light, dark, or following your system.'],
];

export const Features: React.FC = () => (
  <section id="features" className="mx-auto mb-32 max-w-6xl scroll-mt-24 px-4 sm:px-6">
    <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center">
      <div>
        <h2 className="text-[2rem] font-bold leading-tight tracking-tight text-white sm:text-[2.5rem]">One home for every model.</h2>
        <p className="mt-5 text-[1.0625rem] leading-relaxed text-[#a1a1a6]">
          Chat, image, voice and dictation models in one catalog, each with its size, licence and whether it fits your
          graphics card. Press Get and it downloads in the background. Anything else on Hugging Face is one link away.
        </p>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#a1a1a6]">
          Not sure which to pick? Arena &amp; Benchmark runs the same prompt through two or three models side by side.
        </p>
      </div>
      <figure className="overflow-hidden rounded-[14px] border border-white/10 bg-[#1e1e1e] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
        <img src={asset('/assets/tour/models.webp')} width={1360} height={860} loading="lazy" className="block h-auto w-full"
          alt="Models: one catalog of chat, image and voice models with size, licence and a Get button, filtered by kind in the sidebar." />
      </figure>
    </div>

    <div className="mt-20 grid gap-x-10 gap-y-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
      {SMALL.map(([t, d]) => (
        <div key={t}>
          <h3 className="text-[1rem] font-semibold text-white">{t}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#86868b]">{d}</p>
        </div>
      ))}
    </div>
  </section>
);

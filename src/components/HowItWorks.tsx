import React from 'react';
import { PETAL , asset } from '../site';

const ENGINES = [
  { name: 'llama.cpp', kind: 'Chat models', uses: 'Chat, Work, research, tasks', alt: 'Ollama', color: PETAL.blue },
  { name: 'stable-diffusion.cpp', kind: 'Image models', uses: 'Images', alt: 'ComfyUI', color: PETAL.orange },
  { name: 'sherpa-onnx', kind: 'Voice models', uses: 'Calls, speech, transcripts', alt: 'Voicebox', color: PETAL.yellow },
];

export const HowItWorks: React.FC = () => (
  <section id="how-it-works" className="mx-auto mb-32 max-w-6xl scroll-mt-24 px-4 sm:px-6">
    <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
      <div>
        <h2 className="text-[2rem] font-bold leading-tight tracking-tight text-white sm:text-[2.5rem]">
          Its own engines, or yours.
        </h2>
        <div className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed text-[#a1a1a6]">
          <p>
            Lotus comes with its own engines, downloaded once into your Lotus Studio folder
            together with your models. There is nothing else to install, and prompts, images and
            voices never leave your computer.
          </p>
          <p>
            Already use Ollama, ComfyUI or Voicebox? Pick them in Settings and Lotus drives them
            instead. If an engine or a model is missing, the page that needs it says so and offers
            to get it.
          </p>
        </div>
      </div>

      <div className="rounded-[20px] border border-dashed border-white/15 p-5 sm:p-7">
        <div className="mb-5 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-[#6e6e73]">Your computer</div>
        <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="flex items-center gap-3 rounded-[14px] border border-white/10 bg-white/[0.04] px-5 py-4 sm:flex-col sm:px-6 sm:py-7">
            <img src={asset('/assets/lotus-mark.png')} alt="" className="h-10 w-10 sm:h-14 sm:w-14" />
            <span className="text-[1.0625rem] font-semibold text-white">Lotus</span>
          </div>
          <ul className="relative min-w-0 space-y-3 sm:border-l sm:border-white/10 sm:pl-5">
            {ENGINES.map((e) => (
              <li key={e.name} className="relative flex items-center gap-4 rounded-[14px] border border-white/10 bg-white/[0.03] px-4 py-3.5">
                <span aria-hidden="true" className="absolute -left-5 top-1/2 hidden h-px w-5 sm:block" style={{ background: e.color }} />
                <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: e.color, boxShadow: `0 0 0 5px ${e.color}22` }} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[1rem] font-semibold text-white">{e.name}</span>
                    <span className="text-[0.8125rem] text-[#86868b]">{e.kind}</span>
                  </div>
                  <div className="truncate text-[0.8125rem] text-[#a1a1a6]">{e.uses}</div>
                </div>
                <code className="hidden shrink-0 rounded-[6px] border border-white/10 px-2 py-1 font-mono text-[0.75rem] text-[#a1a1a6] sm:block">
                  or {e.alt}
                </code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

import React from 'react';

const ROWS = [
  ['Chat, Work, images, voice, memory, tasks', 'Never', 'Nothing. It all stays on your computer.'],
  ['Web in chat', 'When you turn it on', 'Your question to the search service you pick, then a request to each top result'],
  ['Chrome control in Work', 'When you turn it on, and each action asks', 'What the pages Lotus opens for you would receive from any browser'],
  ['Deep Research', 'During a research run', 'Short keyword queries to the academic databases you tick'],
  ['Engine and model downloads', 'When you pick or download them', 'A request to that project’s own site (GitHub, Hugging Face, Ollama) or the link you pasted'],
  ['Update check', 'When you ask, or at launch if you opt in', 'A request to the project’s GitHub Releases'],
];

export const Privacy: React.FC = () => (
  <section id="privacy" className="mx-auto mb-32 max-w-6xl scroll-mt-24 px-4 sm:px-6">
    <div className="mb-10 max-w-2xl">
      <h2 className="text-[2rem] font-bold leading-tight tracking-tight text-white sm:text-[2.5rem]">
        What leaves your computer.
      </h2>
      <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#a1a1a6]">
        No account, no telemetry, no analytics. Nothing goes online unless you switch it on,
        and this is the whole list.
      </p>
    </div>

    <div className="border-t border-white/15">
      <div className="hidden grid-cols-[4fr_3fr_5fr] gap-6 border-b border-white/15 py-3 text-[0.8125rem] text-[#86868b] md:grid">
        <span>Feature</span>
        <span>Goes online</span>
        <span>What is sent</span>
      </div>
      {ROWS.map(([what, when, sent], i) => (
        <div key={what} className="grid gap-1 border-b border-white/[0.08] py-4 text-[0.9375rem] md:grid-cols-[4fr_3fr_5fr] md:gap-6">
          <span className="font-medium text-white">{what}</span>
          <span className={i === 0 ? 'text-[#30d158]' : 'text-[#d1d1d6]'}>{when}</span>
          <span className="text-[#a1a1a6]">{sent}</span>
        </div>
      ))}
    </div>
    <p className="mt-5 text-[0.875rem] text-[#86868b]">
      Chats, memory and tasks live in one file in Lotus Studio/Data. Skills are plain text files you can open and edit.
    </p>
  </section>
);

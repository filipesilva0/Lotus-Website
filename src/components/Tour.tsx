import React, { useRef, useState } from 'react';
import { Petal } from './Button';
import { PETAL } from '../site';

// One real screenshot per page, taken from the app (lotus repo: handover/screenshots/shoot-site.mjs).
const PAGES = [
  {
    id: 'chat',
    name: 'Chat',
    color: PETAL.blue,
    shot: '/assets/tour/chat.webp',
    alt: 'Chat: a study-week plan answered as a table with a checklist, past chats grouped by day in the sidebar.',
    title: 'Talk to any local model.',
    lead: 'Images, PDFs, Word and Excel files, or a whole folder as context. Tables, code and checklists come out clean.',
    points: [
      ['Tools', 'Lotus reads and saves files, adds tasks and routines, searches the web and remembers things, showing every step.'],
      ['Research', 'A question becomes a plan you can edit, then a report where every citation points to a source it read.'],
      ['Pictures', 'Ask for one and Lotus suggests a prompt and settings. Say yes and Images makes it.'],
    ],
  },
  {
    id: 'work',
    name: 'Work',
    color: PETAL.red,
    shot: '/assets/tour/work.webp',
    alt: 'Work: Lotus deployed three agents, Researcher, Writer and Checker, and combined their parts into a Knee plan document shown in the Artifacts panel.',
    title: 'Describe a job. Get files back.',
    lead: 'Lotus plans the work, sends agents out side by side and hands back documents, tables, web pages and code.',
    points: [
      ['Agents', 'Up to six, three at a time, each with its own face, task and progress, in the page and on the island.'],
      ['Artifacts', 'Everything it makes is a real file in your Lotus Studio folder, shown in the side panel.'],
      ['Talk', 'Give the job by voice and hear the answer. Computer and Chrome control ask before every action.'],
    ],
  },
  {
    id: 'images',
    name: 'Images',
    color: PETAL.orange,
    shot: '/assets/tour/images.webp',
    alt: 'Images: example prompts on an empty canvas, with a parameters panel for canvas size, resolution, images per run, LoRA and sampling.',
    title: 'Pictures on your own GPU.',
    lead: 'Text to image and image to image, with every setting in reach and example prompts to start from.',
    points: [
      ['Model setups', 'Each model is kept with the exact VAE and text encoders it needs, so SDXL, SD 3.5, FLUX and Qwen-Image have everything they need.'],
      ['References', 'Paste or drop images, stack LoRAs and bring back saved styles with @.'],
      ['Tidy output', 'Every generation gets its own folder, with numbered references and outputs.'],
    ],
  },
  {
    id: 'voice',
    name: 'Voice',
    color: PETAL.yellow,
    shot: '/assets/tour/voice.webp',
    alt: 'Voice: a past voice call about planning a study week, with Summarize in Chat and Call Again buttons.',
    title: 'Talk out loud. Lotus talks back.',
    lead: 'Voice calls, speech in any voice, stories and transcripts, with nothing extra to install.',
    points: [
      ['Call', 'Talk to your model, interrupt it any time, and let it remember the call afterwards.'],
      ['Voices and Stories', 'Copy a voice from a few seconds of speech, then give a whole text to several voices on a timeline.'],
      ['Speech to Text', 'Recordings of any length, written in the language they were spoken, then translated or summarised.'],
    ],
  },
  {
    id: 'tasks',
    name: 'Tasks',
    color: PETAL.green,
    shot: '/assets/tour/tasks.webp',
    alt: 'Tasks: a board with Backlog, To do, In progress, Review and Done columns, and tabs for Routines, Skills, Memory, Soul and Plugins.',
    title: 'A board you share with Lotus.',
    lead: 'Hand a card to Lotus and it plans the steps, does them and leaves the result for you to review.',
    points: [
      ['Routines', 'Jobs on a schedule while Lotus is open, catching up on runs they missed.'],
      ['Skills and Memory', 'Everything Lotus has learned, in its own tab. Read, edit or delete any of it.'],
      ['Soul', 'The instructions that shape how Lotus talks to you, with every earlier version kept.'],
    ],
  },
] as const;

export const Tour: React.FC = () => {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = PAGES[active];

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + PAGES.length) % PAGES.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="tour" className="relative mx-auto -mt-10 mb-32 max-w-6xl scroll-mt-24 px-4 sm:px-6">
      <h2 className="sr-only">Five petals, five pages</h2>
      <div className="mb-5 flex justify-center">
        <div role="tablist" aria-label="Pages" onKeyDown={onKey} className="flex max-w-full overflow-x-auto rounded-[12px] border border-white/15 bg-black/75 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] [-webkit-backdrop-filter:blur(20px)] [backdrop-filter:blur(20px)]">
          {PAGES.map((pg, i) => (
            <button
              key={pg.id}
              ref={(el) => { tabs.current[i] = el; }}
              role="tab"
              id={`tab-${pg.id}`}
              aria-selected={i === active}
              aria-controls="tour-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`flex shrink-0 items-center gap-2 rounded-[8px] px-4 py-2 text-[0.9375rem] font-medium transition-colors ${i === active ? 'bg-white/15 text-white' : 'text-[#a1a1a6] hover:text-white'}`}
            >
              <Petal color={pg.color} size={11} />
              {pg.name}
            </button>
          ))}
        </div>
      </div>

      <div id="tour-panel" role="tabpanel" aria-labelledby={`tab-${p.id}`}>
        <div
          className="overflow-hidden rounded-[14px] border border-white/10 bg-[#1e1e1e] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
          style={{ boxShadow: `0 40px 90px -40px ${p.color}55, 0 40px 80px -30px rgba(0,0,0,0.9)` }}
        >
          {/* All five stay loaded so switching tabs is instant. */}
          <div className="relative aspect-[1360/860]">
            {PAGES.map((pg, i) => (
              <img
                key={pg.id}
                src={pg.shot}
                width={1360}
                height={860}
                alt={i === active ? pg.alt : ''}
                aria-hidden={i !== active}
                loading={i === 0 ? 'eager' : 'lazy'}
                className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${i === active ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>
        </div>
        <p className="mt-4 text-center text-[0.8125rem] text-[#86868b]">
          Real screenshots of Lotus 0.11. Each petal of the logo is a page, and each page takes its colour.
        </p>

        <div className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <h3 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-white">{p.title}</h3>
            <p className="mt-3 text-[1rem] leading-relaxed text-[#a1a1a6]">{p.lead}</p>
          </div>
          <dl className="grid gap-5 sm:grid-cols-3">
            {p.points.map(([term, text]) => (
              <div key={term}>
                <dt className="flex items-center gap-2 text-[0.9375rem] font-semibold text-white">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} />
                  {term}
                </dt>
                <dd className="mt-1.5 text-[0.875rem] leading-relaxed text-[#a1a1a6]">{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

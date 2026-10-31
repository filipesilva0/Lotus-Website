import React from 'react';
import { Petal } from './Button';
import { PETAL } from '../site';

const PAGES = [
  {
    name: 'Chat',
    color: PETAL.blue,
    engine: 'Ollama',
    lead: 'Talk to any model you have in Ollama, with images, files or a whole folder as context.',
    points: [
      ['Think', 'works through a problem in passes: analyse, draft, check.'],
      ['Web', 'searches the live web and reads the top pages, only when you turn it on.'],
      ['Deep Research', 'turns a question into a plan you can edit, then writes a report where every citation points to a source it actually read.'],
      ['Memory', 'recalls earlier chats and learns reusable skills. Pause it for one chat, or use Incognito.'],
    ],
  },
  {
    name: 'Images',
    color: PETAL.red,
    engine: 'ComfyUI',
    lead: 'Text to image on your own GPU.',
    points: [
      ['', 'Pick a checkpoint, an aspect ratio and how many images per run.'],
      ['', 'Stack up to four LoRAs, each with its own strength.'],
      ['', 'Save prompt styles and bring them back with @.'],
      ['', 'Download new checkpoints and LoRAs from a link, straight into the right folder.'],
    ],
  },
  {
    name: 'Voice',
    color: PETAL.orange,
    engine: 'Voicebox',
    lead: 'A second front end for Voicebox that shares its voices and history.',
    points: [
      ['', 'Speak in 23 languages with delivery notes, seeds and an effects chain.'],
      ['', 'Clone a voice from a short recording, or describe one in words.'],
      ['Stories', 'puts several voices on a timeline you can trim, split and export.'],
      ['Dictate', 'transcribes on your PC, then copies, reads out or sends the text to chat.'],
    ],
  },
  {
    name: 'App Builder',
    color: PETAL.yellow,
    engine: 'Ollama',
    lead: 'Describe an app and watch a local agent build it.',
    points: [
      ['Plan first', 'shows you a checklist to edit and approve before any code is written.'],
      ['', 'Every file change and command appears as it happens. Commands ask before they run.'],
      ['', 'The preview reloads as files change, with phone and tablet frames.'],
      ['', 'Templates for websites, web apps, phone apps and desktop apps.'],
    ],
  },
  {
    name: 'Tasks',
    color: PETAL.green,
    engine: 'Ollama',
    lead: 'A board you share with Lotus.',
    points: [
      ['', 'Assign a card to Lotus. It plans the steps, does them and leaves the result in Review.'],
      ['', 'Cards can block each other, so work happens in order.'],
      ['Routines', 'run on a schedule while Lotus is open, and catch up on runs they missed.'],
      ['', 'The Skills library lists everything Lotus has learned. Edit or delete any of it.'],
    ],
  },
];

const EXTRAS = [
  ['Floating island', 'A small always-on-top pill for quick chat, dictation and reading the clipboard aloud. It can also approve or deny permission requests from a coding agent in your terminal.'],
  ['Sized to your GPU', 'Lotus checks free video memory every few seconds and adjusts context length, model choice and how many background jobs run at once.'],
  ['One list of models', 'Language, image, LoRA and voice models in one place. Pull any model by name and compare them in the Arena.'],
  ['Light or dark', 'Follows your Windows theme, or set it yourself. Both side panels fold away when you want the room.'],
];

export const Pages: React.FC = () => (
  <section id="pages" className="mx-auto mb-32 max-w-6xl scroll-mt-24 px-4 sm:px-6">
    <div className="mb-14 max-w-2xl">
      <h2 className="text-[2rem] font-bold leading-tight tracking-tight text-white sm:text-[2.5rem]">
        Five petals, five pages.
      </h2>
      <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#a1a1a6]">
        Each petal of the logo is a page in the app, and each page takes its petal's colour.
        Switching between them never changes how things work.
      </p>
    </div>

    <ol className="border-t border-white/10">
      {PAGES.map((p, i) => (
        <li key={p.name} className="grid gap-x-10 gap-y-4 border-b border-white/10 py-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <div className="flex items-center gap-3">
              <Petal color={p.color} size={18} />
              <span className="text-[0.8125rem] tabular-nums text-[#6e6e73]">0{i + 1}</span>
            </div>
            <h3 className="mt-3 text-[1.75rem] font-semibold tracking-tight text-white">{p.name}</h3>
            <p className="mt-2 text-[1rem] leading-relaxed text-[#d1d1d6]">{p.lead}</p>
            <p className="mt-3 text-[0.8125rem] text-[#86868b]">Runs on {p.engine}</p>
          </div>
          <ul className="space-y-3 self-center text-[0.9375rem] leading-relaxed text-[#a1a1a6]">
            {p.points.map(([term, text]) => (
              <li key={text} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full" style={{ background: p.color }} />
                <span>{term && <span className="text-[#f5f5f7]">{term} </span>}{text}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>

    <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
      {EXTRAS.map(([t, d]) => (
        <div key={t}>
          <h3 className="text-[1rem] font-semibold text-white">{t}</h3>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-[#86868b]">{d}</p>
        </div>
      ))}
    </div>
  </section>
);

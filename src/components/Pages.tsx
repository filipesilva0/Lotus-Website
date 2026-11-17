import React from 'react';
import { Petal } from './Button';
import { PETAL } from '../site';

const PAGES = [
  {
    name: 'Chat',
    color: PETAL.blue,
    engine: 'llama.cpp or Ollama',
    lead: 'Talk to any local model, with images, documents or a whole folder as context.',
    points: [
      ['Tools', 'let Lotus read and save files, add tasks and routines, search the web and remember things, with every step shown.'],
      ['Research', 'turns a question into a plan you can edit, then writes a report where every citation points to a source it actually read.'],
      ['', 'Ask for a picture and Lotus suggests a prompt and settings. Say yes and it is made on the Images page.'],
      ['Memory', 'recalls earlier chats and learns reusable skills. Pause it for one chat, or use Incognito.'],
    ],
  },
  {
    name: 'Work',
    color: PETAL.red,
    engine: 'llama.cpp or Ollama',
    lead: 'Describe a job and Lotus gets it done, handing back real files.',
    points: [
      ['', 'It writes a plan you can follow step by step, and asks when it needs a decision.'],
      ['Agents', 'are sent out on their own for independent parts, up to six, each with its own face and progress bar.'],
      ['', 'Documents, tables, web pages and code land in your Lotus Studio folder and in the side panel.'],
      ['Talk', 'lets you give the job by voice. Computer and Chrome control are there too, off by default and asking before every action.'],
    ],
  },
  {
    name: 'Images',
    color: PETAL.orange,
    engine: 'stable-diffusion.cpp or ComfyUI',
    lead: 'Text to image and image to image on your own GPU.',
    points: [
      ['', 'Pick a model, an aspect ratio, a resolution and how many images per run.'],
      ['', 'Each model is kept with the exact VAE and text encoders it needs.'],
      ['', 'Paste or drop references, stack LoRAs and bring back saved styles with @.'],
      ['', 'Every generation gets its own folder, with numbered references and outputs.'],
    ],
  },
  {
    name: 'Voice',
    color: PETAL.yellow,
    engine: 'sherpa-onnx or Voicebox',
    lead: 'Everything voice, with nothing extra to install.',
    points: [
      ['Call', 'your model and talk out loud. Interrupt it any time; it can remember the call afterwards.'],
      ['', 'Speak any text in any voice, or copy a voice from a few seconds of speech.'],
      ['Stories', 'turn a whole text into lines for several voices on a timeline you can export.'],
      ['Speech to Text', 'writes down recordings of any length in the language they were spoken, then translates or summarises them.'],
    ],
  },
  {
    name: 'Tasks',
    color: PETAL.green,
    engine: 'llama.cpp or Ollama',
    lead: 'Everything Lotus does on its own, and everything it has learned.',
    points: [
      ['', 'Assign a card to Lotus. It plans the steps, does them and leaves the result in Review.'],
      ['Routines', 'run on a schedule while Lotus is open, and catch up on runs they missed.'],
      ['', 'Skills, Memory, Soul and Plugins each have a tab. Read, edit or delete any of it.'],
      ['', 'Cards can block each other, so work happens in order.'],
    ],
  },
];

const EXTRAS = [
  ['Floating island', 'A small black island at the top of the screen that shows running agents and jobs, and opens for quick questions. Off until you turn it on.'],
  ['Sized to your GPU', 'Lotus checks free video memory every few seconds and adjusts context length and how many agents run at once.'],
  ['One home for models', 'Chat, image and voice models in one catalog, with what fits your graphics card marked. Add any model from Hugging Face.'],
  ['At home on every system', 'Native menus and window buttons on macOS, Windows and Linux. Light, dark or automatic.'],
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

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { RELEASES, PETAL } from '../site';
import { useLatestVersion } from '../hooks/useLatestVersion';

// Highlights of the newest releases. Keep the top entry in step with the app repo's release-notes/.
const ITEMS = [
  { color: PETAL.red, title: 'Agents that work side by side', text: 'Work splits a job into parts and starts several agents at once, each with its own face, task and progress, in the page and on the island.' },
  { color: PETAL.blue, title: 'Read any document', text: 'Attach PDF, Word, Excel, PowerPoint, OpenDocument, EPUB, RTF or HTML files in Chat and Work. Everything is read on your computer.' },
  { color: PETAL.yellow, title: 'Voice calls', text: 'Talk to your model out loud. It answers while it writes, you can cut in, and it can remember the call afterwards.' },
  { color: PETAL.green, title: 'Skills, Memory and Soul', text: 'Everything Lotus has learned, and the instructions that shape it, now have their own tabs on the Tasks page.' },
  { color: PETAL.orange, title: 'Images from a chat', text: 'Ask for a picture in Chat. Lotus proposes a prompt and settings for one of your models, and makes it when you say yes.' },
  { color: PETAL.blue, title: 'Your profile', text: 'Usage over time, plus live Hardware & Runtime readings for your processor, memory and graphics card.' },
];

export const WhatsNew: React.FC = () => {
  const version = useLatestVersion();
  return (
    <section id="new" className="mx-auto mb-32 max-w-6xl scroll-mt-24 px-4 sm:px-6">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[0.8125rem] font-medium text-[#30d158]">Version {version}</div>
          <h2 className="mt-1 text-[2rem] font-bold leading-tight tracking-tight text-white sm:text-[2.5rem]">What's new.</h2>
        </div>
        <a href={RELEASES} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[0.9375rem] text-[#0A84FF] hover:underline">
          All release notes <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <ul className="grid gap-px overflow-hidden rounded-[16px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((it) => (
          <li key={it.title} className="bg-black p-6">
            <span aria-hidden="true" className="block h-[18px] w-[10px] rotate-[14deg] rounded-full" style={{ background: it.color }} />
            <h3 className="mt-4 text-[1.0625rem] font-semibold text-white">{it.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">{it.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

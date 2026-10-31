import React, { useEffect, useState } from 'react';
import { Download as DownloadIcon, Github } from 'lucide-react';
import { Button } from './Button';
import { Platform, REPO, RELEASES, detectPlatform } from '../site';

// Every platform card has the same parts in the same order:
// name, status, requirements, the download button, the GitHub button, one footnote.
const PLATFORMS: Record<Platform, {
  label: string;
  available: boolean;
  status: string;
  requirements: string;
  note: React.ReactNode;
}> = {
  windows: {
    label: 'Windows',
    available: true,
    status: 'Early preview',
    requirements: 'Windows 10 (version 1803 or later) or Windows 11, 64-bit',
    note: (
      <>
        Choose the installer (.msi) or the portable .zip on the Releases page. The installer
        isn't code-signed yet, so Windows may show a SmartScreen warning: choose{' '}
        <span className="text-[#f5f5f7]">More info</span>, then <span className="text-[#f5f5f7]">Run anyway</span>.
      </>
    ),
  },
  macos: {
    label: 'macOS',
    available: false,
    status: 'Not available yet',
    requirements: 'Lotus is built for Windows first',
    note: 'There’s no macOS build today. Watch the repository on GitHub to hear when that changes.',
  },
  linux: {
    label: 'Linux',
    available: false,
    status: 'Not available yet',
    requirements: 'Lotus is built for Windows first',
    note: 'There’s no Linux build today. Watch the repository on GitHub to hear when that changes.',
  },
};

const STEPS = [
  ['Install the engines you want', 'Ollama for chat, research, the App Builder and tasks. ComfyUI for images. Voicebox for voice.'],
  ['Open Engines in Lotus', 'Lotus finds Ollama by itself. Point it once at ComfyUI and Voicebox, then press Start. Turn on Start with Lotus and forget about it.'],
  ['Get a model', 'Open Models, type a name such as qwen2.5:7b and download it. That’s it.'],
];

export const Download: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('windows');
  useEffect(() => setPlatform(detectPlatform()), []);
  const p = PLATFORMS[platform];

  return (
    <section id="download" className="mx-auto mb-32 max-w-6xl scroll-mt-24 px-4 sm:px-6">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-[2rem] font-bold leading-tight tracking-tight text-white sm:text-[2.5rem]">Download</h2>
        <div role="tablist" aria-label="Platform" className="apple-segmented-container self-start rounded-[12px] p-1">
          {(Object.keys(PLATFORMS) as Platform[]).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={platform === key}
              onClick={() => setPlatform(key)}
              className={`apple-segmented-item rounded-[8px] ${platform === key ? 'active' : ''}`}
            >
              {PLATFORMS[key].label}
            </button>
          ))}
        </div>
      </div>

      <div role="tabpanel" className="apple-material-card rounded-[16px] p-6 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className={`text-[0.8125rem] font-medium ${p.available ? 'text-[#30d158]' : 'text-[#86868b]'}`}>{p.status}</div>
            <h3 className="mt-1 text-[1.75rem] font-semibold tracking-tight text-white">Lotus for {p.label}</h3>
            <p className="mt-1 text-[0.9375rem] text-[#a1a1a6]">{p.requirements}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button
              href={p.available ? RELEASES : undefined}
              disabled={!p.available}
              external
              icon={<DownloadIcon className="h-4 w-4" />}
            >
              Download for {p.label}
            </Button>
            <Button href={REPO} variant="secondary" external icon={<Github className="h-4 w-4" />}>
              View on GitHub
            </Button>
          </div>
        </div>
        <p className="mt-6 border-t border-white/[0.08] pt-5 text-[0.875rem] leading-relaxed text-[#86868b]">{p.note}</p>
      </div>

      <ol className="mt-14 grid gap-10 md:grid-cols-3">
        {STEPS.map(([title, body], i) => (
          <li key={title}>
            <div className="text-[0.8125rem] tabular-nums text-[#6e6e73]">Step {i + 1}</div>
            <h3 className="mt-2 text-[1.0625rem] font-semibold text-white">{title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

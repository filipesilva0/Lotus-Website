import React, { useEffect, useState } from 'react';
import { Download as DownloadIcon, Github } from 'lucide-react';
import { Button } from './Button';
import { Platform, REPO, RELEASES, FILES, detectPlatform } from '../site';
import { useLatestVersion } from '../hooks/useLatestVersion';

const em = (t: string) => <span className="text-[#f5f5f7]">{t}</span>;

// Every platform card has the same parts in the same order:
// name, status, requirements, the download button, the GitHub button, other formats, one footnote.
const PLATFORMS: Record<Platform, {
  label: string;
  file: string;
  fileLabel: string;
  requirements: string;
  others: { label: string; href: string }[];
  note: React.ReactNode;
}> = {
  windows: {
    label: 'Windows',
    file: FILES.windowsMsi,
    fileLabel: 'Installer (.msi)',
    requirements: 'Windows 10 (version 1803 or later) or Windows 11, 64-bit',
    others: [{ label: 'Portable .zip', href: FILES.windowsPortable }],
    note: (
      <>
        The installer isn't code-signed yet, so Windows may show a SmartScreen warning: choose{' '}
        {em('More info')}, then {em('Run anyway')}. Installed copies update themselves from Settings → Updates.
      </>
    ),
  },
  macos: {
    label: 'macOS',
    file: FILES.macDmg,
    fileLabel: 'Disk image (.dmg), Apple silicon and Intel',
    requirements: 'macOS 11 Big Sur or later',
    others: [],
    note: (
      <>
        Open the .dmg and drag Lotus to Applications. Lotus isn't notarized by Apple yet, so the first
        time {em('right-click Lotus → Open')}, then {em('Open')}. If macOS says the app is damaged, run{' '}
        <code className="rounded bg-white/[0.08] px-1.5 py-0.5 text-[0.8125rem] text-[#f5f5f7]">xattr -cr /Applications/Lotus.app</code>{' '}
        in Terminal once. Lotus updates itself from Settings → Updates.
      </>
    ),
  },
  linux: {
    label: 'Linux',
    file: FILES.linuxAppImage,
    fileLabel: 'AppImage, x86-64',
    requirements: 'A 64-bit desktop with WebKitGTK 4.1 (Ubuntu 22.04, Fedora 36, Debian 12 or newer)',
    others: [
      { label: '.deb (Ubuntu, Debian)', href: FILES.linuxDeb },
      { label: '.rpm (Fedora, openSUSE)', href: FILES.linuxRpm },
    ],
    note: (
      <>
        Make the AppImage executable with{' '}
        <code className="rounded bg-white/[0.08] px-1.5 py-0.5 text-[0.8125rem] text-[#f5f5f7]">chmod +x Lotus-linux-x86_64.AppImage</code>{' '}
        and run it. The AppImage
        updates itself from Settings → Updates; the .deb and .rpm are updated by installing the new package.
      </>
    ),
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
  const version = useLatestVersion();

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
            <div className="text-[0.8125rem] font-medium text-[#30d158]">Early preview · version {version}</div>
            <h3 className="mt-1 text-[1.75rem] font-semibold tracking-tight text-white">Lotus for {p.label}</h3>
            <p className="mt-1 text-[0.9375rem] text-[#a1a1a6]">{p.requirements}</p>
            <p className="mt-0.5 text-[0.8125rem] text-[#86868b]">{p.fileLabel}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button href={p.file} icon={<DownloadIcon className="h-4 w-4" />}>
              Download for {p.label}
            </Button>
            <Button href={REPO} variant="secondary" external icon={<Github className="h-4 w-4" />}>
              View on GitHub
            </Button>
          </div>
        </div>
        <div className="mt-6 border-t border-white/[0.08] pt-5 text-[0.875rem] leading-relaxed text-[#86868b]">
          <p>{p.note}</p>
          <p className="mt-3">
            {p.others.length > 0 && (
              <>
                Also available:{' '}
                {p.others.map((o, i) => (
                  <React.Fragment key={o.href}>
                    {i > 0 && ' · '}
                    <a className="text-[#0A84FF] hover:underline" href={o.href}>{o.label}</a>
                  </React.Fragment>
                ))}
                {' · '}
              </>
            )}
            <a className="text-[#0A84FF] hover:underline" href={RELEASES} target="_blank" rel="noopener noreferrer">All releases</a>
          </p>
        </div>
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

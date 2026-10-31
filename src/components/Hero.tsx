import React from 'react';
import { Download, Github } from 'lucide-react';
import { GlassLotusHero } from './GlassLotusHero';
import { Button } from './Button';
import { REPO } from '../site';
import { useLatestVersion } from '../hooks/useLatestVersion';

export const Hero: React.FC = () => {
  const version = useLatestVersion();
  return (
  <section id="top" className="relative overflow-x-clip pb-24 pt-16 sm:pt-24 md:pb-32">
    <GlassLotusHero className="top-0" />

    <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[120%] max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.2)_55%,transparent_80%)] blur-2xl"
      />

      <h1
        className="text-[2.5rem] font-bold leading-[1.08] tracking-[-0.035em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] sm:text-[3.5rem] md:text-[4rem]"
        style={{ textWrap: 'balance' }}
      >
        Your local AI, in one calm window.
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-[#e5e5ea] drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] sm:text-[1.1875rem]">
        Chat, images, voice, research and an app builder for Windows, macOS and Linux, running on
        models that live on your own computer.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Button href="#download" icon={<Download className="h-4 w-4" />}>Download</Button>
        <Button href={REPO} variant="secondary" external icon={<Github className="h-4 w-4" />}>
          View on GitHub
        </Button>
      </div>

      <p className="mt-5 text-[0.8125rem] text-[#a1a1a6] drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
        Early preview · version {version} · Windows, macOS and Linux
      </p>
    </div>
  </section>
  );
};

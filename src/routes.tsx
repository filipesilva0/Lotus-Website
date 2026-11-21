import React from 'react';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { DownloadPage } from './pages/DownloadPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { Docs } from './pages/Docs';
import { GpuIndex, GpuPage } from './pages/Gpu';
import { CompareIndex, ComparePage, RIVALS } from './pages/Compare';
import { GPUS, gpuTitle, machineClass, picks } from './lib/catalog';

// Every page of the site. The build writes one HTML file per route (scripts/prerender.ts), plus
// sitemap.xml and llms.txt from the titles and summaries here.
export interface Route {
  path: string;
  title: string;
  description: string;
  render: () => React.ReactElement;
  /** Section of llms.txt this page is listed under. */
  group: 'Main' | 'What runs on my PC' | 'Comparisons';
}

const gpuSummary = (g: (typeof GPUS)[number]) => {
  const cls = machineClass(g.vramGb, !!g.unified);
  const chat = picks('chat', cls).map((p) => p.model.title).join(', ');
  const image = picks('image', cls).map((p) => p.model.title).join(', ');
  return `Lotus suggests these chat models: ${chat}; and these image models: ${image}.`;
};

export const ROUTES: Route[] = [
  { path: '/', group: 'Main', title: 'Lotus · Your own AI. One app instead of four.', description: 'Chat, talk, make images and get things done, all on your own PC, in one app. Voice calls you can interrupt, fully offline. Free for Windows.', render: () => <Home /> },
  { path: '/pricing/', group: 'Main', title: 'Pricing · Lotus', description: 'Lotus is free forever. Lotus Pro is a one-time $59 licence ($39 for the first 500 buyers) with 12 months of updates, a 14-day trial and a 14-day refund.', render: () => <Pricing /> },
  { path: '/download/', group: 'Main', title: 'Download · Lotus', description: 'Download Lotus for Windows, with macOS and Linux builds. How to get past the "Windows protected your PC" screen.', render: () => <DownloadPage /> },
  { path: '/docs/', group: 'Main', title: 'Docs · Lotus', description: 'How to install Lotus, choose models, make voice calls, generate images and use Work and Tasks.', render: () => <Docs /> },
  { path: '/privacy/', group: 'Main', title: 'Privacy · Lotus', description: 'Lotus collects nothing: no account, no telemetry, no analytics. Everything stays on your PC, and sync is optional.', render: () => <PrivacyPage /> },
  { path: '/gpu/', group: 'What runs on my PC', title: 'What runs on my PC? · Lotus', description: 'Pick your graphics card to see which chat, image and voice models run well on it in Lotus.', render: () => <GpuIndex /> },
  ...GPUS.map((g): Route => ({
    path: `/gpu/${g.slug}/`,
    group: 'What runs on my PC',
    title: `Local AI on ${g.vendor === 'none' ? 'a PC with no graphics card' : gpuTitle(g)}: what runs · Lotus`,
    description: `Which local AI chat, image and voice models run well on ${g.vendor === 'none' ? 'a PC with no graphics card' : gpuTitle(g)}. ${gpuSummary(g)}`,
    render: () => <GpuPage g={g} />,
  })),
  { path: '/compare/', group: 'Comparisons', title: 'Compare local AI apps · Lotus', description: 'An honest look at how Lotus differs from LM Studio, Jan and Msty, including what they do better.', render: () => <CompareIndex /> },
  ...RIVALS.map((r): Route => ({
    path: `/compare/${r.slug}/`,
    group: 'Comparisons',
    title: `Lotus and ${r.name} compared · Lotus`,
    description: `How Lotus and ${r.name} differ: price, source code, engines, images, voice and developer features. ${r.pick}`,
    render: () => <ComparePage r={r} />,
  })),
];

export const NOT_FOUND: Route = {
  path: '/404.html', group: 'Main', title: 'Page not found · Lotus', description: 'This page does not exist.',
  render: () => (
    <section className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
      <h1 className="text-[2.5rem] font-bold text-white">Page not found</h1>
      <p className="mt-4 text-[#a1a1a6]">That page doesn't exist. Try the <a className="text-[#0A84FF] hover:underline" href={`${import.meta.env.BASE_URL}`}>home page</a>.</p>
    </section>
  ),
};

export const findRoute = (path: string) => ROUTES.find((r) => r.path === path || r.path === `${path}/`) ?? NOT_FOUND;

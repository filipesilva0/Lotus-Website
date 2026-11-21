import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PageHeader, Section, Table, Prose } from '../components/Page';
import { Button } from '../components/Button';
import { ISSUES, href } from '../site';

// Facts checked against each product's own site and README in November 2026. Keep them factual: say
// what the other app does better, never guess at what it lacks ("not built in, as far as we can tell").

export interface Rival {
  slug: string;
  name: string;
  summary: string;
  sources: { label: string; url: string }[];
  /** Row label → [Lotus, rival]. */
  rows: [string, string, string][];
  better: string[];
  lotusBetter: string[];
  pick: string;
}

const LOTUS = {
  price: 'Free. Optional Pro: $59 once (coming soon)',
  source: 'Source code public on GitHub',
  os: 'Windows first; macOS and Linux builds',
  engines: 'Its own (llama.cpp, stable-diffusion.cpp, sherpa-onnx), or Ollama, ComfyUI and Voicebox',
  images: 'Yes, built in',
  voice: 'Yes: voice calls you can interrupt, read-aloud, voice copying, transcripts',
  agents: 'Yes: Work agents that return files, and a Tasks board',
  api: 'Not yet (planned, free)',
  mcp: 'Not yet (planned, free)',
  cloud: 'No; your own cloud keys are planned',
  account: 'Not needed',
};

export const RIVALS: Rival[] = [
  {
    slug: 'lm-studio',
    name: 'LM Studio',
    summary: 'LM Studio is a polished, free desktop app for finding, downloading and chatting with local language models, with a strong developer side: a local API server, a command-line tool and a headless mode.',
    sources: [
      { label: 'LM Studio 0.4.0 release notes', url: 'https://lmstudio.ai/blog/0.4.0' },
      { label: 'MCP in LM Studio', url: 'https://lmstudio.ai/blog/lmstudio-v0.3.17' },
    ],
    rows: [
      ['Price', LOTUS.price, 'Free, including for work'],
      ['Source code', LOTUS.source, 'App is closed source; its command-line tool and SDKs are open source'],
      ['Systems', LOTUS.os, 'Windows, macOS and Linux'],
      ['Engines', LOTUS.engines, 'llama.cpp, and MLX on Apple silicon'],
      ['Image generation', LOTUS.images, 'Not built in'],
      ['Voice', LOTUS.voice, 'Not built in'],
      ['Agents that make files', LOTUS.agents, 'Tool use through MCP servers'],
      ['Local API for other apps', LOTUS.api, 'Yes, plus a headless server mode'],
      ['MCP servers', LOTUS.mcp, 'Yes'],
      ['Account needed', LOTUS.account, 'Not needed'],
    ],
    better: [
      'It is more mature, with a larger model browser and many more people using it.',
      'MLX support makes it especially fast on Apple silicon Macs.',
      'For developers it is ahead today: a local API server, a command-line tool, a headless mode and MCP support.',
    ],
    lotusBetter: [
      'Lotus does more than chat: images, voice calls you can interrupt, read-aloud and transcripts are built in, with nothing else to install.',
      'Work hands back real files (documents, tables, web pages) and Tasks lets Lotus work through a board for you.',
      'It is aimed at beginners first: Lotus picks models for your PC and keeps the technical choices out of the way.',
    ],
    pick: 'Pick LM Studio if you mainly want to chat with and serve language models, especially as a developer or on a Mac. Pick Lotus if you want chat, images and voice together in one app without setting anything up.',
  },
  {
    slug: 'jan',
    name: 'Jan',
    summary: 'Jan is a free, open-source chat app that runs local models and can also connect to cloud models such as GPT and Claude. It offers a local OpenAI-compatible API and MCP support.',
    sources: [{ label: 'Jan README on GitHub', url: 'https://github.com/janhq/jan' }],
    rows: [
      ['Price', LOTUS.price, 'Free'],
      ['Source code', LOTUS.source, 'Open source (Apache 2.0)'],
      ['Systems', LOTUS.os, 'Windows, macOS and Linux, also in the Microsoft Store and Flathub'],
      ['Engines', LOTUS.engines, 'llama.cpp'],
      ['Image generation', LOTUS.images, 'Not built in, as far as we can tell'],
      ['Voice', LOTUS.voice, 'Not built in, as far as we can tell'],
      ['Agents that make files', LOTUS.agents, 'Tool use through MCP servers'],
      ['Local API for other apps', LOTUS.api, 'Yes, OpenAI-compatible'],
      ['MCP servers', LOTUS.mcp, 'Yes'],
      ['Cloud models', LOTUS.cloud, 'Yes: OpenAI, Anthropic, Mistral, Groq and others'],
      ['Account needed', LOTUS.account, 'Not needed'],
    ],
    better: [
      'It is fully open source under Apache 2.0, with a large community behind it.',
      'It mixes local and cloud models in one place, and already supports MCP servers and a local API.',
      'It is already in the Microsoft Store and on Flathub.',
    ],
    lotusBetter: [
      'Lotus makes images and holds voice calls on your own PC, which Jan does not focus on.',
      'Work agents return finished files, and Tasks gives Lotus a board to work through.',
      'Lotus suggests models sized to your graphics card and keeps engines out of sight for beginners.',
    ],
    pick: 'Pick Jan if you want a fully open-source chat app that can use both local and cloud models. Pick Lotus if you want images and voice alongside chat, all running on your PC.',
  },
  {
    slug: 'msty',
    name: 'Msty',
    summary: 'Msty Studio is a feature-rich app for local and cloud models, with personas, knowledge stacks for your documents, an agent mode, MCP tools and a media studio. It has a free tier and a paid Aurum plan.',
    sources: [
      { label: 'Msty pricing', url: 'https://msty.ai/pricing/' },
      { label: 'Msty Studio features', url: 'https://msty.ai/products/studio/' },
    ],
    rows: [
      ['Price', LOTUS.price, 'Free tier; Aurum $149 per year or $349 lifetime'],
      ['Source code', LOTUS.source, 'Closed source'],
      ['Systems', LOTUS.os, 'Desktop and web'],
      ['Engines', LOTUS.engines, 'Ollama, llama.cpp and MLX, plus many cloud providers'],
      ['Image generation', LOTUS.images, 'Yes, in its Media Studio'],
      ['Voice', LOTUS.voice, 'Not a focus, as far as we can tell'],
      ['Agents that make files', LOTUS.agents, 'Agent Mode and MCP tools'],
      ['Chat with your documents', 'Attach files to any chat', 'Yes, Knowledge Stacks'],
      ['MCP servers', LOTUS.mcp, 'Yes (limited on the free tier)'],
      ['Cloud models', LOTUS.cloud, 'Yes, many providers'],
    ],
    better: [
      'It has more ways to organise chats: personas, side-by-side "crew" conversations and Knowledge Stacks for your documents.',
      'It connects to many cloud providers and has a web version on its paid plan.',
      'It supports MCP tools today.',
    ],
    lotusBetter: [
      'Voice is at the centre of Lotus: interruptible calls, read-aloud, voice copying and transcripts, all offline.',
      'Lotus Pro is a single $59 payment rather than a yearly plan, and every expert setting stays free.',
      'Lotus is built for beginners first and suggests models that fit your graphics card.',
    ],
    pick: 'Pick Msty if you juggle many cloud and local models and want deep chat organisation. Pick Lotus if you want your own AI that talks, draws and works on your PC, without a subscription.',
  },
];

export const CompareIndex: React.FC = () => (
  <>
    <PageHeader
      eyebrow="Compare"
      title="Lotus and other local AI apps"
      lead="There are good apps for running AI on your own PC. Here is an honest look at how Lotus differs from the ones people ask about most, including what they do better."
    />
    <Section>
      <ul className="grid gap-4 md:grid-cols-3">
        {RIVALS.map((r) => (
          <li key={r.slug}>
            <a href={href(`/compare/${r.slug}/`)} className="flex h-full flex-col rounded-[16px] border border-white/10 p-6 transition-colors hover:border-white/25 hover:bg-white/[0.03]">
              <h2 className="text-[1.25rem] font-semibold text-white">Lotus and {r.name}</h2>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">{r.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-[0.9375rem] text-[#0A84FF]">Read the comparison <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
            </a>
          </li>
        ))}
      </ul>
      <Disclosure />
    </Section>
  </>
);

const Disclosure: React.FC = () => (
  <p className="mt-10 max-w-3xl text-[0.875rem] leading-relaxed text-[#86868b]">
    Written by the developer of Lotus, so read it with that in mind. Facts about other apps were checked on their own websites
    in November 2026 and may have changed since. Spotted something wrong or out of date?{' '}
    <a className="text-[#0A84FF] hover:underline" href={ISSUES}>Open an issue</a> and it will be fixed.
  </p>
);

export const ComparePage: React.FC<{ r: Rival }> = ({ r }) => (
  <>
    <PageHeader
      eyebrow={<a href={href('/compare/')} className="inline-flex items-center gap-1 hover:underline"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Compare</a>}
      title={`Lotus and ${r.name}`}
      lead={r.summary}
    />
    <Section title="At a glance">
      <Table caption={`Lotus compared with ${r.name}`} head={['', 'Lotus', r.name]} cols="22% 39% 39%" rows={r.rows} />
    </Section>
    <Section>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[16px] border border-white/10 p-6">
          <h2 className="text-[1.25rem] font-semibold text-white">Where {r.name} is stronger</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">{r.better.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="rounded-[16px] border border-white/10 p-6">
          <h2 className="text-[1.25rem] font-semibold text-white">Where Lotus is different</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">{r.lotusBetter.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </div>
    </Section>
    <Section title="Which should you pick?">
      <Prose>
        <p>{r.pick}</p>
        <p>
          You don't have to choose just one. Both apps can live on the same PC, and Lotus can also use an Ollama you already have.
        </p>
        <p>
          Sources: {r.sources.map((s, i) => <React.Fragment key={s.url}>{i > 0 && ' · '}<a href={s.url}>{s.label}</a></React.Fragment>)}
        </p>
      </Prose>
      <Disclosure />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href={href('/download/')}>Try Lotus free</Button>
        <Button href={href('/compare/')} variant="secondary">Other comparisons</Button>
      </div>
    </Section>
  </>
);

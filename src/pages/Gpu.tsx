import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageHeader, Section, Table } from '../components/Page';
import { Button } from '../components/Button';
import { href } from '../site';
import {
  GPUS, VENDOR_NOTE, CLASS_LABEL, CATALOG_DATE, MODELS, TIER_LABEL, FIT_LABEL, FIT_COLOR,
  machineClass, picks, fitOf, gpuTitle, type Gpu, type Model, type Vendor,
} from '../lib/catalog';

const GROUPS: [string, Vendor[]][] = [
  ['NVIDIA GeForce', ['nvidia']],
  ['AMD and Intel', ['amd', 'intel']],
  ['Mac, or no graphics card', ['apple', 'none']],
];

export const GpuIndex: React.FC = () => (
  <>
    <PageHeader
      eyebrow="What runs on my PC"
      title="Which AI models will run on your PC?"
      lead="Pick your graphics card to see the chat, image and voice models Lotus suggests for it, and everything else in its catalog that fits."
    />
    <Section>
      <div className="grid gap-10 md:grid-cols-3">
        {GROUPS.map(([label, vendors]) => (
          <div key={label}>
            <h2 className="text-[1rem] font-semibold text-white">{label}</h2>
            <ul className="mt-3 space-y-1">
              {GPUS.filter((g) => vendors.includes(g.vendor)).map((g) => (
                <li key={g.slug}>
                  <a href={href(`/gpu/${g.slug}/`)} className="flex items-center justify-between gap-3 rounded-[8px] px-3 py-2 text-[0.9375rem] text-[#d1d1d6] hover:bg-white/[0.06] hover:text-white">
                    <span>{g.name}</span>
                    {g.vendor !== 'none' && g.vendor !== 'apple' && <span className="tabular-nums text-[0.8125rem] text-[#86868b]">{g.vramGb} GB</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-10 max-w-2xl text-[0.9375rem] leading-relaxed text-[#86868b]">
        Don't see your card? What matters most is how much memory it has. Find a card above with the same amount and the
        answer will be the same. To see your card on Windows, open Task Manager, choose Performance, then GPU.
      </p>
    </Section>
  </>
);

const tagLine = (m: Model) => [m.tools && 'Good with tools', m.vision && 'Reads images', m.clones && 'Copies voices'].filter(Boolean).join(' · ');

const FitBadge: React.FC<{ m: Model; g: Gpu }> = ({ m, g }) => {
  const f = fitOf(m, g.vramGb, !!g.unified);
  return <span style={{ color: FIT_COLOR[f] }}>{FIT_LABEL[f]}</span>;
};

const PickCards: React.FC<{ kind: 'chat' | 'image'; g: Gpu }> = ({ kind, g }) => (
  <ul className="grid gap-4 md:grid-cols-3">
    {picks(kind, machineClass(g.vramGb, !!g.unified)).map(({ tier, model }) => (
      <li key={tier} className="flex flex-col rounded-[16px] border border-white/10 p-5">
        <div className="text-[0.8125rem] font-medium text-[#86868b]">{TIER_LABEL[tier]}</div>
        <h3 className="mt-1 text-[1.125rem] font-semibold text-white">{model.title}</h3>
        <p className="text-[0.8125rem] text-[#86868b]">{model.maker} · {model.licence}</p>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">{model.blurb}</p>
        <p className="mt-4 text-[0.8125rem]"><FitBadge m={model} g={g} /> <span className="text-[#6e6e73]">· {model.diskGb} GB download</span></p>
      </li>
    ))}
  </ul>
);

const VOICE_IDS = ['kokoro', 'piper-en-us-lessac', 'whisper-turbo', 'pocket-tts', 'chatterbox-turbo', 'qwen3-tts-1.7b'];

function rowsFor(kind: Model['kind'] | 'voice-picks', g: Gpu) {
  const order = { fits: 0, tight: 1, slow: 2, 'too-big': 3 } as const;
  return MODELS.filter((m) => (kind === 'voice-picks' ? VOICE_IDS.includes(m.id) : m.kind === kind))
    .map((m) => ({ m, f: fitOf(m, g.vramGb, !!g.unified) }))
    .sort((a, b) => order[a.f] - order[b.f] || b.m.vramGb - a.m.vramGb)
    .map(({ m }) => [
      <span>{m.title}<span className="block text-[0.8125rem] font-normal text-[#86868b]">{m.maker}{tagLine(m) ? ` · ${tagLine(m)}` : ''}</span></span>,
      <FitBadge m={m} g={g} />,
      m.vramGb > 0 ? `${m.vramGb} GB` : 'Processor',
      `${m.diskGb} GB`,
      m.licence,
    ]);
}

export const GpuPage: React.FC<{ g: Gpu }> = ({ g }) => {
  const cls = machineClass(g.vramGb, !!g.unified);
  const head = ['Model', 'On this PC', 'Memory needed', 'Download', 'Licence'];
  return (
    <>
      <PageHeader
        eyebrow={<a href={href('/gpu/')} className="inline-flex items-center gap-1 hover:underline"><ArrowLeft className="h-4 w-4" aria-hidden="true" />What runs on my PC</a>}
        title={`What runs on ${g.vendor === 'none' ? 'a PC with no graphics card' : `${/^Intel/.test(g.name) ? 'an' : 'a'} ${gpuTitle(g)}`}?`}
        lead={`Lotus sorts this into "${CLASS_LABEL[cls]}". Here is what its setup guide suggests, and how every model in its catalog runs on it.`}
      >
        <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-[#86868b]">{g.note ?? VENDOR_NOTE[g.vendor]}</p>
      </PageHeader>

      <Section title="Chat models Lotus suggests" lead="For chatting, voice calls, Work and Tasks. Balanced is the one to start with.">
        <PickCards kind="chat" g={g} />
      </Section>

      <Section title="Image models Lotus suggests">
        <PickCards kind="image" g={g} />
      </Section>

      <Section title="Voice" lead="Voice and speech recognition run on the processor, so every PC gets them. Kokoro and Piper give you dozens of built-in voices in many languages, Whisper writes down what you say, and PocketTTS can copy a voice from a few seconds of speech (copying voices is part of Lotus Pro). Chatterbox and Qwen3-TTS run through Voicebox, if you use it.">
        <Table caption="Voice models" head={head} rows={rowsFor('voice-picks', g)} />
      </Section>

      <Section title="Every chat model">
        <Table caption="All chat models" head={head} rows={rowsFor('chat', g)} />
      </Section>

      <Section title="Every image model">
        <Table caption="All image models" head={head} rows={rowsFor('image', g)} />
      </Section>

      <Section>
        <p className="max-w-3xl text-[0.875rem] leading-relaxed text-[#86868b]">
          "Runs well" means the model fits in the card's memory with room for the conversation. "Tight fit" means it loads but
          part of it may spill into normal memory, which makes it slower. These lists come straight from the model catalog
          inside Lotus (updated {CATALOG_DATE}), using the same rules the app uses on its Models page. Speeds vary with the
          rest of your PC.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={href('/download/')}>Download Lotus</Button>
          <Button href={href('/gpu/')} variant="secondary">Pick another card</Button>
        </div>
      </Section>
    </>
  );
};

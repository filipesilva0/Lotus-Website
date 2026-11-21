import React from 'react';
import { ArrowRight, Download, MessageSquare, Image as ImageIcon, AudioLines, ListChecks, Check } from 'lucide-react';
import { GlassLotusHero } from '../components/GlassLotusHero';
import { Button } from '../components/Button';
import { Tour } from '../components/Tour';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { VoiceCallDemo } from '../components/VoiceCallDemo';
import { href, PETAL, PRO } from '../site';
import { GPUS, gpuTitle } from '../lib/catalog';
import { useLatestVersion } from '../hooks/useLatestVersion';

const h2 = 'text-[2rem] font-bold leading-tight tracking-tight text-white sm:text-[2.5rem]';
const lead = 'mt-4 text-[1.0625rem] leading-relaxed text-[#a1a1a6]';

const FOUR = [
  { icon: MessageSquare, color: PETAL.blue, name: 'Chat', instead: 'instead of a chatbot website', text: 'Ask anything, attach files and photos, search the web when you want it.' },
  { icon: ImageIcon, color: PETAL.orange, name: 'Images', instead: 'instead of an image generator', text: 'Make and edit pictures on your own graphics card, no credits or queues.' },
  { icon: AudioLines, color: PETAL.yellow, name: 'Voice', instead: 'instead of a voice app', text: 'Talk out loud, hear answers, turn text into speech and recordings into text.' },
  { icon: ListChecks, color: PETAL.red, name: 'Work and Tasks', instead: 'instead of an agent tool', text: 'Hand over a job and get real files back: documents, tables, web pages, code.' },
];

const POPULAR = ['rtx-3060', 'rtx-4060', 'rtx-4070', 'rtx-5070', 'rtx-4090', 'rx-7800-xt', 'no-graphics-card', 'mac-16gb'];

export const Home: React.FC = () => {
  const version = useLatestVersion();
  return (
    <>
      <section id="top" className="relative min-h-[560px] overflow-hidden pb-24 pt-16 sm:min-h-[740px] sm:pt-24 md:min-h-[900px] lg:min-h-[940px] xl:min-h-[1060px]">
        <GlassLotusHero className="top-0" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[120%] max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.2)_55%,transparent_80%)] blur-2xl" />
          <a href="#call" className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 text-[0.875rem] text-[#e5e5ea] backdrop-blur hover:border-white/30">
            <span className="h-2 w-2 rounded-full bg-[#F5CF3A]" aria-hidden="true" />
            Talk to it out loud, and cut in any time
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <h1 className="text-[2.5rem] font-bold leading-[1.08] tracking-[-0.035em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] sm:text-[3.5rem] md:text-[4rem]" style={{ textWrap: 'balance' }}>
            Your own AI. One app instead of four.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-[#e5e5ea] drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] sm:text-[1.1875rem]">
            Chat, talk, make images and get things done, all on your own PC, in one app. No account, no subscription, no terminal.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href={href('/download/')} icon={<Download className="h-4 w-4" />}>Download free</Button>
            <Button href={href('/gpu/')} variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>What runs on my PC?</Button>
          </div>
          <p className="mt-5 text-[0.8125rem] text-[#a1a1a6] drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
            Free · Early preview, version {version} · Windows, with macOS and Linux builds too
          </p>
        </div>
      </section>

      <section id="call" className="mx-auto mb-32 max-w-6xl scroll-mt-24 px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center">
          <div>
            <div className="text-[0.875rem] font-medium" style={{ color: PETAL.yellow }}>Voice calls</div>
            <h2 className={`mt-2 ${h2}`}>Call your AI. Cut in any time.</h2>
            <p className={lead}>
              Press Call and just talk. Lotus answers out loud while it thinks, and the moment you start speaking it stops and
              listens, like a person would. Change your mind halfway through a sentence and it keeps up.
            </p>
            <ul className="mt-6 space-y-3 text-[1rem] text-[#d1d1d6]">
              {[
                'Fully offline: your voice never leaves your PC, and it works with the Wi-Fi off.',
                'Pick from dozens of built-in voices, in English, Portuguese, Spanish, German, French and more.',
                'Runs on a mid-range graphics card, such as an 8 GB RTX 4060.',
                'With Lotus Pro, Lotus can talk back in a voice you design or record yourself.',
              ].map((t) => (
                <li key={t} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-[#30d158]" aria-hidden="true" />{t}</li>
              ))}
            </ul>
          </div>
          <VoiceCallDemo />
        </div>
      </section>

      <section id="four" className="mx-auto mb-16 max-w-6xl scroll-mt-24 px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className={h2}>One app instead of four.</h2>
          <p className={lead}>
            Running your own AI used to mean a chat app, an image tool, a voice program and something for agents, each with its
            own setup and its own look. Lotus is all four, and they work together: ask for a picture in Chat and Images makes it,
            give Work a job by voice and hear the answer.
          </p>
        </div>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[16px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {FOUR.map((f) => (
            <li key={f.name} className="bg-black p-6">
              <f.icon className="h-6 w-6" style={{ color: f.color }} aria-hidden="true" />
              <h3 className="mt-4 text-[1.0625rem] font-semibold text-white">{f.name}</h3>
              <p className="text-[0.8125rem] text-[#86868b]">{f.instead}</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <Tour />

      <section id="fits" className="mx-auto mb-32 max-w-6xl scroll-mt-24 px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className={h2}>Lotus picks what fits your PC.</h2>
            <p className={lead}>
              The first time it opens, Lotus looks at your graphics card and suggests a chat, an image and a voice model that
              run well on it. You never need to know what a model file, an engine or a "quantization" is. They download in the
              background, and you can start talking.
            </p>
            <p className="mt-6">
              <a className="inline-flex items-center gap-1 text-[1rem] text-[#0A84FF] hover:underline" href={href('/gpu/')}>
                See what runs on your card <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {POPULAR.map((slug) => {
              const g = GPUS.find((x) => x.slug === slug)!;
              return (
                <li key={slug}>
                  <a href={href(`/gpu/${slug}/`)} className="block rounded-[12px] border border-white/10 bg-white/[0.03] px-4 py-3 text-[0.9375rem] text-[#e5e5ea] transition-colors hover:border-white/25 hover:bg-white/[0.06]">
                    {gpuTitle(g)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Features />

      <section id="modes" className="mx-auto mb-32 max-w-6xl scroll-mt-24 px-4 sm:px-6">
        <h2 className={`max-w-2xl ${h2}`}>Simple for beginners. Nothing locked for experts.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[16px] border border-white/10 p-6 sm:p-8">
            <h3 className="text-[1.25rem] font-semibold text-white">New to local AI?</h3>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-[#a1a1a6]">
              <li>No terminal, no model tags, nothing else to install.</li>
              <li>Lotus picks models that fit your PC and downloads them for you.</li>
              <li>Lotus asks before it uses your computer or a browser, and you choose what else needs asking.</li>
              <li>Everything lives in one Lotus Studio folder in your Documents.</li>
            </ul>
          </div>
          <div className="rounded-[16px] border border-white/10 p-6 sm:p-8">
            <h3 className="text-[1.25rem] font-semibold text-white">Already run local models?</h3>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-[#a1a1a6]">
              <li>Use Lotus's own engines (llama.cpp, stable-diffusion.cpp, sherpa-onnx) or the Ollama, ComfyUI and Voicebox you already have.</li>
              <li>Add any GGUF or image model from Hugging Face with a link, and set up LoRAs, VAEs and text encoders yourself.</li>
              <li>Compare models side by side in Arena &amp; Benchmark.</li>
              <li>Coming to Advanced mode, free: MCP servers, a local API and your own cloud keys.</li>
            </ul>
          </div>
        </div>
      </section>

      <HowItWorks />

      <section id="privacy" className="mx-auto mb-32 max-w-6xl scroll-mt-24 px-4 sm:px-6">
        <div className="rounded-[20px] border border-white/10 bg-white/[0.02] p-8 sm:p-12">
          <h2 className={h2}>Lotus collects nothing.</h2>
          <p className={`max-w-2xl ${lead}`}>
            No account, no telemetry, no analytics. Your chats, pictures and voice stay on your PC, and Lotus keeps working with
            the internet off. Syncing between computers is optional and only goes to a server you set up yourself.
          </p>
          <p className="mt-6">
            <a className="inline-flex items-center gap-1 text-[1rem] text-[#0A84FF] hover:underline" href={href('/privacy/')}>
              Exactly what goes online, and when <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </p>
        </div>
      </section>

      <section id="pricing" className="mx-auto mb-32 max-w-6xl scroll-mt-24 px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
          <div>
            <h2 className={h2}>Free to use. Pro when you want more.</h2>
            <p className={lead}>
              Lotus is free, with no time limit and no account. Lotus Pro adds your own voices, multi-voice stories and more, for
              one payment of ${PRO.price}. You own it: no subscription.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[16px] border border-white/10 p-6">
              <div className="text-[0.9375rem] font-semibold text-white">Lotus</div>
              <div className="mt-2 text-[2rem] font-bold text-white">$0</div>
              <p className="mt-1 text-[0.875rem] text-[#86868b]">Chat, images, voice calls, Work, Tasks and every expert setting.</p>
            </div>
            <div className="rounded-[16px] border border-[#F5CF3A]/40 bg-[#F5CF3A]/[0.04] p-6">
              <div className="text-[0.9375rem] font-semibold text-white">Lotus Pro</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[2rem] font-bold text-white">${PRO.price}</span>
                <span className="text-[0.875rem] text-[#a1a1a6]">once</span>
              </div>
              <p className="mt-1 text-[0.875rem] text-[#86868b]">${PRO.founderPrice} for the first {PRO.founderSeats} buyers. Coming soon.</p>
            </div>
            <a href={href('/pricing/')} className="inline-flex items-center gap-1 text-[1rem] text-[#0A84FF] hover:underline sm:col-span-2">
              Compare Free and Pro <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-32 max-w-3xl px-4 text-center sm:px-6">
        <h2 className={h2}>Your own AI, on your own PC.</h2>
        <p className={lead}>Free download. Setup takes a few minutes, most of it waiting for the models to arrive.</p>
        <div className="mt-8 flex justify-center">
          <Button href={href('/download/')} icon={<Download className="h-4 w-4" />}>Download Lotus</Button>
        </div>
      </section>
    </>
  );
};

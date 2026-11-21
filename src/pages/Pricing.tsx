import React from 'react';
import { Check, Minus, Clock } from 'lucide-react';
import { Button } from '../components/Button';
import { PageHeader, Section, Table, Yes, No, Soon } from '../components/Page';
import { BUY_URL, PRO, href } from '../site';

type Row = [string, boolean, boolean, boolean?];
// Mirrors "Free vs Pro" in the business plan. The last field marks features that are not built yet.
const ROWS: Row[] = [
  ['Chat with tools and approvals', true, true],
  ['Image generation', true, true],
  ['Dictation and read-aloud', true, true],
  ['Built-in voices', true, true],
  ['Voice calls you can interrupt', true, true],
  ['Deep Research, memory, Tasks and the floating island', true, true],
  ['Models picked to fit your PC', true, true],
  ['Advanced settings: engines, any model file, LoRAs', true, true],
  ['Advanced: MCP servers, local API, your own cloud keys', true, true, true],
  ['Voice cloning and designed voices', false, true],
  ['Your own voices in calls and read-aloud', false, true],
  ['Multi-voice Stories with export', false, true],
  ['Routines that run while the window is closed', false, true, true],
  ['Use Lotus from your phone', false, true, true],
  ['Email support and early builds', false, true],
];

const cell = (on: boolean, soon?: boolean) =>
  on ? (soon ? <Soon /> : <Yes><Check className="h-4 w-4" aria-label="Included" /></Yes>) : <No><Minus className="h-4 w-4" aria-label="Not included" /></No>;

const usd = (n: number) => `$${n}`;

const FAQ: [string, string][] = [
  ['Is the free version really free?', 'Yes. It never expires, needs no account and has no ads. Everything that makes your own AI work is in it, and every expert setting stays free too.'],
  ['What does "one-time" mean?', `You pay ${usd(PRO.price)} once and Lotus Pro is yours. It includes 12 months of updates. After that you keep the last version you had, forever. If you want another year of new features, renewing costs ${usd(PRO.renewal)} whenever you like, and it is optional.`],
  ['What is the founder price?', `The first ${PRO.founderSeats} people to buy Pro pay ${usd(PRO.founderPrice)} instead of ${usd(PRO.price)}. A counter on this page will show how many founder licences are left. There are no other discounts, so nobody who buys later pays less than you did.`],
  ['Can I try Pro first?', `Yes. A ${PRO.trialDays}-day Pro trial starts by itself after your first successful chat. No card, no sign-up.`],
  ['How many computers can I use it on?', `${PRO.devices}. If you replace a PC, deactivate the old one yourself in Settings and use the key on the new one.`],
  ['Does Pro need the internet?', 'Only once, to activate your key. After that Lotus works offline. It checks the key again about once a month when you happen to be online, and it never locks you out when you are not.'],
  ['Can I get a refund?', `Yes, within ${PRO.refundDays} days, no questions asked.`],
  ['Can I use Lotus for work?', 'Yes, both Free and Pro, with no separate business licence. Check the licence of each model you use: a few image models, marked "Non-commercial" in the app, are for personal use only.'],
  ['Who handles payment?', 'Polar, a payment company that acts as the seller. It handles cards, taxes, receipts and refunds. Lotus never sees your card details.'],
  ['Why not a subscription?', 'Your AI runs on your PC, so Lotus has no servers to pay for each month. Charging you every month for that would not be fair.'],
];

export const Pricing: React.FC = () => (
  <>
    <PageHeader
      eyebrow="Pricing"
      title="Free to use. Pay once for Pro."
      lead="Everything runs on your own PC, so there is nothing to rent. Lotus is free forever. Lotus Pro is a one-time licence for people who want more from their voices and their AI."
    />

    <Section>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col rounded-[20px] border border-white/10 p-7 sm:p-9">
          <h2 className="text-[1.25rem] font-semibold text-white">Lotus</h2>
          <div className="mt-4 flex items-baseline gap-2"><span className="text-[3rem] font-bold leading-none text-white">$0</span><span className="text-[#a1a1a6]">forever</span></div>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">Your own AI that works: chat, images, voice calls, Work, Tasks, and every expert setting.</p>
          <ul className="mt-6 flex-1 space-y-2.5 text-[0.9375rem] text-[#d1d1d6]">
            {['No account, no time limit', 'Models matched to your PC', 'Voice calls with built-in voices', 'Use it for work too'].map((t) => (
              <li key={t} className="flex gap-2.5"><Check className="mt-1 h-4 w-4 shrink-0 text-[#30d158]" aria-hidden="true" />{t}</li>
            ))}
          </ul>
          <div className="mt-8"><Button href={href('/download/')}>Download free</Button></div>
        </div>

        <div className="flex flex-col rounded-[20px] border border-[#F5CF3A]/40 bg-[#F5CF3A]/[0.04] p-7 sm:p-9">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[1.25rem] font-semibold text-white">Lotus Pro</h2>
            <span className="rounded-full bg-[#F5CF3A]/15 px-2.5 py-1 text-[0.75rem] font-medium text-[#F5CF3A]">Founder price</span>
          </div>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[3rem] font-bold leading-none text-white">{usd(PRO.founderPrice)}</span>
            <s className="text-[1.25rem] text-[#86868b]"><span className="sr-only">instead of </span>{usd(PRO.price)}</s>
            <span className="text-[#a1a1a6]">one-time</span>
          </div>
          <p className="mt-2 text-[0.875rem] text-[#F5CF3A]">For the first {PRO.founderSeats} buyers, then {usd(PRO.price)}.</p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">Everything in Lotus, plus your own voices, multi-voice Stories, and the Pro features still to come at no extra cost.</p>
          <ul className="mt-6 flex-1 space-y-2.5 text-[0.9375rem] text-[#d1d1d6]">
            {['12 months of updates included', 'Keep your last version forever', `${PRO.trialDays}-day free trial, no card`, `${PRO.devices} computers per licence`, `${PRO.refundDays}-day refund, no questions`].map((t) => (
              <li key={t} className="flex gap-2.5"><Check className="mt-1 h-4 w-4 shrink-0 text-[#F5CF3A]" aria-hidden="true" />{t}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={BUY_URL ?? undefined} disabled={!BUY_URL} icon={<Clock className="h-4 w-4" />}>{BUY_URL ? 'Buy Lotus Pro' : 'Coming soon'}</Button>
            {!BUY_URL && <span className="text-[0.8125rem] text-[#86868b]">Pro isn't on sale yet. During the preview, everything in Lotus is free.</span>}
          </div>
        </div>
      </div>
    </Section>

    <Section title="Free and Pro, side by side" lead="Pro launches with the voice features, which are already built. Features marked Coming join when they are ready, at no extra cost to people who already bought Pro.">
      <Table
        caption="Features in Lotus Free and Lotus Pro"
        head={['Feature', 'Free', 'Pro']}
        cols="60% 20% 20%"
        rows={ROWS.map(([name, free, pro, soon]) => [name, cell(free, soon), cell(pro, soon)])}
      />
    </Section>

    <Section title="Questions">
      <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2">
        {FAQ.map(([q, a]) => (
          <div key={q}>
            <dt className="text-[1.0625rem] font-semibold text-white">{q}</dt>
            <dd className="mt-2 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">{a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  </>
);

export const PRICING_FAQ = FAQ;

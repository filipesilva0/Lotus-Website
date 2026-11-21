import React from 'react';
import { PageHeader, Section, Prose } from '../components/Page';
import { REPO } from '../site';

const ROWS = [
  ['Chat, Work, images, voice, memory, tasks', 'Never', 'Nothing. It all stays on your computer.'],
  ['Web in chat', 'When you turn it on', 'Your search words to the search sites you use (by default DuckDuckGo, Bing and Wikipedia), then a normal visit to the top results'],
  ['Chrome or computer control in Work', 'When you turn it on, and each action asks', 'What the pages Lotus opens for you would receive from any browser'],
  ['Deep Research', 'During a research run', 'Short keyword searches to the academic databases you tick'],
  ['Engine and model downloads', 'When you pick or download them', 'A download request to that project\'s own site (GitHub, Hugging Face, Ollama) or the link you pasted'],
  ['Update check', 'When you ask, or at launch if you turn it on', 'A request to Lotus\'s release page on GitHub'],
  ['Sync between PCs', 'Only if you set up your own sync server and sign in', 'Your profile, to the server you set up. There is no Lotus server.'],
];

export const PrivacyPage: React.FC = () => (
  <>
    <PageHeader
      eyebrow="Privacy"
      title="Lotus collects nothing."
      lead="No account, no telemetry, no analytics, no tracking. Your AI runs on your PC, and what you do with it stays there. Turn off your Wi-Fi and Lotus keeps working."
    />

    <Section title="What leaves your computer" lead="Nothing goes online unless you switch it on, and this is the whole list.">
      <div className="border-t border-white/15">
        <div className="hidden grid-cols-[4fr_3fr_5fr] gap-6 border-b border-white/15 py-3 text-[0.8125rem] text-[#86868b] md:grid">
          <span>Feature</span><span>Goes online</span><span>What is sent</span>
        </div>
        {ROWS.map(([what, when, sent], i) => (
          <div key={what} className="grid gap-1 border-b border-white/[0.08] py-4 text-[0.9375rem] md:grid-cols-[4fr_3fr_5fr] md:gap-6">
            <span className="font-medium text-white">{what}</span>
            <span className={i === 0 ? 'text-[#30d158]' : 'text-[#d1d1d6]'}>{when}</span>
            <span className="text-[#a1a1a6]">{sent}</span>
          </div>
        ))}
      </div>
    </Section>

    <Section>
      <Prose>
        <h2>Where your things are kept</h2>
        <p>
          Everything Lotus keeps lives in your <strong>Lotus Studio</strong> folder (in Documents unless you choose another
          place): your chats, settings, memory and tasks in one database file, plus folders of ordinary files for models,
          images, audio and Work results. You can open, back up, move or delete any of it yourself.
        </p>
        <p>
          Lotus's background helper only listens on your own computer, not your network, and only answers Lotus's own windows.
        </p>

        <h2>Accounts and sync</h2>
        <p>
          You never need an account to use Lotus. Signing in is optional and only exists to keep your profile in sync between
          your own PCs, through a sync server you set up yourself. Lotus has no server of its own that your data could go to.
        </p>

        <h2>Lotus Pro</h2>
        <p>
          When Pro goes on sale, it will be sold by <strong>Polar</strong>, a payment company that acts as the seller. Polar
          holds your purchase details (your email, what you bought, and payment information) to process the sale, taxes and
          refunds. Lotus itself never sees your card.
        </p>
        <p>
          Your licence key is checked with Polar once when you activate it, and again about once a month if you're online. That
          check sends only what Polar needs to confirm the key, never anything about what you do in Lotus.
        </p>

        <h2>Crash reports</h2>
        <p>
          Lotus sends no crash reports today. If they are added, they will be off unless you turn them on, and you will see
          exactly what would be sent before anything goes.
        </p>

        <h2>This website</h2>
        <p>
          No cookies, no analytics and no tracking scripts. Fonts are part of the site, not loaded from a font service. Pages
          ask GitHub for the newest Lotus version number to show it, and download buttons link to GitHub, where the files are
          hosted. The site is hosted on GitHub Pages, which, like any web host, sees the requests your browser makes.
        </p>

        <h2>Check it yourself</h2>
        <p>
          Lotus's source code is public on <a href={REPO}>GitHub</a>, so anyone can read exactly what it does and confirm that
          nothing leaves your PC without your say.
        </p>

        <h2>Questions</h2>
        <p>
          Open an issue on <a href={`${REPO}/issues`}>GitHub</a>. Lotus is made by one independent developer, who reads every one.
        </p>
      </Prose>
    </Section>
  </>
);

import React from 'react';
import { Download as DownloadIcon, ShieldCheck, Store, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/Button';
import { PageHeader, Section, Em } from '../components/Page';
import { FILES, RELEASES, STORE_URL, PETAL, href } from '../site';
import { useLatestVersion } from '../hooks/useLatestVersion';

const code = (t: string) => <code className="rounded bg-white/[0.08] px-1.5 py-0.5 text-[0.8125rem] text-[#f5f5f7]">{t}</code>;

// Highlights of the newest releases. Keep in step with the app repo's release-notes/ folder.
const NEW = [
  { color: PETAL.blue, title: 'Quick on 8 GB cards', text: 'Lotus sizes each chat to your graphics card and no longer swaps models after every reply, so long chats stay fast.' },
  { color: PETAL.blue, title: 'Smarter web search', text: 'Lotus only searches when your question needs it, and always ends with an answer, even when a search site is busy.' },
  { color: PETAL.red, title: 'Honest research', text: 'Work documents only list sources that were really found. If nothing was found, Lotus says so.' },
  { color: PETAL.red, title: 'Pick up where it stopped', text: 'A Work job cut short by a restart shows Interrupted, with a Try again button.' },
];

/** The SmartScreen screen, drawn as a simple diagram so people recognise it. Not a copy of the real one. */
const SmartScreenDiagram: React.FC<{ step: 1 | 2 }> = ({ step }) => (
  <figure className="rounded-[12px] border border-white/10 bg-[#0b3a6e] p-5 text-left text-white" aria-hidden="true">
    <div className="text-[1.0625rem] font-semibold">Windows protected your PC</div>
    <p className="mt-2 text-[0.8125rem] leading-snug text-white/80">Microsoft Defender SmartScreen prevented an unrecognised app from starting…</p>
    {step === 1 ? (
      <p className="mt-2 text-[0.8125rem]"><span className="rounded px-1 underline decoration-2 underline-offset-2 outline outline-2 outline-[#F5CF3A]">More info</span></p>
    ) : (
      <p className="mt-2 text-[0.8125rem] text-white/80">App: Lotus-windows-x64.msi<br />Publisher: Unknown publisher</p>
    )}
    <div className="mt-5 flex justify-end gap-2 text-[0.8125rem]">
      {step === 2 && <span className="rounded-[4px] border border-white/60 px-3 py-1 outline outline-2 outline-offset-2 outline-[#F5CF3A]">Run anyway</span>}
      <span className="rounded-[4px] border border-white/60 px-3 py-1">Don't run</span>
    </div>
  </figure>
);

export const DownloadPage: React.FC = () => {
  const version = useLatestVersion();
  return (
    <>
      <PageHeader
        eyebrow={`Early preview · version ${version}`}
        title="Download Lotus"
        lead="Free, with no account. Lotus is made for Windows first; macOS and Linux builds are there too for people who want to try them."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="apple-material-card flex flex-col rounded-[20px] p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <Store className="h-6 w-6 text-[#0A84FF]" aria-hidden="true" />
              <h2 className="text-[1.25rem] font-semibold text-white">Microsoft Store</h2>
            </div>
            <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">
              The easiest way: signed by Microsoft, installs without any warning, and updates itself through the Store.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href={STORE_URL ?? undefined} disabled={!STORE_URL} external icon={<Store className="h-4 w-4" />}>
                {STORE_URL ? 'Get it from the Microsoft Store' : 'Coming soon to the Store'}
              </Button>
            </div>
          </div>

          <div className="apple-material-card flex flex-col rounded-[20px] p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <DownloadIcon className="h-6 w-6 text-[#30d158]" aria-hidden="true" />
              <h2 className="text-[1.25rem] font-semibold text-white">Direct download for Windows</h2>
            </div>
            <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">
              Windows 10 (1803 or later) or Windows 11, 64-bit. Installs into Documents\Lotus Studio without administrator
              rights, and updates itself from Settings → Updates.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href={FILES.windowsMsi} icon={<DownloadIcon className="h-4 w-4" />}>Download for Windows</Button>
              <a className="text-[0.875rem] text-[#0A84FF] hover:underline" href={FILES.windowsPortable}>Portable .zip</a>
            </div>
          </div>
        </div>
      </Section>

      <Section id="smartscreen" title={'Seeing "Windows protected your PC"?'} lead="That's normal for the direct download, and here is why. Windows shows this screen for any new app that hasn't paid for a code-signing certificate yet. The Store version won't show it, because Microsoft signs it.">
        <ol className="grid gap-8 md:grid-cols-3">
          <li>
            <div className="text-[0.8125rem] tabular-nums text-[#6e6e73]">Step 1</div>
            <h3 className="mt-1 text-[1.0625rem] font-semibold text-white">Click <Em>More info</Em></h3>
            <p className="mt-2 mb-4 text-[0.9375rem] text-[#a1a1a6]">It's the small underlined link under the message.</p>
            <SmartScreenDiagram step={1} />
          </li>
          <li>
            <div className="text-[0.8125rem] tabular-nums text-[#6e6e73]">Step 2</div>
            <h3 className="mt-1 text-[1.0625rem] font-semibold text-white">Click <Em>Run anyway</Em></h3>
            <p className="mt-2 mb-4 text-[0.9375rem] text-[#a1a1a6]">The button appears once you've clicked More info.</p>
            <SmartScreenDiagram step={2} />
          </li>
          <li>
            <div className="text-[0.8125rem] tabular-nums text-[#6e6e73]">Step 3</div>
            <h3 className="mt-1 text-[1.0625rem] font-semibold text-white">Follow the setup guide</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">
              Lotus opens a short guide. It checks your graphics card, suggests a chat, an image and a voice model that fit,
              and downloads them in the background.
            </p>
            <div className="mt-4 flex items-start gap-3 rounded-[12px] border border-white/10 p-4 text-[0.875rem] text-[#a1a1a6]">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#30d158]" aria-hidden="true" />
              <span>Want to check before you run it? Lotus's source code is public, and every installer is built from it on GitHub, where you can see the build.</span>
            </div>
          </li>
        </ol>
      </Section>

      <Section id="other" title="macOS and Linux">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[16px] border border-white/10 p-6">
            <h3 className="text-[1.0625rem] font-semibold text-white">macOS 11 or later</h3>
            <p className="mt-1 text-[0.875rem] text-[#86868b]">Apple silicon and Intel, one disk image</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">
              Open the .dmg and drag Lotus to Applications. Lotus isn't notarized by Apple yet, so the first time,
              right-click Lotus and choose <Em>Open</Em>. If macOS says the app is damaged, run {code('xattr -cr /Applications/Lotus.app')} in Terminal once.
            </p>
            <div className="mt-5"><Button href={FILES.macDmg} variant="secondary" icon={<DownloadIcon className="h-4 w-4" />}>Download for Mac</Button></div>
          </div>
          <div className="rounded-[16px] border border-white/10 p-6">
            <h3 className="text-[1.0625rem] font-semibold text-white">Linux, 64-bit</h3>
            <p className="mt-1 text-[0.875rem] text-[#86868b]">Needs WebKitGTK 4.1 (Ubuntu 22.04, Fedora 36, Debian 12 or newer)</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">
              Make the AppImage executable with {code('chmod +x Lotus-linux-x86_64.AppImage')} and run it. There are also{' '}
              <a className="text-[#0A84FF] hover:underline" href={FILES.linuxDeb}>.deb</a> and{' '}
              <a className="text-[#0A84FF] hover:underline" href={FILES.linuxRpm}>.rpm</a> packages.
            </p>
            <div className="mt-5"><Button href={FILES.linuxAppImage} variant="secondary" icon={<DownloadIcon className="h-4 w-4" />}>Download AppImage</Button></div>
          </div>
        </div>
      </Section>

      <Section id="new" title="What's new">
        <ul className="grid gap-px overflow-hidden rounded-[16px] border border-white/10 bg-white/10 sm:grid-cols-2">
          {NEW.map((it) => (
            <li key={it.title} className="bg-black p-6">
              <span aria-hidden="true" className="block h-[18px] w-[10px] rotate-[14deg] rounded-full" style={{ background: it.color }} />
              <h3 className="mt-4 text-[1.0625rem] font-semibold text-white">{it.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#a1a1a6]">{it.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
          <a href={RELEASES} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#0A84FF] hover:underline">
            All release notes <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href={href('/gpu/')} className="text-[#0A84FF] hover:underline">Check what runs on your PC</a>
        </p>
      </Section>
    </>
  );
};

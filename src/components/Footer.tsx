import React from 'react';
import { REPO, RELEASES, ISSUES, href } from '../site';

const COLS: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  { title: 'Lotus', links: [
    { href: href('/'), label: 'Home' },
    { href: href('/download/'), label: 'Download' },
    { href: href('/pricing/'), label: 'Pricing' },
    { href: RELEASES, label: 'Release notes', external: true },
  ] },
  { title: 'Help', links: [
    { href: href('/docs/'), label: 'Docs' },
    { href: href('/gpu/'), label: 'What runs on my PC' },
    { href: ISSUES, label: 'Report a problem', external: true },
  ] },
  { title: 'Compare', links: [
    { href: href('/compare/lm-studio/'), label: 'Lotus and LM Studio' },
    { href: href('/compare/jan/'), label: 'Lotus and Jan' },
    { href: href('/compare/msty/'), label: 'Lotus and Msty' },
  ] },
  { title: 'Trust', links: [
    { href: href('/privacy/'), label: 'Privacy' },
    { href: REPO, label: 'Source code', external: true },
    { href: href('/llms.txt'), label: 'llms.txt' },
  ] },
];

export const Footer: React.FC = () => (
  <footer className="border-t border-white/[0.08]">
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-[0.875rem] sm:grid-cols-2 sm:px-6 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
      <div>
        <p className="font-semibold text-[#f5f5f7]">Lotus</p>
        <p className="mt-2 max-w-xs text-[#86868b]">Your own AI. One app instead of four. Made by an independent developer.</p>
      </div>
      {COLS.map((c) => (
        <div key={c.title}>
          <p className="font-medium text-[#d1d1d6]">{c.title}</p>
          <ul className="mt-3 space-y-2">
            {c.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-[#86868b] transition-colors hover:text-[#f5f5f7]"
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </footer>
);

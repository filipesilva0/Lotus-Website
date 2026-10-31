import React from 'react';
import { REPO, RELEASES } from '../site';

const LINKS = [
  { href: RELEASES, label: 'Releases', external: true },
  { href: REPO, label: 'GitHub', external: true },
];

export const Footer: React.FC = () => (
  <footer className="border-t border-white/[0.08]">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-[0.8125rem] text-[#86868b] sm:flex-row sm:px-6">
      <p>
        <span className="text-[#d1d1d6]">Lotus</span> · A local AI studio for Windows, macOS and Linux
      </p>
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="transition-colors hover:text-[#f5f5f7]"
            {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </div>
  </footer>
);

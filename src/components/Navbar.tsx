import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from './Button';
import { REPO } from '../site';

const LINKS = [
  { href: '#tour', label: 'Tour' },
  { href: '#new', label: "What's new" },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#privacy', label: 'Privacy' },
  { href: REPO, label: 'GitHub', external: true },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Two thresholds so the bar doesn't flicker when you stop right at the edge.
    const onScroll = () =>
      setScrolled((prev) => (prev ? window.scrollY > 8 : window.scrollY > 32));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="h-[72px]" aria-hidden="true" />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[padding,background-color,border-color] duration-300 ${
          scrolled ? 'top-bar-glossy py-2.5' : 'top-bar-integrated py-4'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5 text-[#f5f5f7]">
            <img src="/assets/lotus-mark.png" alt="" className="h-7 w-7" />
            <span className="text-[1.0625rem] font-semibold tracking-tight">Lotus</span>
          </a>

          <nav className="hidden items-center gap-7 text-[0.875rem] text-[#a1a1a6] md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-white"
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <Button href="#download" size="sm" icon={<Download className="h-4 w-4" />}>
            Download
          </Button>
        </div>
      </header>
    </>
  );
};

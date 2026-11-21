import React, { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { Button } from './Button';
import { asset, href } from '../site';

const LINKS = [
  { href: '/pricing/', label: 'Pricing' },
  { href: '/gpu/', label: 'What runs on my PC' },
  { href: '/compare/', label: 'Compare' },
  { href: '/docs/', label: 'Docs' },
  { href: '/privacy/', label: 'Privacy' },
];

export const Navbar: React.FC<{ path: string }> = ({ path }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Two thresholds so the bar doesn't flicker when you stop right at the edge.
    const onScroll = () =>
      setScrolled((prev) => (prev ? window.scrollY > 8 : window.scrollY > 32));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const current = (h: string) => path === h || (h !== '/' && path.startsWith(h));

  return (
    <>
      <div className="h-[72px]" aria-hidden="true" />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[padding,background-color,border-color] duration-300 ${
          scrolled || open ? 'top-bar-glossy py-2.5' : 'top-bar-integrated py-4'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
          <a href={href('/')} className="flex items-center gap-2.5 text-[#f5f5f7]">
            <img src={asset('/assets/lotus-mark.png')} alt="" className="h-7 w-7" />
            <span className="text-[1.0625rem] font-semibold tracking-tight">Lotus</span>
          </a>

          <nav aria-label="Main" className="hidden items-center gap-6 text-[0.875rem] text-[#a1a1a6] lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={href(l.href)}
                aria-current={current(l.href) ? 'page' : undefined}
                className={`transition-colors hover:text-white ${current(l.href) ? 'text-white' : ''}`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button href={href('/download/')} size="sm" icon={<Download className="h-4 w-4" />}>
              Download
            </Button>
            <button
              type="button"
              className="rounded-[8px] p-2 text-[#d1d1d6] hover:bg-white/10 lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav aria-label="Main" className="mx-auto max-w-6xl px-4 pb-3 pt-2 sm:px-6 lg:hidden">
            {LINKS.map((l) => (
              <a key={l.href} href={href(l.href)} className="block rounded-[8px] px-2 py-2.5 text-[1rem] text-[#e5e5ea] hover:bg-white/10">
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </header>
    </>
  );
};

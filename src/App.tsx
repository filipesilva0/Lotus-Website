import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LotusFooterBanner } from './components/LotusFooterBanner';
import type { Route } from './routes';

export default function App({ route }: { route: Route }) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-[#f5f5f7]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[8px] focus:bg-white focus:px-3 focus:py-2 focus:text-black">Skip to content</a>
      <Navbar path={route.path} />
      <main id="main" className="flex-1">{route.render()}</main>
      <Footer />
      <LotusFooterBanner />
    </div>
  );
}

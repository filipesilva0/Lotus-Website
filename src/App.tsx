import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Showcase } from './components/Showcase';
import { Pages } from './components/Pages';
import { HowItWorks } from './components/HowItWorks';
import { Privacy } from './components/Privacy';
import { Download } from './components/Download';
import { Footer } from './components/Footer';
import { LotusFooterBanner } from './components/LotusFooterBanner';
import { useScrollBounce } from './hooks/useScrollBounce';

export default function App() {
  const { bounceStyle } = useScrollBounce();

  return (
    <div style={bounceStyle} className="flex min-h-screen flex-col bg-black text-[#f5f5f7]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Showcase />
        <Pages />
        <HowItWorks />
        <Privacy />
        <Download />
      </main>
      <Footer />
      <LotusFooterBanner />
    </div>
  );
}

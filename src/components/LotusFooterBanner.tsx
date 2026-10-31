import React, { useState, useEffect, useRef } from 'react';

export const LotusFooterBanner: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalize -1 to 1 from center
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    // Subtle parallax offset: ±6% horizontally, ±4% vertically
    setMouseOffset({
      x: Math.round(x * 6 * 10) / 10,
      y: Math.round(y * 4 * 10) / 10,
    });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Base background position: 50% horizontally, 50% vertically to center the wide petal fan
  const bgPosX = 50 + mouseOffset.x;
  const bgPosY = 50 + mouseOffset.y;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
      className="group relative w-full bg-[#000000] border-t border-white/[0.06] overflow-hidden select-none pt-2 sm:pt-2.5 pb-2 sm:pb-2.5"
    >
      {/* Main Horizontally Spanning Container */}
      <div className="w-full px-4 sm:px-8 flex items-center justify-center relative z-10">
        <h2 className="text-center tracking-normal transition-transform duration-300 ease-out cursor-default flex items-center justify-center">
          {/*
            The "Window to the Image Below":
            Text acts as a stencil cutout revealing the high-resolution Lotus flower artwork.
            A multi-layer background uses the real flower image with parallax tracking,
            backed by the signature spectrum gradient for solid opacity.
          */}
          <span
            className="lotus-window-cutout font-fascinate inline-block max-w-full transition-[background-position] duration-200 ease-out text-center"
            style={{
              fontFamily: "'Fascinate', cursive, sans-serif",
              fontSize: 'clamp(6rem, 19vw, 15rem)',
              lineHeight: 0.8,
              padding: '0.08em 0.06em 0.12em',
              backgroundImage: `url('/assets/lotus-banner-bg.png'), linear-gradient(90deg, #1a73e8 0%, #ff2d55 24%, #ff6b00 50%, #ffd60a 74%, #30d158 100%)`,
              backgroundSize: '104% 104%, 100% 100%',
              backgroundPosition: `${bgPosX}% ${bgPosY}%, center`,
              backgroundRepeat: 'no-repeat',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            Lotus
          </span>
        </h2>
      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';

interface GlassLotusHeroProps {
  className?: string;
  enableInteractiveTilt?: boolean;
}

export const GlassLotusHero: React.FC<GlassLotusHeroProps> = ({
  className = '',
  enableInteractiveTilt = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableInteractiveTilt || isReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Subtle 3D perspective rotation: max ~5 degrees
    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 6;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`absolute top-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-visible z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 3D Perspective Glass Canvas - Positioned from top with zero background */}
      <div
        className="relative w-[560px] sm:w-[860px] md:w-[1100px] lg:w-[1300px] xl:w-[1480px] max-w-none aspect-[1248/912] pt-2 sm:pt-4 md:pt-6 transition-transform duration-500 ease-out will-change-transform flex items-center justify-center"
        style={{
          transform: isReducedMotion
            ? 'none'
            : `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)`,
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Real Lotus Flower Artwork - Seamless screen blending on pure black */}
          <img
            src="/assets/lotus-hero.png"
            alt="Lotus Local AI Studio"
            className="w-full h-full object-contain pointer-events-none mix-blend-screen drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
            referrerPolicy="no-referrer"
          />

          {/* Optical contrast floor for text legibility directly over flower core */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_35%,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.15)_60%,transparent_85%)] pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};


import React from 'react';

export const Showcase: React.FC = () => (
  <section className="relative mx-auto -mt-8 mb-32 max-w-6xl px-4 sm:px-6">
    <figure>
      <div className="overflow-hidden rounded-[14px] border border-white/10 bg-[#0c0d10] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
        <img
          src="/assets/screenshot-images.png"
          width={1360}
          height={860}
          alt="The Lotus window on the Images page: a sidebar of projects, an empty canvas with a prompt box, and a panel of image settings."
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-4 text-center text-[0.8125rem] text-[#86868b]">
        The Images page. Every page shares the same sidebar, prompt box and settings panel.
      </figcaption>
    </figure>
  </section>
);

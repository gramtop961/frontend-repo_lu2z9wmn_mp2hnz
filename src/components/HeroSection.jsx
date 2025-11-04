import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  const handleScroll = () => {
    const el = document.getElementById('generator');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/60 to-neutral-950" />
      </div>

      <div className="relative container mx-auto px-4 py-24 sm:py-28 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Create High-Converting Ads in Seconds
          </h1>
          <p className="mt-4 text-white/80 text-lg">
            Copy and visuals in one click. Powered by AI. Built for founders, creators, and agencies.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button onClick={handleScroll} className="px-5 py-3 rounded-md bg-white text-black font-medium hover:bg-white/90 transition-colors">
              Try Free →
            </button>
            <a href="#pricing" className="px-5 py-3 rounded-md border border-white/20 hover:border-white/40 transition-colors text-white/90">
              See Pricing
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-white/70">
            <FeatureChip>Instagram</FeatureChip>
            <FeatureChip>Facebook</FeatureChip>
            <FeatureChip>LinkedIn</FeatureChip>
            <FeatureChip>YouTube</FeatureChip>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureChip({ children }) {
  return (
    <div className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur text-center">
      {children}
    </div>
  );
}

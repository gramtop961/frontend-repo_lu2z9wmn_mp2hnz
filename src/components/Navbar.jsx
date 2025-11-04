import React from 'react';
import { Rocket } from 'lucide-react';

export default function Navbar() {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="sticky top-0 z-30 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/50 border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-tr from-fuchsia-600 to-violet-600">
            <Rocket className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-tight">AdGenie.AI</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-white/80">
          <button onClick={() => handleScroll('generator')} className="hover:text-white transition-colors">Generate</button>
          <button onClick={() => handleScroll('saved')} className="hover:text-white transition-colors">My Ads</button>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-md text-sm border border-white/15 hover:border-white/30 transition-colors">Sign in</button>
          <button onClick={() => handleScroll('generator')} className="px-3 py-1.5 rounded-md text-sm bg-white text-black font-medium hover:bg-white/90 transition-colors">Try Free</button>
        </div>
      </div>
    </header>
  );
}

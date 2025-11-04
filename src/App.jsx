import React from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import AdGenerator from './components/AdGenerator.jsx';
import SavedAds from './components/SavedAds.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main>
        <HeroSection />
        <section id="generator" className="container mx-auto px-4 py-12 sm:py-16">
          <AdGenerator />
        </section>
        <section id="saved" className="container mx-auto px-4 pb-20">
          <SavedAds />
        </section>
      </main>
      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/60">
        <p>
          © {new Date().getFullYear()} AdGenie.AI — Create high-converting ads in seconds.
        </p>
      </footer>
    </div>
  );
}

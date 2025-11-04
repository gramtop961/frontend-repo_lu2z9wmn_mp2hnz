import React, { useEffect, useMemo, useState } from 'react';
import { Download, Trash2 } from 'lucide-react';

export default function SavedAds() {
  const [items, setItems] = useState([]);

  const load = () => {
    const key = 'adgenie_ads';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    setItems(existing);
  };

  useEffect(() => {
    load();
    const onStorage = (e) => {
      if (e.key === 'adgenie_ads') load();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const remove = (id) => {
    const key = 'adgenie_ads';
    const next = items.filter((x) => x.id !== id);
    localStorage.setItem(key, JSON.stringify(next));
    setItems(next);
  };

  const creditCount = useMemo(() => items.length, [items]);

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">My Ads</h2>
          <p className="text-white/70 text-sm">Saved campaigns • Credits used: {creditCount}</p>
        </div>
        <a id="pricing" href="#pricing" className="hidden" aria-hidden="true">&nbsp;</a>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-white/70">
          No ads saved yet. Generate your first ad and hit Save to see it here.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <article key={item.id} className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.03]">
              {item.imageUrl && (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img src={item.imageUrl} alt={item.product} className="w-full aspect-square object-cover" />
              )}
              <div className="p-4">
                <h3 className="font-semibold">{item.product}</h3>
                <p className="text-xs text-white/50 mt-0.5">{new Date(item.createdAt).toLocaleString()}</p>
                <p className="text-sm text-white/80 whitespace-pre-wrap mt-3">{item.adCopy}</p>
                <div className="flex gap-2 mt-4">
                  <a href={item.imageUrl || '#'} download={`${item.product || 'adgenie'}-image.png`} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/15 hover:border-white/35 transition-colors text-sm ${!item.imageUrl ? 'pointer-events-none opacity-50' : ''}`}>
                    <Download className="h-4 w-4" /> Image
                  </a>
                  <button onClick={() => remove(item.id)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/15 hover:border-white/35 transition-colors text-sm text-red-300/90">
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <PricingSection />
    </div>
  );
}

function PricingSection() {
  return (
    <div className="mt-16" id="pricing">
      <h2 className="text-2xl font-semibold text-center">Simple Pricing</h2>
      <p className="text-white/70 text-sm text-center mt-1">Start free. Upgrade anytime.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Plan title="Free" price="₹0" desc="10 ads / month" features={["Basic images", "Watermark", "Limited styles"]} cta="Try Free" highlight={false} />
        <Plan title="Creator" price="₹499/mo" desc="200 ads / month" features={["HD images", "No watermark", "Brand theme"]} cta="Go Creator" highlight />
        <Plan title="Pro Agency" price="₹1999/mo" desc="1000 ads / month" features={["Batch generation", "Client folders", "Export pack"]} cta="Go Pro" highlight={false} />
      </div>
    </div>
  );
}

function Plan({ title, price, desc, features, cta, highlight }) {
  return (
    <div className={`rounded-2xl p-6 border ${highlight ? 'border-fuchsia-500/40 bg-fuchsia-500/5' : 'border-white/10 bg-white/[0.03]' }`}>
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-white/70 text-sm">{desc}</p>
        </div>
        <div className="text-xl font-bold">{price}</div>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-white/80">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/60 inline-block" /> {f}
          </li>
        ))}
      </ul>
      <button className={`mt-6 w-full py-2 rounded-md font-medium ${highlight ? 'bg-white text-black hover:bg-white/90' : 'border border-white/15 hover:border-white/35' }`}>
        {cta}
      </button>
    </div>
  );
}

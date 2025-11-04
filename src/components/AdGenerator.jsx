import React, { useMemo, useState } from 'react';
import { Copy, Download, RefreshCw, Save } from 'lucide-react';

const PLATFORMS = ['Instagram', 'Facebook', 'YouTube', 'LinkedIn', 'TikTok', 'X/Twitter'];
const STYLES = ['Luxury', 'Modern', 'Funny', 'Emotional', 'Minimalist', 'Bold'];

export default function AdGenerator() {
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('awareness');
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [style, setStyle] = useState(STYLES[1]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adCopy, setAdCopy] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const canGenerate = useMemo(() => product.trim().length > 1 && description.trim().length > 3, [product, description]);

  const buildTextPrompt = () =>
    `Write a ${style} advertisement for ${product}. Description: ${description}. Goal: ${goal}. Platform: ${platform}. Include a catchy headline, a short caption, and 3-5 relevant hashtags.`;

  const buildImagePrompt = () =>
    `${product}, ${style} advertisement for ${platform}, professional lighting, brand look, high quality, vibrant, studio background`;

  const generate = async () => {
    if (!canGenerate || loading) return;
    setLoading(true);
    setError('');
    setAdCopy('');

    try {
      const textUrl = `https://text.pollinations.ai/${encodeURIComponent(buildTextPrompt())}`;
      const image = `https://image.pollinations.ai/prompt/${encodeURIComponent(buildImagePrompt())}`;

      const res = await fetch(textUrl);
      const text = await res.text();
      setAdCopy(text);
      setImageUrl(image);
    } catch (e) {
      setError('Something went wrong generating your ad. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveAd = () => {
    if (!adCopy || !imageUrl) return;
    const item = {
      id: crypto.randomUUID(),
      product,
      description,
      goal,
      platform,
      style,
      adCopy,
      imageUrl,
      createdAt: new Date().toISOString(),
    };
    const key = 'adgenie_ads';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([item, ...existing]));
    alert('Saved to My Ads');
  };

  const copyText = async () => {
    if (!adCopy) return;
    await navigator.clipboard.writeText(adCopy);
  };

  const downloadText = () => {
    if (!adCopy) return;
    const blob = new Blob([adCopy], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product || 'adgenie'}-copy.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
        <h2 className="text-2xl font-semibold">Generate an Ad</h2>
        <p className="text-white/70 text-sm mt-1">Type → Generate → Download</p>

        <div className="mt-6 grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Product name</label>
            <input value={product} onChange={(e) => setProduct(e.target.value)} placeholder="BrewBuddy Smart Mug" className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20" />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Description or goal</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Keeps your coffee hot for 12 hours. Target young professionals in India." className="w-full resize-y rounded-md bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-white/70 mb-1">Platform</label>
              <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20">
                {PLATFORMS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Ad style</label>
              <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20">
                {STYLES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Goal</label>
              <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20">
                <option value="awareness">Awareness</option>
                <option value="conversions">Conversions</option>
                <option value="engagement">Engagement</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button onClick={generate} disabled={!canGenerate || loading} className="px-4 py-2 rounded-md bg-white text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 transition-colors">
              {loading ? 'Generating…' : 'Generate Ad'}
            </button>
            <button onClick={() => { setProduct('BrewBuddy Smart Mug'); setDescription('India’s first smart mug that keeps your coffee hot for 12 hours. Target working professionals.'); setGoal('awareness'); setPlatform('Instagram'); setStyle('Modern'); }} className="px-4 py-2 rounded-md border border-white/15 hover:border-white/35 transition-colors">
              Use Example
            </button>
          </div>

          {error && (
            <div className="mt-2 text-sm text-red-400">{error}</div>
          )}
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] min-h-[420px]">
        <h3 className="text-xl font-semibold">Result</h3>
        {!adCopy && !imageUrl && !loading && (
          <p className="text-white/60 text-sm mt-2">Your generated ad will appear here. Try the example to see how it works.</p>
        )}

        {loading && (
          <div className="mt-6 animate-pulse space-y-4">
            <div className="h-56 rounded-lg bg-white/5" />
            <div className="h-20 rounded-lg bg-white/5" />
          </div>
        )}

        {!loading && (adCopy || imageUrl) && (
          <div className="mt-4 grid grid-cols-1 gap-4">
            {imageUrl && (
              <div className="aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-black/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt={product} className="h-full w-full object-cover" />
              </div>
            )}
            {adCopy && (
              <div className="rounded-xl border border-white/10 bg-black/30 p-4 whitespace-pre-wrap text-sm leading-relaxed">
                {adCopy}
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={saveAd} disabled={!adCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black font-medium disabled:opacity-50">
                <Save className="h-4 w-4" /> Save
              </button>
              <a href={imageUrl || '#'} download={`${product || 'adgenie'}-image.png`} className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/15 hover:border-white/35 transition-colors ${!imageUrl ? 'pointer-events-none opacity-50' : ''}`}>
                <Download className="h-4 w-4" /> Download Image
              </a>
              <button onClick={downloadText} disabled={!adCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/15 hover:border-white/35 transition-colors disabled:opacity-50">
                <Download className="h-4 w-4" /> Download Text
              </button>
              <button onClick={copyText} disabled={!adCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/15 hover:border-white/35 transition-colors disabled:opacity-50">
                <Copy className="h-4 w-4" /> Copy Text
              </button>
              <button onClick={generate} disabled={!canGenerate || loading} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/15 hover:border-white/35 transition-colors disabled:opacity-50">
                <RefreshCw className="h-4 w-4" /> Regenerate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

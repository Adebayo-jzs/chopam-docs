import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import DocsPage from './Docs';

/* ─────────────────────────────────────────────
   NAVBAR
   ───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0e0c0a]/95 backdrop-blur-md border-b border-[#2a2420]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e87c3e] to-[#c45a20] flex items-center justify-center text-white font-black text-sm">
            C
          </div>
          <span className="font-bold text-white text-lg tracking-tight">ChopAm</span>
          <span className="text-[#5a4a3a] text-lg font-light hidden sm:inline">/ API</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#recipes" className="text-[#a89080] hover:text-white text-sm font-medium transition-colors duration-200">
            Explore
          </a>
          <a href="#features" className="text-[#a89080] hover:text-white text-sm font-medium transition-colors duration-200">
            Features
          </a>
          <Link to="/docs" className="text-[#a89080] hover:text-white text-sm font-medium transition-colors duration-200">
            Documentation
          </Link>
          <a
            href="https://github.com/Adebayo-jzs/chopam-api"
            target="_blank"
            rel="noreferrer"
            className="text-[#a89080] hover:text-white text-sm font-medium transition-colors duration-200 flex items-center gap-1.5"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/docs"
            className="px-4 py-2 rounded-lg bg-[#e87c3e] hover:bg-[#d06530] text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-[#e87c3e]/20 hover:-translate-y-px"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#a89080] hover:text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0e0c0a] border-b border-[#2a2420] px-6 pb-6 space-y-4">
          <a href="#recipes" onClick={() => setMenuOpen(false)} className="block text-[#a89080] hover:text-white py-2 text-sm font-medium">Explore</a>
          <a href="#features" onClick={() => setMenuOpen(false)} className="block text-[#a89080] hover:text-white py-2 text-sm font-medium">Features</a>
          <Link to="/docs" onClick={() => setMenuOpen(false)} className="block text-[#a89080] hover:text-white py-2 text-sm font-medium">Documentation</Link>
          <Link to="/docs" onClick={() => setMenuOpen(false)} className="inline-block px-4 py-2 rounded-lg bg-[#e87c3e] text-white text-sm font-semibold mt-2">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#080705] border-t border-[#1e1a16]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e87c3e] to-[#c45a20] flex items-center justify-center text-white font-black text-sm">C</div>
              <span className="font-bold text-white text-lg">ChopAm API</span>
            </div>
            <p className="text-[#6b5a4e] text-sm leading-relaxed max-w-sm mb-6">
              A curated REST API for Nigerian culinary heritage. From everyday staples to festive dishes — organized by region, tribe, category, and ingredient.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Adebayo-jzs/chopam-api"
                target="_blank"
                rel="noreferrer"
                className="text-[#6b5a4e] hover:text-[#e87c3e] transition-colors"
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          {/* API */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-widest">API</h4>
            <ul className="space-y-3">
              {[
                { label: 'Introduction', href: '/docs/introduction' },
                { label: 'Quick Start', href: '/docs/quickstart' },
                { label: 'List Foods', href: '/docs/list-foods' },
                { label: 'Get Food', href: '/docs/get-food' },
                { label: 'By Ingredient', href: '/docs/by-ingredient' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-[#6b5a4e] hover:text-[#e87c3e] text-sm transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-widest">Resources</h4>
            <ul className="space-y-3">
              {[
                { label: 'Documentation', href: '/docs' },
                { label: 'API Overview', href: '/docs/api-overview' },
                { label: 'Response Format', href: '/docs/response-format' },
                { label: 'Errors', href: '/docs/errors' },
                { label: 'GitHub', href: 'https://github.com/Adebayo-jzs/chopam-api', external: true },
              ].map(link => (
                <li key={link.label}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noreferrer" className="text-[#6b5a4e] hover:text-[#e87c3e] text-sm transition-colors">{link.label}</a>
                  ) : (
                    <Link to={link.href} className="text-[#6b5a4e] hover:text-[#e87c3e] text-sm transition-colors">{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1e1a16] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#4a3a30] text-xs">
            © {new Date().getFullYear()} ChopAm API. Open source &amp; free to use.
          </p>
          <p className="text-[#4a3a30] text-xs">
            Built with ♥ for Nigerian culinary heritage
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   FOOD CARD
   ───────────────────────────────────────────── */
function FoodCard({ food }) {
  const categoryColors = {
    soup: 'bg-amber-900/30 text-amber-400 border-amber-800/40',
    'rice dish': 'bg-orange-900/30 text-orange-400 border-orange-800/40',
    'street food': 'bg-red-900/30 text-red-400 border-red-800/40',
    snack: 'bg-yellow-900/30 text-yellow-400 border-yellow-800/40',
    swallow: 'bg-stone-800/60 text-stone-300 border-stone-700/40',
    'side dish': 'bg-lime-900/30 text-lime-400 border-lime-800/40',
    default: 'bg-[#2a1e14]/60 text-[#c8926a] border-[#3a2a1a]/60',
  };

  const colorClass = categoryColors[food.category] || categoryColors.default;

  return (
    <div className="group bg-[#110f0c] border border-[#211c17] rounded-2xl overflow-hidden flex flex-col hover:border-[#e87c3e]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#e87c3e]/5">
      {/* Card top strip */}
      <div className="h-2 bg-gradient-to-r from-[#e87c3e] via-[#c45a20] to-[#8a3a10] opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6 flex flex-col flex-1">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {food.category && (
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${colorClass}`}>
              {food.category}
            </span>
          )}
          {food.region && (
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border bg-[#1a1814]/60 text-[#7a6a5a] border-[#2a2420]/60">
              {food.region}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-white font-bold text-xl leading-tight mb-3 group-hover:text-[#e87c3e] transition-colors duration-200">
          {food.name}
        </h3>

        {/* Description */}
        <p className="text-[#7a6a5a] text-sm leading-relaxed line-clamp-3 flex-1 mb-5">
          {food.description || 'A delicious Nigerian dish.'}
        </p>

        {/* Tribes */}
        {food.tribe && food.tribe.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-[#5a4a3a]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>{food.tribe.join(' · ')}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#2a2420] text-[#a89080] text-sm font-medium hover:border-[#e87c3e]/40 hover:text-[#e87c3e] hover:bg-[#e87c3e]/5 transition-all duration-200 group/btn">
          View Recipe
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-200 group-hover/btn:translate-x-1"><polyline points="5 12 19 12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE
   ───────────────────────────────────────────── */
function HomePage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const fetchFoods = async () => {
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams();
      if (query) qs.append('q', query);
      if (activeCategory) qs.append('category', activeCategory);
      const response = await fetch(`http://localhost:8080/foods?${qs.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch foods');
      const data = await response.json();
      setFoods(data.data.foods || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = setTimeout(fetchFoods, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeCategory]);

  const categories = ['', 'soup', 'rice dish', 'street food', 'snack', 'swallow', 'side dish'];

  return (
    <div className="min-h-screen bg-[#0e0c0a] text-white" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background texture */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0e06] via-[#0e0c0a] to-[#0a0908]" />
          {/* Warm glow spots */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e87c3e]/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#c45a20]/6 rounded-full blur-[100px]" />
          {/* Grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '128px 128px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <div>
              {/* Label */}
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="w-6 h-px bg-[#e87c3e]" />
                <span className="text-[#e87c3e] text-xs font-bold uppercase tracking-[0.25em]">Nigerian Culinary API</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.92] mb-8 tracking-tight">
                <span className="text-white">Every</span><br />
                <span className="text-white">Nigerian</span><br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #e87c3e 0%, #f5a261 50%, #c45a20 100%)' }}
                >
                  dish,
                </span><br />
                <span className="text-white">one API.</span>
              </h1>

              <p className="text-[#8a7a6a] text-lg leading-relaxed mb-10 max-w-md" style={{ fontFamily: 'system-ui, sans-serif' }}>
                A curated REST API giving developers access to Nigeria's full culinary spectrum — from Egusi to Jollof, Suya to Chin Chin — with full recipes, regional context, and ingredient data.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/docs"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#e87c3e] hover:bg-[#d06530] text-white font-semibold text-sm transition-all duration-200 hover:shadow-xl hover:shadow-[#e87c3e]/25 hover:-translate-y-px"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  Read the Docs
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="5 12 19 12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
                <a
                  href="https://api.chopam.xyz/foods"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2a2420] text-[#a89080] hover:text-white hover:border-[#3a3430] font-semibold text-sm transition-all duration-200"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  Try the API
                </a>
              </div>

              {/* Inline code snippet */}
              <div
                className="flex items-center gap-3 bg-[#0a0908] border border-[#211c17] rounded-xl px-5 py-3 max-w-sm"
                style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
              >
                <span className="text-[#5a9a5a] text-sm">GET</span>
                <span className="text-[#6b5a4e] text-sm">/</span>
                <span className="text-[#c8926a] text-sm">https://api.chopam.xyz/foods</span>
              </div>
            </div>

            {/* Right — floating stats + feature cards */}
            <div className="hidden lg:flex flex-col gap-5">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { val: '30+', label: 'Dishes' },
                  { val: '5', label: 'Regions' },
                  { val: 'Free', label: 'No auth' },
                ].map(s => (
                  <div key={s.label} className="bg-[#110f0c] border border-[#211c17] rounded-2xl p-5 text-center">
                    <div className="text-2xl font-black text-[#e87c3e] mb-1">{s.val}</div>
                    <div className="text-[#5a4a3a] text-xs uppercase tracking-widest" style={{ fontFamily: 'system-ui, sans-serif' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Feature cards */}
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  ),
                  title: 'Full recipe data',
                  desc: 'Every dish includes ingredients, step-by-step instructions, prep/cook times, and chef tips.',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  ),
                  title: 'Search & filter',
                  desc: 'Filter by region, tribe, category, tag — or search by ingredient across the full catalogue.',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  ),
                  title: 'Diaspora-ready',
                  desc: 'Ingredient substitution notes help cooks outside Nigeria find local alternatives.',
                },
              ].map(f => (
                <div key={f.title} className="bg-[#110f0c] border border-[#211c17] rounded-2xl p-5 flex gap-4 items-start hover:border-[#e87c3e]/20 transition-colors duration-200">
                  <div className="w-9 h-9 rounded-xl bg-[#e87c3e]/10 flex items-center justify-center text-[#e87c3e] flex-shrink-0 mt-0.5">
                    {f.icon}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>{f.title}</div>
                    <div className="text-[#5a4a3a] text-sm leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#3a2a1a]" />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3a2a1a" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </section>

      {/* ── FEATURES STRIP ── */}
      <section id="features" className="border-y border-[#1e1a16] bg-[#0a0908]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-center gap-8">
          {[
            'No authentication required',
            'JSON response envelope',
            'Filter by region & tribe',
            'Ingredient substitutions',
            'Full recipe with steps',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[#5a4a3a] text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
              <div className="w-1 h-1 rounded-full bg-[#e87c3e]" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ── RECIPE EXPLORER ── */}
      <section id="recipes" className="max-w-7xl mx-auto px-6 py-20">
        {/* Search & filter header */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-4 h-px bg-[#e87c3e]" />
              <span className="text-[#e87c3e] text-xs font-bold uppercase tracking-[0.2em]" style={{ fontFamily: 'system-ui, sans-serif' }}>Live Explorer</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Browse the<br />
              <span className="text-[#4a3a2a]">catalogue.</span>
            </h2>
          </div>

          {/* Search input */}
          <div className="lg:w-80">
            <div className="flex items-center gap-3 bg-[#110f0c] border border-[#211c17] rounded-xl px-4 py-3 focus-within:border-[#e87c3e]/40 transition-colors duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a4a3a" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                type="text"
                placeholder="Search dishes, ingredients..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-[#3a2a20] text-sm flex-1 w-full"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-[#3a2a20] hover:text-[#7a6a5a] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#e87c3e] text-white border border-[#e87c3e]'
                  : 'bg-transparent text-[#5a4a3a] border border-[#2a2420] hover:border-[#3a3430] hover:text-[#8a7a6a]'
              }`}
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {cat === '' ? 'All' : cat}
            </button>
          ))}
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-2 border-[#2a2420] border-t-[#e87c3e] rounded-full animate-spin" />
            <p className="text-[#4a3a30] text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>Simmering your results…</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="text-4xl">⚠️</div>
            <p className="text-[#7a6a5a] text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>{error}</p>
            <button
              onClick={fetchFoods}
              className="px-5 py-2 rounded-lg bg-[#e87c3e] text-white text-sm font-semibold"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              Retry
            </button>
          </div>
        ) : foods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="text-4xl">🍽️</div>
            <h3 className="text-white font-bold text-xl">No dishes found</h3>
            <p className="text-[#5a4a3a] text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>Try different search terms or clear the filters.</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory(''); }}
              className="px-5 py-2 rounded-lg border border-[#2a2420] text-[#8a7a6a] text-sm font-semibold hover:border-[#3a3430] transition-colors"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-[#3a2a20] text-xs uppercase tracking-widest mb-6" style={{ fontFamily: 'system-ui, sans-serif' }}>
              {foods.length} {foods.length === 1 ? 'dish' : 'dishes'} {activeCategory && `in ${activeCategory}`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {foods.map(food => (
                <FoodCard key={food.slug} food={food} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ── DOCS CTA ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a0e06] to-[#110f0c] border border-[#2a2420] p-12 md:p-16">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#e87c3e]/8 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#c45a20]/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="w-4 h-px bg-[#e87c3e]" />
                <span className="text-[#e87c3e] text-xs font-bold uppercase tracking-[0.2em]" style={{ fontFamily: 'system-ui, sans-serif' }}>For Developers</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                Ready to build with<br />Nigerian food data?
              </h2>
              <p className="text-[#6b5a4e] leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                No API key needed. No account required. Just start fetching — full documentation, code examples in cURL, JavaScript, and Python.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <Link
                to="/docs"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#e87c3e] hover:bg-[#d06530] text-white font-semibold text-sm transition-all duration-200 hover:shadow-xl hover:shadow-[#e87c3e]/25 hover:-translate-y-px whitespace-nowrap"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                Read the Documentation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="5 12 19 12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <a
                href="https://api.chopam.xyz"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-[#2a2420] text-[#8a7a6a] hover:text-white hover:border-[#3a3430] font-semibold text-sm transition-all duration-200 whitespace-nowrap"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                Try the Live API
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCROLL TO TOP
   ───────────────────────────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ─────────────────────────────────────────────
   APP
   ───────────────────────────────────────────── */
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/docs/:slug" element={<DocsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
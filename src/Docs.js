import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { pages } from './DocsPages';
import { LanguageContext, CodeBlock, CodeGroup, EndpointBadge, ParamTable, Callout, ResponseField, Steps, Step } from './DocsComponents';
import './Docs.css';
import { SEARCH_INDEX } from './DocsSearchIndex';
import { HugeiconsIcon } from '@hugeicons/react';
import { GreaterThanIcon, SearchIcon, LessThanIcon, Menu01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';

/* ── Navigation structure ── */
const NAV = [
  { group: 'Get Started', items: [
    { slug: 'introduction', title: 'Introduction', group: 'Get Started' },
    { slug: 'quickstart', title: 'Quick Start', group: 'Get Started' },
  ]},
  { group: 'Core Concepts', items: [
    { slug: 'foods', title: 'Foods', group: 'Core Concepts' },
    { slug: 'recipes', title: 'Recipes', group: 'Core Concepts' },
    { slug: 'ingredients', title: 'Ingredients', group: 'Core Concepts' },
  ]},
  { group: 'Guides', items: [
    { slug: 'searching', title: 'Searching', group: 'Guides' },
    { slug: 'filtering', title: 'Filtering', group: 'Guides' },
    { slug: 'pagination', title: 'Pagination', group: 'Guides' },
  ]},
  { group: 'API Reference', items: [
    { slug: 'api-overview', title: 'Overview', group: 'API Reference' },
    { slug: 'list-foods', title: 'List Foods', group: 'API Reference' },
    { slug: 'get-food', title: 'Get Food', group: 'API Reference' },
    { slug: 'by-ingredient', title: 'By Ingredient', group: 'API Reference' },
    { slug: 'response-format', title: 'Response Format', group: 'API Reference' },
    { slug: 'errors', title: 'Errors', group: 'API Reference' },
  ]},
];

const ALL_PAGES = NAV.flatMap(g => g.items);

/* ── TOC ── */
function OnThisPage({ slug }) {
  const [activeIds, setActiveIds] = useState([]);

  const toc = {
    introduction: ['What the API provides', 'Base URL', "Who it's for", 'No authentication required'],
    quickstart: ['1. List all foods', '2. Get a single food', '3. Filter and search', '4. Find by ingredient'],
    foods: ['Fields', 'Example'],
    recipes: ['Fields', 'Example'],
    ingredients: ['Fields', 'Common substitutes'],
    'api-overview': ['Base URL', 'Root endpoint', 'Available endpoints', 'Response envelope'],
    'list-foods': ['Query parameters', 'Example request', 'Example response'],
    'get-food': ['Path parameters', 'Example request', 'Example response'],
    'by-ingredient': ['Query parameters', 'Example request', 'Example response'],
    searching: ['Full-text search', 'Search by ingredient', 'Combining parameters'],
    filtering: ['Filter by region', 'Filter by tribe', 'Filter by category', 'Filter by tag'],
    pagination: ['Default behaviour', 'Setting a custom limit', 'The total field'],
    'response-format': ['Success response', 'Error response', 'HTTP status codes'],
    errors: ['Error envelope', 'Common errors', 'Handling errors in JavaScript'],
  };

  const items = toc[slug] || [];
  const toId = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  useEffect(() => {
    if (!items.length) return;
    const ids = items.map(toId);
    const visibleRecord = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          visibleRecord[entry.target.id] = entry.isIntersecting;
        });
        const currentActive = Object.keys(visibleRecord).filter(id => visibleRecord[id]);
        setActiveIds(currentActive);
      },
      { rootMargin: '-10% 0px -40% 0px', threshold: 0 }
    );

    const timer = setTimeout(() => {
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 150);

    return () => { clearTimeout(timer); observer.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!items.length) return null;

  return (
    <div className="docs-toc">
      <div className="toc-heading">On this page</div>
      <ul className="toc-list">
        {items.map((item, i) => {
          const id = toId(item);
          const isActive = activeIds.includes(id);
          return (
            <li key={i} className={`toc-item${isActive ? ' active' : ''}`}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setActiveIds([id]);
                }}
              >{item}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── SEARCH MODAL ── */
function Search({ isOpen, onClose, onSelect }) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setActiveIdx(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const activeEl = scrollRef.current?.querySelector('.search-result-item.active');
    if (activeEl) activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeIdx]);

  if (!isOpen) return null;

  const rawResults = [];
  if (query.trim().length > 0) {
    const q = query.toLowerCase();
    const queryTerms = q.split(/\s+/).filter(Boolean);

    SEARCH_INDEX.forEach(item => {
      const itemText = `${item.title} ${item.group} ${item.pageTitle || ''} ${item.content || ''}`.toLowerCase();
      const allTermsMatch = queryTerms.every(term => itemText.includes(term));

      if (allTermsMatch) {
        let score = 0;
        const titleL = item.title.toLowerCase();
        const contentL = (item.content || '').toLowerCase();
        if (titleL === q) score += 100;
        else if (titleL.includes(q)) score += 50;
        queryTerms.forEach(term => {
          if (titleL.includes(term)) score += 10;
          if (contentL.includes(term)) score += 2;
        });
        rawResults.push({
          ...item,
          score,
          type: item.anchor ? 'section' : 'page',
          breadcrumb: item.anchor
            ? [item.group, item.pageTitle, item.title].filter(Boolean)
            : [item.group, item.title].filter(Boolean)
        });
      }
    });
    rawResults.sort((a, b) => b.score - a.score);
  }

  const flattened = rawResults;

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(prev => (prev + 1) % flattened.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(prev => (prev - 1 + flattened.length) % flattened.length);
    } else if (e.key === 'Enter' && flattened[activeIdx]) {
      onSelect(flattened[activeIdx]);
      onClose();
    }
  };

  const highlight = (text, q) => {
    if (!q || !text) return text;
    const terms = q.split(/\s+/).filter(Boolean);
    const regex = new RegExp(`(${terms.join('|')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      terms.some(term => part.toLowerCase() === term.toLowerCase())
        ? <b key={i}>{part}</b>
        : part
    );
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-header">
          <HugeiconsIcon icon={SearchIcon} size={20} color="var(--text-muted)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIdx(0); }}
            onKeyDown={handleKeyDown}
          />
          {query.length > 0 && (
            <button
              className="search-clear-btn"
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', color: 'var(--text-faint)', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', flexShrink: 0 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
          <div className="search-close-hint">ESC</div>
        </div>

        {query.length > 0 && (
          <>
            <div className="search-results" ref={scrollRef}>
              {flattened.length > 0 ? (
                flattened.map((res, i) => (
                  <div
                    key={i}
                    className={`search-result-item ${activeIdx === i ? 'active' : ''}`}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => { onSelect(res); onClose(); }}
                  >
                    <div className="search-res-icon">
                      {res.type === 'section' ? (
                        <span className="hash-icon">#</span>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                      )}
                    </div>
                    <div className="search-res-info">
                      <div className="search-res-breadcrumb">{res.breadcrumb.join(' › ')}</div>
                      <div className="search-res-title">{highlight(res.title, query)}</div>
                      {query.length > 1 && res.content && res.content.toLowerCase().includes(query.toLowerCase()) && (
                        <div className="search-res-snippet">{highlight(res.content, query)}</div>
                      )}
                    </div>
                    <div className="search-res-arrow">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </div>
                  </div>
                ))
              ) : (
                <div className="search-empty">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--border-color)" strokeWidth="1" style={{ marginBottom: 16 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                  <p>No results found for "<b>{query}</b>"</p>
                  <span>Try searching for something else, like "authentication" or "foods".</span>
                </div>
              )}
            </div>
            <div className="search-footer">
              <div className="search-hint"><span>↵</span> to select</div>
              <div className="search-hint"><span>↑↓</span> to navigate</div>
              <div className="search-hint" style={{ marginLeft: 'auto' }}><span>ESC</span> to close</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN DOCS PAGE COMPONENT
   ───────────────────────────────────────────── */
export default function DocsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [preferredLanguage, setPreferredLanguage] = useState('CURL');
  const [repoStars, setRepoStars] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');
  const [effectiveTheme, setEffectiveTheme] = useState('light');
  const contentRef = useRef(null);

  // Auto-close sidebar on route change (mobile)
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [slug]);

  // Theme support
  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;
      let effTheme = theme;
      if (theme === 'system') {
        effTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      root.setAttribute('data-theme', effTheme);
      setEffectiveTheme(effTheme);
    };

    applyTheme();
    if (theme !== 'system') localStorage.setItem('theme', theme);
    else localStorage.removeItem('theme');

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => { if (theme === 'system') applyTheme(); };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  // Fetch GitHub Stars
  useEffect(() => {
    fetch('https://api.github.com/repos/Adebayo-jzs/chopam-api')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count !== undefined) setRepoStars(data.stargazers_count);
      })
      .catch(err => console.error('Error fetching stars:', err));
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileSidebarOpen]);

  const activePage = slug || 'introduction';
  const PageContent = pages[activePage];
  const current = ALL_PAGES.find(p => p.slug === activePage);
  const idx = ALL_PAGES.findIndex(p => p.slug === activePage);
  const prev = idx > 0 ? ALL_PAGES[idx - 1] : null;
  const next = idx < ALL_PAGES.length - 1 ? ALL_PAGES[idx + 1] : null;

  // Scroll content to top on page change
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTo(0, 0);
  }, [activePage]);

  const goTo = (s) => navigate(`/docs/${s}`);

  return (
    <div className="docs-root">
      {/* ── Navbar ── */}
      <nav className="docs-navbar">
        <button
          className="mobile-sidebar-toggle"
          onClick={(e) => { e.stopPropagation(); setIsMobileSidebarOpen(prev => !prev); }}
          aria-label="Toggle sidebar"
        >
          <HugeiconsIcon icon={Menu01Icon} size={20} />
        </button>

        <Link to="/" className="docs-navbar-logo">
          <div className="navbar-logo-icon">C</div>
          <span>ChopAm API</span>
        </Link>

        <div className="docs-navbar-actions">
          <div className="theme-switcher">
            <button className={`theme-btn ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')} title="Light mode">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            </button>
            <button className={`theme-btn ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')} title="Dark mode">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </button>
            <button className={`theme-btn ${theme === 'system' ? 'active' : ''}`} onClick={() => setTheme('system')} title="System preference">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </button>
          </div>

          <a href="https://github.com/Adebayo-jzs/chopam-api" target="_blank" rel="noreferrer" className="navbar-github-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            <span className="github-name">Adebayo-jzs/chopam-api</span>
            {repoStars !== null && (
              <span className="github-stars">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 4 }}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                {repoStars.toLocaleString()}
              </span>
            )}
          </a>
        </div>
      </nav>

      {/* ── Body ── */}
      <div className="docs-body">
        {/* Left Sidebar */}
        <aside className={`docs-sidebar ${isMobileSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header-mobile">
            <Link to="/" className="docs-navbar-logo">
              <div className="navbar-logo-icon">C</div>
              <span>ChopAm API</span>
            </Link>
            <button className="mobile-sidebar-close" onClick={() => setIsMobileSidebarOpen(false)}>
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>
          </div>

          <div className="sidebar-search" onClick={() => setIsSearchOpen(true)}>
            <div className="sidebar-search-inner">
              <HugeiconsIcon icon={SearchIcon} size={16} color="var(--text-muted)" />
              <span>Search...</span>
              <kbd style={{ fontSize: '0.65rem', padding: '2px 5px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 4, color: 'var(--text-muted)', marginLeft: 'auto' }}>⌘K</kbd>
            </div>
          </div>

          <nav>
            {NAV.map(group => (
              <div key={group.group} className="nav-group">
                <div className="nav-group-label">{group.group}</div>
                <div>
                {group.items.map(item => (
                  <button
                  key={item.slug}
                  className={`nav-item ${activePage === item.slug ? 'active' : ''}`}
                  onClick={() => { goTo(item.slug); setIsMobileSidebarOpen(false); }}
                  >
                    {item.title}
                  </button>
                ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile sidebar overlay — rendered here so it sits above sidebar in z-index */}
        {isMobileSidebarOpen && (
          <div className="mobile-overlay" onClick={() => setIsMobileSidebarOpen(false)} />
        )}

        {/* Right content area */}
        <div className="docs-right-contain">
          {/* Scrollable container */}
          <div className="docs-right" ref={contentRef}>
            {/* Main content column */}
            <main className="docs-main">
              {/* Breadcrumb */}
              {current && (
                <div className="docs-breadcrumb">
                  <span>{current.group}</span>
                  <span className="bc-sep">/</span>
                  <span className="bc-current">{current.title}</span>
                </div>
              )}

              <article className="docs-article">
                <LanguageContext.Provider value={{ preferredLanguage, setPreferredLanguage, theme: effectiveTheme }}>
                  {PageContent
                    ? <PageContent />
                    : (
                      <div className="docs-not-found">
                        <h1>Page not found</h1>
                        <p>The page <code>{activePage}</code> doesn't exist.</p>
                        <button
                          onClick={() => goTo('introduction')}
                          style={{ marginTop: 16, padding: '10px 20px', background: '#b38364', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
                        >
                          Go to Introduction
                        </button>
                      </div>
                    )
                  }
                </LanguageContext.Provider>
              </article>

              {/* Prev / Next */}
              <div className="docs-footer-nav">
                {prev ? (
                  <button className="footer-nav-btn prev" onClick={() => goTo(prev.slug)}>
                    <span className="fn-label"><HugeiconsIcon icon={LessThanIcon} size={12} /> Previous</span>
                    <span className="fn-title">{prev.title}</span>
                  </button>
                ) : <div />}
                {next ? (
                  <button className="footer-nav-btn next" onClick={() => goTo(next.slug)}>
                    <span className="fn-label" style={{ justifyContent: 'flex-end' }}>Next <HugeiconsIcon icon={GreaterThanIcon} size={12} /></span>
                    <span className="fn-title">{next.title}</span>
                  </button>
                ) : <div />}
              </div>

              <div className="docs-powered-by">Powered by ✦ ChopAm</div>
            </main>

            {/* Right TOC — sticky inside the scroll container */}
            <OnThisPage slug={activePage} />
          </div>
        </div>
      </div>

      {/* Search modal */}
      <Search
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={(res) => {
          goTo(res.slug);
          if (res.anchor) {
            setTimeout(() => {
              document.getElementById(res.anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }
        }}
      />
    </div>
  );
}
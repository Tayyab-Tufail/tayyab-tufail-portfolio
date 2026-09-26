'use client';
import { useEffect, useRef, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const SystemIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
  </svg>
);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'light') {
    root.classList.remove('dark');
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) root.classList.add('dark');
    else root.classList.remove('dark');
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = (localStorage.getItem('portfolio-theme') as Theme) || 'dark';
    setTheme(stored);
    applyTheme(stored);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    // Use a small delay so the current click doesn't immediately close it
    const timer = setTimeout(() => {
      document.addEventListener('click', handleOutside);
    }, 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleOutside);
    };
  }, [open]);

  // Listen for system preference changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => { if (theme === 'system') applyTheme('system'); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const select = (t: Theme) => {
    setTheme(t);
    localStorage.setItem('portfolio-theme', t);
    applyTheme(t);
    setOpen(false);
  };

  const icons: Record<Theme, React.ReactNode> = {
    light: <SunIcon />,
    dark: <MoonIcon />,
    system: <SystemIcon />,
  };

  return (
    <div className="tt-theme-wrap" ref={wrapRef}>
      <button
        className="tt-theme-btn"
        aria-label={`Theme: ${theme}`}
        aria-expanded={open}
        aria-haspopup="menu"
        type="button"
        onClick={() => setOpen(o => !o)}
      >
        {icons[theme]}
      </button>

      {open && (
        <div className="tt-theme-menu" role="menu">
          {(['light', 'dark', 'system'] as Theme[]).map(t => (
            <button
              key={t}
              role="menuitem"
              type="button"
              className={`tt-theme-item${theme === t ? ' is-active' : ''}`}
              onClick={() => select(t)}
            >
              <span className="tt-theme-icon">{icons[t]}</span>
              <span className="tt-theme-label">
                {t === 'light' ? 'Light' : t === 'dark' ? 'Dark' : 'System'}
              </span>
              {theme === t && (
                <svg className="tt-theme-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

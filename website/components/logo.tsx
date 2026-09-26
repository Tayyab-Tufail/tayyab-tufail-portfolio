export function Logo({ size = 42, className = '' }: { size?: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="tt-logo-bg" x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6c4ff8" />
          <stop offset="1" stopColor="#2c1b8a" />
        </linearGradient>
        <linearGradient id="tt-logo-accent" x1="0" y1="42" x2="42" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d8d0ff" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <filter id="tt-logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Base rounded square */}
      <rect width="42" height="42" rx="12" fill="url(#tt-logo-bg)" />
      
      {/* Inner border for depth */}
      <rect x="1" y="1" width="40" height="40" rx="11" stroke="#c4b5fd" strokeOpacity="0.25" strokeWidth="1" />

      {/* The modern "T" made of sleek geometric pills */}
      {/* Horizontal bar */}
      <rect x="10" y="13" width="22" height="5.5" rx="2.75" fill="url(#tt-logo-accent)" />
      
      {/* Vertical stem */}
      <rect x="18.25" y="13" width="5.5" height="17" rx="2.75" fill="#c4b5fd" />
      
      {/* Tech/AI Accent: Cyan glowing dot and connection line */}
      <circle cx="28" cy="27" r="2.5" fill="#00ffcc" filter="url(#tt-logo-glow)" />
      <path d="M21 27 h 5" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="2 2" strokeLinecap="round" />
    </svg>
  );
}

/* icons.jsx — minimal stroke icons (1.6 stroke, currentColor)
   No emoji. All icons read color from `currentColor` so a parent's
   color: var(--p-text-2) style controls them. */

const ic = (path, viewBox = "0 0 24 24") => ({ size = 20, style }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none"
       stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
       strokeLinejoin="round" style={style}>{path}</svg>
);

const Icons = {
  // tabs
  home: ic(<>
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"/>
  </>),
  compass: ic(<>
    <circle cx="12" cy="12" r="9"/>
    <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/>
  </>),
  chart: ic(<>
    <path d="M4 20V8M10 20V4M16 20v-9M22 20H2"/>
  </>),
  user: ic(<>
    <circle cx="12" cy="8" r="4"/>
    <path d="M3 21c1.5-4 5-6 9-6s7.5 2 9 6"/>
  </>),
  library: ic(<>
    <rect x="3" y="5" width="14" height="16" rx="1.5"/>
    <path d="M7 5V3M21 7v13M17 9h4M17 13h4M17 17h4"/>
  </>),

  // actions
  play: ic(<>
    <path d="M6 4l14 8-14 8V4z" fill="currentColor"/>
  </>),
  pause: ic(<>
    <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor"/>
    <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"/>
  </>),
  stop: ic(<>
    <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>
  </>),
  plus: ic(<>
    <path d="M12 5v14M5 12h14"/>
  </>),
  check: ic(<>
    <path d="M5 12l5 5 9-11"/>
  </>),
  chevron_right: ic(<>
    <path d="M9 5l7 7-7 7"/>
  </>),
  chevron_left: ic(<>
    <path d="M15 5l-7 7 7 7"/>
  </>),
  chevron_down: ic(<>
    <path d="M5 9l7 7 7-7"/>
  </>),
  more: ic(<>
    <circle cx="5" cy="12" r="1.4" fill="currentColor"/>
    <circle cx="12" cy="12" r="1.4" fill="currentColor"/>
    <circle cx="19" cy="12" r="1.4" fill="currentColor"/>
  </>),
  menu: ic(<>
    <path d="M4 7h16M4 12h16M4 17h16"/>
  </>),
  close: ic(<>
    <path d="M6 6l12 12M18 6l-12 12"/>
  </>),
  settings: ic(<>
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>
  </>),
  search: ic(<>
    <circle cx="11" cy="11" r="7"/>
    <path d="M21 21l-4.3-4.3"/>
  </>),
  flame: ic(<>
    <path d="M12 21c4 0 7-3 7-7 0-3-2-5-3-7-.5-1-1-2-1-3 0 0-3 1-4 4-1-1-3-1-3-3 0 0-3 2-3 6 0 6 3 10 7 10z"/>
  </>),
  spark: ic(<>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>
  </>),
  drop: ic(<>
    <path d="M12 3c0 4-6 7-6 12a6 6 0 1 0 12 0c0-5-6-8-6-12z"/>
  </>),
  leaf: ic(<>
    <path d="M5 19c0-9 5-14 14-14 0 9-5 14-14 14zM5 19c4-4 9-5 14-5"/>
  </>),
  moon: ic(<>
    <path d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10z"/>
  </>),
  heart: ic(<>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>
  </>),
  shield: ic(<>
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/>
  </>),
  edit: ic(<>
    <path d="M4 20h4l11-11-4-4L4 16v4z"/>
  </>),
  trash: ic(<>
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
  </>),
  bell: ic(<>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8zM10 21a2 2 0 0 0 4 0"/>
  </>),
  star: ic(<>
    <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6-5.4-2.9-5.4 2.9 1-6L3.2 9.5l6.1-.9L12 3z"/>
  </>),
  lock: ic(<>
    <rect x="4" y="11" width="16" height="10" rx="2"/>
    <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
  </>),
  // nail board glyph (stylized cluster of dots)
  nails: ic(<>
    <circle cx="6" cy="6" r="1.2" fill="currentColor"/>
    <circle cx="12" cy="6" r="1.2" fill="currentColor"/>
    <circle cx="18" cy="6" r="1.2" fill="currentColor"/>
    <circle cx="6" cy="12" r="1.2" fill="currentColor"/>
    <circle cx="12" cy="12" r="1.2" fill="currentColor"/>
    <circle cx="18" cy="12" r="1.2" fill="currentColor"/>
    <circle cx="6" cy="18" r="1.2" fill="currentColor"/>
    <circle cx="12" cy="18" r="1.2" fill="currentColor"/>
    <circle cx="18" cy="18" r="1.2" fill="currentColor"/>
  </>),
  pulse: ic(<>
    <path d="M3 12h4l3-6 4 12 3-6h4"/>
  </>),
  apple: ic(<>
    <path d="M16.3 8.1c-.5.6-1.3 1.1-2.2 1-.1-.9.3-1.8.8-2.3.5-.6 1.4-1.1 2.2-1.1.1.9-.3 1.8-.8 2.4zm.7 1.2c-1.2-.1-2.3.7-2.9.7-.6 0-1.5-.7-2.5-.7-1.3 0-2.5.7-3.2 1.9-1.4 2.4-.4 5.9 1 7.9.7.9 1.4 2 2.5 1.9 1 0 1.4-.6 2.6-.6s1.6.6 2.7.6c1.1 0 1.8-1 2.4-1.9.8-1.1 1.1-2.1 1.1-2.2 0 0-2.2-.8-2.2-3.3 0-2 1.6-2.9 1.7-3-1-1.4-2.4-1.5-2.9-1.5l-.3.2z" fill="currentColor"/>
  </>),
  google: ic(<>
    <path d="M21.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.3a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" fill="#4285F4"/>
    <path d="M12 21.5c2.7 0 5-.9 6.5-2.4l-3.2-2.5c-.9.6-2 1-3.3 1-2.5 0-4.7-1.7-5.4-4H3.3v2.5A9.5 9.5 0 0 0 12 21.5z" fill="#34A853"/>
    <path d="M6.6 13.6a5.7 5.7 0 0 1 0-3.6V7.5H3.3a9.5 9.5 0 0 0 0 8.6l3.3-2.5z" fill="#FBBC05"/>
    <path d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8A9.5 9.5 0 0 0 3.3 7.5l3.3 2.5c.7-2.3 2.9-4 5.4-4z" fill="#EA4335"/>
  </>),
};

export default Icons;

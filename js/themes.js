// ==================== 9 Premium Fonts ====================
const fontOptions = {
  inter: { name: 'Inter', family: "'Inter', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
  poppins: { name: 'Poppins', family: "'Poppins', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap' },
  dmSans: { name: 'DM Sans', family: "'DM Sans', sans-serif", url: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap' },
  outfit: { name: 'Outfit', family: "'Outfit', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap' },
  jakarta: { name: 'Jakarta', family: "'Plus Jakarta Sans', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap' },
  spaceGrotesk: { name: 'Space', family: "'Space Grotesk', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap' },
  manrope: { name: 'Manrope', family: "'Manrope', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap' },
  sora: { name: 'Sora', family: "'Sora', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap' },
  raleway: { name: 'Raleway', family: "'Raleway', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap' },
};

// Load font dynamically
function loadFont(fontKey) {
  const f = fontOptions[fontKey];
  if (!f || !f.url) return;
  const linkId = 'font-' + fontKey;
  if (!document.getElementById(linkId)) {
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = f.url;
    document.head.appendChild(link);
  }
}

// ==================== 50 Premium Themes (Spectrum Order) ====================
const themes = {
  // ===== WHITE & NEUTRAL (1-5) =====
  snow: { name: 'Snow', bg: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', card: 'rgba(255,255,255,0.98)', btn: 'rgba(248,250,252,0.95)', btnHover: 'rgba(241,245,249,0.95)', border: '#e2e8f0', text: '#0f172a', textSub: '#64748b', accent: '#3b82f6' },
  pearl: { name: 'Pearl', bg: 'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)', card: 'rgba(255,255,255,0.98)', btn: 'rgba(245,245,245,0.95)', btnHover: 'rgba(229,229,229,0.95)', border: '#e5e5e5', text: '#171717', textSub: '#737373', accent: '#525252' },
  silver: { name: 'Silver', bg: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)', card: 'rgba(255,255,255,0.95)', btn: 'rgba(241,245,249,0.9)', btnHover: 'rgba(226,232,240,0.9)', border: '#cbd5e1', text: '#1e293b', textSub: '#64748b', accent: '#475569' },
  cloud: { name: 'Cloud', bg: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)', card: 'rgba(255,255,255,0.92)', btn: 'rgba(248,250,252,0.9)', btnHover: 'rgba(241,245,249,0.9)', border: '#cbd5e1', text: '#1e293b', textSub: '#64748b', accent: '#6366f1' },
  mist: { name: 'Mist', bg: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e0f2fe 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(248,250,252,0.85)', btnHover: 'rgba(241,245,249,0.85)', border: '#e2e8f0', text: '#1e293b', textSub: '#64748b', accent: '#0ea5e9' },

  // ===== WARM CREAM & YELLOW (6-10) =====
  cream: { name: 'Cream', bg: 'linear-gradient(180deg, #fffbf5 0%, #fef3e2 100%)', card: 'rgba(255,253,250,0.95)', btn: 'rgba(254,243,226,0.9)', btnHover: 'rgba(253,230,196,0.9)', border: '#fcd9a8', text: '#78350f', textSub: '#a16207', accent: '#f59e0b' },
  sand: { name: 'Sand', bg: 'linear-gradient(180deg, #fefce8 0%, #fef9c3 100%)', card: 'rgba(255,252,240,0.95)', btn: 'rgba(254,249,195,0.9)', btnHover: 'rgba(254,240,138,0.9)', border: '#fde047', text: '#713f12', textSub: '#a16207', accent: '#eab308' },
  honey: { name: 'Honey', bg: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)', card: 'rgba(255,251,235,0.92)', btn: 'rgba(254,243,199,0.88)', btnHover: 'rgba(253,230,138,0.88)', border: '#fcd34d', text: '#78350f', textSub: '#b45309', accent: '#f59e0b' },
  butter: { name: 'Butter', bg: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)', card: 'rgba(255,253,245,0.92)', btn: 'rgba(254,252,232,0.88)', btnHover: 'rgba(254,249,195,0.88)', border: '#fde68a', text: '#713f12', textSub: '#a16207', accent: '#eab308' },
  sunrise: { name: 'Sunrise', bg: 'linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%)', card: 'rgba(255,255,255,0.88)', btn: 'rgba(255,255,255,0.75)', btnHover: 'rgba(255,255,255,0.92)', border: 'rgba(253,186,116,0.5)', text: '#78350f', textSub: '#b45309', accent: '#f59e0b' },

  // ===== ORANGE & PEACH (11-15) =====
  peach: { name: 'Peach', bg: 'linear-gradient(180deg, #fff7ed 0%, #ffedd5 100%)', card: 'rgba(255,251,245,0.95)', btn: 'rgba(255,237,213,0.9)', btnHover: 'rgba(254,215,170,0.9)', border: '#fdba74', text: '#7c2d12', textSub: '#c2410c', accent: '#f97316' },
  apricot: { name: 'Apricot', bg: 'linear-gradient(180deg, #ffedd5 0%, #fed7aa 100%)', card: 'rgba(255,247,237,0.92)', btn: 'rgba(255,237,213,0.88)', btnHover: 'rgba(254,215,170,0.88)', border: '#fb923c', text: '#7c2d12', textSub: '#ea580c', accent: '#f97316' },
  tangerine: { name: 'Tangerine', bg: 'linear-gradient(135deg, #fff7ed 0%, #fee2e2 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(255,247,237,0.85)', btnHover: 'rgba(255,237,213,0.85)', border: '#fca5a5', text: '#7c2d12', textSub: '#dc2626', accent: '#ef4444' },
  coral: { name: 'Coral', bg: 'linear-gradient(135deg, #fff7ed 0%, #ffe4e6 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(255,241,242,0.85)', btnHover: 'rgba(254,226,228,0.85)', border: '#fda4af', text: '#7c2d12', textSub: '#be123c', accent: '#f43f5e' },
  sunset: { name: 'Sunset', bg: 'linear-gradient(135deg, #fed7aa 0%, #fecaca 50%, #ddd6fe 100%)', card: 'rgba(255,255,255,0.85)', btn: 'rgba(255,255,255,0.75)', btnHover: 'rgba(255,255,255,0.88)', border: 'rgba(251,146,60,0.4)', text: '#7c2d12', textSub: '#c2410c', accent: '#f97316' },

  // ===== PINK & ROSE (16-20) =====
  rose: { name: 'Rose', bg: 'linear-gradient(180deg, #fff1f2 0%, #ffe4e6 100%)', card: 'rgba(255,250,250,0.95)', btn: 'rgba(255,228,230,0.9)', btnHover: 'rgba(254,205,211,0.9)', border: '#fda4af', text: '#881337', textSub: '#be123c', accent: '#f43f5e' },
  blush: { name: 'Blush', bg: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)', card: 'rgba(255,250,253,0.95)', btn: 'rgba(252,231,243,0.9)', btnHover: 'rgba(251,207,232,0.9)', border: '#f9a8d4', text: '#831843', textSub: '#be185d', accent: '#ec4899' },
  candy: { name: 'Candy', bg: 'linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(253,242,248,0.85)', btnHover: 'rgba(252,231,243,0.85)', border: '#f0abfc', text: '#86198f', textSub: '#a21caf', accent: '#d946ef' },
  sakura: { name: 'Sakura', bg: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fff1f2 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(253,242,248,0.85)', btnHover: 'rgba(252,231,243,0.85)', border: '#fda4af', text: '#9f1239', textSub: '#be123c', accent: '#fb7185' },
  aurora: { name: 'Aurora', bg: 'linear-gradient(135deg, #fdf2f8 0%, #ede9fe 50%, #dbeafe 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(255,255,255,0.8)', btnHover: 'rgba(255,255,255,0.95)', border: 'rgba(196,181,253,0.5)', text: '#4c1d95', textSub: '#7c3aed', accent: '#8b5cf6' },

  // ===== PURPLE & VIOLET (21-25) =====
  lavender: { name: 'Lavender', bg: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 100%)', card: 'rgba(252,250,255,0.95)', btn: 'rgba(243,232,255,0.9)', btnHover: 'rgba(233,213,255,0.9)', border: '#d8b4fe', text: '#581c87', textSub: '#7e22ce', accent: '#a855f7' },
  violet: { name: 'Violet', bg: 'linear-gradient(180deg, #f5f3ff 0%, #ede9fe 100%)', card: 'rgba(250,250,255,0.95)', btn: 'rgba(237,233,254,0.9)', btnHover: 'rgba(221,214,254,0.9)', border: '#c4b5fd', text: '#4c1d95', textSub: '#6d28d9', accent: '#8b5cf6' },
  grape: { name: 'Grape', bg: 'linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(245,243,255,0.85)', btnHover: 'rgba(237,233,254,0.85)', border: '#a5b4fc', text: '#3730a3', textSub: '#4f46e5', accent: '#6366f1' },
  amethyst: { name: 'Amethyst', bg: 'linear-gradient(135deg, #f3e8ff 0%, #fae8ff 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(250,245,255,0.85)', btnHover: 'rgba(243,232,255,0.85)', border: '#e879f9', text: '#701a75', textSub: '#a21caf', accent: '#d946ef' },
  cosmic: { name: 'Cosmic', bg: 'linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 100%)', card: 'rgba(20,15,40,0.95)', btn: 'rgba(40,30,70,0.9)', btnHover: 'rgba(55,45,90,0.9)', border: 'rgba(100,80,150,0.4)', text: '#f5f3ff', textSub: '#c4b5fd', accent: '#a78bfa' },

  // ===== BLUE (26-30) =====
  sky: { name: 'Sky', bg: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)', card: 'rgba(248,252,255,0.95)', btn: 'rgba(224,242,254,0.9)', btnHover: 'rgba(186,230,253,0.9)', border: '#7dd3fc', text: '#0c4a6e', textSub: '#0369a1', accent: '#0ea5e9' },
  azure: { name: 'Azure', bg: 'linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%)', card: 'rgba(250,252,255,0.95)', btn: 'rgba(219,234,254,0.9)', btnHover: 'rgba(191,219,254,0.9)', border: '#93c5fd', text: '#1e3a8a', textSub: '#1d4ed8', accent: '#3b82f6' },
  sapphire: { name: 'Sapphire', bg: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(239,246,255,0.85)', btnHover: 'rgba(219,234,254,0.85)', border: '#818cf8', text: '#1e3a8a', textSub: '#3730a3', accent: '#4f46e5' },
  ocean: { name: 'Ocean', bg: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 50%, #ede9fe 100%)', card: 'rgba(255,255,255,0.88)', btn: 'rgba(255,255,255,0.75)', btnHover: 'rgba(255,255,255,0.92)', border: 'rgba(125,211,252,0.5)', text: '#0c4a6e', textSub: '#0284c7', accent: '#0ea5e9' },
  abyss: { name: 'Abyss', bg: 'linear-gradient(135deg, #030712 0%, #0c1929 100%)', card: 'rgba(8,20,35,0.95)', btn: 'rgba(20,40,65,0.9)', btnHover: 'rgba(30,55,85,0.9)', border: 'rgba(56,189,248,0.3)', text: '#f0f9ff', textSub: '#7dd3fc', accent: '#38bdf8' },

  // ===== CYAN & TEAL (31-35) =====
  arctic: { name: 'Arctic', bg: 'linear-gradient(180deg, #ecfeff 0%, #cffafe 100%)', card: 'rgba(248,254,255,0.95)', btn: 'rgba(207,250,254,0.9)', btnHover: 'rgba(165,243,252,0.9)', border: '#67e8f9', text: '#155e75', textSub: '#0891b2', accent: '#06b6d4' },
  aqua: { name: 'Aqua', bg: 'linear-gradient(135deg, #cffafe 0%, #d1fae5 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(236,254,255,0.85)', btnHover: 'rgba(207,250,254,0.85)', border: '#5eead4', text: '#115e59', textSub: '#0d9488', accent: '#14b8a6' },
  teal: { name: 'Teal', bg: 'linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 100%)', card: 'rgba(248,255,253,0.95)', btn: 'rgba(204,251,241,0.9)', btnHover: 'rgba(153,246,228,0.9)', border: '#5eead4', text: '#134e4a', textSub: '#0f766e', accent: '#14b8a6' },
  marine: { name: 'Marine', bg: 'linear-gradient(135deg, #ecfeff 0%, #e0f2fe 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(236,254,255,0.85)', btnHover: 'rgba(207,250,254,0.85)', border: '#7dd3fc', text: '#0e7490', textSub: '#0284c7', accent: '#06b6d4' },
  lagoon: { name: 'Lagoon', bg: 'linear-gradient(135deg, #042f2e 0%, #064e3b 100%)', card: 'rgba(6,50,45,0.95)', btn: 'rgba(15,75,65,0.9)', btnHover: 'rgba(20,95,85,0.9)', border: 'rgba(45,212,191,0.3)', text: '#ccfbf1', textSub: '#5eead4', accent: '#2dd4bf' },

  // ===== GREEN (36-40) =====
  mint: { name: 'Mint', bg: 'linear-gradient(180deg, #f0fdf4 0%, #dcfce7 100%)', card: 'rgba(248,255,250,0.95)', btn: 'rgba(220,252,231,0.9)', btnHover: 'rgba(187,247,208,0.9)', border: '#86efac', text: '#14532d', textSub: '#15803d', accent: '#22c55e' },
  sage: { name: 'Sage', bg: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)', card: 'rgba(255,255,255,0.92)', btn: 'rgba(240,253,244,0.88)', btnHover: 'rgba(220,252,231,0.88)', border: '#a7f3d0', text: '#166534', textSub: '#16a34a', accent: '#22c55e' },
  meadow: { name: 'Meadow', bg: 'linear-gradient(135deg, #d1fae5 0%, #dbeafe 100%)', card: 'rgba(255,255,255,0.88)', btn: 'rgba(255,255,255,0.75)', btnHover: 'rgba(255,255,255,0.92)', border: 'rgba(110,231,183,0.5)', text: '#064e3b', textSub: '#047857', accent: '#10b981' },
  forest: { name: 'Forest', bg: 'linear-gradient(135deg, #052e16 0%, #022c22 100%)', card: 'rgba(5,40,25,0.95)', btn: 'rgba(20,60,40,0.9)', btnHover: 'rgba(30,80,55,0.9)', border: 'rgba(34,197,94,0.3)', text: '#dcfce7', textSub: '#86efac', accent: '#4ade80' },
  matrix: { name: 'Matrix', bg: 'linear-gradient(180deg, #000800 0%, #001208 100%)', card: 'rgba(0,20,5,0.95)', btn: 'rgba(0,40,10,0.9)', btnHover: 'rgba(0,60,15,0.9)', border: 'rgba(34,197,94,0.4)', text: '#22c55e', textSub: '#4ade80', accent: '#86efac' },

  // ===== DARK ELEGANT (41-45) =====
  slate: { name: 'Slate', bg: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)', card: 'rgba(20,30,50,0.98)', btn: 'rgba(35,50,75,0.95)', btnHover: 'rgba(55,70,95,0.95)', border: 'rgba(75,90,115,0.6)', text: '#f8fafc', textSub: '#cbd5e1', accent: '#a78bfa' },
  navy: { name: 'Navy', bg: 'linear-gradient(180deg, #0c1222 0%, #172033 100%)', card: 'rgba(15,23,42,0.98)', btn: 'rgba(30,41,59,0.95)', btnHover: 'rgba(51,65,85,0.95)', border: 'rgba(71,85,105,0.6)', text: '#f1f5f9', textSub: '#94a3b8', accent: '#60a5fa' },
  graphite: { name: 'Graphite', bg: 'linear-gradient(180deg, #18181b 0%, #27272a 100%)', card: 'rgba(24,24,27,0.98)', btn: 'rgba(39,39,42,0.95)', btnHover: 'rgba(52,52,56,0.95)', border: 'rgba(63,63,70,0.6)', text: '#fafafa', textSub: '#a1a1aa', accent: '#71717a' },
  charcoal: { name: 'Charcoal', bg: 'linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%)', card: 'rgba(23,23,23,0.98)', btn: 'rgba(38,38,38,0.95)', btnHover: 'rgba(50,50,50,0.95)', border: 'rgba(64,64,64,0.6)', text: '#fafafa', textSub: '#a3a3a3', accent: '#f5f5f5' },
  midnight: { name: 'Midnight', bg: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)', card: 'rgba(17,17,27,0.98)', btn: 'rgba(30,30,45,0.95)', btnHover: 'rgba(45,45,65,0.95)', border: 'rgba(63,63,90,0.6)', text: '#f8fafc', textSub: '#94a3b8', accent: '#818cf8' },

  // ===== DARK SPECIAL (46-50) =====
  obsidian: { name: 'Obsidian', bg: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)', card: 'rgba(25,25,45,0.95)', btn: 'rgba(40,40,65,0.9)', btnHover: 'rgba(55,55,85,0.9)', border: 'rgba(99,102,241,0.3)', text: '#e0e7ff', textSub: '#a5b4fc', accent: '#818cf8' },
  ember: { name: 'Ember', bg: 'linear-gradient(135deg, #1c0a00 0%, #2d1810 100%)', card: 'rgba(35,20,15,0.95)', btn: 'rgba(55,35,25,0.9)', btnHover: 'rgba(75,50,35,0.9)', border: 'rgba(251,146,60,0.3)', text: '#fff7ed', textSub: '#fed7aa', accent: '#fb923c' },
  wine: { name: 'Wine', bg: 'linear-gradient(135deg, #1c0a1c 0%, #2d1028 100%)', card: 'rgba(35,15,35,0.95)', btn: 'rgba(55,30,50,0.9)', btnHover: 'rgba(75,40,65,0.9)', border: 'rgba(236,72,153,0.3)', text: '#fdf2f8', textSub: '#f9a8d4', accent: '#ec4899' },
  noir: { name: 'Noir', bg: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)', card: 'rgba(8,8,8,0.98)', btn: 'rgba(20,20,20,0.95)', btnHover: 'rgba(35,35,35,0.95)', border: 'rgba(50,50,50,0.8)', text: '#ffffff', textSub: '#a0a0a0', accent: '#ffffff' },
  glass: { name: 'Glass', bg: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)', card: 'rgba(255,255,255,0.12)', btn: 'rgba(255,255,255,0.15)', btnHover: 'rgba(255,255,255,0.25)', border: 'rgba(255,255,255,0.2)', text: '#ffffff', textSub: 'rgba(255,255,255,0.85)', accent: '#ffffff' },
};

// ==================== Social Icons (SVG) ====================
const socialOptions = {
  email: { 
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/></svg>`,
    label: 'Email', 
    placeholder: 'email@example.com',
    buildUrl: (v) => v.includes('@') ? `mailto:${v.replace('mailto:', '')}` : null
  },
  phone: { 
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd"/></svg>`,
    label: 'Phone', 
    placeholder: '+1234567890',
    buildUrl: (v) => `tel:${v.replace(/[^0-9+]/g, '')}`
  },
  linkedin: { 
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    label: 'LinkedIn', 
    placeholder: 'username',
    buildUrl: (v) => v.includes('linkedin.com') ? v : `https://linkedin.com/in/${v.replace('@', '')}`
  },
  twitter: { 
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    label: 'X', 
    placeholder: 'username',
    buildUrl: (v) => v.includes('x.com') || v.includes('twitter.com') ? v : `https://x.com/${v.replace('@', '')}`
  },
  instagram: { 
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
    label: 'Instagram', 
    placeholder: 'username',
    buildUrl: (v) => v.includes('instagram.com') ? v : `https://instagram.com/${v.replace('@', '')}`
  },
  github: { 
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
    label: 'GitHub', 
    placeholder: 'username',
    buildUrl: (v) => v.includes('github.com') ? v : `https://github.com/${v.replace('@', '')}`
  },
  youtube: { 
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    label: 'YouTube', 
    placeholder: '@channel',
    buildUrl: (v) => v.includes('youtube.com') ? v : `https://youtube.com/@${v.replace('@', '')}`
  },
  tiktok: { 
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
    label: 'TikTok', 
    placeholder: 'username',
    buildUrl: (v) => v.includes('tiktok.com') ? v : `https://tiktok.com/@${v.replace('@', '')}`
  },
  telegram: { 
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
    label: 'Telegram', 
    placeholder: 'username',
    buildUrl: (v) => v.includes('t.me') ? v : `https://t.me/${v.replace('@', '')}`
  },
  whatsapp: { 
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`,
    label: 'WhatsApp', 
    placeholder: '+821012345678 (국가코드 포함)',
    buildUrl: (v) => v.includes('wa.me') ? v : `https://wa.me/${v.replace(/[^0-9]/g, '')}`
  },
  website: { 
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    label: 'Website', 
    placeholder: 'yoursite.com',
    buildUrl: (v) => v.includes('://') ? v : `https://${v}`
  },
  discord: { 
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>`,
    label: 'Discord', 
    placeholder: 'invite code',
    buildUrl: (v) => v.includes('discord') ? v : `https://discord.gg/${v}`
  },
  threads: { 
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.187.408-2.264 1.332-3.03.85-.704 2.029-1.132 3.41-1.238 1.028-.08 2.108-.05 3.216.089l.164.019c-.003-.403-.04-.794-.113-1.167-.142-.725-.445-1.318-.901-1.762-.477-.464-1.124-.754-1.927-.862-.812-.11-1.597-.03-2.296.235a3.184 3.184 0 00-.794.43l-1.17-1.703c.39-.27.832-.49 1.316-.659 1.048-.363 2.24-.485 3.46-.353 1.202.13 2.224.574 3.037 1.32.793.729 1.303 1.67 1.516 2.797.082.427.127.87.135 1.327l.001.087c.76.237 1.407.556 1.94.956 1.027.771 1.736 1.834 2.108 3.163.417 1.487.312 3.327-.934 5.012-1.36 1.843-3.511 2.857-6.402 3.018zm-1.996-8.089c-.92.062-1.64.283-2.14.66-.465.35-.686.776-.66 1.27.023.435.253.817.648 1.073.493.32 1.197.485 2.035.437 1.05-.057 1.876-.454 2.455-1.181.37-.463.628-1.063.772-1.792-.931-.14-1.89-.2-2.854-.2l-.256.001z"/></svg>`,
    label: 'Threads', 
    placeholder: 'username',
    buildUrl: (v) => v.includes('threads.net') ? v : `https://threads.net/@${v.replace('@', '')}`
  },
};

const linkIcons = [
  // General (20)
  '🔗', '📄', '📎', '📌', '📍', '🏷️', '🔖', '📑', '📋', '📁',
  '🗂️', '📦', '🎫', '🪪', '🔐', '🔑', '🗝️', '🔒', '🔓', '🪝',
  // Calendar & Time (15)
  '📅', '🗓️', '📆', '⏰', '⏱️', '⏲️', '🕐', '🕑', '🕒', '🕓',
  '⌚', '🕰️', '⏳', '⌛', '🔔',
  // Communication (18)
  '📧', '📩', '📨', '💌', '📞', '☎️', '📱', '💬', '💭', '🗨️',
  '📢', '📡', '🔕', '✉️', '📮', '📪', '📬', '🗣️',
  // Social & People (20)
  '👤', '👥', '🤝', '👋', '✋', '🙌', '👏', '🫶', '🖤', '🤍',
  '🩶', '🩷', '🤎', '💔', '👨‍💻', '👩‍💻', '🧑‍💼', '👔', '🎭', '🗿',
  // Hashtag & Symbols (15)
  '#️⃣', '*️⃣', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '🔢', '🔤', '🔠', '🆕',
  '🆒', '🆓', '🆙', 'ℹ️', '🏴',
  // Finance & Money (25)
  '💰', '💵', '💴', '💶', '💷', '💸', '💳', '🏦', '🏧', '💹',
  '📊', '📈', '📉', '💲', '🪙', '💎', '🧾', '📃', '🏛️', '⚖️',
  '💼', '🗃️', '🧮', '📑', '🗄️',
  // Crypto & Blockchain (20)
  '🪙', '⛓️', '🔗', '💎', '🚀', '📊', '💹', '🔒', '🌐', '⚡',
  '🔥', '💰', '📈', '🏆', '🎯', '⛏️', '🔮', '🌑', '◐', '◑',
  // Business (20)
  '💼', '🏢', '🏠', '🏛️', '🏪', '🏬', '🏭', '🏗️', '🏚️', '🏘️',
  '📇', '🗄️', '📊', '📋', '📁', '💡', '🎯', '📌', '🗓️', '⏰',
  // Charts & Data (15)
  '📈', '📉', '🎯', '✅', '☑️', '✔️', '❌', '⭕', '⚫', '⚪',
  '🔘', '🔳', '🔲', '▪️', '▫️',
  // Creative (25)
  '🎨', '🖼️', '📷', '📸', '🎬', '🎥', '🎤', '🎧', '🎵', '🎶',
  '🎹', '🎸', '🥁', '🎺', '🎻', '🎭', '🖌️', '🖍️', '✒️', '🎞️',
  '📹', '📺', '📻', '🎙️', '🎚️',
  // Writing & Education (20)
  '📝', '✏️', '🖊️', '🖋️', '📚', '📖', '📰', '🗞️', '📓', '📒',
  '📕', '📗', '📘', '📙', '🔍', '🎓', '🏫', '📐', '📏', '🔬',
  // Tech & Dev (25)
  '💻', '🖥️', '⌨️', '🖱️', '📲', '🔌', '💾', '💿', '🎮', '🕹️',
  '🤖', '⚙️', '🔧', '🔨', '🛠️', '📡', '🔬', '🧪', '🖨️', '📠',
  '🔋', '🔦', '💡', '🌐', '🛡️',
  // Travel & Transport (20)
  '✈️', '🚀', '🛫', '🌍', '🌎', '🌏', '🗺️', '🧭', '⛵', '🚗',
  '🚕', '🚌', '🚂', '🏖️', '🗼', '🛳️', '🚁', '🛸', '🚲', '🏍️',
  // Food & Drink (18)
  '☕', '🍵', '🥤', '🍺', '🍷', '🍴', '🍽️', '🥗', '🍕', '🍔',
  '🍰', '🍩', '🍪', '🧁', '🎂', '🍫', '🍬', '🥂',
  // Nature & Weather (20)
  '🌟', '⭐', '✨', '💫', '🌙', '☀️', '🌑', '🌒', '🌓', '🌔',
  '🌕', '🌖', '🌗', '🌘', '⚡', '❄️', '🌊', '🌪️', '☁️', '🌫️',
  // Sports & Games (20)
  '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏓', '🎱', '🎳', '⛳',
  '🏆', '🥇', '🥈', '🥉', '🎖️', '🎯', '🎲', '♠️', '♣️', '♟️',
  // Animals (15)
  '🐶', '🐱', '🦁', '🐯', '🦊', '🐻', '🐼', '🐨', '🦄', '🐲',
  '🦅', '🦋', '🐝', '🐳', '🦈',
  // Flags & Signs (15)
  '🚩', '🏳️', '🏴', '🎌', '⛳', '🚧', '⚠️', '🚫', '⛔', '🔞',
  '♻️', '✳️', '❇️', '🔰', '⚜️',
];

const linkIconCategories = {
  'General': ['🔗', '📄', '📎', '📌', '📍', '🏷️', '🔖', '📑', '📋', '📁', '🗂️', '📦', '🎫', '🪪', '🔐', '🔑', '🗝️', '🔒', '🔓', '🪝'],
  'Calendar': ['📅', '🗓️', '📆', '⏰', '⏱️', '⏲️', '🕐', '🕑', '🕒', '🕓', '⌚', '🕰️', '⏳', '⌛', '🔔'],
  'Communication': ['📧', '📩', '📨', '💌', '📞', '☎️', '📱', '💬', '💭', '🗨️', '📢', '📡', '🔕', '✉️', '📮', '📪', '📬', '🗣️'],
  'Social': ['👤', '👥', '🤝', '👋', '✋', '🙌', '👏', '🫶', '🖤', '🤍', '🩶', '🩷', '🤎', '💔', '👨‍💻', '👩‍💻', '🧑‍💼', '👔', '🎭', '🗿'],
  'Hashtag': ['#️⃣', '*️⃣', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '🔢', '🔤', '🔠', '🆕', '🆒', '🆓', '🆙', 'ℹ️', '🏴'],
  'Finance': ['💰', '💵', '💴', '💶', '💷', '💸', '💳', '🏦', '🏧', '💹', '📊', '📈', '📉', '💲', '🪙', '💎', '🧾', '📃', '🏛️', '⚖️', '💼', '🗃️', '🧮', '📑', '🗄️'],
  'Crypto': ['🪙', '⛓️', '🔗', '💎', '🚀', '📊', '💹', '🔒', '🌐', '⚡', '🔥', '💰', '📈', '🏆', '🎯', '⛏️', '🔮', '🌑', '◐', '◑'],
  'Business': ['💼', '🏢', '🏠', '🏛️', '🏪', '🏬', '🏭', '🏗️', '🏚️', '🏘️', '📇', '🗄️', '📊', '📋', '📁', '💡', '🎯', '📌', '🗓️', '⏰'],
  'Data': ['📈', '📉', '🎯', '✅', '☑️', '✔️', '❌', '⭕', '⚫', '⚪', '🔘', '🔳', '🔲', '▪️', '▫️'],
  'Creative': ['🎨', '🖼️', '📷', '📸', '🎬', '🎥', '🎤', '🎧', '🎵', '🎶', '🎹', '🎸', '🥁', '🎺', '🎻', '🎭', '🖌️', '🖍️', '✒️', '🎞️', '📹', '📺', '📻', '🎙️', '🎚️'],
  'Writing': ['📝', '✏️', '🖊️', '🖋️', '📚', '📖', '📰', '🗞️', '📓', '📒', '📕', '📗', '📘', '📙', '🔍', '🎓', '🏫', '📐', '📏', '🔬'],
  'Tech': ['💻', '🖥️', '⌨️', '🖱️', '📲', '🔌', '💾', '💿', '🎮', '🕹️', '🤖', '⚙️', '🔧', '🔨', '🛠️', '📡', '🔬', '🧪', '🖨️', '📠', '🔋', '🔦', '💡', '🌐', '🛡️'],
  'Travel': ['✈️', '🚀', '🛫', '🌍', '🌎', '🌏', '🗺️', '🧭', '⛵', '🚗', '🚕', '🚌', '🚂', '🏖️', '🗼', '🛳️', '🚁', '🛸', '🚲', '🏍️'],
  'Food': ['☕', '🍵', '🥤', '🍺', '🍷', '🍴', '🍽️', '🥗', '🍕', '🍔', '🍰', '🍩', '🍪', '🧁', '🎂', '🍫', '🍬', '🥂'],
  'Nature': ['🌟', '⭐', '✨', '💫', '🌙', '☀️', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '⚡', '❄️', '🌊', '🌪️', '☁️', '🌫️'],
  'Sports': ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏓', '🎱', '🎳', '⛳', '🏆', '🥇', '🥈', '🥉', '🎖️', '🎯', '🎲', '♠️', '♣️', '♟️'],
  'Animals': ['🐶', '🐱', '🦁', '🐯', '🦊', '🐻', '🐼', '🐨', '🦄', '🐲', '🦅', '🦋', '🐝', '🐳', '🦈'],
  'Flags': ['🚩', '🏳️', '🏴', '🎌', '⛳', '🚧', '⚠️', '🚫', '⛔', '🔞', '♻️', '✳️', '❇️', '🔰', '⚜️'],
};

function isDarkTheme(name) {
  return ['cosmic', 'abyss', 'lagoon', 'forest', 'matrix', 'slate', 'navy', 'graphite', 'charcoal', 'midnight', 'obsidian', 'ember', 'wine', 'noir', 'glass'].includes(name);
}

function normalizeUrl(url, prefix = 'https://') {
  if (!url) return '';
  url = url.trim();
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) return url;
  return prefix + url;
}

function buildSocialUrl(key, value) {
  if (!value) return '';
  value = value.trim();
  const opt = socialOptions[key];
  if (!opt) return normalizeUrl(value);
  if (value.includes('://') || value.includes('.com') || value.includes('.me') || value.includes('.gg') || value.includes('.net')) {
    return normalizeUrl(value);
  }
  if (opt.buildUrl) return opt.buildUrl(value);
  return normalizeUrl(value);
}

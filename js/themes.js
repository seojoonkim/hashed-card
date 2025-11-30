// ==================== 15 Premium Fonts ====================
const fontOptions = {
  // Sans-serif - Modern & Clean
  inter: { name: 'Inter', family: "'Inter', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
  poppins: { name: 'Poppins', family: "'Poppins', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap' },
  dmSans: { name: 'DM Sans', family: "'DM Sans', sans-serif", url: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap' },
  outfit: { name: 'Outfit', family: "'Outfit', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap' },
  jakarta: { name: 'Jakarta', family: "'Plus Jakarta Sans', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap' },
  
  // Geometric & Tech
  spaceGrotesk: { name: 'Space Grotesk', family: "'Space Grotesk', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap' },
  manrope: { name: 'Manrope', family: "'Manrope', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap' },
  sora: { name: 'Sora', family: "'Sora', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap' },
  urbanist: { name: 'Urbanist', family: "'Urbanist', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap' },
  
  // Elegant & Luxury
  raleway: { name: 'Raleway', family: "'Raleway', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap' },
  montserrat: { name: 'Montserrat', family: "'Montserrat', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap' },
  quicksand: { name: 'Quicksand', family: "'Quicksand', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap' },
  
  // Unique Character
  archivo: { name: 'Archivo', family: "'Archivo', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap' },
  rubik: { name: 'Rubik', family: "'Rubik', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap' },
  nunito: { name: 'Nunito', family: "'Nunito', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap' },
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

// ==================== 100 Premium Themes (50 Light + 50 Dark) ====================
const themes = {
  // ========================================
  // ===== LIGHT THEMES (1-50) =====
  // ========================================
  
  // --- White & Neutral (1-10) ---
  snow: { name: 'Snow', bg: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', card: 'rgba(255,255,255,0.98)', btn: 'rgba(248,250,252,0.95)', btnHover: 'rgba(241,245,249,0.95)', border: '#e2e8f0', text: '#0f172a', textSub: '#64748b', accent: '#3b82f6' },
  pearl: { name: 'Pearl', bg: 'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)', card: 'rgba(255,255,255,0.98)', btn: 'rgba(245,245,245,0.95)', btnHover: 'rgba(229,229,229,0.95)', border: '#e5e5e5', text: '#171717', textSub: '#737373', accent: '#525252' },
  silver: { name: 'Silver', bg: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)', card: 'rgba(255,255,255,0.95)', btn: 'rgba(241,245,249,0.9)', btnHover: 'rgba(226,232,240,0.9)', border: '#cbd5e1', text: '#1e293b', textSub: '#64748b', accent: '#475569' },
  cloud: { name: 'Cloud', bg: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)', card: 'rgba(255,255,255,0.92)', btn: 'rgba(248,250,252,0.9)', btnHover: 'rgba(241,245,249,0.9)', border: '#cbd5e1', text: '#1e293b', textSub: '#64748b', accent: '#6366f1' },
  mist: { name: 'Mist', bg: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e0f2fe 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(248,250,252,0.85)', btnHover: 'rgba(241,245,249,0.85)', border: '#e2e8f0', text: '#1e293b', textSub: '#64748b', accent: '#0ea5e9' },
  frost: { name: 'Frost', bg: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)', card: 'rgba(255,255,255,0.95)', btn: 'rgba(240,249,255,0.9)', btnHover: 'rgba(224,242,254,0.9)', border: '#bae6fd', text: '#0c4a6e', textSub: '#0369a1', accent: '#0ea5e9' },
  marble: { name: 'Marble', bg: 'linear-gradient(135deg, #fafafa 0%, #f5f5f4 50%, #fafaf9 100%)', card: 'rgba(255,255,255,0.96)', btn: 'rgba(250,250,249,0.92)', btnHover: 'rgba(245,245,244,0.92)', border: '#d6d3d1', text: '#1c1917', textSub: '#78716c', accent: '#a8a29e' },
  ivory: { name: 'Ivory', bg: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)', card: 'rgba(255,255,250,0.96)', btn: 'rgba(255,251,235,0.92)', btnHover: 'rgba(254,243,199,0.92)', border: '#fde68a', text: '#78350f', textSub: '#a16207', accent: '#d97706' },
  platinum: { name: 'Platinum', bg: 'linear-gradient(135deg, #f4f4f5 0%, #e4e4e7 100%)', card: 'rgba(255,255,255,0.94)', btn: 'rgba(244,244,245,0.9)', btnHover: 'rgba(228,228,231,0.9)', border: '#d4d4d8', text: '#18181b', textSub: '#71717a', accent: '#52525b' },
  porcelain: { name: 'Porcelain', bg: 'linear-gradient(180deg, #fefefe 0%, #f8f8f8 100%)', card: 'rgba(255,255,255,0.98)', btn: 'rgba(252,252,252,0.95)', btnHover: 'rgba(245,245,245,0.95)', border: '#e8e8e8', text: '#1a1a1a', textSub: '#666666', accent: '#3b82f6' },

  // --- Warm & Yellow (11-20) ---
  cream: { name: 'Cream', bg: 'linear-gradient(180deg, #fffbf5 0%, #fef3e2 100%)', card: 'rgba(255,253,250,0.95)', btn: 'rgba(254,243,226,0.9)', btnHover: 'rgba(253,230,196,0.9)', border: '#fcd9a8', text: '#78350f', textSub: '#a16207', accent: '#f59e0b' },
  sand: { name: 'Sand', bg: 'linear-gradient(180deg, #fefce8 0%, #fef9c3 100%)', card: 'rgba(255,252,240,0.95)', btn: 'rgba(254,249,195,0.9)', btnHover: 'rgba(254,240,138,0.9)', border: '#fde047', text: '#713f12', textSub: '#a16207', accent: '#eab308' },
  honey: { name: 'Honey', bg: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)', card: 'rgba(255,251,235,0.92)', btn: 'rgba(254,243,199,0.88)', btnHover: 'rgba(253,230,138,0.88)', border: '#fcd34d', text: '#78350f', textSub: '#b45309', accent: '#f59e0b' },
  butter: { name: 'Butter', bg: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)', card: 'rgba(255,253,245,0.92)', btn: 'rgba(254,252,232,0.88)', btnHover: 'rgba(254,249,195,0.88)', border: '#fde68a', text: '#713f12', textSub: '#a16207', accent: '#eab308' },
  peach: { name: 'Peach', bg: 'linear-gradient(180deg, #fff7ed 0%, #ffedd5 100%)', card: 'rgba(255,251,245,0.95)', btn: 'rgba(255,237,213,0.9)', btnHover: 'rgba(254,215,170,0.9)', border: '#fdba74', text: '#7c2d12', textSub: '#c2410c', accent: '#f97316' },
  apricot: { name: 'Apricot', bg: 'linear-gradient(180deg, #ffedd5 0%, #fed7aa 100%)', card: 'rgba(255,247,237,0.92)', btn: 'rgba(255,237,213,0.88)', btnHover: 'rgba(254,215,170,0.88)', border: '#fb923c', text: '#7c2d12', textSub: '#ea580c', accent: '#f97316' },
  coral: { name: 'Coral', bg: 'linear-gradient(135deg, #fff7ed 0%, #ffe4e6 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(255,241,242,0.85)', btnHover: 'rgba(254,226,228,0.85)', border: '#fda4af', text: '#7c2d12', textSub: '#be123c', accent: '#f43f5e' },
  sunset: { name: 'Sunset', bg: 'linear-gradient(135deg, #fed7aa 0%, #fecaca 50%, #ddd6fe 100%)', card: 'rgba(255,255,255,0.85)', btn: 'rgba(255,255,255,0.75)', btnHover: 'rgba(255,255,255,0.88)', border: 'rgba(251,146,60,0.4)', text: '#7c2d12', textSub: '#c2410c', accent: '#f97316' },
  latte: { name: 'Latte', bg: 'linear-gradient(180deg, #faf5f0 0%, #f5ebe0 100%)', card: 'rgba(255,252,248,0.95)', btn: 'rgba(250,245,240,0.9)', btnHover: 'rgba(245,235,224,0.9)', border: '#ddd0c0', text: '#5c4033', textSub: '#8b7355', accent: '#a0826d' },
  champagne: { name: 'Champagne', bg: 'linear-gradient(135deg, #fef7ee 0%, #fdf4e7 100%)', card: 'rgba(255,253,250,0.95)', btn: 'rgba(254,247,238,0.9)', btnHover: 'rgba(253,240,220,0.9)', border: '#f5d0a9', text: '#7c4a0f', textSub: '#b5651d', accent: '#d4a574' },

  // --- Pink & Rose (21-30) ---
  rose: { name: 'Rose', bg: 'linear-gradient(180deg, #fff1f2 0%, #ffe4e6 100%)', card: 'rgba(255,250,250,0.95)', btn: 'rgba(255,228,230,0.9)', btnHover: 'rgba(254,205,211,0.9)', border: '#fda4af', text: '#881337', textSub: '#be123c', accent: '#f43f5e' },
  blush: { name: 'Blush', bg: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)', card: 'rgba(255,250,253,0.95)', btn: 'rgba(252,231,243,0.9)', btnHover: 'rgba(251,207,232,0.9)', border: '#f9a8d4', text: '#831843', textSub: '#be185d', accent: '#ec4899' },
  candy: { name: 'Candy', bg: 'linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(253,242,248,0.85)', btnHover: 'rgba(252,231,243,0.85)', border: '#f0abfc', text: '#86198f', textSub: '#a21caf', accent: '#d946ef' },
  sakura: { name: 'Sakura', bg: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fff1f2 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(253,242,248,0.85)', btnHover: 'rgba(252,231,243,0.85)', border: '#fda4af', text: '#9f1239', textSub: '#be123c', accent: '#fb7185' },
  orchid: { name: 'Orchid', bg: 'linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%)', card: 'rgba(255,250,255,0.92)', btn: 'rgba(250,232,255,0.88)', btnHover: 'rgba(245,208,254,0.88)', border: '#e879f9', text: '#701a75', textSub: '#a21caf', accent: '#d946ef' },
  lavender: { name: 'Lavender', bg: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 100%)', card: 'rgba(252,250,255,0.95)', btn: 'rgba(243,232,255,0.9)', btnHover: 'rgba(233,213,255,0.9)', border: '#d8b4fe', text: '#581c87', textSub: '#7e22ce', accent: '#a855f7' },
  violet: { name: 'Violet', bg: 'linear-gradient(180deg, #f5f3ff 0%, #ede9fe 100%)', card: 'rgba(250,250,255,0.95)', btn: 'rgba(237,233,254,0.9)', btnHover: 'rgba(221,214,254,0.9)', border: '#c4b5fd', text: '#4c1d95', textSub: '#6d28d9', accent: '#8b5cf6' },
  iris: { name: 'Iris', bg: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)', card: 'rgba(250,252,255,0.94)', btn: 'rgba(238,242,255,0.9)', btnHover: 'rgba(224,231,255,0.9)', border: '#a5b4fc', text: '#3730a3', textSub: '#4f46e5', accent: '#6366f1' },
  aurora: { name: 'Aurora', bg: 'linear-gradient(135deg, #fdf2f8 0%, #ede9fe 50%, #dbeafe 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(255,255,255,0.8)', btnHover: 'rgba(255,255,255,0.95)', border: 'rgba(196,181,253,0.5)', text: '#4c1d95', textSub: '#7c3aed', accent: '#8b5cf6' },
  wisteria: { name: 'Wisteria', bg: 'linear-gradient(180deg, #f5f3ff 0%, #e9d5ff 100%)', card: 'rgba(250,250,255,0.94)', btn: 'rgba(245,243,255,0.9)', btnHover: 'rgba(233,213,255,0.9)', border: '#d8b4fe', text: '#6b21a8', textSub: '#9333ea', accent: '#a855f7' },

  // --- Blue & Cyan (31-40) ---
  sky: { name: 'Sky', bg: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)', card: 'rgba(248,252,255,0.95)', btn: 'rgba(224,242,254,0.9)', btnHover: 'rgba(186,230,253,0.9)', border: '#7dd3fc', text: '#0c4a6e', textSub: '#0369a1', accent: '#0ea5e9' },
  azure: { name: 'Azure', bg: 'linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%)', card: 'rgba(250,252,255,0.95)', btn: 'rgba(219,234,254,0.9)', btnHover: 'rgba(191,219,254,0.9)', border: '#93c5fd', text: '#1e3a8a', textSub: '#1d4ed8', accent: '#3b82f6' },
  sapphire: { name: 'Sapphire', bg: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(239,246,255,0.85)', btnHover: 'rgba(219,234,254,0.85)', border: '#818cf8', text: '#1e3a8a', textSub: '#3730a3', accent: '#4f46e5' },
  ocean: { name: 'Ocean', bg: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 50%, #ede9fe 100%)', card: 'rgba(255,255,255,0.88)', btn: 'rgba(255,255,255,0.75)', btnHover: 'rgba(255,255,255,0.92)', border: 'rgba(125,211,252,0.5)', text: '#0c4a6e', textSub: '#0284c7', accent: '#0ea5e9' },
  arctic: { name: 'Arctic', bg: 'linear-gradient(180deg, #ecfeff 0%, #cffafe 100%)', card: 'rgba(248,254,255,0.95)', btn: 'rgba(207,250,254,0.9)', btnHover: 'rgba(165,243,252,0.9)', border: '#67e8f9', text: '#155e75', textSub: '#0891b2', accent: '#06b6d4' },
  aqua: { name: 'Aqua', bg: 'linear-gradient(135deg, #cffafe 0%, #d1fae5 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(236,254,255,0.85)', btnHover: 'rgba(207,250,254,0.85)', border: '#5eead4', text: '#115e59', textSub: '#0d9488', accent: '#14b8a6' },
  teal: { name: 'Teal', bg: 'linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 100%)', card: 'rgba(248,255,253,0.95)', btn: 'rgba(204,251,241,0.9)', btnHover: 'rgba(153,246,228,0.9)', border: '#5eead4', text: '#134e4a', textSub: '#0f766e', accent: '#14b8a6' },
  marine: { name: 'Marine', bg: 'linear-gradient(135deg, #ecfeff 0%, #e0f2fe 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(236,254,255,0.85)', btnHover: 'rgba(207,250,254,0.85)', border: '#7dd3fc', text: '#0e7490', textSub: '#0284c7', accent: '#06b6d4' },
  wave: { name: 'Wave', bg: 'linear-gradient(135deg, #cffafe 0%, #bae6fd 50%, #c7d2fe 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(207,250,254,0.85)', btnHover: 'rgba(186,230,253,0.85)', border: '#38bdf8', text: '#0c4a6e', textSub: '#0369a1', accent: '#0ea5e9' },
  pacific: { name: 'Pacific', bg: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 50%, #a5f3fc 100%)', card: 'rgba(248,254,255,0.92)', btn: 'rgba(236,254,255,0.88)', btnHover: 'rgba(207,250,254,0.88)', border: '#22d3ee', text: '#155e75', textSub: '#0891b2', accent: '#06b6d4' },

  // --- Green (41-50) ---
  mint: { name: 'Mint', bg: 'linear-gradient(180deg, #f0fdf4 0%, #dcfce7 100%)', card: 'rgba(248,255,250,0.95)', btn: 'rgba(220,252,231,0.9)', btnHover: 'rgba(187,247,208,0.9)', border: '#86efac', text: '#14532d', textSub: '#15803d', accent: '#22c55e' },
  sage: { name: 'Sage', bg: 'linear-gradient(180deg, #ecfdf5 0%, #d1fae5 100%)', card: 'rgba(248,255,252,0.95)', btn: 'rgba(209,250,229,0.9)', btnHover: 'rgba(167,243,208,0.9)', border: '#6ee7b7', text: '#064e3b', textSub: '#047857', accent: '#10b981' },
  emerald: { name: 'Emerald', bg: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(236,253,245,0.85)', btnHover: 'rgba(209,250,229,0.85)', border: '#34d399', text: '#064e3b', textSub: '#047857', accent: '#10b981' },
  lime: { name: 'Lime', bg: 'linear-gradient(180deg, #f7fee7 0%, #ecfccb 100%)', card: 'rgba(250,255,245,0.95)', btn: 'rgba(236,252,203,0.9)', btnHover: 'rgba(217,249,157,0.9)', border: '#bef264', text: '#365314', textSub: '#4d7c0f', accent: '#84cc16' },
  spring: { name: 'Spring', bg: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #fefce8 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(240,253,244,0.85)', btnHover: 'rgba(220,252,231,0.85)', border: '#86efac', text: '#166534', textSub: '#15803d', accent: '#22c55e' },
  jade: { name: 'Jade', bg: 'linear-gradient(135deg, #d1fae5 0%, #ccfbf1 100%)', card: 'rgba(248,255,252,0.92)', btn: 'rgba(209,250,229,0.88)', btnHover: 'rgba(204,251,241,0.88)', border: '#34d399', text: '#064e3b', textSub: '#047857', accent: '#10b981' },
  seafoam: { name: 'Seafoam', bg: 'linear-gradient(135deg, #f0fdfa 0%, #d1fae5 100%)', card: 'rgba(248,255,253,0.92)', btn: 'rgba(240,253,250,0.88)', btnHover: 'rgba(209,250,229,0.88)', border: '#6ee7b7', text: '#064e3b', textSub: '#047857', accent: '#10b981' },
  matcha: { name: 'Matcha', bg: 'linear-gradient(135deg, #dcfce7 0%, #d9f99d 100%)', card: 'rgba(248,255,250,0.92)', btn: 'rgba(220,252,231,0.88)', btnHover: 'rgba(217,249,157,0.88)', border: '#86efac', text: '#166534', textSub: '#15803d', accent: '#22c55e' },
  prism: { name: 'Prism', bg: 'linear-gradient(135deg, #fce7f3 0%, #dbeafe 50%, #d1fae5 100%)', card: 'rgba(255,255,255,0.9)', btn: 'rgba(255,255,255,0.8)', btnHover: 'rgba(255,255,255,0.95)', border: 'rgba(147,197,253,0.5)', text: '#1e3a8a', textSub: '#3b82f6', accent: '#6366f1' },
  rainbow: { name: 'Rainbow', bg: 'linear-gradient(135deg, #fee2e2 0%, #fef3c7 20%, #d1fae5 40%, #dbeafe 60%, #ede9fe 80%, #fce7f3 100%)', card: 'rgba(255,255,255,0.88)', btn: 'rgba(255,255,255,0.8)', btnHover: 'rgba(255,255,255,0.95)', border: 'rgba(251,113,133,0.4)', text: '#1f2937', textSub: '#6b7280', accent: '#f472b6' },

  // ========================================
  // ===== DARK THEMES (51-100) =====
  // ========================================
  
  // --- Pure Dark & Neutral (51-60) ---
  midnight: { name: 'Midnight', bg: 'linear-gradient(180deg, #09090b 0%, #18181b 100%)', card: 'rgba(24,24,27,0.98)', btn: 'rgba(39,39,42,0.95)', btnHover: 'rgba(63,63,70,0.95)', border: '#3f3f46', text: '#fafafa', textSub: '#a1a1aa', accent: '#a78bfa' },
  obsidian: { name: 'Obsidian', bg: 'linear-gradient(135deg, #0a0a0a 0%, #171717 100%)', card: 'rgba(23,23,23,0.98)', btn: 'rgba(38,38,38,0.95)', btnHover: 'rgba(64,64,64,0.95)', border: '#404040', text: '#fafafa', textSub: '#a3a3a3', accent: '#f472b6' },
  charcoal: { name: 'Charcoal', bg: 'linear-gradient(180deg, #171717 0%, #262626 100%)', card: 'rgba(38,38,38,0.98)', btn: 'rgba(64,64,64,0.95)', btnHover: 'rgba(82,82,82,0.95)', border: '#525252', text: '#f5f5f5', textSub: '#a3a3a3', accent: '#60a5fa' },
  onyx: { name: 'Onyx', bg: 'linear-gradient(135deg, #0c0a09 0%, #1c1917 100%)', card: 'rgba(28,25,23,0.98)', btn: 'rgba(41,37,36,0.95)', btnHover: 'rgba(68,64,60,0.95)', border: '#44403c', text: '#fafaf9', textSub: '#a8a29e', accent: '#fbbf24' },
  graphite: { name: 'Graphite', bg: 'linear-gradient(180deg, #1e1e1e 0%, #2d2d2d 100%)', card: 'rgba(45,45,45,0.98)', btn: 'rgba(64,64,64,0.95)', btnHover: 'rgba(82,82,82,0.95)', border: '#4a4a4a', text: '#f5f5f5', textSub: '#9ca3af', accent: '#38bdf8' },
  slate: { name: 'Slate', bg: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)', card: 'rgba(30,41,59,0.98)', btn: 'rgba(51,65,85,0.95)', btnHover: 'rgba(71,85,105,0.95)', border: '#475569', text: '#f1f5f9', textSub: '#94a3b8', accent: '#818cf8' },
  carbon: { name: 'Carbon', bg: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)', card: 'rgba(26,26,26,0.98)', btn: 'rgba(40,40,40,0.95)', btnHover: 'rgba(55,55,55,0.95)', border: '#383838', text: '#f5f5f5', textSub: '#9ca3af', accent: '#22d3ee' },
  shadow: { name: 'Shadow', bg: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)', card: 'rgba(39,39,42,0.98)', btn: 'rgba(63,63,70,0.95)', btnHover: 'rgba(82,82,91,0.95)', border: '#52525b', text: '#f4f4f5', textSub: '#a1a1aa', accent: '#f472b6' },
  void: { name: 'Void', bg: 'linear-gradient(180deg, #030303 0%, #0a0a0a 100%)', card: 'rgba(10,10,10,0.98)', btn: 'rgba(23,23,23,0.95)', btnHover: 'rgba(38,38,38,0.95)', border: '#262626', text: '#fafafa', textSub: '#737373', accent: '#a78bfa' },
  steel: { name: 'Steel', bg: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)', card: 'rgba(55,65,81,0.98)', btn: 'rgba(75,85,99,0.95)', btnHover: 'rgba(107,114,128,0.95)', border: '#6b7280', text: '#f9fafb', textSub: '#d1d5db', accent: '#60a5fa' },

  // --- Warm Dark (61-70) ---
  ember: { name: 'Ember', bg: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', card: 'rgba(41,37,36,0.98)', btn: 'rgba(68,64,60,0.95)', btnHover: 'rgba(87,83,78,0.95)', border: '#57534e', text: '#fafaf9', textSub: '#d6d3d1', accent: '#f97316' },
  bronze: { name: 'Bronze', bg: 'linear-gradient(135deg, #1c1917 0%, #44403c 100%)', card: 'rgba(68,64,60,0.98)', btn: 'rgba(87,83,78,0.95)', btnHover: 'rgba(120,113,108,0.95)', border: '#78716c', text: '#fafaf9', textSub: '#d6d3d1', accent: '#d97706' },
  copper: { name: 'Copper', bg: 'linear-gradient(135deg, #27231f 0%, #3d3630 100%)', card: 'rgba(61,54,48,0.98)', btn: 'rgba(87,78,70,0.95)', btnHover: 'rgba(107,95,85,0.95)', border: '#6b5f55', text: '#fef3c7', textSub: '#d6d3d1', accent: '#ea580c' },
  mocha: { name: 'Mocha', bg: 'linear-gradient(180deg, #1c1917 0%, #292524 100%)', card: 'rgba(41,37,36,0.98)', btn: 'rgba(68,64,60,0.95)', btnHover: 'rgba(87,83,78,0.95)', border: '#57534e', text: '#fef3c7', textSub: '#a8a29e', accent: '#a0826d' },
  espresso: { name: 'Espresso', bg: 'linear-gradient(135deg, #1a1614 0%, #2d2622 100%)', card: 'rgba(45,38,34,0.98)', btn: 'rgba(68,58,50,0.95)', btnHover: 'rgba(87,75,65,0.95)', border: '#574a40', text: '#fef3c7', textSub: '#d6d3d1', accent: '#f59e0b' },
  amber_dark: { name: 'Amber Dark', bg: 'linear-gradient(135deg, #1c1a0f 0%, #292612 100%)', card: 'rgba(41,38,18,0.98)', btn: 'rgba(68,62,28,0.95)', btnHover: 'rgba(92,84,35,0.95)', border: '#5c5423', text: '#fef3c7', textSub: '#fde68a', accent: '#fbbf24' },
  gold: { name: 'Gold', bg: 'linear-gradient(135deg, #1c1a11 0%, #2a2715 100%)', card: 'rgba(42,39,21,0.98)', btn: 'rgba(68,62,32,0.95)', btnHover: 'rgba(92,84,40,0.95)', border: '#5c5428', text: '#fef9c3', textSub: '#fde047', accent: '#eab308' },
  caramel_dark: { name: 'Caramel', bg: 'linear-gradient(135deg, #1f1810 0%, #332818 100%)', card: 'rgba(51,40,24,0.98)', btn: 'rgba(78,60,35,0.95)', btnHover: 'rgba(100,78,45,0.95)', border: '#644e2d', text: '#fed7aa', textSub: '#fdba74', accent: '#f97316' },
  chocolate: { name: 'Chocolate', bg: 'linear-gradient(135deg, #1a1210 0%, #2a1f1a 100%)', card: 'rgba(42,31,26,0.98)', btn: 'rgba(65,48,40,0.95)', btnHover: 'rgba(85,65,55,0.95)', border: '#554137', text: '#fed7aa', textSub: '#d6d3d1', accent: '#a0826d' },
  rust_dark: { name: 'Rust', bg: 'linear-gradient(135deg, #1f1513 0%, #33211a 100%)', card: 'rgba(51,33,26,0.98)', btn: 'rgba(75,48,38,0.95)', btnHover: 'rgba(95,60,48,0.95)', border: '#5f3c30', text: '#fecaca', textSub: '#fca5a5', accent: '#ef4444' },

  // --- Red & Rose Dark (71-75) ---
  velvet: { name: 'Velvet', bg: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%)', card: 'rgba(127,29,29,0.95)', btn: 'rgba(153,27,27,0.9)', btnHover: 'rgba(185,28,28,0.9)', border: 'rgba(248,113,113,0.35)', text: '#fee2e2', textSub: '#fca5a5', accent: '#f87171' },
  wine: { name: 'Wine', bg: 'linear-gradient(135deg, #2a0f16 0%, #4c1d28 100%)', card: 'rgba(76,29,40,0.98)', btn: 'rgba(100,38,52,0.95)', btnHover: 'rgba(130,50,68,0.95)', border: '#823244', text: '#fce7f3', textSub: '#f9a8d4', accent: '#f472b6' },
  burgundy: { name: 'Burgundy', bg: 'linear-gradient(135deg, #1f0e12 0%, #3d1c24 100%)', card: 'rgba(61,28,36,0.98)', btn: 'rgba(85,38,48,0.95)', btnHover: 'rgba(110,50,62,0.95)', border: '#6e323e', text: '#ffe4e6', textSub: '#fda4af', accent: '#fb7185' },
  crimson: { name: 'Crimson', bg: 'linear-gradient(135deg, #1a0a0a 0%, #350a0a 100%)', card: 'rgba(53,10,10,0.98)', btn: 'rgba(80,15,15,0.95)', btnHover: 'rgba(110,20,20,0.95)', border: '#6e1414', text: '#fee2e2', textSub: '#fecaca', accent: '#ef4444' },
  scarlet: { name: 'Scarlet', bg: 'linear-gradient(135deg, #1c0d0d 0%, #3a1515 100%)', card: 'rgba(58,21,21,0.98)', btn: 'rgba(85,30,30,0.95)', btnHover: 'rgba(115,40,40,0.95)', border: '#731e1e', text: '#fef2f2', textSub: '#fecaca', accent: '#f87171' },

  // --- Purple & Violet Dark (76-82) ---
  cosmic: { name: 'Cosmic', bg: 'linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 100%)', card: 'rgba(20,15,40,0.95)', btn: 'rgba(40,30,70,0.9)', btnHover: 'rgba(55,45,90,0.9)', border: 'rgba(100,80,150,0.4)', text: '#f5f3ff', textSub: '#c4b5fd', accent: '#a78bfa' },
  nebula: { name: 'Nebula', bg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', card: 'rgba(30,27,75,0.95)', btn: 'rgba(49,46,129,0.9)', btnHover: 'rgba(67,56,202,0.9)', border: 'rgba(129,140,248,0.4)', text: '#e0e7ff', textSub: '#a5b4fc', accent: '#818cf8' },
  eclipse: { name: 'Eclipse', bg: 'linear-gradient(135deg, #0f0a1e 0%, #170d2b 50%, #0f0a1e 100%)', card: 'rgba(23,13,43,0.98)', btn: 'rgba(35,25,60,0.95)', btnHover: 'rgba(50,35,80,0.95)', border: 'rgba(139,92,246,0.3)', text: '#f5f3ff', textSub: '#c4b5fd', accent: '#a78bfa' },
  grape: { name: 'Grape', bg: 'linear-gradient(135deg, #1a0f26 0%, #2d1a40 100%)', card: 'rgba(45,26,64,0.98)', btn: 'rgba(65,38,88,0.95)', btnHover: 'rgba(85,50,115,0.95)', border: '#553272', text: '#f3e8ff', textSub: '#d8b4fe', accent: '#a855f7' },
  plum: { name: 'Plum', bg: 'linear-gradient(135deg, #1f0f2e 0%, #351a4a 100%)', card: 'rgba(53,26,74,0.98)', btn: 'rgba(75,38,100,0.95)', btnHover: 'rgba(98,50,130,0.95)', border: '#623282', text: '#fae8ff', textSub: '#e879f9', accent: '#d946ef' },
  amethyst: { name: 'Amethyst', bg: 'linear-gradient(135deg, #1a1028 0%, #2e1a45 100%)', card: 'rgba(46,26,69,0.98)', btn: 'rgba(68,38,95,0.95)', btnHover: 'rgba(90,50,125,0.95)', border: '#5a327d', text: '#f5f3ff', textSub: '#c4b5fd', accent: '#8b5cf6' },
  royal: { name: 'Royal', bg: 'linear-gradient(135deg, #0f0f2e 0%, #1a1a52 100%)', card: 'rgba(26,26,82,0.98)', btn: 'rgba(45,45,110,0.95)', btnHover: 'rgba(60,60,135,0.95)', border: '#3c3c87', text: '#e0e7ff', textSub: '#a5b4fc', accent: '#6366f1' },

  // --- Blue Dark (83-90) ---
  abyss: { name: 'Abyss', bg: 'linear-gradient(135deg, #030712 0%, #0c1929 100%)', card: 'rgba(8,20,35,0.95)', btn: 'rgba(20,40,65,0.9)', btnHover: 'rgba(30,55,85,0.9)', border: 'rgba(56,189,248,0.3)', text: '#f0f9ff', textSub: '#7dd3fc', accent: '#38bdf8' },
  navy: { name: 'Navy', bg: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', card: 'rgba(15,23,42,0.95)', btn: 'rgba(30,58,138,0.9)', btnHover: 'rgba(37,99,235,0.9)', border: 'rgba(96,165,250,0.4)', text: '#dbeafe', textSub: '#93c5fd', accent: '#60a5fa' },
  twilight: { name: 'Twilight', bg: 'linear-gradient(135deg, #1e1b4b 0%, #0c4a6e 100%)', card: 'rgba(30,27,75,0.95)', btn: 'rgba(12,74,110,0.9)', btnHover: 'rgba(14,116,144,0.9)', border: 'rgba(56,189,248,0.4)', text: '#e0f2fe', textSub: '#7dd3fc', accent: '#38bdf8' },
  ocean_deep: { name: 'Ocean Deep', bg: 'linear-gradient(135deg, #0a1628 0%, #0f2847 100%)', card: 'rgba(15,40,71,0.98)', btn: 'rgba(25,58,95,0.95)', btnHover: 'rgba(35,78,120,0.95)', border: '#234e78', text: '#dbeafe', textSub: '#93c5fd', accent: '#3b82f6' },
  cobalt_dark: { name: 'Cobalt', bg: 'linear-gradient(135deg, #0a1224 0%, #1a2a4a 100%)', card: 'rgba(26,42,74,0.98)', btn: 'rgba(40,60,100,0.95)', btnHover: 'rgba(55,80,130,0.95)', border: '#375082', text: '#dbeafe', textSub: '#60a5fa', accent: '#3b82f6' },
  sapphire_dark: { name: 'Sapphire', bg: 'linear-gradient(135deg, #0a0f2e 0%, #1a1f52 100%)', card: 'rgba(26,31,82,0.98)', btn: 'rgba(45,50,110,0.95)', btnHover: 'rgba(60,65,135,0.95)', border: '#3c4187', text: '#e0e7ff', textSub: '#a5b4fc', accent: '#818cf8' },
  electric_dark: { name: 'Electric', bg: 'linear-gradient(135deg, #0f0f25 0%, #1a1a45 100%)', card: 'rgba(26,26,69,0.98)', btn: 'rgba(45,45,95,0.95)', btnHover: 'rgba(60,60,120,0.95)', border: '#3c3c78', text: '#e0e7ff', textSub: '#818cf8', accent: '#6366f1' },
  dusk: { name: 'Dusk', bg: 'linear-gradient(135deg, #1e3a8a 0%, #581c87 50%, #881337 100%)', card: 'rgba(88,28,135,0.95)', btn: 'rgba(107,33,168,0.9)', btnHover: 'rgba(126,34,206,0.9)', border: 'rgba(192,132,252,0.4)', text: '#f5f3ff', textSub: '#d8b4fe', accent: '#c084fc' },

  // --- Cyan & Teal Dark (91-95) ---
  lagoon: { name: 'Lagoon', bg: 'linear-gradient(135deg, #042f2e 0%, #064e3b 100%)', card: 'rgba(6,50,45,0.95)', btn: 'rgba(15,75,65,0.9)', btnHover: 'rgba(20,95,85,0.9)', border: 'rgba(45,212,191,0.3)', text: '#ccfbf1', textSub: '#5eead4', accent: '#2dd4bf' },
  deep_sea: { name: 'Deep Sea', bg: 'linear-gradient(135deg, #032830 0%, #054550 100%)', card: 'rgba(5,69,80,0.98)', btn: 'rgba(15,95,110,0.95)', btnHover: 'rgba(20,120,138,0.95)', border: '#14788a', text: '#cffafe', textSub: '#67e8f9', accent: '#22d3ee' },
  teal_dark: { name: 'Teal Dark', bg: 'linear-gradient(135deg, #042f2e 0%, #0f4d4a 100%)', card: 'rgba(15,77,74,0.98)', btn: 'rgba(25,105,100,0.95)', btnHover: 'rgba(35,130,125,0.95)', border: '#23827d', text: '#ccfbf1', textSub: '#5eead4', accent: '#14b8a6' },
  aquatic: { name: 'Aquatic', bg: 'linear-gradient(135deg, #04282a 0%, #0a4548 100%)', card: 'rgba(10,69,72,0.98)', btn: 'rgba(20,95,100,0.95)', btnHover: 'rgba(30,120,125,0.95)', border: '#1e787d', text: '#ecfeff', textSub: '#67e8f9', accent: '#06b6d4' },
  cyan_dark: { name: 'Cyan Dark', bg: 'linear-gradient(135deg, #062830 0%, #0c4a55 100%)', card: 'rgba(12,74,85,0.98)', btn: 'rgba(22,100,115,0.95)', btnHover: 'rgba(32,125,142,0.95)', border: '#207d8e', text: '#cffafe', textSub: '#22d3ee', accent: '#06b6d4' },

  // --- Green Dark (96-100) ---
  forest: { name: 'Forest', bg: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)', card: 'rgba(6,50,45,0.95)', btn: 'rgba(4,78,67,0.9)', btnHover: 'rgba(6,95,70,0.9)', border: 'rgba(52,211,153,0.3)', text: '#d1fae5', textSub: '#6ee7b7', accent: '#34d399' },
  jungle: { name: 'Jungle', bg: 'linear-gradient(135deg, #052816 0%, #0a4520 100%)', card: 'rgba(10,69,32,0.98)', btn: 'rgba(20,95,45,0.95)', btnHover: 'rgba(30,120,58,0.95)', border: '#1e783a', text: '#dcfce7', textSub: '#86efac', accent: '#22c55e' },
  pine: { name: 'Pine', bg: 'linear-gradient(135deg, #0a2818 0%, #143d25 100%)', card: 'rgba(20,61,37,0.98)', btn: 'rgba(30,85,50,0.95)', btnHover: 'rgba(40,110,65,0.95)', border: '#286e41', text: '#d1fae5', textSub: '#6ee7b7', accent: '#10b981' },
  evergreen: { name: 'Evergreen', bg: 'linear-gradient(135deg, #0a2210 0%, #153820 100%)', card: 'rgba(21,56,32,0.98)', btn: 'rgba(32,78,45,0.95)', btnHover: 'rgba(45,100,58,0.95)', border: '#2d643a', text: '#dcfce7', textSub: '#86efac', accent: '#22c55e' },
  aurora_dark: { name: 'Aurora Dark', bg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #064e3b 50%, #1e3a8a 75%, #581c87 100%)', card: 'rgba(30,27,75,0.95)', btn: 'rgba(49,46,129,0.9)', btnHover: 'rgba(67,56,202,0.9)', border: 'rgba(129,140,248,0.4)', text: '#f0f9ff', textSub: '#a5b4fc', accent: '#818cf8' },
};

// ==================== 360 Link Icons (Low Saturation) ====================
const iconOptions = {
  // Navigation & Actions (1-30)
  link: '🔗', globe: '🌐', home: '🏠', rocket: '🚀', star: '⭐', fire: '🔥',
  lightning: '⚡', sparkle: '✨', gem: '💎', crown: '👑', trophy: '🏆', medal: '🎖️',
  target: '🎯', flag: '🚩', bookmark: '📑', pin: '📌', key: '🔑', lock: '🔒',
  unlock: '🔓', shield: '🛡️', check: '✅', verified: '✓', plus: '➕', arrow: '➡️',
  up: '⬆️', down: '⬇️', left: '⬅️', right: '➡️', refresh: '🔄', search: '🔍',
  
  // Communication (31-60)
  mail: '📧', email: '✉️', inbox: '📥', outbox: '📤', chat: '💬', bubble: '🗨️',
  phone: '📱', telephone: '☎️', fax: '📠', pager: '📟', bell: '🔔', speaker: '🔊',
  mute: '🔇', mic: '🎤', headphone: '🎧', radio: '📻', antenna: '📡', satellite: '🛰️',
  signal: '📶', wifi: '📶', bluetooth: '🔵', megaphone: '📢', horn: '📯', postal: '📮',
  mailbox: '📬', package: '📦', letter: '💌', scroll: '📜', newspaper: '📰', memo: '📝',
  
  // Social & People (61-90)
  user: '👤', users: '👥', team: '👨‍👩‍👧‍👦', family: '👪', couple: '💑', friends: '🤝',
  wave: '👋', clap: '👏', thumbsUp: '👍', thumbsDown: '👎', fist: '✊', hand: '✋',
  peace: '✌️', ok: '👌', point: '👆', muscle: '💪', brain: '🧠', heart: '❤️',
  love: '💕', kiss: '💋', hug: '🤗', think: '🤔', cool: '😎', happy: '😊',
  smile: '😀', laugh: '😂', wink: '😉', star2: '🌟', eyes: '👀', face: '🙂',
  
  // Business & Finance (91-120)
  briefcase: '💼', office: '🏢', building: '🏗️', factory: '🏭', store: '🏪', bank: '🏦',
  money: '💰', dollar: '💵', euro: '💶', yen: '💴', pound: '💷', coin: '🪙',
  credit: '💳', receipt: '🧾', chart: '📊', graph: '📈', graphDown: '📉', stats: '📉',
  calculator: '🧮', abacus: '🧮', scale: '⚖️', balance: '⚖️', handshake: '🤝', deal: '🤝',
  stamp: '📫', invoice: '🧾', contract: '📄', signature: '✍️', meeting: '👥', present: '🎁',
  
  // Technology (121-150)
  computer: '💻', desktop: '🖥️', laptop: '💻', keyboard: '⌨️', mouse: '🖱️', printer: '🖨️',
  disk: '💾', cd: '💿', dvd: '📀', usb: '💾', chip: '🔲', cpu: '🔲',
  server: '🖥️', database: '🗄️', cloud: '☁️', download: '⬇️', upload: '⬆️', sync: '🔄',
  code: '💻', terminal: '💻', bug: '🐛', robot: '🤖', ai: '🤖', gear: '⚙️',
  settings: '⚙️', tool: '🔧', wrench: '🔧', hammer: '🔨', screwdriver: '🪛', nut: '🔩',
  
  // Media & Creative (151-180)
  camera: '📷', video: '📹', film: '🎬', movie: '🎥', clapper: '🎬', tv: '📺',
  image: '🖼️', photo: '📸', gallery: '🖼️', art: '🎨', palette: '🎨', brush: '🖌️',
  pencil: '✏️', pen: '🖊️', crayon: '🖍️', marker: '🖍️', eraser: '🗑️', ruler: '📏',
  scissors: '✂️', clip: '📎', stapler: '📎', tape: '📎', glue: '🧴', paint: '🎨',
  design: '🎨', canvas: '🖼️', frame: '🖼️', easel: '🎨', sculpture: '🗿', museum: '🏛️',
  
  // Music & Audio (181-210)
  music: '🎵', note: '🎶', song: '🎵', playlist: '📋', album: '💿', vinyl: '📀',
  guitar: '🎸', piano: '🎹', drum: '🥁', violin: '🎻', trumpet: '🎺', sax: '🎷',
  microphone: '🎤', studio: '🎙️', mixer: '🎛️', amp: '🔊', speaker2: '🔈', volume: '🔉',
  dj: '🎧', turntable: '📀', beat: '🥁', rhythm: '🎵', melody: '🎶', harmony: '🎵',
  concert: '🎤', stage: '🎭', band: '🎸', orchestra: '🎻', choir: '🎤', karaoke: '🎤',
  
  // Gaming & Entertainment (211-240)
  game: '🎮', controller: '🎮', joystick: '🕹️', arcade: '👾', console: '🎮', dice: '🎲',
  cards: '🃏', spade: '♠️', hearts: '♥️', diamond: '♦️', clubs: '♣️', chess: '♟️',
  puzzle: '🧩', rubik: '🧊', magic: '🪄', wand: '🪄', crystal: '🔮', ball8: '🎱',
  bowling: '🎳', dart: '🎯', slot: '🎰', ticket: '🎟️', cinema: '🎦', popcorn: '🍿',
  mask: '🎭', theater: '🎭', comedy: '😂', drama: '🎭', magic2: '✨', circus: '🎪',
  
  // Food & Drink (241-270)
  food: '🍽️', restaurant: '🍴', chef: '👨‍🍳', cook: '🍳', pizza: '🍕', burger: '🍔',
  fries: '🍟', hotdog: '🌭', taco: '🌮', sushi: '🍣', ramen: '🍜', rice: '🍚',
  bread: '🍞', croissant: '🥐', bagel: '🥯', pretzel: '🥨', cheese: '🧀', egg: '🥚',
  salad: '🥗', soup: '🥣', steak: '🥩', chicken: '🍗', shrimp: '🦐', crab: '🦀',
  cake: '🎂', cookie: '🍪', donut: '🍩', candy2: '🍬', icecream: '🍦', chocolate2: '🍫',
  
  // Drinks (271-300)
  coffee: '☕', tea: '🍵', bubble: '🧋', juice: '🧃', smoothie: '🥤', soda: '🥤',
  water: '💧', wine2: '🍷', beer: '🍺', cocktail: '🍸', champagne2: '🍾', whiskey: '🥃',
  milk: '🥛', bottle: '🍼', cup: '🥤', mug: '☕', glass: '🥛', pitcher: '🫗',
  straw: '🥤', ice: '🧊', hot: '🔥', cold: '❄️', drink: '🍹', bar: '🍸',
  cheers: '🥂', toast: '🥂', pour: '🫗', brew: '☕', blend: '🥤', shake: '🧋',
  
  // Nature & Weather (301-330)
  sun: '☀️', moon: '🌙', star3: '⭐', cloud2: '☁️', rain: '🌧️', snow: '❄️',
  wind: '💨', storm: '⛈️', lightning2: '⚡', rainbow2: '🌈', umbrella: '☂️', temp: '🌡️',
  flower: '🌸', rose2: '🌹', tulip: '🌷', sunflower: '🌻', leaf: '🍃', tree: '🌲',
  plant: '🌱', cactus: '🌵', palm: '🌴', mountain: '⛰️', volcano: '🌋', wave2: '🌊',
  beach: '🏖️', island: '🏝️', desert: '🏜️', forest2: '🌳', garden: '🌿', park: '🏞️',
  
  // Animals (331-360)
  dog: '🐕', cat: '🐈', bird: '🐦', fish: '🐟', rabbit: '🐰', bear: '🐻',
  lion: '🦁', tiger: '🐯', fox: '🦊', wolf: '🐺', deer: '🦌', horse: '🐴',
  unicorn: '🦄', dragon: '🐉', snake: '🐍', turtle: '🐢', frog: '🐸', butterfly: '🦋',
  bee: '🐝', ladybug: '🐞', ant: '🐜', spider: '🕷️', octopus: '🐙', whale: '🐋',
  dolphin: '🐬', shark: '🦈', penguin: '🐧', owl: '🦉', eagle: '🦅', peacock: '🦚',
};

// ==================== Social Options ====================
const socialOptions = {
  email: { name: 'Email', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/></svg>', prefix: 'mailto:' },
  phone: { name: 'Phone', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd"/></svg>', prefix: 'tel:' },
  x: { name: 'X', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>', prefix: 'https://x.com/' },
  instagram: { name: 'Instagram', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>', prefix: 'https://instagram.com/' },
  linkedin: { name: 'LinkedIn', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>', prefix: 'https://linkedin.com/in/' },
  github: { name: 'GitHub', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>', prefix: 'https://github.com/' },
  youtube: { name: 'YouTube', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>', prefix: 'https://youtube.com/@' },
  tiktok: { name: 'TikTok', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>', prefix: 'https://tiktok.com/@' },
  telegram: { name: 'Telegram', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>', prefix: 'https://t.me/' },
  whatsapp: { name: 'WhatsApp', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>', prefix: 'https://wa.me/' },
  discord: { name: 'Discord', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>', prefix: 'https://discord.gg/' },
  facebook: { name: 'Facebook', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>', prefix: 'https://facebook.com/' },
  twitter: { name: 'Twitter', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>', prefix: 'https://twitter.com/' },
  snapchat: { name: 'Snapchat', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.922-.266.158-.085.301-.13.472-.13.4 0 .687.313.687.69 0 .37-.245.645-.594.792-.222.09-.466.163-.722.218-.365.08-.634.185-.822.345-.184.16-.282.377-.282.657 0 .075.01.148.026.22.36 1.62 1.79 2.995 3.37 3.345.24.05.415.26.415.509 0 .285-.185.505-.45.568-.695.16-1.364.565-1.905.86l-.063.037c-.15.09-.298.175-.415.234-.33.165-.575.21-.875.21-.075 0-.15-.01-.225-.02-.75-.06-1.185-.3-1.8-.36-.21-.02-.42-.04-.615-.04-.3 0-.555.03-.69.06-.69.15-1.11.39-1.74.67-.18.09-.39.16-.63.21-.09.02-.18.03-.27.03-.315 0-.555-.105-.75-.33-.12-.12-.225-.24-.435-.375-.465-.315-1.02-.525-1.605-.645-.27-.06-.465-.285-.465-.555 0-.255.18-.45.42-.51 1.59-.36 3.03-1.74 3.39-3.345.015-.075.025-.15.025-.22 0-.28-.1-.495-.28-.655-.185-.16-.455-.265-.82-.345-.255-.06-.5-.13-.72-.22-.345-.14-.59-.42-.59-.79 0-.375.285-.69.685-.69.17 0 .315.045.475.13.265.145.625.25.925.265.2 0 .33-.045.405-.09-.01-.165-.02-.33-.03-.51l-.003-.06c-.105-1.63-.23-3.655.3-4.85C7.86 1.072 11.217.793 12.206.793z"/></svg>', prefix: 'https://snapchat.com/add/' },
  pinterest: { name: 'Pinterest', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345c-.091.378-.293 1.194-.332 1.361-.053.218-.174.265-.402.16-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>', prefix: 'https://pinterest.com/' },
  reddit: { name: 'Reddit', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>', prefix: 'https://reddit.com/u/' },
  twitch: { name: 'Twitch', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>', prefix: 'https://twitch.tv/' },
  spotify: { name: 'Spotify', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>', prefix: 'https://open.spotify.com/user/' },
  soundcloud: { name: 'SoundCloud', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.101-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c.014.057.045.094.09.094s.089-.037.099-.094l.19-1.308-.19-1.334c-.01-.057-.044-.09-.09-.09m1.83-1.229c-.061 0-.12.045-.12.104l-.21 2.563.225 2.458c0 .06.045.104.106.104.061 0 .12-.044.12-.104l.24-2.458-.24-2.563c0-.06-.059-.104-.12-.104m.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.138.149.138.075 0 .135-.061.15-.138l.24-2.544-.24-2.64c-.015-.074-.074-.135-.15-.135m1.065.327c-.09 0-.149.075-.164.165l-.186 2.473.196 2.494c.015.09.075.164.165.164.09 0 .149-.074.164-.164l.222-2.494-.222-2.473c-.015-.09-.075-.165-.165-.165m1.02-.327c-.104 0-.194.074-.209.193l-.163 2.473.178 2.523c.014.104.09.178.194.178s.18-.074.209-.178l.193-2.523-.193-2.473c-.015-.119-.09-.193-.194-.193m1.096-.254c-.118 0-.209.089-.224.209l-.18 2.556.165 2.508c.015.104.106.179.224.179.119 0 .209-.075.224-.179l.18-2.508-.165-2.556c-.015-.12-.105-.209-.224-.209m1.155-.329c-.135 0-.239.105-.254.24l-.166 2.629.18 2.508c.014.119.119.209.253.209.119 0 .224-.09.24-.209l.194-2.508-.18-2.629c-.015-.135-.119-.24-.254-.24m1.155-.164c-.148 0-.268.119-.268.269l-.165 2.523.18 2.493c0 .149.119.268.268.268.148 0 .268-.119.268-.268l.195-2.493-.195-2.523c0-.15-.12-.269-.268-.269m1.276-.225c-.165 0-.299.119-.314.284l-.15 2.463.165 2.464c.015.149.134.268.299.268.149 0 .283-.119.299-.268l.18-2.464-.165-2.463c-.016-.165-.15-.284-.314-.284m1.185-.214c-.18 0-.314.135-.329.314l-.137 2.392.152 2.434c.015.164.149.299.314.299.164 0 .299-.135.314-.299l.165-2.434-.15-2.392c-.015-.179-.15-.314-.329-.314m1.245-.074c-.195 0-.344.149-.359.344l-.121 2.18.136 2.405c.015.18.164.314.344.314.179 0 .328-.134.343-.314l.151-2.405-.136-2.18c-.015-.195-.164-.344-.358-.344m1.305.044c-.209 0-.373.164-.388.373l-.107 1.851.122 2.376c.015.194.179.358.373.358.194 0 .358-.164.373-.358l.136-2.376-.121-1.851c-.016-.209-.18-.373-.388-.373m1.439-.18c-.224 0-.403.179-.418.403l-.106 1.977.121 2.361c.015.21.194.374.403.374.209 0 .388-.164.402-.374l.136-2.361-.121-1.977c-.015-.224-.193-.403-.417-.403m1.57.375c-.239 0-.433.194-.448.433l-.09 1.559.104 2.346c.016.224.21.403.434.403.224 0 .418-.179.433-.403l.121-2.346-.106-1.559c-.015-.239-.209-.433-.448-.433m1.693.072c-.254 0-.463.209-.478.463l-.074 1.44.089 2.317c.015.239.224.433.463.433.239 0 .448-.194.463-.433l.104-2.317-.09-1.44c-.015-.254-.223-.463-.477-.463m1.83.028c-.27 0-.494.224-.509.494l-.059 1.368.074 2.302c.015.255.239.464.494.464.254 0 .478-.209.494-.464l.089-2.302-.075-1.368c-.015-.27-.239-.494-.508-.494m1.95-.138c-.284 0-.523.239-.538.523l-.044 1.463.059 2.287c.015.269.254.493.523.493.27 0 .509-.224.524-.493l.074-2.287-.06-1.463c-.015-.284-.253-.523-.538-.523m2.325 1.122c-.78 0-1.485.24-2.085.615-.15-.794-.823-1.396-1.635-1.396-.375 0-.72.137-.99.36-.134.104-.179.179-.179.299v5.595c0 .135.104.254.239.269h4.65c1.32 0 2.385-1.08 2.385-2.4 0-1.32-1.065-2.342-2.385-2.342"/></svg>', prefix: 'https://soundcloud.com/' },
  medium: { name: 'Medium', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>', prefix: 'https://medium.com/@' },
  dribbble: { name: 'Dribbble', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/></svg>', prefix: 'https://dribbble.com/' },
  behance: { name: 'Behance', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM6.545 9.76c.6 0 1.07-.15 1.435-.448.363-.3.54-.75.54-1.33 0-.325-.06-.6-.18-.82-.12-.22-.28-.39-.49-.51-.2-.12-.44-.2-.72-.24-.27-.03-.55-.05-.86-.05H3.7v3.4h2.845zm.18 5.89c.336 0 .655-.03.96-.1.303-.06.57-.166.8-.3.23-.13.41-.32.53-.56.12-.24.18-.54.18-.91 0-.73-.21-1.25-.64-1.56-.43-.31-.99-.47-1.69-.47H3.7v3.9h3.025zM15.954 4.19h6.12v1.76h-6.12V4.19zm3.045 2.68c.82 0 1.504.12 2.058.35.56.24 1.01.55 1.36.95.35.4.61.86.76 1.39.15.52.23 1.08.23 1.67v6.09h-3.09v-1.45h-.06c-.18.27-.38.5-.61.71-.24.21-.49.38-.78.51-.28.13-.59.23-.92.3-.34.07-.7.1-1.09.1-.56 0-1.07-.09-1.54-.27-.47-.18-.87-.43-1.2-.76-.34-.33-.6-.73-.79-1.2-.19-.47-.29-1-.29-1.59 0-.73.16-1.34.48-1.82.32-.48.75-.86 1.29-1.13.54-.28 1.15-.48 1.85-.6.69-.12 1.4-.18 2.13-.18h1.76v-.21c0-.51-.18-.91-.55-1.2-.37-.29-.82-.43-1.35-.43-.48 0-.9.1-1.27.3-.37.2-.67.47-.9.8l-1.77-1.5c.49-.55 1.1-.98 1.85-1.28.75-.3 1.57-.45 2.47-.45zm.33 6.54c-.46 0-.87.11-1.22.32-.35.21-.53.58-.53 1.1 0 .25.05.47.14.66.09.19.21.35.37.48.15.13.34.23.55.3.21.07.44.1.68.1.31 0 .59-.04.85-.12.26-.08.49-.2.69-.35.2-.15.35-.34.47-.56.12-.22.18-.47.18-.75v-.71h-1.48c-.26 0-.52.02-.8.05-.27.03-.52.08-.74.15-.22.07-.4.17-.54.3-.15.13-.22.29-.22.49z"/></svg>', prefix: 'https://behance.net/' },
  figma: { name: 'Figma', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zM8.148 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.588 4.539zm-.001-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019c1.608 0 3.117-1.387 3.117-3.019v-3.019H8.147zM8.148 8.981c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981H8.148zm-.001-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.147zM8.172 15.019h4.588V6.038H8.172c-2.476 0-4.49 2.014-4.49 4.49s2.014 4.491 4.49 4.491zm-.001-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V7.509H8.171zM15.852 15.019c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm0-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019 3.019-1.355 3.019-3.019-1.355-3.019-3.019-3.019z"/></svg>', prefix: '' },
  notion: { name: 'Notion', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.166V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.934zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.454-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933l3.224-.187zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg>', prefix: '' },
  substack: { name: 'Substack', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24l9.063-5.25L19.541 24V10.812H1.46zm21.08-7.674H1.46V0h21.08v3.138z"/></svg>', prefix: 'https://' },
  mastodon: { name: 'Mastodon', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.668 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/></svg>', prefix: '' },
  calendly: { name: 'Calendly', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 3h-3V1.5a.75.75 0 0 0-1.5 0V3h-6V1.5a.75.75 0 0 0-1.5 0V3h-3A2.25 2.25 0 0 0 2.25 5.25v13.5A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V5.25A2.25 2.25 0 0 0 19.5 3zm.75 15.75a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75V9h16.5v9.75zm0-11.25H3.75V5.25a.75.75 0 0 1 .75-.75h3V6a.75.75 0 0 0 1.5 0V4.5h6V6a.75.75 0 0 0 1.5 0V4.5h3a.75.75 0 0 1 .75.75v2.25zM7.5 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm4.5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm4.5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>', prefix: 'https://calendly.com/' },
  website: { name: 'Website', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>', prefix: '' },
  link2: { name: 'Link', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>', prefix: '' },
};

function buildSocialUrl(key, value) {
  const opt = socialOptions[key];
  if (!opt || !value) return '';
  if (['email', 'phone', 'website', 'link2', 'figma', 'mastodon'].includes(key)) return value.startsWith('http') || value.startsWith('mailto') || value.startsWith('tel') ? value : (opt.prefix || '') + value;
  if (value.startsWith('http')) return value;
  return opt.prefix + value.replace(/^@/, '');
}

function normalizeUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('mailto:') || url.startsWith('tel:')) return url;
  return 'https://' + url;
}
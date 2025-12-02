// ==================== Supabase Config ====================
const SUPABASE_URL = 'https://udxjalqfssewkhfgmkfa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkeGphbHFmc3Nld2toZmdta2ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MTExODksImV4cCI6MjA4MDA4NzE4OX0.2aNuQOX2wju-erQQvLpNW6RPskEG9VRivaIdcgz_igY';
const MASTER_ADMIN_EMAIL = 'simon@hashed.com';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function isMasterAdmin() {
  return state.currentUser?.email === MASTER_ADMIN_EMAIL;
}

// ==================== State ====================
const state = {
  currentUser: null,
  userRole: null,
  userProfile: null,
  profiles: [],
  invitations: [],
  joinRequests: [],
  globalInviteCode: '',
  selectedProfileId: null,
  selectedView: 'dashboard',
  sortBy: 'name',
  sortOrder: 'asc',
  searchQuery: '',
  toasts: [],
  editingProfile: null,
  dragType: null, // 'social' | 'link'
  dragIndex: null,
  mobileTab: 'list' // 'list' | 'edit' | 'preview'
};

// ==================== Link Icon Categories ====================
const linkIconCategories = {
  'Popular': ['🔗', '🌐', '📧', '📱', '💼', '📄', '🎯', '⭐', '🚀', '💡'],
  'Social': ['❤️', '👤', '👥', '🤝', '👋', '👍', '💬', '📢', '🎉', '🎁'],
  'Business': ['💰', '💳', '📊', '📈', '🏢', '🏦', '⚖️', '📝', '✍️', '🗂️'],
  'Tech': ['💻', '🖥️', '⌨️', '🔧', '⚙️', '🔌', '📡', '☁️', '🤖', '🔒'],
  'Media': ['📷', '🎬', '🎵', '🎧', '🎤', '📺', '🎨', '🖼️', '📸', '🎥'],
  'Travel': ['✈️', '🚗', '🚀', '🌍', '🗺️', '🏖️', '⛰️', '🏠', '🏰', '🌴'],
  'Food': ['🍽️', '☕', '🍕', '🍔', '🍳', '🎂', '🍷', '🍺', '🥗', '🍜'],
  'Nature': ['🌸', '🌻', '🍀', '🌲', '🌊', '☀️', '🌙', '⭐', '🔥', '❄️'],
  'Education': ['📚', '📖', '🎓', '✏️', '📝', '🔬', '🧪', '🎯', '💡', '🧠'],
  'Sports': ['⚽', '🏀', '🎾', '🏃', '🚴', '🏋️', '🥇', '🏆', '🎮', '🎲'],
};

// ==================== Helpers ====================
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

function getSocialPlaceholder(key) {
  const placeholders = {
    email: 'email@example.com',
    phone: '+821012345678',
    whatsapp: '+821012345678',
    telegram: '@username',
    website: 'https://...',
    link2: 'https://...',
    calendly: 'your-name',
    mastodon: '@user@instance.social'
  };
  return placeholders[key] || '@username';
}

function showToast(msg, type = 'success') {
  const id = Date.now();
  state.toasts.push({ id, msg, type });
  renderToasts();
  setTimeout(() => { state.toasts = state.toasts.filter(t => t.id !== id); renderToasts(); }, 3000);
}

function renderToasts() {
  let c = $('#toast-container');
  if (!c) { document.body.insertAdjacentHTML('beforeend', '<div id="toast-container" class="fixed bottom-4 right-4 z-[100] space-y-2"></div>'); c = $('#toast-container'); }
  c.innerHTML = state.toasts.map(t => `
    <div class="flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium ${t.type === 'error' ? 'bg-red-500' : 'bg-zinc-800'} text-white animate-slide-in">
      ${t.type === 'error' ? '✕' : '✓'} ${t.msg}
    </div>
  `).join('');
}

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function generateInviteCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function getPendingInvites() { return state.invitations.filter(i => i.status === 'pending'); }

function getFilteredProfiles() {
  let p = [...state.profiles];
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    p = p.filter(x => x.name?.toLowerCase().includes(q) || x.email?.toLowerCase().includes(q) || x.title?.toLowerCase().includes(q));
  }
  p.sort((a, b) => {
    let va, vb;
    if (state.sortBy === 'name') { va = (a.name || '').toLowerCase(); vb = (b.name || '').toLowerCase(); }
    else if (state.sortBy === 'created_at') { va = new Date(a.created_at || 0); vb = new Date(b.created_at || 0); }
    else { va = new Date(a.updated_at || 0); vb = new Date(b.updated_at || 0); }
    return state.sortOrder === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
  });
  return p;
}

// Drag & Drop helpers
function handleDragStart(e, type, idx) {
  state.dragType = type;
  state.dragIndex = idx;
  e.target.classList.add('opacity-50');
}

function handleDragEnd(e) {
  e.target.classList.remove('opacity-50');
  state.dragType = null;
  state.dragIndex = null;
}

function handleDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('bg-violet-50');
}

function handleDragLeave(e) {
  e.currentTarget.classList.remove('bg-violet-50');
}

function handleDrop(e, type, targetIdx) {
  e.preventDefault();
  e.currentTarget.classList.remove('bg-violet-50');
  if (state.dragType !== type || state.dragIndex === null || state.dragIndex === targetIdx) return;
  
  const arr = type === 'social' ? state.editingProfile.socialOrder : state.editingProfile.links;
  const [item] = arr.splice(state.dragIndex, 1);
  arr.splice(targetIdx, 0, item);
  renderDashboard();
}

// ==================== QR Code Pre-generation ====================
async function generateAndUploadQR(profileId, socialType, url) {
  if (!url) return null;
  
  try {
    // QR 이미지 생성 API 호출
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
    
    // 이미지를 Blob으로 가져오기
    const response = await fetch(qrApiUrl);
    const blob = await response.blob();
    
    // 파일명 생성 (profileId_socialType.png)
    const fileName = `${profileId}_${socialType}.png`;
    const filePath = `qrcodes/${fileName}`;
    
    // Supabase Storage에 업로드 (덮어쓰기)
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, blob, { 
        contentType: 'image/png',
        upsert: true 
      });
    
    if (error) {
      console.error('QR upload error:', error);
      return null;
    }
    
    // Public URL 생성
    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
    return urlData.publicUrl + '?t=' + Date.now(); // 캐시 방지
    
  } catch (err) {
    console.error('QR generation error:', err);
    return null;
  }
}

// WhatsApp/Telegram QR 업데이트 (저장 시 호출)
async function updateSocialQRs(profile) {
  const socials = profile.socials || {};
  let updated = false;
  
  // WhatsApp QR 생성
  if (socials.whatsapp?.url) {
    const waUrl = buildSocialUrl('whatsapp', socials.whatsapp.url);
    const currentQrUrl = socials.whatsapp.qr_url;
    
    // URL이 변경되었거나 QR이 없으면 생성
    if (!currentQrUrl || socials.whatsapp._urlChanged) {
      const qrUrl = await generateAndUploadQR(profile.id, 'whatsapp', waUrl);
      if (qrUrl) {
        socials.whatsapp.qr_url = qrUrl;
        delete socials.whatsapp._urlChanged;
        updated = true;
      }
    }
  }
  
  // Telegram QR 생성
  if (socials.telegram?.url) {
    const tgUrl = buildSocialUrl('telegram', socials.telegram.url);
    const currentQrUrl = socials.telegram.qr_url;
    
    if (!currentQrUrl || socials.telegram._urlChanged) {
      const qrUrl = await generateAndUploadQR(profile.id, 'telegram', tgUrl);
      if (qrUrl) {
        socials.telegram.qr_url = qrUrl;
        delete socials.telegram._urlChanged;
        updated = true;
      }
    }
  }
  
  return updated;
}

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

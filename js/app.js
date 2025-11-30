// ==================== Router ====================
async function handleRoute() {
  const hash = window.location.hash.slice(1) || '';
  const [route, param] = hash.split('/');
  
  if (!state.currentUser) { renderLogin(); return; }
  if (route === 'card' && param) { renderCardView(param); return; }
  renderDashboard();
}

// ==================== Init ====================
async function initApp() {
  $('#app').innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-zinc-50">
      <div class="w-8 h-8 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin"></div>
    </div>
    <style>@keyframes spin{to{transform:rotate(360deg)}}.animate-spin{animation:spin .8s linear infinite}@keyframes slide-in{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}.animate-slide-in{animation:slide-in .2s ease}</style>
  `;
  
  try {
    state.currentUser = await getCurrentUser();
    if (state.currentUser) {
      if (state.userRole === 'admin') {
        state.profiles = await getAllProfiles();
        state.joinRequests = await getJoinRequests();
        state.globalInviteCode = await getGlobalInviteCode();
        // Admin starts on dashboard, not profile
        state.selectedView = 'dashboard';
        state.selectedProfileId = null;
        state.editingProfile = null;
      } else if (state.userProfile) {
        // Member starts on their own profile
        state.selectedProfileId = state.userProfile.id;
        state.editingProfile = JSON.parse(JSON.stringify(state.userProfile));
        if (!state.editingProfile.socialOrder) {
          state.editingProfile.socialOrder = Object.keys(state.editingProfile.socials || {}).filter(k => state.editingProfile.socials[k]?.enabled);
        }
        state.selectedView = 'profile';
      }
    }
    handleRoute();
  } catch (err) { console.error(err); renderLogin(); }
}

window.addEventListener('hashchange', handleRoute);
supabase.auth.onAuthStateChange((e) => { if (e === 'SIGNED_OUT') { state.currentUser = null; renderLogin(); } });
document.addEventListener('DOMContentLoaded', initApp);

// ==================== Router ====================
function getProfileIdFromPath() {
  // 먼저 해시 확인: /#card/simon
  const hash = window.location.hash.slice(1) || '';
  const [route, param] = hash.split('/');
  if (route === 'card' && param) return param;
  
  // 그 다음 경로 확인: /simon
  const path = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  if (path && path !== '' && !path.includes('.')) return path;
  
  return null;
}

async function handleRoute() {
  // 로그인된 상태라면 항상 대시보드
  if (state.currentUser) { renderDashboard(); return; }
  
  // 로그인 안 된 상태에서 카드 뷰 허용
  const profileId = getProfileIdFromPath();
  if (profileId) { await renderCardView(profileId); return; }
  
  // 그 외는 로그인 화면
  renderLogin();
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
    // 먼저 로그인 상태 확인
    state.currentUser = await getCurrentUser();
    
    // 로그인된 상태라면 대시보드로 (URL의 profileId 무시)
    if (state.currentUser) {
      if (state.userRole === 'admin') {
        state.profiles = await getAllProfiles();
        state.joinRequests = await getJoinRequests();
        state.globalInviteCode = await getGlobalInviteCode();
        state.selectedView = 'dashboard';
        state.selectedProfileId = null;
        state.editingProfile = null;
        state.mobileTab = 'list';
      } else if (state.userProfile) {
        state.selectedProfileId = state.userProfile.id;
        state.editingProfile = JSON.parse(JSON.stringify(state.userProfile));
        if (!state.editingProfile.socialOrder) {
          state.editingProfile.socialOrder = Object.keys(state.editingProfile.socials || {}).filter(k => state.editingProfile.socials[k]?.enabled);
        }
        state.selectedView = 'profile';
        state.mobileTab = 'edit';
      }
      renderDashboard();
      return;
    }
    
    // 로그인 안 된 상태에서만 카드 뷰 허용
    const profileId = getProfileIdFromPath();
    if (profileId) {
      await renderCardView(profileId);
      return;
    }
    
    // 그 외는 로그인 화면
    renderLogin();
  } catch (err) { console.error(err); renderLogin(); }
}

window.addEventListener('hashchange', handleRoute);
supabase.auth.onAuthStateChange((e) => { if (e === 'SIGNED_OUT') { state.currentUser = null; renderLogin(); } });
document.addEventListener('DOMContentLoaded', initApp);

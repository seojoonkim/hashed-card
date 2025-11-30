// ==================== Profile ====================
async function saveProfile(data) {
  const { data: saved, error } = await supabase.from('profiles').update(data).eq('id', data.id).select().single();
  if (error) throw error;
  return saved;
}

async function uploadAvatar(file, profileId) {
  const ext = file.name.split('.').pop();
  const name = `${profileId}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from('avatars').upload(name, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from('avatars').getPublicUrl(name);
  return data.publicUrl + '?t=' + Date.now();
}

async function deleteAvatar(url) {
  if (!url) return;
  try {
    const name = url.split('?')[0].split('/').pop();
    if (name) await supabase.storage.from('avatars').remove([name]);
  } catch (e) { console.log(e); }
}

async function handleAvatarUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) return showToast('Max 2MB', 'error');
  if (!file.type.startsWith('image/')) return showToast('Select image', 'error');
  try {
    showToast('Uploading...');
    const url = await uploadAvatar(file, state.editingProfile.id);
    state.editingProfile.avatar_url = url;
    renderDashboard();
    showToast('Uploaded!');
  } catch (err) { showToast(err.message, 'error'); }
}

async function removeAvatar() {
  if (!state.editingProfile?.avatar_url) return;
  try {
    await deleteAvatar(state.editingProfile.avatar_url);
    state.editingProfile.avatar_url = null;
    renderDashboard();
    showToast('Removed');
  } catch (err) { showToast(err.message, 'error'); }
}

async function handleSaveProfile() {
  if (!state.editingProfile) return;
  const p = state.editingProfile;
  p.name = $('#edit-name')?.value || '';
  p.title = $('#edit-title')?.value || '';
  p.company = $('#edit-company')?.value || '';
  
  // Normalize URLs
  if (p.socials) {
    Object.keys(p.socials).forEach(k => {
      if (p.socials[k]?.url) {
        p.socials[k].url = buildSocialUrl(k, p.socials[k].url);
      }
    });
  }
  if (p.links) {
    p.links.forEach(l => { if (l.url) l.url = normalizeUrl(l.url); });
  }
  
  p.updated_at = new Date().toISOString();
  
  try {
    const saveData = {
      id: p.id,
      name: p.name,
      title: p.title,
      company: p.company,
      avatar_url: p.avatar_url,
      bg_theme: p.bg_theme,
      font: p.font,
      socials: p.socials || {},
      links: p.links || [],
      updated_at: p.updated_at
    };
    if (p.socialOrder) saveData.socialOrder = p.socialOrder;
    
    const saved = await saveProfile(saveData);
    const idx = state.profiles.findIndex(x => x.id === p.id);
    if (idx >= 0) state.profiles[idx] = saved;
    if (state.userProfile?.id === p.id) state.userProfile = saved;
    showToast('Saved!');
  } catch (err) { showToast(err.message, 'error'); }
}

// ==================== Share ====================
async function shareProfile(profileId, name) {
  const url = `https://hashed.live/${profileId}`;
  const title = name ? `${name} - Hashed.Live` : 'Hashed.Live';
  
  // Web Share API 지원 시
  if (navigator.share) {
    try {
      await navigator.share({ title, url });
      return;
    } catch (e) {
      // 사용자가 취소하거나 오류 발생 시 클립보드 복사로 폴백
    }
  }
  
  // 클립보드 복사
  try {
    await navigator.clipboard.writeText(url);
    showToast('Link copied!');
  } catch (e) {
    // 폴백: 임시 input 사용
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast('Link copied!');
  }
}

// ==================== Card View ====================
async function renderCardView(profileId) {
  console.log('[CardView] Loading profile:', profileId);
  
  // 먼저 state에서 찾고, 없으면 DB에서 직접 조회
  let profile = state.profiles.find(p => p.id === profileId) || (state.userProfile?.id === profileId ? state.userProfile : null);
  
  if (!profile) {
    // DB에서 직접 조회
    console.log('[CardView] Not in state, fetching from DB...');
    const { data, error } = await supabase.from('profiles').select('*').eq('id', profileId).single();
    console.log('[CardView] DB result:', { data, error });
    if (error) {
      console.error('[CardView] DB error:', error);
    }
    profile = data;
  }
  
  if (!profile) {
    console.log('[CardView] Profile not found');
    $('#app').innerHTML = `<div class="min-h-screen flex items-center justify-center bg-zinc-100"><div class="text-center"><p class="text-4xl mb-2">🔍</p><p class="text-zinc-500 text-sm">Not found</p></div></div>`;
    return;
  }
  
  console.log('[CardView] Rendering profile:', profile.name);
  
  const t = themes[profile.bg_theme] || themes.snow;
  const f = fontOptions[profile.font] || fontOptions.inter;
  const socialOrder = profile.socialOrder || Object.keys(profile.socials || {}).filter(k => profile.socials[k]?.enabled);
  const links = profile.links || [];
  
  const socialCount = socialOrder.filter(key => profile.socials?.[key]?.url).length;
  const socialHtml = socialOrder.slice(0, 6).map(key => {
    const s = profile.socials?.[key];
    if (!s?.url) return '';
    const opt = socialOptions[key];
    const url = buildSocialUrl(key, s.url);
    // 6개일 때 크기 줄임
    const size = socialCount >= 6 ? '46px' : '48px';
    const iconSize = socialCount >= 6 ? '18px' : '22px';
    return `
      <a href="${url}" target="_blank" 
         class="flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1" 
         style="color: ${t.text}; background: ${t.btn}; border: 1.5px solid ${t.border}; box-shadow: 0 4px 12px rgba(0,0,0,0.08); width: ${size}; height: ${size}; flex-shrink: 0;">
        <span style="width: ${iconSize}; height: ${iconSize};">${opt.icon}</span>
      </a>`;
  }).join('');
  
  const linksHtml = links.filter(l => l.title || l.url).map(l => {
    const url = normalizeUrl(l.url);
    return `
      <a href="${url}" target="_blank" 
         class="group flex items-center w-full px-6 py-4 rounded-[24px] transition-all duration-300 hover:-translate-y-0.5"
         style="background: ${t.btn}; border: 1px solid ${t.border}; box-shadow: 0 2px 8px rgba(0,0,0,0.04); font-family: ${f.family} !important;"
         onmouseover="this.style.boxShadow='0 12px 28px rgba(0,0,0,0.12)'; this.style.transform='translateY(-2px)'"
         onmouseout="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)'; this.style.transform='none'">
        <span class="text-xl mr-3 transition-transform duration-300 group-hover:scale-110">${l.icon||'🔗'}</span>
        <span class="text-[15px] flex-1" style="color: ${t.text}; font-family: ${f.family} !important; font-weight: 450;">${l.title||'Untitled'}</span>
        <svg class="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 opacity-30 group-hover:opacity-60" style="color: ${t.textSub}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
      </a>
    `;
  }).join('');
  
  // Load font
  if (f.url && !document.querySelector(`link[href="${f.url}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = f.url;
    document.head.appendChild(link);
  }
  
  $('#app').innerHTML = `
    <div id="card-view" class="fixed inset-0 overflow-y-auto" style="background: ${t.bg}; font-family: ${f.family} !important;">
      <!-- Header -->
      <div class="fixed top-0 left-0 right-0 z-50 px-5 sm:px-4 py-3 flex items-center justify-between" style="background: linear-gradient(to bottom, ${t.bg} 60%, transparent);">
        <a href="/" class="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <div class="w-8 h-8 rounded-xl flex items-center justify-center" style="background: linear-gradient(145deg, #18181b 0%, #27272a 50%, #18181b 100%); box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
            <svg class="w-4 h-4" viewBox="0 0 36 36" fill="none">
              <rect x="7" y="8" width="4" height="20" rx="2" fill="white"/>
              <rect x="25" y="8" width="4" height="20" rx="2" fill="white"/>
              <rect x="11" y="15" width="14" height="4" rx="2" fill="white"/>
              <circle cx="29" cy="10" r="2" fill="#a78bfa" opacity="0.9"/>
            </svg>
          </div>
        </a>
        <button onclick="shareProfile('${profile.id}', '${profile.name || ''}')" 
          class="w-9 h-9 rounded-xl flex items-center justify-center opacity-70 hover:opacity-100 transition-all hover:scale-105"
          style="background: ${t.card}; border: 1px solid ${t.border}; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <svg class="w-4 h-4" style="color: ${t.text}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
          </svg>
        </button>
      </div>
      
      <!-- 모바일: 전체화면 / PC,태블릿: 카드 -->
      <div class="min-h-full flex flex-col pt-14 pb-6 sm:py-16 sm:items-center sm:justify-center">
        <div class="flex-1 sm:flex-none w-full sm:max-w-sm sm:px-4">
          <div class="h-full px-7 pt-6 pb-8 sm:rounded-[32px] sm:p-8 sm:h-auto" 
               style="background: ${t.bg}; font-family: ${f.family} !important;">
          
          <!-- Avatar -->
          <div class="flex justify-center mb-5 sm:mb-6">
            <div class="relative">
              <div class="absolute inset-0 rounded-full blur-xl opacity-30 hidden sm:block" style="background: ${t.accent};"></div>
              <div class="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden transition-all duration-500 hover:scale-105" 
                   style="background: ${t.btn}; box-shadow: 0 0 0 3px ${t.bg}, 0 0 0 5px ${t.border}, 0 20px 40px -10px rgba(0,0,0,0.15);">
                ${profile.avatar_url 
                  ? `<img src="${profile.avatar_url}" class="w-full h-full object-cover"/>` 
                  : `<span class="w-full h-full flex items-center justify-center text-3xl sm:text-5xl" style="color: ${t.textSub}">👤</span>`}
              </div>
            </div>
          </div>
          
          <!-- Name & Info -->
          <div class="text-center mb-6 sm:mb-8">
            <h1 class="text-xl sm:text-2xl font-bold tracking-tight mb-1" style="color: ${t.text}; letter-spacing: -0.02em; font-family: ${f.family} !important;">${profile.name||'Name'}</h1>
            <p class="text-sm font-medium mb-0.5" style="color: ${t.textSub}; font-family: ${f.family} !important;">${profile.company || ''}</p>
            <p class="text-xs" style="color: ${t.textSub}; opacity: 0.7; font-family: ${f.family} !important;">${profile.title || ''}</p>
          </div>
          
          ${socialHtml ? `<div class="${socialCount >= 6 ? 'flex justify-between w-full' : 'flex justify-center gap-2.5 sm:gap-3'} mb-6 sm:mb-8">${socialHtml}</div>` : ''}
          
          <div class="space-y-2.5">${linksHtml}</div>
          
          <!-- URL 표시 (모바일) -->
          <p class="mt-6 sm:hidden text-center text-[10px] font-semibold tracking-wide uppercase" style="color: ${t.textSub}; opacity: 0.4;">
            hashed.live/${profile.id}
          </p>
        </div>
        </div>
        
        <!-- URL 표시 (PC/태블릿) -->
        <p class="hidden sm:block mt-6 text-center text-[11px] font-semibold tracking-wide uppercase" style="color: ${t.textSub}; opacity: 0.5;">
          hashed.live/${profile.id}
        </p>
      </div>
    </div>
    
    <style>
      @media (min-width: 640px) {
        .sm\\:rounded-\\[32px\\] {
          background: ${t.card} !important;
          border: 1px solid ${t.border};
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px ${t.border};
        }
      }
    </style>
  `;
  
  // body 배경색도 테마에 맞춤
  document.body.style.background = t.bg;
}

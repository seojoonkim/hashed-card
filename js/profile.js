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

// ==================== Card View ====================
function renderCardView(profileId) {
  const profile = state.profiles.find(p => p.id === profileId) || (state.userProfile?.id === profileId ? state.userProfile : null);
  
  if (!profile) {
    $('#app').innerHTML = `<div class="min-h-screen flex items-center justify-center bg-zinc-100"><div class="text-center"><p class="text-4xl mb-2">🔍</p><p class="text-zinc-500 text-sm">Not found</p></div></div>`;
    return;
  }
  
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
    <div class="min-h-screen py-12 px-4 flex items-center justify-center" style="background: ${t.bg}; font-family: ${f.family} !important;">
      <div class="w-full max-w-sm">
        <div class="rounded-[32px] p-8 backdrop-blur-xl" 
             style="background: ${t.card}; border: 1px solid ${t.border}; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px ${t.border}; font-family: ${f.family} !important;">
          
          <!-- Avatar with glow -->
          <div class="flex justify-center mb-6">
            <div class="relative">
              <div class="absolute inset-0 rounded-full blur-xl opacity-30" style="background: ${t.accent};"></div>
              <div class="relative w-32 h-32 rounded-full overflow-hidden transition-all duration-500 hover:scale-105" 
                   style="background: ${t.btn}; box-shadow: 0 0 0 3px ${t.card}, 0 0 0 5px ${t.border}, 0 20px 40px -10px rgba(0,0,0,0.2);">
                ${profile.avatar_url 
                  ? `<img src="${profile.avatar_url}" class="w-full h-full object-cover"/>` 
                  : `<span class="w-full h-full flex items-center justify-center text-5xl" style="color: ${t.textSub}">👤</span>`}
              </div>
            </div>
          </div>
          
          <!-- Name & Info -->
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold tracking-tight mb-1.5" style="color: ${t.text}; letter-spacing: -0.02em; font-family: ${f.family} !important;">${profile.name||'Name'}</h1>
            <p class="text-sm font-medium mb-0.5" style="color: ${t.textSub}; font-family: ${f.family} !important;">${profile.company || ''}</p>
            <p class="text-xs" style="color: ${t.textSub}; opacity: 0.7; font-family: ${f.family} !important;">${profile.title || ''}</p>
          </div>
          
          ${socialHtml ? `<div class="${socialCount >= 6 ? 'flex justify-between w-full' : 'flex justify-center gap-3'} mb-8">${socialHtml}</div>` : ''}
          
          <div class="space-y-2.5">${linksHtml}</div>
        </div>
        
        <!-- URL 표시 -->
        <p class="mt-8 text-center text-[11px] font-semibold tracking-wide uppercase" style="color: ${t.textSub}; opacity: 0.5;">
          hashed.live/${profile.id}
        </p>
      </div>
    </div>
  `;
}

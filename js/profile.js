// ==================== Profile ====================
async function saveProfile(data) {
  const { data: saved, error } = await supabaseClient.from('profiles').update(data).eq('id', data.id).select().single();
  if (error) throw error;
  return saved;
}

async function uploadAvatar(file, profileId) {
  const ext = file.name.split('.').pop();
  const name = `${profileId}-${Date.now()}.${ext}`;
  const { error } = await supabaseClient.storage.from('avatars').upload(name, file, { upsert: true });
  if (error) throw error;
  const { data } = supabaseClient.storage.from('avatars').getPublicUrl(name);
  return data.publicUrl + '?t=' + Date.now();
}

async function deleteAvatar(url) {
  if (!url) return;
  try {
    const name = url.split('?')[0].split('/').pop();
    if (name) await supabaseClient.storage.from('avatars').remove([name]);
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
  
  // QR 코드 미리 생성 (WhatsApp/Telegram)
  await updateSocialQRs(p);
  
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
  // 먼저 state에서 찾고, 없으면 DB에서 직접 조회
  let profile = state.profiles.find(p => p.id === profileId) || (state.userProfile?.id === profileId ? state.userProfile : null);
  
  if (!profile) {
    // DB에서 직접 조회
    const { data, error } = await supabaseClient.from('profiles').select('*').eq('id', profileId).single();
    profile = data;
  }
  
  if (!profile) {
    $('#app').innerHTML = `<div class="min-h-screen flex items-center justify-center bg-zinc-100"><div class="text-center"><p class="text-4xl mb-2">🔍</p><p class="text-zinc-500 text-sm">Not found</p></div></div>`;
    return;
  }
  
  const t = themes[profile.bg_theme] || themes.snow;
  const f = fontOptions[profile.font] || fontOptions.inter;
  const socialOrder = profile.socialOrder || Object.keys(profile.socials || {}).filter(k => profile.socials[k]?.enabled);
  const links = profile.links || [];
  
  // 그라데이션에서 첫 번째 색상 추출 (theme-color용)
  const extractFirstColor = (bg) => {
    const match = bg.match(/#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|rgba?\([^)]+\)/);
    return match ? match[0] : '#ffffff';
  };
  const themeColor = extractFirstColor(t.bg);
  
  // 동적으로 theme-color 메타태그 업데이트 (iOS Safari 상태바 색상)
  let themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (!themeColorMeta) {
    themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    document.head.appendChild(themeColorMeta);
  }
  themeColorMeta.content = themeColor;
  
  // iOS Safari 하단 바 색상도 설정
  let statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (!statusBarMeta) {
    statusBarMeta = document.createElement('meta');
    statusBarMeta.name = 'apple-mobile-web-app-status-bar-style';
    document.head.appendChild(statusBarMeta);
  }
  // 밝은 배경이면 dark-content, 어두운 배경이면 light-content
  const isDark = isColorDark(themeColor);
  statusBarMeta.content = isDark ? 'light-content' : 'dark-content';
  
  const socialCount = socialOrder.filter(key => profile.socials?.[key]?.url).length;
  const socialHtml = socialOrder.slice(0, 6).map(key => {
    const s = profile.socials?.[key];
    if (!s?.url) return '';
    const opt = socialOptions[key];
    const url = buildSocialUrl(key, s.url);
    // 6개일 때 크기 줄임
    const size = socialCount >= 6 ? '46px' : '50px';
    const iconSize = socialCount >= 6 ? '18px' : '20px';
    
    // WhatsApp인 경우 QR 모달 표시
    if (key === 'whatsapp') {
      const qrUrl = s.qr_url || '';
      return `
        <button onclick="showWhatsAppQR('${url}', '${qrUrl}')" 
           class="flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1" 
           style="color: ${t.text}; background: ${t.btn}; border: 1.5px solid ${t.border}; box-shadow: 0 4px 12px rgba(0,0,0,0.08); width: ${size}; height: ${size}; flex-shrink: 0;">
          <span style="width: ${iconSize}; height: ${iconSize};">${opt.icon}</span>
        </button>`;
    }
    
    // Telegram인 경우 QR 모달 표시
    if (key === 'telegram') {
      // URL에서 username만 추출 (https://t.me/xxx, t.me/xxx, @xxx, xxx 모두 처리)
      const username = s.url.replace(/^(https?:\/\/)?(t\.me\/)?@?/, '');
      const qrUrl = s.qr_url || '';
      return `
        <button onclick="showTelegramQR('${url}', '${username}', '${qrUrl}')" 
           class="flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1" 
           style="color: ${t.text}; background: ${t.btn}; border: 1.5px solid ${t.border}; box-shadow: 0 4px 12px rgba(0,0,0,0.08); width: ${size}; height: ${size}; flex-shrink: 0;">
          <span style="width: ${iconSize}; height: ${iconSize};">${opt.icon}</span>
        </button>`;
    }
    
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
        <span class="text-[17px] flex-1" style="color: ${t.text}; font-family: ${f.family} !important; font-weight: 450;">${l.title||'Untitled'}</span>
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
      <!-- Header (모바일 전용) - 배경 투명 -->
      <div class="sm:hidden fixed top-0 left-0 right-0 z-50 safe-area-top">
        <div class="px-7 py-3 flex items-center justify-between">
          <a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background: ${t.btn}; border: 1.5px solid ${t.border}; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
              <svg class="w-5 h-5" viewBox="0 0 36 36" fill="none">
                <path d="M13 7L11 29M25 7L23 29M7 14H29M7 22H29" stroke="${t.text}" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </div>
          </a>
          <button onclick="shareProfile('${profile.id}', '${profile.name || ''}')" 
            class="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-all hover:scale-105"
            style="background: ${t.btn}; border: 1.5px solid ${t.border}; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
            <svg class="w-5 h-5" style="color: ${t.text}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 모바일: 전체화면 / PC,태블릿: 카드 -->
      <div class="min-h-full flex flex-col mobile-content-top sm:pt-0 sm:pb-0 sm:py-12 sm:items-center sm:justify-center safe-area-content">
        <div class="flex-1 sm:flex-none w-full max-w-md mx-auto sm:max-w-[480px] sm:px-4">
          <div class="mobile-card h-full px-7 pt-2 pb-8 sm:rounded-[32px] sm:pt-5 sm:px-10 sm:pb-10 sm:h-auto" 
               style="font-family: ${f.family} !important;">
          
          <!-- Header (PC 전용 - 카드 안) -->
          <div class="hidden sm:flex items-center justify-between mb-6">
            <a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background: ${t.btn}; border: 1.5px solid ${t.border}; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                <svg class="w-5 h-5" viewBox="0 0 36 36" fill="none">
                  <path d="M13 7L11 29M25 7L23 29M7 14H29M7 22H29" stroke="${t.text}" stroke-width="3" stroke-linecap="round"/>
                </svg>
              </div>
            </a>
            <button onclick="shareProfile('${profile.id}', '${profile.name || ''}')" 
              class="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-all hover:scale-105"
              style="background: ${t.btn}; border: 1.5px solid ${t.border}; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
              <svg class="w-5 h-5" style="color: ${t.text}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
            </button>
          </div>
          
          <!-- Avatar -->
          <div class="flex justify-center mb-5 sm:mb-6">
            <div class="relative">
              <div class="absolute inset-0 rounded-full blur-xl opacity-30 hidden sm:block" style="background: ${t.accent};"></div>
              <div class="relative w-[144px] h-[144px] sm:w-36 sm:h-36 rounded-full overflow-hidden transition-all duration-500 hover:scale-105" 
                   style="background: ${t.btn}; box-shadow: 0 0 0 3px ${t.bg}, 0 0 0 5px ${t.border}, 0 20px 40px -10px rgba(0,0,0,0.15);">
                ${profile.avatar_url 
                  ? `<img src="${profile.avatar_url}" class="w-full h-full object-cover"/>` 
                  : `<span class="w-full h-full flex items-center justify-center text-4xl sm:text-5xl" style="color: ${t.textSub}">👤</span>`}
              </div>
            </div>
          </div>
          
          <!-- Name & Info -->
          <div class="text-center mb-6 sm:mb-8">
            <h1 class="text-[24px] sm:text-[28px] font-bold tracking-tight mb-1" style="color: ${t.text}; letter-spacing: -0.02em; font-family: ${f.family} !important;">${profile.name||'Name'}</h1>
            <p class="text-[18px] font-medium mb-0.5" style="color: ${t.textSub}; font-family: ${f.family} !important;">${profile.company || ''}</p>
            <p class="text-[16px]" style="color: ${t.textSub}; opacity: 0.7; font-family: ${f.family} !important;">${profile.title || ''}</p>
          </div>
          
          ${socialHtml ? `<div class="${socialCount >= 6 ? 'flex justify-between w-full' : 'flex justify-center gap-2.5 sm:gap-3.5'} mb-6 sm:mb-8">${socialHtml}</div>` : ''}
          
          <div class="space-y-3 sm:space-y-3.5">${linksHtml}</div>
          
          <!-- URL 표시 (모바일) -->
          <p class="mt-6 sm:hidden text-center text-[12px] font-semibold tracking-wide uppercase safe-area-bottom-text" style="color: ${t.textSub}; opacity: 0.4;">
            hashed.live/${profile.id}
          </p>
        </div>
        </div>
        
        <!-- URL 표시 (PC/태블릿) -->
        <p class="hidden sm:block mt-6 text-center text-[13px] font-semibold tracking-wide uppercase" style="color: ${t.textSub}; opacity: 0.5;">
          hashed.live/${profile.id}
        </p>
      </div>
    </div>
    
    <style>
      html, body, #app {
        background: ${t.bg} !important;
        min-height: 100%;
        min-height: 100dvh;
      }
      #card-view {
        min-height: 100%;
        min-height: 100dvh;
      }
      
      /* Safe Area for iOS */
      .safe-area-top {
        padding-top: env(safe-area-inset-top, 0);
      }
      .safe-area-content {
        padding-bottom: env(safe-area-inset-bottom, 0);
      }
      .safe-area-bottom-text {
        padding-bottom: calc(env(safe-area-inset-bottom, 0) + 8px);
      }
      
      /* 모바일 콘텐츠 상단 패딩 (safe-area + 헤더 높이) */
      @media (max-width: 639px) {
        .mobile-content-top {
          padding-top: calc(env(safe-area-inset-top, 0) + 72px);
        }
      }
      
      /* 모바일: 카드 스타일 없음, 배경 통일 */
      @media (max-width: 639px) {
        .mobile-card {
          background: transparent !important;
        }
      }
      /* PC/태블릿: 카드 스타일 적용 */
      @media (min-width: 640px) {
        .sm\\:rounded-\\[32px\\] {
          background: ${t.card} !important;
          border: 1px solid ${t.border};
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px ${t.border};
        }
      }
    </style>
  `;
  
  // html, body, app 배경색 모두 테마에 맞춤
  document.documentElement.style.background = t.bg;
  document.body.style.background = t.bg;
  const app = document.getElementById('app');
  if (app) app.style.background = t.bg;
}

// 색상이 어두운지 판단하는 헬퍼 함수
function isColorDark(color) {
  // hex to rgb
  let r, g, b;
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    r = parseInt(hex.substr(0, 2), 16);
    g = parseInt(hex.substr(2, 2), 16);
    b = parseInt(hex.substr(4, 2), 16);
  } else if (color.startsWith('rgb')) {
    const match = color.match(/\d+/g);
    if (match) {
      r = parseInt(match[0]);
      g = parseInt(match[1]);
      b = parseInt(match[2]);
    }
  } else {
    return false; // 기본값: 밝은 색
  }
  // 밝기 계산 (YIQ formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
}

// ==================== WhatsApp QR Modal ====================
function showWhatsAppQR(url, qrUrl) {
  // 모달 컨테이너 생성
  const modal = document.createElement('div');
  modal.id = 'whatsapp-qr-modal';
  modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center';
  modal.style.cssText = 'background: rgba(0,0,0,0.9); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);';
  
  // 저장된 QR URL이 있으면 사용, 없으면 실시간 생성
  const qrImageUrl = qrUrl || `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(url)}`;
  
  modal.innerHTML = `
    <div class="relative flex flex-col items-center p-6">
      <!-- 닫기 버튼 -->
      <button onclick="closeWhatsAppQR()" class="absolute top-0 right-0 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      
      <!-- WhatsApp 로고 -->
      <div class="mb-6">
        <svg class="w-12 h-12 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </div>
      
      <!-- QR 코드 -->
      <div class="bg-white p-4 rounded-2xl shadow-2xl">
        <img src="${qrImageUrl}" alt="WhatsApp QR" class="w-60 h-60 rounded-xl" />
      </div>
      
      <!-- 안내 텍스트 -->
      <p class="mt-6 text-white/60 text-sm text-center">Scan to chat on WhatsApp</p>
      
      <!-- 바로 열기 버튼 -->
      <a href="${url}" target="_blank" class="mt-4 px-6 py-3 bg-[#25D366] text-white rounded-full font-medium text-sm hover:bg-[#20bd5a] transition-colors flex items-center gap-2">
        <span>Open WhatsApp</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      </a>
    </div>
  `;
  
  // 배경 클릭 시 닫기
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeWhatsAppQR();
  });
  
  document.body.appendChild(modal);
}

function closeWhatsAppQR() {
  const modal = document.getElementById('whatsapp-qr-modal');
  if (modal) modal.remove();
}

// ==================== Telegram QR Modal ====================
function showTelegramQR(url, username, qrUrl) {
  // 모달 컨테이너 생성
  const modal = document.createElement('div');
  modal.id = 'telegram-qr-modal';
  modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center';
  modal.style.cssText = 'background: rgba(0,0,0,0.9); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);';
  
  // 저장된 QR URL이 있으면 사용, 없으면 실시간 생성
  const qrImageUrl = qrUrl || `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(url)}`;
  
  modal.innerHTML = `
    <div class="relative flex flex-col items-center p-6">
      <!-- 닫기 버튼 -->
      <button onclick="closeTelegramQR()" class="absolute top-0 right-0 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      
      <!-- Telegram 로고 -->
      <div class="mb-6">
        <svg class="w-12 h-12 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      </div>
      
      <!-- QR 코드 -->
      <div class="bg-white p-4 rounded-2xl shadow-2xl">
        <img src="${qrImageUrl}" alt="Telegram QR" class="w-60 h-60 rounded-xl" />
      </div>
      
      <!-- 아이디 표시 -->
      <p class="mt-6 text-white text-lg font-medium">@${username}</p>
      
      <!-- 안내 텍스트 -->
      <p class="mt-2 text-white/60 text-sm text-center">Scan to chat on Telegram</p>
      
      <!-- 바로 열기 버튼 -->
      <a href="${url}" target="_blank" class="mt-4 px-6 py-3 bg-[#0088cc] text-white rounded-full font-medium text-sm hover:bg-[#006daa] transition-colors flex items-center gap-2">
        <span>Open Telegram</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      </a>
    </div>
  `;
  
  // 배경 클릭 시 닫기
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeTelegramQR();
  });
  
  document.body.appendChild(modal);
}

function closeTelegramQR() {
  const modal = document.getElementById('telegram-qr-modal');
  if (modal) modal.remove();
}

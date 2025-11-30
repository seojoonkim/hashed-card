// ==================== Data ====================
async function getAllProfiles() {
  const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
  return data || [];
}

async function deleteProfile(id) {
  await supabase.from('profiles').delete().eq('id', id);
}

async function updateProfileId(oldId, newId) {
  const { data: existing } = await supabase.from('profiles').select('id').eq('id', newId).single();
  if (existing) throw new Error('ID already taken');
  const { data: p } = await supabase.from('profiles').select('*').eq('id', oldId).single();
  if (!p) throw new Error('Not found');
  const { id, ...rest } = p;
  await supabase.from('profiles').insert({ id: newId, ...rest });
  await supabase.from('profiles').delete().eq('id', oldId);
  return newId;
}

// ==================== Main Render ====================
function renderDashboard() {
  // 스크롤 위치 저장
  const editorColumn = document.getElementById('editor-column');
  const scrollTop = editorColumn ? editorColumn.scrollTop : 0;
  
  const isAdmin = state.userRole === 'admin';
  const filtered = isAdmin ? getFilteredProfiles() : [];
  const my = state.userProfile;
  const pending = (state.joinRequests || []).filter(r => r.status === 'pending');

  $('#app').innerHTML = `
    <div class="h-screen flex bg-white">
      
      <!-- Sidebar -->
      <div class="w-44 bg-zinc-50/80 border-r border-zinc-200/60 flex flex-col flex-shrink-0">
        <div class="p-3 border-b border-zinc-200/60">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl flex items-center justify-center" style="background: linear-gradient(145deg, #18181b 0%, #27272a 50%, #18181b 100%); box-shadow: 0 2px 6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1);">
              <svg class="w-4 h-4" viewBox="0 0 36 36" fill="none">
                <rect x="7" y="8" width="4" height="20" rx="2" fill="white"/>
                <rect x="25" y="8" width="4" height="20" rx="2" fill="white"/>
                <rect x="11" y="15" width="14" height="4" rx="2" fill="white"/>
                <circle cx="29" cy="10" r="2" fill="#a78bfa" opacity="0.9"/>
              </svg>
            </div>
            <span class="font-bold text-zinc-800 text-sm tracking-tight">Hashed.Live</span>
          </div>
        </div>
        
        <div class="flex-1 overflow-y-auto py-1">
          ${isAdmin ? `
          <button onclick="showDashboard()" class="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] ${state.selectedView === 'dashboard' ? 'bg-white text-zinc-900 border-r-2 border-zinc-900' : 'text-zinc-500 hover:bg-white/60'}">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
            Dashboard
          </button>
          ` : ''}
          
          ${my ? `
          <div class="px-3 pt-3 pb-1"><p class="text-[9px] font-medium text-zinc-400 uppercase tracking-wider">Me</p></div>
          <button onclick="selectProfile('${my.id}')" class="w-full flex items-center gap-2 px-3 py-1 ${state.selectedProfileId === my.id ? 'bg-white border-r-2 border-zinc-900' : 'hover:bg-white/60'}">
            <div class="w-5 h-5 rounded-full bg-zinc-200 overflow-hidden flex-shrink-0">
              ${my.avatar_url ? `<img src="${my.avatar_url}" class="w-full h-full object-cover"/>` : `<span class="w-full h-full flex items-center justify-center text-[9px] text-zinc-400">${my.name?.[0] || '?'}</span>`}
            </div>
            <span class="truncate text-zinc-600 text-[11px]">${my.name || my.id}</span>
          </button>
          ` : ''}
          
          ${isAdmin ? `
          <div class="px-3 pt-3 pb-1 flex items-center justify-between">
            <p class="text-[9px] font-medium text-zinc-400 uppercase tracking-wider">Team</p>
            <span class="text-[9px] text-zinc-300">${filtered.filter(p => p.id !== my?.id).length}</span>
          </div>
          <div class="px-2 pb-1">
            <input type="text" placeholder="Search" value="${state.searchQuery}" onkeyup="handleSearch(this.value)"
              class="w-full px-2 py-1 text-[10px] rounded-md bg-white border border-zinc-200/80 focus:outline-none focus:border-zinc-300 placeholder-zinc-300">
          </div>
          
          ${filtered.filter(p => p.id !== my?.id).map(p => `
            <button onclick="selectProfile('${p.id}')" class="w-full flex items-center gap-2 px-3 py-1 ${state.selectedProfileId === p.id ? 'bg-white border-r-2 border-zinc-900' : 'hover:bg-white/60'}">
              <div class="w-5 h-5 rounded-full bg-zinc-200 overflow-hidden flex-shrink-0">
                ${p.avatar_url ? `<img src="${p.avatar_url}" class="w-full h-full object-cover"/>` : `<span class="w-full h-full flex items-center justify-center text-[9px] text-zinc-400">${p.name?.[0] || '?'}</span>`}
              </div>
              <span class="truncate text-zinc-600 text-[11px]">${p.name || p.id}</span>
            </button>
          `).join('')}
          
          ${pending.length > 0 ? `
          <div class="px-3 pt-2 pb-1"><p class="text-[9px] font-medium text-amber-400 uppercase tracking-wider">Pending Requests</p></div>
          ${pending.map(req => `
            <div class="flex items-center gap-1 px-3 py-0.5 text-[9px] text-zinc-400">
              <span class="text-amber-400">●</span>
              <span class="truncate">${req.name || req.email}</span>
            </div>
          `).join('')}
          ` : ''}
          ` : ''}
        </div>
        
        <div class="p-2 border-t border-zinc-200/60">
          <button onclick="logout()" class="w-full py-1.5 rounded-md text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 text-[10px] transition-colors">Sign Out</button>
        </div>
      </div>
      
      <!-- Main -->
      <div class="flex-1 flex flex-col bg-zinc-50/50 overflow-hidden" id="main-content">
        ${state.selectedView === 'dashboard' || !state.selectedProfileId ? renderDashboardPanel() : renderEditorPanel(state.editingProfile)}
      </div>
      
      <!-- Preview -->
      <div class="flex-1 bg-zinc-100/80 border-l border-zinc-200/60 overflow-hidden flex flex-col" id="preview-column">
        ${state.selectedView === 'profile' && state.selectedProfileId && state.editingProfile ? renderPreviewPanel(state.editingProfile) : renderEmptyPreview()}
      </div>
    </div>
    <div id="modal-container"></div>
  `;
  
  // 스크롤 위치 복원
  requestAnimationFrame(() => {
    const newEditorColumn = document.getElementById('editor-column');
    if (newEditorColumn && scrollTop > 0) {
      newEditorColumn.scrollTop = scrollTop;
    }
  });
}

// ==================== Dashboard ====================
function renderDashboardPanel() {
  const total = state.profiles.length;
  const pendingRequests = (state.joinRequests || []).filter(r => r.status === 'pending');
  const links = state.profiles.reduce((s, p) => s + (p.links?.length || 0), 0);
  
  return `
    <div class="flex-1 overflow-y-auto p-6">
      <h1 class="text-lg font-semibold text-zinc-800 mb-5">Dashboard</h1>
      
      <div class="grid grid-cols-3 gap-3 mb-6">
        <div class="bg-white rounded-xl p-4 border border-zinc-200/60 shadow-sm">
          <p class="text-2xl font-bold text-zinc-800">${total}</p>
          <p class="text-[10px] text-zinc-400 mt-0.5">Members</p>
        </div>
        <div class="bg-white rounded-xl p-4 border border-zinc-200/60 shadow-sm">
          <p class="text-2xl font-bold text-amber-500">${pendingRequests.length}</p>
          <p class="text-[10px] text-zinc-400 mt-0.5">Pending</p>
        </div>
        <div class="bg-white rounded-xl p-4 border border-zinc-200/60 shadow-sm">
          <p class="text-2xl font-bold text-zinc-800">${links}</p>
          <p class="text-[10px] text-zinc-400 mt-0.5">Links</p>
        </div>
      </div>
      
      <!-- Invite Code Setting -->
      <div class="bg-white rounded-xl border border-zinc-200/60 p-4 shadow-sm mb-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xs font-semibold text-zinc-700">Invite Code</h2>
          <button onclick="regenerateInviteCode()" class="text-[10px] text-zinc-400 hover:text-zinc-600">Regenerate</button>
        </div>
        <div class="flex gap-2">
          <input type="text" id="invite-code-input" value="${state.globalInviteCode || ''}" placeholder="Enter invite code" 
            class="flex-1 px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-sm font-mono uppercase tracking-widest focus:outline-none focus:border-zinc-300">
          <button onclick="saveInviteCode()" class="px-4 py-2 rounded-lg text-white text-[11px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style="background: linear-gradient(180deg, #27272a 0%, #18181b 100%); box-shadow: 0 1px 3px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1);">Save</button>
        </div>
        <p class="text-[9px] text-zinc-400 mt-2">Share this code with people who want to join. They'll need admin approval after requesting.</p>
      </div>
      
      <div class="space-y-4">
        <!-- Join Requests (Full Width) -->
        <div class="bg-white rounded-xl border border-zinc-200/60 p-4 shadow-sm">
          <h2 class="text-xs font-semibold text-zinc-700 mb-3">Join Requests</h2>
          <div class="space-y-2 max-h-60 overflow-y-auto">
            ${pendingRequests.length > 0 ? pendingRequests.map(req => `
              <div class="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-100">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-zinc-800">${req.name}</p>
                  <p class="text-xs text-zinc-500">${req.email}</p>
                </div>
                <div class="flex gap-2 flex-shrink-0 ml-4">
                  <button onclick="handleApproveRequest('${req.id}')" class="px-3 py-1.5 rounded-lg text-white text-[11px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style="background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%);">Approve</button>
                  <button onclick="handleRejectRequest('${req.id}')" class="px-3 py-1.5 rounded-lg text-zinc-600 text-[11px] font-medium transition-all duration-200 hover:-translate-y-0.5" style="background: linear-gradient(180deg, #f4f4f5 0%, #e4e4e7 100%);">Reject</button>
                </div>
              </div>
            `).join('') : `
              <p class="text-[11px] text-zinc-400 text-center py-6">No pending requests</p>
            `}
          </div>
          
          ${(state.joinRequests || []).filter(r => r.status !== 'pending').length > 0 ? `
            <div class="mt-3 pt-3 border-t border-zinc-100">
              <p class="text-[10px] text-zinc-400 mb-2">History</p>
              <div class="space-y-1 max-h-24 overflow-y-auto">
                ${(state.joinRequests || []).filter(r => r.status !== 'pending').slice(0, 5).map(req => `
                  <div class="flex items-center justify-between py-1 text-[10px]">
                    <span class="text-zinc-500">${req.name} (${req.email})</span>
                    <span class="${req.status === 'approved' ? 'text-green-500' : 'text-red-400'}">${req.status}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
        
        <!-- Recent Members (Full Width) -->
        <div class="bg-white rounded-xl border border-zinc-200/60 p-4 shadow-sm">
          <h2 class="text-xs font-semibold text-zinc-700 mb-3">Recent Members</h2>
          <div class="space-y-2">
            ${[...state.profiles].sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).slice(0,6).map(p => `
              <div class="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-zinc-50 transition-colors">
                <div class="w-8 h-8 rounded-full bg-zinc-100 overflow-hidden flex-shrink-0">
                  ${p.avatar_url ? `<img src="${p.avatar_url}" class="w-full h-full object-cover"/>` : `<span class="w-full h-full flex items-center justify-center text-xs text-zinc-400">${p.name?.[0]||'?'}</span>`}
                </div>
                <span class="text-sm text-zinc-700 flex-1">${p.name||p.id}</span>
                <button onclick="selectProfile('${p.id}')" class="text-[11px] text-zinc-400 hover:text-zinc-600 px-2 py-1 rounded hover:bg-zinc-100">Edit</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==================== Editor ====================
function renderEditorPanel(profile) {
  if (!profile) return renderDashboardPanel();
  const isOwn = profile.id === state.userProfile?.id;
  const isAdmin = state.userRole === 'admin';
  
  if (!profile.socialOrder) {
    profile.socialOrder = Object.keys(profile.socials || {}).filter(k => profile.socials[k]?.enabled);
  }
  if (!profile.font) profile.font = 'inter';
  
  const enabledSocials = profile.socialOrder || [];
  const availableSocials = Object.keys(socialOptions).filter(k => !enabledSocials.includes(k));
  
  return `
    <!-- Fixed Header -->
    <div class="flex-shrink-0 px-5 py-3 bg-white border-b border-zinc-200/60 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h1 class="text-sm font-semibold text-zinc-800">${isOwn ? 'My Profile' : 'Edit Member'}</h1>
        <span class="text-[10px] text-zinc-400 font-mono">/${profile.id}</span>
      </div>
      <button onclick="handleSaveProfile()" class="px-4 py-1.5 rounded-lg text-white text-[11px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style="background: linear-gradient(180deg, #27272a 0%, #18181b 100%); box-shadow: 0 1px 3px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1);">Save</button>
    </div>
    
    <!-- Scrollable Content -->
    <div id="editor-column" class="flex-1 overflow-y-auto p-5">
      <div class="max-w-md space-y-3">
      
      <!-- URL -->
      <div class="bg-white rounded-xl border border-zinc-200/60 p-4 shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <label class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">Profile URL</label>
          <button onclick="toggleEditId()" id="edit-id-btn" class="text-[10px] text-zinc-400 hover:text-zinc-600">Change</button>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[11px] text-zinc-400">hashed.live/</span>
          <input type="text" id="edit-id" value="${profile.id}" disabled class="flex-1 px-2 py-1.5 rounded-md bg-zinc-50 border border-zinc-200/60 text-[11px] font-mono disabled:text-zinc-400 focus:outline-none focus:border-zinc-300">
          <button onclick="handleChangeId()" id="save-id-btn" class="hidden px-3 py-1.5 rounded-md bg-zinc-900 text-white text-[10px]">Update</button>
        </div>
      </div>
      
      <!-- Profile -->
      <div class="bg-white rounded-xl border border-zinc-200/60 p-4 shadow-sm">
        <label class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide block mb-3">Profile</label>
        
        <div class="flex gap-4">
          <div class="flex flex-col items-center flex-shrink-0">
            <div class="w-16 h-16 rounded-full bg-zinc-100 overflow-hidden mb-2">
              ${profile.avatar_url ? `<img src="${profile.avatar_url}" class="w-full h-full object-cover"/>` : `<span class="w-full h-full flex items-center justify-center text-xl text-zinc-300">👤</span>`}
            </div>
            <label class="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-600 text-[10px] cursor-pointer hover:bg-zinc-200 transition-colors">
              <input type="file" accept="image/*" onchange="handleAvatarUpload(event)" class="hidden">Upload
            </label>
            ${profile.avatar_url ? `<button onclick="removeAvatar()" class="mt-1 text-[10px] text-red-400 hover:text-red-500">Remove</button>` : ''}
          </div>
          
          <div class="flex-1 space-y-2">
            <div>
              <label class="text-[9px] text-zinc-400 block mb-0.5">Name</label>
              <input type="text" id="edit-name" value="${profile.name||''}" placeholder="John Doe" oninput="updatePreview()"
                class="w-full px-2.5 py-1.5 rounded-md bg-zinc-50 border border-zinc-200/60 text-[11px] focus:outline-none focus:border-zinc-300">
            </div>
            <div>
              <label class="text-[9px] text-zinc-400 block mb-0.5">Company</label>
              <input type="text" id="edit-company" value="${profile.company||''}" placeholder="Hashed" oninput="updatePreview()"
                class="w-full px-2.5 py-1.5 rounded-md bg-zinc-50 border border-zinc-200/60 text-[11px] focus:outline-none focus:border-zinc-300">
            </div>
            <div>
              <label class="text-[9px] text-zinc-400 block mb-0.5">Title</label>
              <input type="text" id="edit-title" value="${profile.title||''}" placeholder="CEO" oninput="updatePreview()"
                class="w-full px-2.5 py-1.5 rounded-md bg-zinc-50 border border-zinc-200/60 text-[11px] focus:outline-none focus:border-zinc-300">
            </div>
          </div>
        </div>
      </div>
      
      <!-- Font -->
      <div class="bg-white rounded-xl border border-zinc-200/60 p-4 shadow-sm">
        <label class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide block mb-2">Font</label>
        <div class="grid grid-cols-3 gap-1.5">
          ${Object.entries(fontOptions).map(([k, f]) => `
            <button onclick="selectFont('${k}')" data-font="${k}" style="font-family: ${f.family}; ${profile.font === k ? 'background: linear-gradient(180deg, #27272a 0%, #18181b 100%); color: #fff; border-color: #3f3f46;' : 'background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%); color: #52525b; border-color: #e5e5e5;'}"
              class="py-2 px-2 rounded-lg text-[10px] border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              ${f.name}
            </button>
          `).join('')}
        </div>
      </div>
      
      <!-- Theme -->
      <div class="bg-white rounded-xl border border-zinc-200/60 p-4 shadow-sm">
        <label class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide block mb-2">Theme</label>
        <div class="grid grid-cols-10 gap-1">
          ${Object.entries(themes).map(([k, t]) => `
            <button onclick="selectTheme('${k}')" data-theme="${k}" title="${t.name}"
              class="aspect-square rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 hover:shadow-md ${profile.bg_theme === k ? 'border-zinc-900 ring-2 ring-zinc-900/20 scale-105' : 'border-zinc-200/60 hover:border-zinc-300'}"
              style="background: ${t.bg}; box-shadow: 0 1px 3px rgba(0,0,0,0.08);"></button>
          `).join('')}
        </div>
      </div>
      
      <!-- Social -->
      <div class="bg-white rounded-xl border border-zinc-200/60 p-4 shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <label class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">Social Links</label>
          <span class="text-[9px] text-zinc-300">${enabledSocials.length}/6</span>
        </div>
        <p class="text-[9px] text-zinc-400 mb-2">Enter username or URL · Drag to reorder</p>
        
        <div id="social-list" class="space-y-1 mb-2">
          ${enabledSocials.map((key, idx) => {
            const opt = socialOptions[key];
            const s = profile.socials?.[key] || {};
            return `
              <div draggable="true" ondragstart="handleDragStart(event,'social',${idx})" ondragend="handleDragEnd(event)" 
                   ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event,'social',${idx})"
                   class="flex items-center gap-2 p-2 rounded-lg bg-zinc-50/80 border border-zinc-100 cursor-move hover:border-zinc-200 transition-colors group">
                <span class="text-zinc-300 cursor-move text-[9px] group-hover:text-zinc-400">⋮⋮</span>
                <div class="w-4 h-4 text-zinc-500 flex-shrink-0">${opt.icon}</div>
                <input type="text" id="social-${key}-url" value="${s.url||''}" placeholder="${opt.placeholder}" 
                  oninput="updateSocial('${key}', this.value)"
                  class="flex-1 px-2 py-1 rounded-md bg-white border border-zinc-200/60 text-[10px] focus:outline-none focus:border-zinc-300">
                <button onclick="removeSocial('${key}')" class="text-zinc-300 hover:text-red-400 text-xs transition-colors">×</button>
              </div>
            `;
          }).join('')}
        </div>
        
        ${enabledSocials.length < 6 ? `
        <div class="flex flex-wrap gap-1">
          ${availableSocials.map(key => {
            const opt = socialOptions[key];
            return `
              <button onclick="addSocial('${key}')" class="flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-50 border border-zinc-100 text-[9px] text-zinc-500 hover:border-zinc-200 hover:text-zinc-600 transition-colors">
                <span class="w-2.5 h-2.5">${opt.icon}</span>${opt.label}
              </button>
            `;
          }).join('')}
        </div>
        ` : ''}
      </div>
      
      <!-- Links -->
      <div class="bg-white rounded-xl border border-zinc-200/60 p-4 shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <label class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">Links</label>
          <button onclick="addLink()" class="text-[10px] text-zinc-400 hover:text-zinc-600 transition-colors">+ Add</button>
        </div>
        <p class="text-[9px] text-zinc-400 mb-2">Drag to reorder</p>
        
        <div id="links-container" class="space-y-1">
          ${(profile.links||[]).map((l, idx) => `
            <div draggable="true" ondragstart="handleDragStart(event,'link',${idx})" ondragend="handleDragEnd(event)"
                 ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event,'link',${idx})"
                 class="flex items-center gap-2 p-2 rounded-lg bg-zinc-50/80 border border-zinc-100 cursor-move hover:border-zinc-200 transition-colors group">
              <span class="text-zinc-300 cursor-move text-[9px] group-hover:text-zinc-400">⋮⋮</span>
              <button onclick="showIconPicker(${idx})" class="text-sm w-6 h-6 flex items-center justify-center bg-white rounded-md border border-zinc-200/60 hover:border-zinc-300 transition-colors">${l.icon||'🔗'}</button>
              <input type="text" value="${l.title||''}" placeholder="Title" oninput="updateLink(${idx},'title',this.value)"
                class="w-20 px-2 py-1 rounded-md bg-white border border-zinc-200/60 text-[10px] focus:outline-none focus:border-zinc-300">
              <input type="text" value="${l.url||''}" placeholder="URL" oninput="updateLink(${idx},'url',this.value)"
                class="flex-1 px-2 py-1 rounded-md bg-white border border-zinc-200/60 text-[10px] focus:outline-none focus:border-zinc-300">
              <button onclick="removeLink(${idx})" class="text-zinc-300 hover:text-red-400 text-xs transition-colors">×</button>
            </div>
          `).join('') || '<p class="text-[10px] text-zinc-300 text-center py-3">No links yet</p>'}
        </div>
      </div>
      
      <!-- Account -->
      ${isOwn ? `
      <div class="bg-white rounded-xl border border-zinc-200/60 p-4 shadow-sm">
        <label class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide block mb-3">Account</label>
        <div class="space-y-2">
          <div>
            <label class="text-[9px] text-zinc-400 block mb-0.5">Email</label>
            <input type="email" value="${profile.email || ''}" disabled
              class="w-full px-2.5 py-1.5 rounded-md bg-zinc-100 border border-zinc-200/60 text-[11px] text-zinc-500 cursor-not-allowed">
          </div>
          <div>
            <label class="text-[9px] text-zinc-400 block mb-0.5">New Password</label>
            <input type="password" id="new-password" placeholder="Enter new password" minlength="6"
              class="w-full px-2.5 py-1.5 rounded-md bg-zinc-50 border border-zinc-200/60 text-[11px] focus:outline-none focus:border-zinc-300">
          </div>
          <div>
            <label class="text-[9px] text-zinc-400 block mb-0.5">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="Confirm new password" minlength="6"
              class="w-full px-2.5 py-1.5 rounded-md bg-zinc-50 border border-zinc-200/60 text-[11px] focus:outline-none focus:border-zinc-300">
          </div>
          <button onclick="handleChangePassword()" class="w-full py-2 rounded-lg text-[10px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style="background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%); border: 1px solid #e5e5e5; color: #525252;">
            Change Password
          </button>
        </div>
      </div>
      ` : ''}
      
      <!-- Master Admin: Role Management -->
      ${isMasterAdmin() && !isOwn ? `
      <div class="bg-white rounded-xl border border-zinc-200/60 p-4 shadow-sm">
        <label class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide block mb-3">Role Management</label>
        <div class="flex items-center justify-between">
          <span class="text-[11px] text-zinc-600">Current role: <span class="font-medium ${profile.role === 'admin' ? 'text-violet-600' : 'text-zinc-500'}">${profile.role || 'member'}</span></span>
          <button onclick="toggleUserRole('${profile.id}', '${profile.role}')" 
            class="px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            style="background: ${profile.role === 'admin' ? 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%); border: 1px solid #fcd34d; color: #92400e;' : 'linear-gradient(180deg, #ede9fe 0%, #ddd6fe 100%); border: 1px solid #c4b5fd; color: #5b21b6;'}">
            ${profile.role === 'admin' ? 'Demote to Member' : 'Promote to Admin'}
          </button>
        </div>
      </div>
      ` : ''}
      
      ${isAdmin && !isOwn && profile.email !== MASTER_ADMIN_EMAIL ? `
      <div class="pt-3">
        <button onclick="confirmDeleteProfile('${profile.id}')" class="text-[10px] text-red-400 hover:text-red-500 transition-colors">Delete member</button>
      </div>
      ` : ''}
      
      </div>
    </div>
  `;
}

// ==================== Preview ====================
function renderPreviewPanel(profile) {
  const t = themes[profile.bg_theme] || themes.snow;
  const f = fontOptions[profile.font] || fontOptions.inter;
  const socialOrder = profile.socialOrder || [];
  const links = profile.links || [];
  
  // Load font
  loadFont(profile.font);
  
  const socialCount = socialOrder.filter(key => profile.socials?.[key]?.url).length;
  const socialHtml = socialOrder.slice(0, 6).map(key => {
    const s = profile.socials?.[key];
    if (!s?.url) return '';
    const opt = socialOptions[key];
    const url = buildSocialUrl(key, s.url);
    // 6개일 때 크기 줄임
    const size = socialCount >= 6 ? '40px' : '44px';
    const iconSize = socialCount >= 6 ? '16px' : '20px';
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
         class="group flex items-center w-full px-5 py-4 rounded-[24px] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
         style="background: ${t.btn}; border: 1px solid ${t.border}; box-shadow: 0 2px 8px rgba(0,0,0,0.04); font-family: ${f.family} !important;"
         onmouseover="this.style.boxShadow='0 12px 28px rgba(0,0,0,0.12)'; this.style.transform='translateY(-2px) scale(1.01)'"
         onmouseout="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)'; this.style.transform='none'">
        <span class="text-xl mr-3 transition-transform duration-300 group-hover:scale-110">${l.icon||'🔗'}</span>
        <span class="text-sm flex-1" style="color: ${t.text}; font-family: ${f.family} !important; font-weight: 450;">${l.title||'Untitled'}</span>
        <svg class="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 opacity-30 group-hover:opacity-60" style="color: ${t.textSub}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
      </a>
    `;
  }).join('');
  
  return `
    <div class="h-full flex flex-col">
      <div class="flex-shrink-0 px-4 py-2.5 bg-zinc-200/30 flex items-center justify-between border-b border-zinc-200/40">
        <span class="text-[9px] text-zinc-400 font-medium uppercase tracking-wider">Preview</span>
        <a href="#card/${profile.id}" target="_blank" class="text-[9px] text-zinc-500 hover:text-zinc-700 transition-colors">Open ↗</a>
      </div>
      <div id="preview-content" class="flex-1 overflow-y-auto flex items-center justify-center p-8" style="background: ${t.bg}; font-family: ${f.family} !important;">
        <div class="w-full max-w-[340px]">
          <div class="rounded-[32px] p-7 backdrop-blur-xl transition-all duration-500" 
               style="background: ${t.card}; border: 1px solid ${t.border}; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px ${t.border}; font-family: ${f.family} !important;">
            
            <!-- Header (로고 + 공유) -->
            <div class="flex items-center justify-between mb-5">
              <a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div class="w-9 h-9 rounded-full flex items-center justify-center" style="background: ${t.btn}; border: 1.5px solid ${t.border}; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                  <svg class="w-4 h-4" viewBox="0 0 36 36" fill="none">
                    <rect x="9" y="10" width="3.5" height="16" rx="1.5" fill="${t.text}"/>
                    <rect x="23.5" y="10" width="3.5" height="16" rx="1.5" fill="${t.text}"/>
                    <rect x="12.5" y="16" width="11" height="3.5" rx="1.5" fill="${t.text}"/>
                  </svg>
                </div>
              </a>
              <button class="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-all"
                style="background: ${t.btn}; border: 1.5px solid ${t.border}; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                <svg class="w-4 h-4" style="color: ${t.text}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                </svg>
              </button>
            </div>
            
            <!-- Avatar with glow effect -->
            <div class="flex justify-center mb-6">
              <div class="relative">
                <div class="absolute inset-0 rounded-full blur-xl opacity-30" style="background: ${t.accent};"></div>
                <div class="relative w-28 h-28 rounded-full overflow-hidden transition-all duration-500 hover:scale-105" 
                     style="background: ${t.btn}; box-shadow: 0 0 0 3px ${t.card}, 0 0 0 5px ${t.border}, 0 20px 40px -10px rgba(0,0,0,0.2);">
                  ${profile.avatar_url 
                    ? `<img src="${profile.avatar_url}" class="w-full h-full object-cover"/>` 
                    : `<span class="w-full h-full flex items-center justify-center text-4xl" style="color: ${t.textSub}">👤</span>`}
                </div>
              </div>
            </div>
            
            <!-- Name & Info with refined typography -->
            <div class="text-center mb-7">
              <h1 class="text-2xl font-bold tracking-tight mb-1.5" style="color: ${t.text}; letter-spacing: -0.02em; font-family: ${f.family} !important;">${profile.name||'Name'}</h1>
              <p class="text-sm font-medium mb-0.5" style="color: ${t.textSub}; font-family: ${f.family} !important;">${profile.company || ''}</p>
              <p class="text-xs" style="color: ${t.textSub}; opacity: 0.7; font-family: ${f.family} !important;">${profile.title || ''}</p>
            </div>
            
            <!-- Socials - 6개일 때 Links와 동일한 폭 -->
            ${socialHtml ? `
            <div class="${socialCount >= 6 ? 'flex justify-between w-full' : 'flex justify-center gap-3'} mb-7">
              ${socialHtml}
            </div>
            ` : ''}
            
            <!-- Links with improved design -->
            <div class="space-y-2.5">${linksHtml || `<p class="text-center text-xs py-4" style="color: ${t.textSub}; opacity: 0.6">No links added yet</p>`}</div>
          </div>
          
          <!-- URL 표시 -->
          <p class="mt-8 text-center text-[11px] font-semibold tracking-wide uppercase" style="color: ${t.textSub}; opacity: 0.5;">
            hashed.live/${profile.id}
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderEmptyPreview() {
  return `
    <div class="h-full flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-50">
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-3 rounded-2xl bg-zinc-200/50 flex items-center justify-center">
          <span class="text-2xl">👀</span>
        </div>
        <p class="text-[11px] text-zinc-400">Select a profile to preview</p>
      </div>
    </div>
  `;
}

// ==================== Handlers ====================
function showDashboard() { 
  if (state.editingProfile && hasUnsavedChanges()) {
    if (!confirm('You have unsaved changes. Leave without saving?')) {
      return;
    }
  }
  state.selectedView = 'dashboard'; 
  state.selectedProfileId = null; 
  state.editingProfile = null; 
  renderDashboard(); 
}

function hasUnsavedChanges() {
  if (!state.editingProfile || !state.selectedProfileId) return false;
  const original = state.profiles.find(x => x.id === state.selectedProfileId) || state.userProfile;
  if (!original) return false;
  return JSON.stringify(state.editingProfile) !== JSON.stringify(original);
}

function selectProfile(id) {
  // 현재 편집 중인 프로필이 있고 변경사항이 있으면 경고
  if (state.editingProfile && state.selectedProfileId && state.selectedProfileId !== id) {
    if (hasUnsavedChanges()) {
      if (!confirm('You have unsaved changes. Leave without saving?')) {
        return;
      }
    }
  }
  
  state.selectedView = 'profile';
  state.selectedProfileId = id;
  const p = state.profiles.find(x => x.id === id) || state.userProfile;
  state.editingProfile = p ? JSON.parse(JSON.stringify(p)) : null;
  if (state.editingProfile && !state.editingProfile.socialOrder) {
    state.editingProfile.socialOrder = Object.keys(state.editingProfile.socials || {}).filter(k => state.editingProfile.socials[k]?.enabled);
  }
  renderDashboard();
}

function handleSearch(q) { state.searchQuery = q; renderDashboard(); }
function selectTheme(t) { if (state.editingProfile) { state.editingProfile.bg_theme = t; updatePreview(); updateFontThemeButtons(); } }
function selectFont(f) { 
  if (state.editingProfile) { 
    state.editingProfile.font = f;
    const fontData = fontOptions[f];
    if (fontData && fontData.url) {
      const linkId = 'font-' + f;
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = fontData.url;
        document.head.appendChild(link);
        // 폰트 로드 대기 후 업데이트
        setTimeout(() => {
          updatePreview();
        }, 100);
      } else {
        updatePreview();
      }
    } else {
      updatePreview();
    }
    updateFontThemeButtons();
  } 
}

function updateFontThemeButtons() {
  // 폰트 버튼 상태 업데이트
  document.querySelectorAll('[data-font]').forEach(btn => {
    const isSelected = btn.dataset.font === state.editingProfile?.font;
    btn.style.background = isSelected ? 'linear-gradient(180deg, #27272a 0%, #18181b 100%)' : 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)';
    btn.style.color = isSelected ? '#fff' : '#52525b';
    btn.style.borderColor = isSelected ? '#3f3f46' : '#e5e5e5';
  });
  // 테마 버튼 상태 업데이트
  document.querySelectorAll('[data-theme]').forEach(btn => {
    const isSelected = btn.dataset.theme === state.editingProfile?.bg_theme;
    btn.className = `aspect-square rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 hover:shadow-md ${isSelected ? 'border-zinc-900 ring-2 ring-zinc-900/20 scale-105' : 'border-zinc-200/60 hover:border-zinc-300'}`;
  });
}

function updatePreview() {
  if (!state.editingProfile) return;
  state.editingProfile.name = $('#edit-name')?.value || '';
  state.editingProfile.title = $('#edit-title')?.value || '';
  state.editingProfile.company = $('#edit-company')?.value || '';
  $('#preview-column').innerHTML = renderPreviewPanel(state.editingProfile);
}

function addSocial(key) {
  if (!state.editingProfile) return;
  if (!state.editingProfile.socialOrder) state.editingProfile.socialOrder = [];
  if (state.editingProfile.socialOrder.length >= 6) { showToast('Max 6 social links', 'error'); return; }
  state.editingProfile.socialOrder.push(key);
  if (!state.editingProfile.socials) state.editingProfile.socials = {};
  state.editingProfile.socials[key] = { enabled: true, url: '' };
  renderDashboard();
}

function removeSocial(key) {
  if (!state.editingProfile) return;
  state.editingProfile.socialOrder = state.editingProfile.socialOrder.filter(k => k !== key);
  if (state.editingProfile.socials?.[key]) delete state.editingProfile.socials[key];
  renderDashboard();
}

function updateSocial(key, url) {
  if (!state.editingProfile?.socials) return;
  if (!state.editingProfile.socials[key]) state.editingProfile.socials[key] = { enabled: true };
  state.editingProfile.socials[key].url = url;
  updatePreview();
}

function addLink() {
  if (!state.editingProfile) return;
  if (!state.editingProfile.links) state.editingProfile.links = [];
  state.editingProfile.links.push({ icon: '🔗', title: '', url: '' });
  renderDashboard();
}

function updateLink(i, f, v) {
  if (!state.editingProfile?.links?.[i]) return;
  state.editingProfile.links[i][f] = v;
  updatePreview();
}

function removeLink(i) {
  if (!state.editingProfile?.links) return;
  state.editingProfile.links.splice(i, 1);
  renderDashboard();
}

function toggleEditId() {
  const inp = $('#edit-id'), btn = $('#save-id-btn'), eb = $('#edit-id-btn');
  if (inp.disabled) { inp.disabled = false; inp.classList.remove('bg-zinc-50'); btn.classList.remove('hidden'); eb.textContent = 'Cancel'; }
  else { inp.disabled = true; inp.classList.add('bg-zinc-50'); inp.value = state.editingProfile.id; btn.classList.add('hidden'); eb.textContent = 'Change'; }
}

async function handleChangeId() {
  const newId = $('#edit-id').value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (!newId) return showToast('Invalid ID', 'error');
  if (newId === state.editingProfile.id) return toggleEditId();
  try {
    await updateProfileId(state.editingProfile.id, newId);
    const idx = state.profiles.findIndex(p => p.id === state.selectedProfileId);
    if (idx >= 0) state.profiles[idx].id = newId;
    if (state.userProfile?.id === state.selectedProfileId) state.userProfile.id = newId;
    state.editingProfile.id = newId;
    state.selectedProfileId = newId;
    showToast('URL updated!');
    renderDashboard();
  } catch (e) { showToast(e.message, 'error'); }
}

function showIconPicker(i) {
  const categoriesHtml = Object.entries(linkIconCategories).map(([cat, icons]) => `
    <div class="mb-3">
      <p class="text-[9px] text-zinc-400 mb-1.5">${cat}</p>
      <div class="grid grid-cols-10 gap-0.5">
        ${icons.map(ic => `<button onclick="selectLinkIcon(${i},'${ic}')" class="text-base p-1 rounded hover:bg-zinc-100 transition-colors">${ic}</button>`).join('')}
      </div>
    </div>
  `).join('');
  
  $('#modal-container').innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onclick="closeModal()">
      <div class="bg-white rounded-2xl w-96 max-h-[70vh] overflow-hidden shadow-2xl" onclick="event.stopPropagation()">
        <div class="p-4 border-b border-zinc-100">
          <p class="text-sm font-semibold text-zinc-700">Select Icon</p>
        </div>
        <div class="p-4 overflow-y-auto max-h-[50vh]">
          ${categoriesHtml}
        </div>
      </div>
    </div>`;
}

function selectLinkIcon(i, ic) { if (state.editingProfile?.links?.[i]) { state.editingProfile.links[i].icon = ic; closeModal(); renderDashboard(); } }

function showInviteModal() {
  $('#modal-container').innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onclick="closeModal()">
      <div class="bg-white rounded-2xl w-80 p-5 shadow-2xl" onclick="event.stopPropagation()">
        <h3 class="text-sm font-semibold text-zinc-800 mb-1">Invite Member</h3>
        <p class="text-[10px] text-zinc-400 mb-4">Email invitation will be sent</p>
        <form onsubmit="handleCreateInvite(event)" class="space-y-2">
          <input type="email" name="email" required placeholder="Email" class="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-[11px] focus:outline-none focus:border-zinc-300">
          <input type="text" name="note" placeholder="Note (optional)" class="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-[11px] focus:outline-none focus:border-zinc-300">
          <div class="flex gap-2 pt-2">
            <button type="button" onclick="closeModal()" class="flex-1 py-2 rounded-lg border border-zinc-200 text-zinc-500 text-[11px] hover:bg-zinc-50 transition-colors">Cancel</button>
            <button type="submit" class="flex-1 py-2 rounded-lg bg-zinc-900 text-white text-[11px] font-medium hover:bg-zinc-800 transition-colors">Send</button>
          </div>
        </form>
      </div>
    </div>`;
}

function closeModal() { $('#modal-container').innerHTML = ''; }

async function handleCreateInvite(e) {
  e.preventDefault();
  try {
    const inv = await createInvitation(e.target.email.value, e.target.note.value);
    state.invitations.unshift(inv);
    closeModal();
    showToast('Invitation sent!');
    renderDashboard();
  } catch (err) { showToast(err.message, 'error'); }
}

function confirmDeleteProfile(id) {
  // 마스터 어드민은 삭제 불가
  const profile = state.profiles.find(p => p.id === id);
  if (profile?.email === MASTER_ADMIN_EMAIL) {
    showToast('Cannot delete master admin', 'error');
    return;
  }
  if (confirm('Delete this member?')) deleteProfileAndRefresh(id);
}

async function deleteProfileAndRefresh(id) {
  try {
    // 한번 더 체크
    const profile = state.profiles.find(p => p.id === id);
    if (profile?.email === MASTER_ADMIN_EMAIL) {
      showToast('Cannot delete master admin', 'error');
      return;
    }
    await deleteProfile(id);
    state.profiles = state.profiles.filter(p => p.id !== id);
    state.selectedProfileId = null;
    state.selectedView = 'dashboard';
    state.editingProfile = null;
    showToast('Deleted');
    renderDashboard();
  } catch (e) { showToast(e.message, 'error'); }
}

// ==================== Invite Code Handlers ====================
async function saveInviteCode() {
  const code = $('#invite-code-input')?.value?.trim().toUpperCase();
  if (!code) { showToast('Enter a code', 'error'); return; }
  try {
    await setGlobalInviteCode(code);
    state.globalInviteCode = code;
    showToast('Invite code saved!');
  } catch (e) { showToast(e.message, 'error'); }
}

function regenerateInviteCode() {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const input = $('#invite-code-input');
  if (input) input.value = code;
}

// ==================== Join Request Handlers ====================
async function handleApproveRequest(requestId) {
  try {
    await approveJoinRequest(requestId);
    state.joinRequests = await getJoinRequests();
    state.profiles = await getAllProfiles();
    showToast('Approved! User can now sign in.');
    renderDashboard();
  } catch (e) { showToast(e.message, 'error'); }
}

async function handleRejectRequest(requestId) {
  if (!confirm('Reject this request?')) return;
  try {
    await rejectJoinRequest(requestId);
    state.joinRequests = await getJoinRequests();
    showToast('Request rejected');
    renderDashboard();
  } catch (e) { showToast(e.message, 'error'); }
}

// ==================== Password Change ====================
async function handleChangePassword() {
  const newPw = $('#new-password')?.value;
  const confirmPw = $('#confirm-password')?.value;
  
  if (!newPw || !confirmPw) {
    showToast('Enter both password fields', 'error');
    return;
  }
  if (newPw.length < 6) {
    showToast('Password must be at least 6 characters', 'error');
    return;
  }
  if (newPw !== confirmPw) {
    showToast('Passwords do not match', 'error');
    return;
  }
  
  try {
    const { error } = await supabase.auth.updateUser({ password: newPw });
    if (error) throw error;
    showToast('Password changed successfully!');
    $('#new-password').value = '';
    $('#confirm-password').value = '';
  } catch (e) { 
    showToast(e.message, 'error'); 
  }
}

// ==================== Role Management (Master Admin Only) ====================
async function toggleUserRole(profileId, currentRole) {
  if (!isMasterAdmin()) {
    showToast('Only master admin can change roles', 'error');
    return;
  }
  
  const newRole = currentRole === 'admin' ? 'member' : 'admin';
  const action = newRole === 'admin' ? 'promote to Admin' : 'demote to Member';
  
  if (!confirm(`Are you sure you want to ${action}?`)) return;
  
  try {
    const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', profileId);
    if (error) throw error;
    
    // Update local state
    const profile = state.profiles.find(p => p.id === profileId);
    if (profile) profile.role = newRole;
    if (state.editingProfile?.id === profileId) state.editingProfile.role = newRole;
    
    showToast(`User ${newRole === 'admin' ? 'promoted to Admin' : 'demoted to Member'}`);
    renderDashboard();
  } catch (e) {
    showToast(e.message, 'error');
  }
}

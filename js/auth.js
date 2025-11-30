// ==================== Auth ====================
async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function logout() {
  await supabase.auth.signOut();
  state.currentUser = null;
  state.userRole = null;
  state.userProfile = null;
  window.location.reload();
}

async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();
  if (profile) {
    state.userProfile = profile;
    state.userRole = profile.role;
    if (!profile.socialOrder) profile.socialOrder = Object.keys(profile.socials || {}).filter(k => profile.socials[k]?.enabled);
  }
  return user;
}

// ==================== Global Invite Code ====================
async function getGlobalInviteCode() {
  const { data } = await supabase.from('settings').select('value').eq('key', 'invite_code').single();
  return data?.value || '';
}

async function setGlobalInviteCode(code) {
  const { error } = await supabase.from('settings').upsert({ key: 'invite_code', value: code }, { onConflict: 'key' });
  if (error) throw error;
  return code;
}

async function validateInviteCode(code) {
  const globalCode = await getGlobalInviteCode();
  return globalCode && globalCode.toUpperCase() === code.toUpperCase();
}

// ==================== Join Requests ====================
async function getJoinRequests() {
  if (state.userRole !== 'admin') return [];
  const { data } = await supabase.from('join_requests').select('*').order('created_at', { ascending: false });
  return data || [];
}

async function submitJoinRequest(name, email, password, code) {
  // Validate invite code
  const valid = await validateInviteCode(code);
  if (!valid) throw new Error('Invalid invite code');
  
  // Check if already registered
  const { data: existingUser } = await supabase.from('profiles').select('id').eq('email', email).single();
  if (existingUser) throw new Error('Email already registered');
  
  // Check if pending request exists
  const { data: existingReq } = await supabase.from('join_requests').select('id').eq('email', email).single();
  if (existingReq) throw new Error('Request already submitted. Please wait for admin approval.');
  
  const { data, error } = await supabase.from('join_requests').insert({ 
    name, 
    email, 
    password_hash: password,
    status: 'pending' 
  }).select().single();
  if (error) throw error;
  return data;
}

async function approveJoinRequest(requestId) {
  const { data: req } = await supabase.from('join_requests').select('*').eq('id', requestId).single();
  if (!req) throw new Error('Request not found');
  
  // Create auth user via signup
  const { data: auth, error: authError } = await supabase.auth.signUp({ 
    email: req.email, 
    password: req.password_hash,
    options: { data: { name: req.name, role: 'member' } }
  });
  if (authError) throw authError;
  
  // Create profile
  const profileId = req.name.toLowerCase().replace(/[^a-z0-9]/g, '') + Math.random().toString(36).substring(2, 5);
  await supabase.from('profiles').insert({
    id: profileId,
    user_id: auth.user?.id,
    email: req.email,
    name: req.name,
    role: 'member',
    bg_theme: 'snow',
    font: 'inter',
    links: [],
    socials: {},
    socialOrder: []
  });
  
  // Delete the request after approval (no longer needed)
  await supabase.from('join_requests').delete().eq('id', requestId);
  return req;
}

async function rejectJoinRequest(requestId) {
  await supabase.from('join_requests').delete().eq('id', requestId);
}

async function deleteJoinRequest(requestId) {
  await supabase.from('join_requests').delete().eq('id', requestId);
}

// Legacy compatibility
async function getInvitations() { return getJoinRequests(); }
function getPendingInvites() { 
  return (state.joinRequests || []).filter(r => r.status === 'pending');
}

// ==================== Login UI ====================
function renderLogin() {
  $('#app').innerHTML = `
    <div class="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div class="w-full max-w-sm">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3" style="background: linear-gradient(135deg, #18181b 0%, #3f3f46 100%); box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <svg class="w-8 h-8 text-white" viewBox="0 0 32 32" fill="none">
              <path d="M8 8h4v16H8V8zm12 0h4v16h-4V8zM14 14h4v4h-4v-4z" fill="currentColor"/>
              <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/>
            </svg>
          </div>
          <h1 class="text-xl font-bold text-zinc-900 tracking-tight">Hashed.Live</h1>
          <p class="text-zinc-500 text-sm mt-1">Your mobile profile card</p>
        </div>
        
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
          <div class="flex mb-5 bg-zinc-100 rounded-lg p-1">
            <button onclick="switchAuthTab('login')" id="tab-login" class="flex-1 py-2 rounded-md text-sm font-medium text-zinc-900 bg-white shadow-sm">Sign In</button>
            <button onclick="switchAuthTab('join')" id="tab-join" class="flex-1 py-2 rounded-md text-sm font-medium text-zinc-500">Join</button>
          </div>
          
          <form id="login-form" onsubmit="handleLogin(event)" class="space-y-3">
            <input type="email" name="email" required placeholder="Email" class="w-full px-3 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-400">
            <input type="password" name="password" required placeholder="Password" class="w-full px-3 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-400">
            <button type="submit" class="w-full py-2.5 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style="background: linear-gradient(180deg, #27272a 0%, #18181b 100%); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Sign In</button>
          </form>
          
          <form id="join-form" onsubmit="handleJoinRequest(event)" class="space-y-3 hidden">
            <input type="text" name="code" required placeholder="Invite Code" class="w-full px-3 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-400 uppercase tracking-widest text-center font-mono">
            <input type="text" name="name" required placeholder="Your Name" class="w-full px-3 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-400">
            <input type="email" name="email" required placeholder="Email" class="w-full px-3 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-400">
            <input type="password" name="password" required minlength="6" placeholder="Password" class="w-full px-3 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-400">
            <button type="submit" class="w-full py-2.5 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style="background: linear-gradient(180deg, #27272a 0%, #18181b 100%); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Request to Join</button>
            <p class="text-[10px] text-zinc-400 text-center">Admin approval required after submitting</p>
          </form>
        </div>
      </div>
    </div>
  `;
}

function switchAuthTab(tab) {
  const isLogin = tab === 'login';
  $('#tab-login').className = `flex-1 py-2 rounded-md text-sm font-medium ${isLogin ? 'text-zinc-900 bg-white shadow-sm' : 'text-zinc-500'}`;
  $('#tab-join').className = `flex-1 py-2 rounded-md text-sm font-medium ${!isLogin ? 'text-zinc-900 bg-white shadow-sm' : 'text-zinc-500'}`;
  $('#login-form').classList.toggle('hidden', !isLogin);
  $('#join-form').classList.toggle('hidden', isLogin);
}

async function handleLogin(e) {
  e.preventDefault();
  try {
    await login(e.target.email.value, e.target.password.value);
    showToast('Welcome!');
    await initApp();
  } catch (err) { showToast(err.message, 'error'); }
}

async function handleJoinRequest(e) {
  e.preventDefault();
  try {
    await submitJoinRequest(e.target.name.value, e.target.email.value, e.target.password.value, e.target.code.value);
    showToast('Request submitted! Waiting for admin approval.');
    e.target.reset();
    switchAuthTab('login');
  } catch (err) { showToast(err.message, 'error'); }
}

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Plus, Trash2, GripVertical, LogOut, Save, Eye } from 'lucide-react'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      navigate('/admin/login')
      return
    }
    setUser(user)
    await fetchProfile(user.id)
  }

  async function fetchProfile(userId) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (profileData) {
      setProfile(profileData)
      
      const { data: linksData } = await supabase
        .from('links')
        .select('*')
        .eq('profile_id', profileData.id)
        .order('order_index')

      setLinks(linksData || [])
    } else {
      // 새 프로필 생성
      setProfile({
        username: '',
        name: '',
        title: '',
        avatar_url: '',
        bg_color: '#e9d5ff',
        social_twitter: '',
        social_telegram: '',
        social_linkedin: '',
        social_whatsapp: '',
      })
    }
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    
    if (profile.id) {
      // 업데이트
      await supabase
        .from('profiles')
        .update(profile)
        .eq('id', profile.id)
    } else {
      // 새로 생성
      const { data } = await supabase
        .from('profiles')
        .insert({ ...profile, user_id: user.id })
        .select()
        .single()
      
      setProfile(data)
    }

    // 링크 저장
    for (let i = 0; i < links.length; i++) {
      const link = links[i]
      if (link.id) {
        await supabase
          .from('links')
          .update({ ...link, order_index: i })
          .eq('id', link.id)
      } else {
        await supabase
          .from('links')
          .insert({ ...link, profile_id: profile.id, order_index: i })
      }
    }

    setSaving(false)
    alert('저장되었습니다!')
  }

  function addLink() {
    setLinks([...links, {
      title: '새 링크',
      url: '',
      type: 'meeting_30',
    }])
  }

  async function deleteLink(index) {
    const link = links[index]
    if (link.id) {
      await supabase.from('links').delete().eq('id', link.id)
    }
    setLinks(links.filter((_, i) => i !== index))
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Hashed Card Admin</h1>
          <div className="flex gap-3">
            {profile?.username && (
              <a
                href={`/${profile.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                미리보기
              </a>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* 프로필 설정 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">프로필 설정</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  사용자명 (URL)
                </label>
                <input
                  type="text"
                  value={profile?.username || ''}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  placeholder="0xryankim"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  표시 이름
                </label>
                <input
                  type="text"
                  value={profile?.name || ''}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Ryan Kim"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  타이틀
                </label>
                <input
                  type="text"
                  value={profile?.title || ''}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  placeholder="Founding Partner of Hashed"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  프로필 이미지 URL
                </label>
                <input
                  type="url"
                  value={profile?.avatar_url || ''}
                  onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  배경색
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={profile?.bg_color || '#e9d5ff'}
                    onChange={(e) => setProfile({ ...profile, bg_color: e.target.value })}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={profile?.bg_color || '#e9d5ff'}
                    onChange={(e) => setProfile({ ...profile, bg_color: e.target.value })}
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 소셜 링크 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">소셜 링크</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter / X
                </label>
                <input
                  type="url"
                  value={profile?.social_twitter || ''}
                  onChange={(e) => setProfile({ ...profile, social_twitter: e.target.value })}
                  placeholder="https://x.com/username"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telegram
                </label>
                <input
                  type="url"
                  value={profile?.social_telegram || ''}
                  onChange={(e) => setProfile({ ...profile, social_telegram: e.target.value })}
                  placeholder="https://t.me/username"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={profile?.social_linkedin || ''}
                  onChange={(e) => setProfile({ ...profile, social_linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp
                </label>
                <input
                  type="url"
                  value={profile?.social_whatsapp || ''}
                  onChange={(e) => setProfile({ ...profile, social_whatsapp: e.target.value })}
                  placeholder="https://wa.me/821012345678"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 링크 관리 */}
        <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">링크 관리</h2>
            <button
              onClick={addLink}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              링크 추가
            </button>
          </div>

          <div className="space-y-3">
            {links.map((link, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                
                <select
                  value={link.type}
                  onChange={(e) => {
                    const newLinks = [...links]
                    newLinks[index].type = e.target.value
                    setLinks(newLinks)
                  }}
                  className="px-3 py-2 border rounded-lg bg-white"
                >
                  <option value="meeting_30">📅 30분 미팅</option>
                  <option value="meeting_60">📅 60분 미팅</option>
                  <option value="meeting_inperson">📍 대면 미팅</option>
                  <option value="custom">🔗 커스텀</option>
                </select>

                <input
                  type="text"
                  value={link.title}
                  onChange={(e) => {
                    const newLinks = [...links]
                    newLinks[index].title = e.target.value
                    setLinks(newLinks)
                  }}
                  placeholder="링크 제목"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />

                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => {
                    const newLinks = [...links]
                    newLinks[index].url = e.target.value
                    setLinks(newLinks)
                  }}
                  placeholder="https://..."
                  className="flex-1 px-3 py-2 border rounded-lg"
                />

                <button
                  onClick={() => deleteLink(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}

            {links.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                아직 링크가 없습니다. 위 버튼을 눌러 추가하세요.
              </p>
            )}
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? '저장 중...' : '변경사항 저장'}
          </button>
        </div>
      </main>
    </div>
  )
}

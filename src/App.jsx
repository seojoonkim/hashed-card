import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProfileCard from './components/ProfileCard'
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/:username" element={<ProfileCard />} />
        <Route path="/" element={
          <div className="min-h-screen bg-primary-100 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-primary-900 mb-4">Hashed Card</h1>
              <a href="/admin" className="text-primary-600 hover:underline">
                관리자 페이지로 이동 →
              </a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App

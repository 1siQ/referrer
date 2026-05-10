import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Zap, LogOut, User } from 'lucide-react'

export default function Layout({ profile, children }) {
  const navigate = useNavigate()

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  const navItems = [
    { to: '/dashboard', label: 'Yönlendirmeler' },
    { to: '/bulk', label: 'Toplu İşlemler' },
    { to: '/api-settings', label: 'API Ayarları' },
  ]

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Top Nav */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <Zap size={13} className="text-white" />
            </div>
            <span className="text-zinc-50 text-sm font-bold tracking-tight">isiQ</span>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm transition-colors ${
                    isActive
                      ? 'bg-zinc-800 text-zinc-50'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* User */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center">
                <User size={12} className="text-zinc-300" />
              </div>
              <span className="text-zinc-400 text-sm">
                {profile?.full_name || profile?.email || 'Kullanıcı'}
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
              title="Çıkış Yap"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}

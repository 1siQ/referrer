import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Zap, Mail, Lock, User, AlertCircle } from 'lucide-react'

export default function Auth() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (mode === 'register') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      })
      if (error) setError(error.message)
      else setSuccess('Kayıt başarılı! E-postanızı doğrulayın.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError('E-posta veya şifre hatalı.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className="text-zinc-50 text-xl font-bold tracking-tight">isiQ</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-zinc-50 text-lg font-semibold mb-1">
            {mode === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}
          </h2>
          <p className="text-zinc-400 text-sm mb-6">
            {mode === 'login' ? 'Traffic Command Center\'a hoş geldin.' : 'Ücretsiz başla, hemen yönet.'}
          </p>

          {error && (
            <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2 mb-4">
              <AlertCircle size={14} className="text-rose-400 shrink-0" />
              <span className="text-rose-400 text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-3 py-2 mb-4">
              <span className="text-emerald-400 text-sm">{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'register' && (
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Ad Soyad"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2.5 text-zinc-50 text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>
            )}

            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                placeholder="E-posta adresi"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2.5 text-zinc-50 text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2.5 text-zinc-50 text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg py-2.5 transition-colors mt-1"
            >
              {loading ? 'Lütfen bekle...' : mode === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}
            </button>
          </form>

          <p className="text-center text-zinc-500 text-sm mt-5">
            {mode === 'login' ? 'Hesabın yok mu?' : 'Zaten hesabın var mı?'}{' '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setSuccess('') }}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {mode === 'login' ? 'Kayıt ol' : 'Giriş yap'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

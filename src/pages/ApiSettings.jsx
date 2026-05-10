import { useState } from 'react'
import { Copy, Check, Key, Info } from 'lucide-react'

export default function ApiSettings({ profile }) {
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  const apiKey = profile?.api_key || ''
  const maskedKey = '••••••••-••••-••••-••••-••••••••••••'

  async function handleCopy() {
    await navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-zinc-50 text-xl font-semibold">API Ayarları</h1>
        <p className="text-zinc-500 text-sm mt-0.5">sGTM entegrasyonu için API anahtarın.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Key size={15} className="text-zinc-400" />
          <h2 className="text-zinc-300 text-sm font-medium">API Anahtarı</h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 font-mono text-sm text-zinc-300 overflow-hidden">
            {visible ? apiKey : maskedKey}
          </div>
          <button
            onClick={() => setVisible(v => !v)}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm px-3 py-2.5 rounded-lg transition-colors shrink-0"
          >
            {visible ? 'Gizle' : 'Göster'}
          </button>
          <button
            onClick={handleCopy}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-2.5 rounded-lg transition-colors shrink-0"
            title="Kopyala"
          >
            {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
          </button>
        </div>

        <div className="flex items-start gap-2 mt-5 bg-blue-600/10 border border-blue-600/20 rounded-lg px-4 py-3">
          <Info size={14} className="text-blue-400 mt-0.5 shrink-0" />
          <p className="text-blue-300 text-sm">
            Bu API anahtarını sGTM isiQ şablonundaki <strong>API Key</strong> alanına yapıştırın.
            Anahtarı kimseyle paylaşmayın.
          </p>
        </div>
      </div>

      {/* Entegrasyon Bilgisi */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-4">
        <h2 className="text-zinc-300 text-sm font-medium mb-4">Edge Function Endpoint</h2>
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 font-mono text-xs text-zinc-400 break-all">
          GET {import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-redirect?path=/qr/yol
        </div>
        <p className="text-zinc-600 text-xs mt-2">
          Header: <code className="text-zinc-400">Authorization: Bearer {'<api_key>'}</code>
        </p>
      </div>
    </div>
  )
}

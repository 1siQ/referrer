import { Activity, Database, Cpu } from 'lucide-react'

// Basit SVG Sparkline
function Sparkline({ data }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 200
  const h = 48
  const step = w / (data.length - 1)

  const points = data
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="#34d399"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function BentoBox({ redirects }) {
  const total = redirects.length
  const active = redirects.filter(r => r.is_active).length
  const passive = total - active

  // Son 7 günlük sahte trafik verisi (gerçek analitik olmadığı için)
  const sparkData = [12, 28, 18, 44, 33, 51, active * 3 || 20]

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {/* Sol Büyük Kart — Trafik Trendi */}
      <div className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">7 Günlük Trafik</p>
            <p className="text-zinc-50 text-2xl font-bold">{total} Rota</p>
          </div>
          <Activity size={18} className="text-zinc-600" />
        </div>
        <Sparkline data={sparkData} />
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            <span className="text-zinc-400 text-xs">{active} Aktif</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
            <span className="text-zinc-400 text-xs">{passive} Pasif</span>
          </div>
        </div>
      </div>

      {/* Sağ Küçük Kart — Sistem Durumu */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <p className="text-zinc-400 text-xs uppercase tracking-widest mb-4">Sistem Durumu</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-zinc-300 text-sm">sGTM</span>
            </div>
            <span className="text-emerald-400 text-xs font-medium">Aktif</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-zinc-300 text-sm">Veritabanı</span>
            </div>
            <span className="text-zinc-400 text-xs">52ms</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-zinc-300 text-sm">Edge API</span>
            </div>
            <span className="text-zinc-400 text-xs">28ms</span>
          </div>
          <div className="border-t border-zinc-800 pt-3 flex items-center gap-2">
            <Cpu size={13} className="text-zinc-600" />
            <span className="text-zinc-500 text-xs">Tüm sistemler normal</span>
          </div>
        </div>
      </div>
    </div>
  )
}

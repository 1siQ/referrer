import { QrCode, Copy, Pencil, Trash2 } from 'lucide-react'

function truncate(str, n = 40) {
  return str?.length > n ? str.slice(0, n) + '…' : str
}

export default function FlowCard({ redirect, onEdit, onDelete }) {
  const { path, destination_url, is_active } = redirect

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 flex items-center gap-4 hover:border-zinc-700 transition-colors group">
      {/* SOL — Gelen Yol */}
      <div className="flex items-center gap-3 min-w-0 w-48 shrink-0">
        <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0">
          <QrCode size={15} className="text-zinc-400" />
        </div>
        <div className="min-w-0">
          <p className="text-zinc-50 text-sm font-mono font-medium truncate">{path}</p>
          <p className="text-zinc-500 text-xs">Gelen Yol</p>
        </div>
      </div>

      {/* ORTA — Akış Oku */}
      <div className="flex-1 flex items-center justify-center gap-2">
        {is_active ? (
          <div className="flex items-center gap-2 w-full">
            <div className="h-px flex-1 bg-emerald-400/30" />
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-emerald-400 text-xs font-medium">Aktif</span>
            </div>
            <div className="h-px flex-1 bg-emerald-400/30" />
            <span className="text-emerald-400 text-base">►</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 w-full">
            <div className="h-px flex-1 border-t border-dashed border-zinc-600" />
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
              <span className="text-rose-500 text-xs font-medium">Pasif</span>
            </div>
            <div className="h-px flex-1 border-t border-dashed border-zinc-600" />
            <span className="text-zinc-600 text-base">►</span>
          </div>
        )}
      </div>

      {/* SAĞ — Hedef URL */}
      <div className="flex items-center gap-3 w-64 shrink-0 justify-end">
        <div className="min-w-0 text-right">
          <p className="text-zinc-300 text-sm font-mono truncate">{truncate(destination_url, 35)}</p>
          <p className="text-zinc-500 text-xs">Hedef</p>
        </div>

        {/* Aksiyon İkonları */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={() => copyToClipboard(destination_url)}
            className="w-7 h-7 flex items-center justify-center rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            title="Kopyala"
          >
            <Copy size={13} />
          </button>
          <button
            onClick={() => onEdit(redirect)}
            className="w-7 h-7 flex items-center justify-center rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            title="Düzenle"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => onDelete(redirect.id)}
            className="w-7 h-7 flex items-center justify-center rounded-md text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Sil"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

export function FlowCardSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 flex items-center gap-4 animate-pulse">
      <div className="w-8 h-8 bg-zinc-800 rounded-lg shrink-0" />
      <div className="space-y-1.5 w-36">
        <div className="h-3 bg-zinc-800 rounded w-24" />
        <div className="h-2.5 bg-zinc-800 rounded w-14" />
      </div>
      <div className="flex-1 h-px bg-zinc-800" />
      <div className="space-y-1.5 w-40">
        <div className="h-3 bg-zinc-800 rounded w-32" />
        <div className="h-2.5 bg-zinc-800 rounded w-16" />
      </div>
    </div>
  )
}

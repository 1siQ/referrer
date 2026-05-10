import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const empty = { path: '', destination_url: '', campaign_name: '', is_active: true }

export default function Drawer({ open, onClose, onSave, editData }) {
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (editData) setForm(editData)
    else setForm(empty)
  }, [editData, open])

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    await onSave(form)
    setSaving(false)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-zinc-800 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="text-zinc-50 font-semibold">
            {editData ? 'Rotayı Düzenle' : 'Yeni Rota Oluştur'}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          <div>
            <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-widest">
              Yol (Path)
            </label>
            <input
              type="text"
              placeholder="/qr/urun-adi"
              value={form.path}
              onChange={e => set('path', e.target.value)}
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-50 text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-blue-600 transition-colors"
            />
            <p className="text-zinc-600 text-xs mt-1">Örn: /qr/yaz-kampanya</p>
          </div>

          <div>
            <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-widest">
              Hedef Link
            </label>
            <input
              type="url"
              placeholder="https://hedefsite.com/sayfa"
              value={form.destination_url}
              onChange={e => set('destination_url', e.target.value)}
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-50 text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-widest">
              Kampanya Adı
            </label>
            <input
              type="text"
              placeholder="Yaz Kampanyası 2025"
              value={form.campaign_name}
              onChange={e => set('campaign_name', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-50 text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-zinc-300 text-sm">Durum</p>
              <p className="text-zinc-600 text-xs">Rotayı aktif olarak yayınla</p>
            </div>
            <button
              type="button"
              onClick={() => set('is_active', !form.is_active)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                form.is_active ? 'bg-emerald-500' : 'bg-zinc-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  form.is_active ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium rounded-lg py-2.5 transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg py-2.5 transition-colors"
          >
            {saving ? 'Kaydediliyor...' : editData ? 'Güncelle' : 'Oluştur'}
          </button>
        </div>
      </div>
    </>
  )
}

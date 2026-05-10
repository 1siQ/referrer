import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { Plus, Route } from 'lucide-react'
import BentoBox from '../components/BentoBox'
import FlowCard, { FlowCardSkeleton } from '../components/FlowCard'
import Drawer from '../components/Drawer'

export default function Dashboard({ user }) {
  const [redirects, setRedirects] = useState([])
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editData, setEditData] = useState(null)

  const fetchRedirects = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('redirects')
      .select('*')
      .order('created_at', { ascending: false })
    setRedirects(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchRedirects() }, [fetchRedirects])

  function openCreate() {
    setEditData(null)
    setDrawerOpen(true)
  }

  function openEdit(redirect) {
    setEditData(redirect)
    setDrawerOpen(true)
  }

  async function handleSave(form) {
    if (editData) {
      await supabase
        .from('redirects')
        .update({
          path: form.path,
          destination_url: form.destination_url,
          campaign_name: form.campaign_name,
          is_active: form.is_active,
        })
        .eq('id', editData.id)
    } else {
      await supabase.from('redirects').insert({
        user_id: user.id,
        path: form.path,
        destination_url: form.destination_url,
        campaign_name: form.campaign_name,
        is_active: form.is_active,
      })
    }
    fetchRedirects()
  }

  async function handleDelete(id) {
    if (!confirm('Bu rotayı silmek istediğine emin misin?')) return
    await supabase.from('redirects').delete().eq('id', id)
    setRedirects(prev => prev.filter(r => r.id !== id))
  }

  return (
    <>
      {/* Sayfa Başlığı */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-zinc-50 text-xl font-semibold">Yönlendirmeler</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Tüm QR ve link rotalarını buradan yönet.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={15} />
          Yeni Rota Oluştur
        </button>
      </div>

      {/* Bento Box */}
      <BentoBox redirects={redirects} />

      {/* Flow Listesi */}
      <div className="space-y-2">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <FlowCardSkeleton key={i} />)
        ) : redirects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4">
              <Route size={22} className="text-zinc-600" />
            </div>
            <p className="text-zinc-400 font-medium">Henüz rota yok</p>
            <p className="text-zinc-600 text-sm mt-1">İlk yönlendirmeni oluşturarak başla.</p>
            <button
              onClick={openCreate}
              className="mt-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={14} />
              Yeni Rota Oluştur
            </button>
          </div>
        ) : (
          redirects.map(redirect => (
            <FlowCard
              key={redirect.id}
              redirect={redirect}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Slide-over Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSave}
        editData={editData}
      />
    </>
  )
}

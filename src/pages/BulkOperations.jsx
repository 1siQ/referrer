import { Construction } from 'lucide-react'

export default function BulkOperations() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4">
        <Construction size={22} className="text-zinc-600" />
      </div>
      <p className="text-zinc-400 font-medium">Toplu İşlemler</p>
      <p className="text-zinc-600 text-sm mt-1">Bu modül yakında aktif olacak.</p>
    </div>
  )
}

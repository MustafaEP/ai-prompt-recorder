'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Prompt = {
  id: string
  content: string
  created_at: string
}

export default function Home() {
  const [content, setContent]         = useState('')
  const [prompts, setPrompts]         = useState<Prompt[]>([])
  const [loading, setLoading]         = useState(false)
  const [editingId, setEditingId]     = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')

  useEffect(() => { fetchPrompts() }, [])

  async function fetchPrompts() {
    const { data } = await supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setPrompts(data)
  }

  // CREATE
  async function savePrompt() {
    if (!content.trim()) return
    setLoading(true)
    await supabase.from('prompts').insert([{ content }])
    setContent('')
    await fetchPrompts()
    setLoading(false)
  }

  // UPDATE
  async function updatePrompt(id: string) {
    if (!editContent.trim()) return
    await supabase.from('prompts').update({ content: editContent }).eq('id', id)
    setEditingId(null)
    await fetchPrompts()
  }

  // DELETE
  async function deletePrompt(id: string) {
    if (!confirm('Bu promptu silmek istediğinize emin misiniz?')) return
    await supabase.from('prompts').delete().eq('id', id)
    await fetchPrompts()
  }

  function startEdit(p: Prompt) {
    setEditingId(p.id)
    setEditContent(p.content)
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">🧠 AI Prompt Kayıt</h1>
      <p className="text-gray-500 mb-8">Promptlarını kaydet, düzenle, yönet.</p>

      {/* CREATE */}
      <div className="mb-8 bg-gray-50 rounded-xl p-6 border">
        <textarea
          className="w-full border rounded-lg p-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
          placeholder="Prompt'unuzu buraya yazın..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-400">{content.length} karakter</span>
          <button
            onClick={savePrompt}
            disabled={loading || !content.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Kaydediliyor...' : '💾 Kaydet'}
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Kayıtlı Promptlar</h2>
        <span className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          {prompts.length} prompt
        </span>
      </div>

      {prompts.length === 0 && (
        <p className="text-gray-400 text-center py-12">Henüz kayıtlı prompt yok.</p>
      )}

      <ul className="space-y-3">
        {prompts.map((p) => (
          <li key={p.id} className="border rounded-xl p-4 bg-white shadow-sm">
            {editingId === p.id ? (
              /* EDIT MODU */
              <div>
                <textarea
                  className="w-full border rounded-lg p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 text-black text-sm"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => updatePrompt(p.id)}
                    className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-green-700 transition-colors"
                  >
                    ✅ Kaydet
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                  >
                    İptal
                  </button>
                </div>
              </div>
            ) : (
              /* GÖRÜNTÜLEME MODU */
              <div>
                <p className="text-gray-800 text-sm leading-relaxed">{p.content}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-400">
                    {new Date(p.created_at).toLocaleString('tr-TR')}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(p)}
                      className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-lg hover:bg-amber-200 transition-colors"
                    >
                      ✏️ Düzenle
                    </button>
                    <button
                      onClick={() => deletePrompt(p.id)}
                      className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      🗑️ Sil
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
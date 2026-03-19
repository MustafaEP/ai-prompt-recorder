'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Prompt = {
  id: string
  content: string
  created_at: string
}

export default function Home() {
  const [content, setContent] = useState('')
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(false)

  // Sayfa açılınca promptları yükle
  useEffect(() => {
    fetchPrompts()
  }, [])

  async function fetchPrompts() {
    const { data } = await supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setPrompts(data)
  }

  async function savePrompt() {
    if (!content.trim()) return
    setLoading(true)

    const { error } = await supabase
      .from('prompts')
      .insert([{ content }])

    if (!error) {
      setContent('')
      await fetchPrompts() // listeyi güncelle
    }
    setLoading(false)
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">🧠 AI Prompt Kayıt</h1>

      {/* Input Alanı */}
      <div className="mb-8">
        <textarea
          className="w-full border rounded-lg p-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Prompt'unuzu buraya yazın..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={savePrompt}
          disabled={loading}
          className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      {/* Prompt Listesi */}
      <h2 className="text-xl font-semibold mb-4">Kayıtlı Promptlar</h2>
      {prompts.length === 0 && (
        <p className="text-gray-500">Henüz kayıtlı prompt yok.</p>
      )}
      <ul className="space-y-3">
        {prompts.map((p) => (
          <li key={p.id} className="border rounded-lg p-4">
            <p className="text-gray-800">{p.content}</p>
            <span className="text-xs text-gray-400">
              {new Date(p.created_at).toLocaleString('tr-TR')}
            </span>
          </li>
        ))}
      </ul>
    </main>
  )
}
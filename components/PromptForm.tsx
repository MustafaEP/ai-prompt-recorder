'use client'

import { useState } from 'react'

type Props = {
  onSave: (content: string) => Promise<void>
}

export default function PromptForm({ onSave }: Props) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!content.trim()) return
    setLoading(true)
    try {
      await onSave(content.trim())
      setContent('')
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit()
    }
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
        Yeni Prompt
      </label>
      <textarea
        className="h-32 w-full resize-none rounded-lg border border-zinc-700 bg-zinc-950 p-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
        placeholder="Prompt'unuzu buraya yazın... (Ctrl+Enter ile kaydet)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-zinc-600">{content.length} karakter</span>
        <button
          onClick={handleSubmit}
          disabled={loading || !content.trim()}
          className="cursor-pointer rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
    </div>
  )
}

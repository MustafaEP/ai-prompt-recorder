'use client'

import { useState } from 'react'
import PromptForm from '@/components/PromptForm'
import PromptList from '@/components/PromptList'
import { usePrompts } from '@/hooks/usePrompts'

export default function Home() {
  const { prompts, loading, handleSave, handleUpdate, handleDelete } = usePrompts()
  const [search, setSearch] = useState('')

  const filtered = search.trim()
    ? prompts.filter((p) => p.content.toLowerCase().includes(search.toLowerCase()))
    : prompts

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
            AI Prompt Kayıt
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Promptlarını kaydet, yönet ve keşfet
          </p>
        </div>
        <span className="mt-1 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400">
          {prompts.length} kayıt
        </span>
      </div>

      <div className="mb-6">
        <PromptForm onSave={handleSave} />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Promptlarda ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
        />
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-zinc-800" />
        <span className="text-xs text-zinc-600">
          {search.trim() ? `${filtered.length} sonuç` : 'Kayıtlı Promptlar'}
        </span>
        <div className="h-px flex-1 bg-zinc-800" />
      </div>

      <PromptList
        prompts={filtered}
        loading={loading}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </main>
  )
}

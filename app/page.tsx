'use client'

import { useState, useEffect } from 'react'
import PromptForm from '@/components/PromptForm'
import PromptList from '@/components/PromptList'
import { fetchPrompts, createPrompt, updatePrompt, deletePrompt } from '@/lib/api'
import type { Prompt } from '@/types'

export default function Home() {
  const [prompts, setPrompts] = useState<Prompt[]>([])

  useEffect(() => {
    fetchPrompts().then(setPrompts).catch(console.error)
  }, [])

  async function handleSave(content: string) {
    const created = await createPrompt(content)
    setPrompts((prev) => [created, ...prev])
  }

  async function handleUpdate(id: string, content: string) {
    const updated = await updatePrompt(id, content)
    setPrompts((prev) => prev.map((p) => (p.id === id ? updated : p)))
  }

  async function handleDelete(id: string) {
    await deletePrompt(id)
    setPrompts((prev) => prev.filter((p) => p.id !== id))
  }

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

      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-zinc-800" />
        <span className="text-xs text-zinc-600">Kayıtlı Promptlar</span>
        <div className="h-px flex-1 bg-zinc-800" />
      </div>

      <PromptList prompts={prompts} onUpdate={handleUpdate} onDelete={handleDelete} />
    </main>
  )
}

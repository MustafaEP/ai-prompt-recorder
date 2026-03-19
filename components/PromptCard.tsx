'use client'

import { useState } from 'react'
import type { Prompt } from '@/types'

type Props = {
  prompt: Prompt
  onUpdate: (id: string, content: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function PromptCard({ prompt, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [editContent, setEditContent] = useState(prompt.content)
  const [copied, setCopied] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  async function handleUpdate() {
    if (!editContent.trim()) return
    await onUpdate(prompt.id, editContent.trim())
    setEditing(false)
  }

  function handleCancelEdit() {
    setEditContent(prompt.content)
    setEditing(false)
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formattedDate = new Date(prompt.created_at).toLocaleString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-zinc-700">
      {editing ? (
        <div>
          <textarea
            className="h-28 w-full resize-none rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-sm text-zinc-100 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            autoFocus
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleUpdate}
              className="cursor-pointer rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-500"
            >
              Güncelle
            </button>
            <button
              onClick={handleCancelEdit}
              className="cursor-pointer rounded-lg bg-zinc-800 px-4 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-700"
            >
              İptal
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm leading-relaxed text-zinc-200">{prompt.content}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-zinc-600">{formattedDate}</span>
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className="cursor-pointer rounded-md px-2.5 py-1 text-xs text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200"
              >
                {copied ? 'Kopyalandı!' : 'Kopyala'}
              </button>
              <button
                onClick={() => { setEditContent(prompt.content); setEditing(true) }}
                className="cursor-pointer rounded-md px-2.5 py-1 text-xs text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200"
              >
                Düzenle
              </button>
              {confirmDelete ? (
                <>
                  <span className="text-xs text-zinc-600">Emin misin?</span>
                  <button
                    onClick={() => onDelete(prompt.id)}
                    className="cursor-pointer rounded-md px-2.5 py-1 text-xs text-red-400 transition hover:bg-red-950"
                  >
                    Evet
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="cursor-pointer rounded-md px-2.5 py-1 text-xs text-zinc-500 transition hover:bg-zinc-800"
                  >
                    Hayır
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="cursor-pointer rounded-md px-2.5 py-1 text-xs text-zinc-500 transition hover:bg-red-950 hover:text-red-400"
                >
                  Sil
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

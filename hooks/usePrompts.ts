import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { fetchPrompts, createPrompt, updatePrompt, deletePrompt } from '@/lib/api'
import type { Prompt } from '@/types'

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPrompts()
      .then(setPrompts)
      .catch(() => toast.error('Promptlar yüklenemedi'))
      .finally(() => setLoading(false))
  }, [])

  async function handleSave(content: string) {
    try {
      const created = await createPrompt(content)
      setPrompts((prev) => [created, ...prev])
      toast.success('Prompt kaydedildi')
    } catch {
      toast.error('Kayıt başarısız')
    }
  }

  async function handleUpdate(id: string, content: string) {
    try {
      const updated = await updatePrompt(id, content)
      setPrompts((prev) => prev.map((p) => (p.id === id ? updated : p)))
      toast.success('Güncellendi')
    } catch {
      toast.error('Güncelleme başarısız')
    }
  }

  async function handleDelete(id: string) {
    try {
      await deletePrompt(id)
      setPrompts((prev) => prev.filter((p) => p.id !== id))
      toast.success('Silindi')
    } catch {
      toast.error('Silme başarısız')
    }
  }

  return { prompts, loading, handleSave, handleUpdate, handleDelete }
}

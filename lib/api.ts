import type { Prompt } from '@/types'

const BASE = process.env.NEXT_PUBLIC_API_URL

export async function fetchPrompts(): Promise<Prompt[]> {
  const res = await fetch(`${BASE}/prompts`)
  if (!res.ok) throw new Error('Failed to fetch prompts')
  const data = await res.json()
  return data.prompts
}

export async function createPrompt(content: string): Promise<Prompt> {
  const res = await fetch(`${BASE}/prompts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
  if (!res.ok) throw new Error('Failed to create prompt')
  return res.json()
}

export async function updatePrompt(id: string, content: string): Promise<Prompt> {
  const res = await fetch(`${BASE}/prompts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
  if (!res.ok) throw new Error('Failed to update prompt')
  return res.json()
}

export async function deletePrompt(id: string): Promise<void> {
  const res = await fetch(`${BASE}/prompts/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete prompt')
}

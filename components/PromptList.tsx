import PromptCard from './PromptCard'
import type { Prompt } from '@/types'

type Props = {
  prompts: Prompt[]
  onUpdate: (id: string, content: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function PromptList({ prompts, onUpdate, onDelete }: Props) {
  if (prompts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 py-16 text-center">
        <p className="text-sm text-zinc-600">Henüz kayıtlı prompt yok.</p>
        <p className="mt-1 text-xs text-zinc-700">
          Yukarıdaki formu kullanarak ilk promptunuzu ekleyin.
        </p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {prompts.map((p) => (
        <li key={p.id}>
          <PromptCard prompt={p} onUpdate={onUpdate} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  )
}

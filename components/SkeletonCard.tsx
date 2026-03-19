export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="mb-2 h-3.5 w-3/4 rounded bg-zinc-800" />
      <div className="mb-4 h-3.5 w-1/2 rounded bg-zinc-800" />
      <div className="h-3 w-1/4 rounded bg-zinc-800" />
    </div>
  )
}

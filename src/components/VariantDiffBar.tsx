interface VariantDiffBarProps {
  summary: string[]
}

export default function VariantDiffBar({ summary }: VariantDiffBarProps) {
  if (summary.length === 0) return null

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-xl text-xs text-amber-800">
      <span className="shrink-0">🔄</span>
      <span>{summary.join(' · ')}</span>
    </div>
  )
}

interface ResultBadgeProps {
  score: number
  maxScore: number
  perPersonBudget?: { min: number; max: number }
}

export default function ResultBadge({ score, maxScore, perPersonBudget }: ResultBadgeProps) {
  if (score === 0 && !perPersonBudget) return null

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {score > 0 && (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
          匹配 {score}/{maxScore}
        </span>
      )}
      {perPersonBudget && (
        <span className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">
          人均 NZD {perPersonBudget.min}-{perPersonBudget.max}
        </span>
      )}
    </div>
  )
}

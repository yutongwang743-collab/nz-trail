interface ProgressDotsProps {
  total: number
  current: number
  answered: boolean[]
}

export default function ProgressDots({ total, current, answered }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            i === current
              ? 'bg-gray-900 scale-125'
              : answered[i]
                ? 'bg-gray-400'
                : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

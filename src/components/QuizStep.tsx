'use client'

import OptionCard from './OptionCard'
import ProgressDots from './ProgressDots'

interface QuizStepProps {
  question: string
  options: { value: string; icon: string; label: string }[]
  selected: string | string[] | null
  onSelect: (value: string) => void
  onSkip: () => void
  stepIndex: number
  totalSteps: number
  answered: boolean[]
  multiSelect?: boolean
}

export default function QuizStep({
  question, options, selected, onSelect, onSkip,
  stepIndex, totalSteps, answered, multiSelect,
}: QuizStepProps) {
  const isSelected = (val: string) =>
    multiSelect ? Array.isArray(selected) && selected.includes(val) : selected === val

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <ProgressDots total={totalSteps} current={stepIndex} answered={answered} />
        <button onClick={onSkip} className="text-xs text-gray-400 hover:text-gray-600 transition">
          跳过 »
        </button>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
        {multiSelect && (
          <p className="text-xs text-gray-400 mt-1">可多选，选好后点下一步</p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {options.map(opt => (
          <OptionCard
            key={opt.value}
            icon={opt.icon}
            label={opt.label}
            selected={isSelected(opt.value)}
            onClick={() => onSelect(opt.value)}
          />
        ))}
      </div>

      {multiSelect && Array.isArray(selected) && selected.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={onSkip}
            className="px-6 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            下一步 →
          </button>
        </div>
      )}
    </div>
  )
}

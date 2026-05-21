'use client'

import OptionCard from './OptionCard'
import ProgressDots from './ProgressDots'

interface QuizStepProps {
  question: string
  options: { value: string; icon: string; label: string }[]
  selected: string | null
  onSelect: (value: string) => void
  onSkip: () => void
  stepIndex: number
  totalSteps: number
  answered: boolean[]
}

export default function QuizStep({ question, options, selected, onSelect, onSkip, stepIndex, totalSteps, answered }: QuizStepProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <ProgressDots total={totalSteps} current={stepIndex} answered={answered} />
        <button onClick={onSkip} className="text-xs text-gray-400 hover:text-gray-600 transition">
          跳过 »
        </button>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 text-center">{question}</h3>

      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => (
          <OptionCard
            key={opt.value}
            icon={opt.icon}
            label={opt.label}
            selected={selected === opt.value}
            onClick={() => onSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  )
}

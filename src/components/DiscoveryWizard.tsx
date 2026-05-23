'use client'

import { useState, useCallback } from 'react'
import WelcomePanel from './WelcomePanel'
import QuizStep from './QuizStep'
import type { WizardAnswers } from '@/lib/types'

type WizardPhase = 'welcome' | 'quiz' | 'results' | 'collapsed'

const TOTAL_STEPS = 5

interface QuizQuestion {
  key: keyof WizardAnswers
  question: string
  options: { value: string; icon: string; label: string }[]
  multiSelect?: boolean
}

const QUESTIONS: QuizQuestion[] = [
  {
    key: 'travelers',
    question: '几个人一起出行？',
    options: [
      { value: '1', icon: '🧍', label: '1人独旅' },
      { value: '2', icon: '👫', label: '2人出行' },
      { value: '3-4', icon: '👥', label: '3-4人小团' },
      { value: '5+', icon: '👨‍👩‍👧‍👦', label: '5人以上' },
    ],
  },
  {
    key: 'duration',
    question: '你计划去几天？',
    options: [
      { value: '3-5天', icon: '🏃', label: '3-5天' },
      { value: '7-10天', icon: '📅', label: '7-10天' },
      { value: '10-14天', icon: '🗺️', label: '10-14天' },
    ],
  },
  {
    key: 'budget',
    question: '你的预算档位？',
    options: [
      { value: '穷游', icon: '💰', label: '穷游省钱' },
      { value: '舒适', icon: '💰💰', label: '舒适体验' },
      { value: '奢华', icon: '💰💰💰', label: '奢华享受' },
    ],
  },
  {
    key: 'interests',
    question: '你对什么感兴趣？（可多选）',
    options: [
      { value: '自然徒步', icon: '🏔️', label: '自然徒步' },
      { value: '冰川湖泊', icon: '🏞️', label: '冰川湖泊' },
      { value: '极限运动', icon: '🪂', label: '极限运动' },
      { value: '滑雪', icon: '⛷️', label: '滑雪' },
      { value: '自驾公路', icon: '🚗', label: '自驾公路' },
      { value: '霍比屯人文', icon: '🎬', label: '霍比屯人文' },
      { value: '温泉养生', icon: '♨️', label: '温泉养生' },
      { value: '美食美酒', icon: '🍷', label: '美食美酒' },
      { value: '野生动物', icon: '🐋', label: '野生动物' },
      { value: '摄影打卡', icon: '📸', label: '摄影打卡' },
      { value: '星空观测', icon: '⭐', label: '星空观测' },
      { value: '城市漫步', icon: '🏙️', label: '城市漫步' },
    ],
    multiSelect: true,
  },
  {
    key: 'season',
    question: '你计划什么季节去？',
    options: [
      { value: 'summer', icon: '☀️', label: '夏 (12-2月)' },
      { value: 'autumn', icon: '🍂', label: '秋 (3-5月)' },
      { value: 'winter', icon: '❄️', label: '冬 (6-8月)' },
      { value: 'spring', icon: '🌸', label: '春 (9-11月)' },
    ],
  },
]

interface DiscoveryWizardProps {
  onComplete: (answers: WizardAnswers) => void
  onSkip: () => void
  hasSeenBefore: boolean
  forceOpen?: boolean
}

export default function DiscoveryWizard({ onComplete, onSkip, hasSeenBefore, forceOpen }: DiscoveryWizardProps) {
  const [phase, setPhase] = useState<WizardPhase>(() => {
    if (forceOpen) return 'quiz'
    return hasSeenBefore ? 'collapsed' : 'welcome'
  })
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<WizardAnswers>({})
  const [answeredSteps, setAnsweredSteps] = useState<boolean[]>([false, false, false, false, false])

  const currentQ = QUESTIONS[stepIndex]
  const selectedValue = answers[currentQ.key] ?? (currentQ.multiSelect ? [] : null)
  const isMulti = !!currentQ.multiSelect

  const handleSelect = useCallback((value: string) => {
    if (isMulti) {
      const prev = Array.isArray(answers.interests) ? answers.interests : []
      const next = prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      setAnswers({ ...answers, interests: next })
      const newAnswered = [...answeredSteps]
      newAnswered[stepIndex] = next.length > 0
      setAnsweredSteps(newAnswered)
      // Don't auto-advance for multi-select; user clicks button
      return
    }

    const newAnswers = { ...answers, [currentQ.key]: value }
    setAnswers(newAnswers)
    const newAnswered = [...answeredSteps]
    newAnswered[stepIndex] = true
    setAnsweredSteps(newAnswered)
    // Auto-advance after short delay for visual feedback
    setTimeout(() => {
      if (stepIndex < TOTAL_STEPS - 1) {
        setStepIndex(i => i + 1)
      } else {
        setPhase('results')
        onComplete(newAnswers)
      }
    }, 400)
  }, [stepIndex, currentQ.key, answeredSteps, answers, onComplete, isMulti])

  const handleSkipStep = useCallback(() => {
    const newAnswered = [...answeredSteps]
    newAnswered[stepIndex] = true
    setAnsweredSteps(newAnswered)
    // For multi-select, ensure interests is at least an array
    if (isMulti && !answers.interests) {
      setAnswers({ ...answers, interests: [] })
    }
    if (stepIndex < TOTAL_STEPS - 1) {
      setStepIndex(i => i + 1)
    } else {
      const finalAnswers = isMulti && !answers.interests ? { ...answers, interests: [] } : answers
      setPhase('results')
      onComplete(finalAnswers)
    }
  }, [stepIndex, answeredSteps, answers, onComplete, isMulti])

  const handleWelcomeStart = useCallback(() => {
    localStorage.setItem('wizard_seen', '1')
    setPhase('quiz')
  }, [])

  const handleWelcomeSkip = useCallback(() => {
    localStorage.setItem('wizard_seen', '1')
    setPhase('collapsed')
    onSkip()
  }, [onSkip])

  const handleRetry = useCallback(() => {
    setPhase('welcome')
    setStepIndex(0)
    setAnswers({})
    setAnsweredSteps([false, false, false, false, false])
    setPhase('quiz')  // skip welcome panel on retry
  }, [])

  if (phase === 'welcome') {
    return <WelcomePanel onStart={handleWelcomeStart} onSkip={handleWelcomeSkip} />
  }

  if (phase === 'collapsed') {
    return (
      <button
        onClick={() => setPhase('welcome')}
        className="w-full py-2.5 px-4 bg-gradient-to-r from-brand-50 to-amber-50 rounded-xl text-sm text-gray-700 hover:shadow-md transition flex items-center justify-center gap-2"
      >
        <span>🎯</span> 帮我找路线
      </button>
    )
  }

  if (phase === 'quiz') {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
        <QuizStep
          question={currentQ.question}
          options={currentQ.options}
          selected={selectedValue as string | string[]}
          onSelect={handleSelect}
          onSkip={handleSkipStep}
          stepIndex={stepIndex}
          totalSteps={TOTAL_STEPS}
          answered={answeredSteps}
          multiSelect={isMulti}
        />
      </div>
    )
  }

  // results phase — wizard done, show summary bar with re-test
  return (
    <div className="flex items-center justify-between py-2.5 px-4 bg-green-50 rounded-xl text-sm">
      <span className="text-green-700 font-medium">
        🎯 已根据你的偏好筛选
      </span>
      <button
        onClick={handleRetry}
        className="text-green-600 hover:text-green-800 font-medium text-xs"
      >
        重新测试
      </button>
    </div>
  )
}

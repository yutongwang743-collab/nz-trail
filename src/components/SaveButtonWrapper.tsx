'use client'

import SaveButton from './SaveButton'
import type { SavedPlan } from '@/lib/savedPlans'

interface SaveButtonWrapperProps {
  plan: Omit<SavedPlan, 'id' | 'savedAt'>
  className?: string
}

export default function SaveButtonWrapper({ plan, className }: SaveButtonWrapperProps) {
  return <SaveButton plan={plan} className={className} />
}

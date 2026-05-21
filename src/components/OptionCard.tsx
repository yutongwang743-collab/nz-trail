'use client'

interface OptionCardProps {
  icon: string
  label: string
  selected: boolean
  onClick: () => void
}

export default function OptionCard({ icon, label, selected, onClick }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 text-center ${
        selected
          ? 'border-gray-900 bg-gray-900 text-white shadow-md scale-[1.02]'
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:shadow-sm'
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}

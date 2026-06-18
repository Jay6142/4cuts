'use client'

import { clsx } from 'clsx'
import { PhotoLayoutType } from '@/types/decorate'
import { useAppStore } from '@/store'

const LAYOUTS: { id: PhotoLayoutType; label: string; icon: string }[] = [
  { id: '2x2', label: '2×2', icon: '⊞' },
  { id: '1x4', label: '세로', icon: '▤' },
  { id: '4x1', label: '가로', icon: '▥' },
]

export default function LayoutSelector() {
  const { layout, setLayout } = useAppStore()

  return (
    <div className="flex gap-2">
      {LAYOUTS.map((l) => (
        <button
          key={l.id}
          onClick={() => setLayout(l.id)}
          className={clsx(
            'flex flex-col items-center gap-1 px-3 py-2 rounded-xl border-2 text-xs font-medium transition-colors',
            layout === l.id
              ? 'border-pink-500 bg-pink-50 text-pink-700'
              : 'border-gray-200 text-gray-600 hover:border-pink-300'
          )}
        >
          <span className="text-base">{l.icon}</span>
          <span>{l.label}</span>
        </button>
      ))}
    </div>
  )
}

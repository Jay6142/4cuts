'use client'

import Image from 'next/image'
import { clsx } from 'clsx'
import { BACKGROUNDS } from '@/lib/backgrounds'
import { useAppStore } from '@/store'

export default function BackgroundSelector() {
  const { selectedBackground, setSelectedBackground } = useAppStore()

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">배경 선택</h2>
      <div className="flex flex-wrap gap-3">
        {BACKGROUNDS.map((bg) => (
          <button
            key={bg.id}
            onClick={() => setSelectedBackground(bg)}
            title={bg.label}
            className={clsx(
              'relative w-16 h-16 rounded-xl border-2 transition-all duration-200 overflow-hidden bg-gray-100',
              selectedBackground.id === bg.id
                ? 'border-pink-500 ring-2 ring-pink-200'
                : 'border-gray-200 hover:border-pink-300'
            )}
          >
            {bg.type === 'image' ? (
              <Image
                src={bg.thumbnail}
                alt={bg.label}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0" style={{ background: bg.thumbnail }} />
            )}
            {selectedBackground.id === bg.id && (
              <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
                <span className="text-white text-lg font-bold drop-shadow">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-gray-400">
        선택됨: <span className="text-pink-500 font-medium">{selectedBackground.label}</span>
      </p>
    </div>
  )
}

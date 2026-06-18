'use client'

import Image from 'next/image'
import { clsx } from 'clsx'
import { CapturedPhoto } from '@/types/capture'

interface Props {
  photos: CapturedPhoto[]
  selectedIndices: number[]
  onToggle: (index: number) => void
}

export default function CapturedGrid({ photos, selectedIndices, onToggle }: Props) {
  if (photos.length === 0) return null

  return (
    <div>
      <p className="text-sm text-gray-500 mb-2 text-center">
        4장을 선택하세요 ({selectedIndices.length}/4)
      </p>
      <div className="grid grid-cols-5 gap-1.5">
        {photos.map((photo, index) => {
          const isSelected = selectedIndices.includes(index)
          const selectionOrder = selectedIndices.indexOf(index)

          return (
            <button
              key={photo.id}
              onClick={() => onToggle(index)}
              className={clsx(
                'relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-150',
                isSelected
                  ? 'border-pink-500 ring-1 ring-pink-300'
                  : 'border-transparent hover:border-pink-300',
                !isSelected && selectedIndices.length >= 4
                  ? 'opacity-40 cursor-not-allowed'
                  : ''
              )}
              disabled={!isSelected && selectedIndices.length >= 4}
            >
              <Image
                src={photo.dataUrl}
                alt={`촬영 사진 ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
              {isSelected && (
                <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
                  <span className="w-6 h-6 bg-pink-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                    {selectionOrder + 1}
                  </span>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

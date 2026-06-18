'use client'

import { clsx } from 'clsx'
import { PhotoSize } from '@/types/settings'
import { PHOTO_SIZES } from '@/lib/photoSizes'
import { useAppStore } from '@/store'

export default function PhotoSizeSelector() {
  const { selectedSize, setSelectedSize } = useAppStore()

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">사진 사이즈</h2>
      <div className="flex gap-3 flex-wrap">
        {PHOTO_SIZES.map((size) => (
          <button
            key={size.id}
            onClick={() => setSelectedSize(size)}
            className={clsx(
              'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 min-w-[100px]',
              selectedSize.id === size.id
                ? 'border-pink-500 bg-pink-50 text-pink-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-pink-300'
            )}
          >
            <SizePreview ratio={size.aspectRatio} />
            <span className="text-sm font-medium">{size.label}</span>
            <span className="text-xs text-gray-400">
              {size.width}×{size.height}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function SizePreview({ ratio }: { ratio: string }) {
  const ratioMap: Record<string, { w: number; h: number }> = {
    '3:4': { w: 30, h: 40 },
    '4:3': { w: 40, h: 30 },
  }
  const dims = ratioMap[ratio] ?? { w: 30, h: 40 }
  return (
    <div
      className="bg-gray-300 rounded"
      style={{ width: dims.w, height: dims.h }}
    />
  )
}

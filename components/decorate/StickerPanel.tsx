'use client'

import { useState } from 'react'
import { STICKER_CATEGORIES, STICKERS } from '@/lib/stickers'
import { PlacedSticker, StickerCategory } from '@/types/decorate'
import { useAppStore } from '@/store'
import { clsx } from 'clsx'

interface Props {
  canvasWidth: number
  canvasHeight: number
}

export default function StickerPanel({ canvasWidth, canvasHeight }: Props) {
  const [activeCategory, setActiveCategory] = useState<StickerCategory>('heart')
  const { addSticker } = useAppStore()

  const filtered = STICKERS.filter((s) => s.category === activeCategory)

  const handleAdd = (sticker: typeof STICKERS[0]) => {
    const placed: PlacedSticker = {
      instanceId: crypto.randomUUID(),
      definitionId: sticker.id,
      emoji: sticker.emoji,
      x: canvasWidth / 2 - 40,
      y: canvasHeight / 2 - 40,
      width: 80,
      height: 80,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
    }
    addSticker(placed)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="flex border-b border-gray-100 overflow-x-auto">
        {STICKER_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as StickerCategory)}
            className={clsx(
              'px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors',
              activeCategory === cat.id
                ? 'text-pink-600 border-b-2 border-pink-500'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-1 p-2">
        {filtered.map((sticker) => (
          <button
            key={sticker.id}
            onClick={() => handleAdd(sticker)}
            title={sticker.label}
            className="aspect-square flex items-center justify-center text-3xl hover:bg-pink-50 rounded-xl transition-colors"
          >
            {sticker.emoji}
          </button>
        ))}
      </div>
    </div>
  )
}

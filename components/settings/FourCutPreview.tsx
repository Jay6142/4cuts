'use client'

import Image from 'next/image'
import { useAppStore } from '@/store'
import { getDisplayDimensions } from '@/lib/canvasUtils'

const PREVIEW_WIDTH = 200

export default function FourCutPreview() {
  const { selectedSize } = useAppStore()

  const { width: canvasW, height: canvasH } = getDisplayDimensions(
    selectedSize.width,
    selectedSize.height
  )

  const scale = PREVIEW_WIDTH / canvasW
  const previewW = PREVIEW_WIDTH
  const previewH = Math.round(canvasH * scale)

  const exampleSrc = selectedSize.id === 'portrait-3x4'
    ? '/backgrounds/세로형 예시.png'
    : '/backgrounds/가로형 예시.png'

  return (
    <div className="flex justify-center">
      <div
        className="relative rounded-xl overflow-hidden shadow-md"
        style={{ width: previewW, height: previewH }}
      >
        <Image
          src={exampleSrc}
          alt="4컷 예시"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </div>
  )
}

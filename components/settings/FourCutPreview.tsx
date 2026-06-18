'use client'

import Image from 'next/image'
import { useAppStore } from '@/store'

const PREVIEW_WIDTH = 240
const PREVIEW_HEIGHT = 240

export default function FourCutPreview() {
  const { selectedSize } = useAppStore()

  const exampleSrc = selectedSize.id === 'portrait-3x4'
    ? '/backgrounds/ex_01.png'
    : '/backgrounds/ex_02.png'

  return (
    <div className="flex justify-center">
      <div
        className="relative"
        style={{ width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
      >
        <Image
          src={exampleSrc}
          alt="4컷 예시"
          fill
          className="object-contain"
          unoptimized
        />
      </div>
    </div>
  )
}

'use client'

import { RefObject } from 'react'
import Konva from 'konva'
import { useKonvaExport } from '@/hooks/useKonvaExport'
import { useAppStore } from '@/store'
import { getDisplayDimensions } from '@/lib/canvasUtils'

interface Props {
  stageRef: RefObject<Konva.Stage | null>
}

export default function DownloadButton({ stageRef }: Props) {
  const { selectedSize } = useAppStore()
  const { width: displayW } = getDisplayDimensions(selectedSize.width, selectedSize.height)
  const pixelRatio = selectedSize.width / displayW

  const { download } = useKonvaExport(stageRef, pixelRatio)

  return (
    <button
      onClick={download}
      className="w-full bg-pink-500 text-white py-4 rounded-full text-lg font-semibold hover:bg-pink-600 active:bg-pink-700 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
    >
      <span>💾</span>
      PNG로 저장 ({selectedSize.width}×{selectedSize.height})
    </button>
  )
}

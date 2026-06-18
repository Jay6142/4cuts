'use client'

import { useCallback, RefObject } from 'react'
import Konva from 'konva'

export function useKonvaExport(stageRef: RefObject<Konva.Stage | null>, pixelRatio = 2) {
  const download = useCallback(() => {
    const stage = stageRef.current
    if (!stage) return

    const dataUrl = stage.toDataURL({ pixelRatio })
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `4cut-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [stageRef, pixelRatio])

  return { download }
}

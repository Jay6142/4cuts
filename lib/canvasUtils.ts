import { PhotoLayoutType } from '@/types/decorate'

export interface PhotoRect {
  x: number
  y: number
  width: number
  height: number
}

const GAP = 16
const DISPLAY_WIDTH = 400

export function getDisplayDimensions(photoWidth: number, photoHeight: number) {
  const h = Math.round(DISPLAY_WIDTH * photoHeight / photoWidth)
  return { width: DISPLAY_WIDTH, height: h }
}

export function calculatePhotoLayout(
  layout: PhotoLayoutType,
  canvasWidth: number,
  canvasHeight: number
): PhotoRect[] {
  const rects: PhotoRect[] = []

  if (layout === '2x2') {
    const w = (canvasWidth - GAP * 3) / 2
    const h = (canvasHeight - GAP * 3) / 2
    rects.push({ x: GAP, y: GAP, width: w, height: h })
    rects.push({ x: GAP * 2 + w, y: GAP, width: w, height: h })
    rects.push({ x: GAP, y: GAP * 2 + h, width: w, height: h })
    rects.push({ x: GAP * 2 + w, y: GAP * 2 + h, width: w, height: h })
  } else if (layout === '1x4') {
    const w = canvasWidth - GAP * 2
    const h = (canvasHeight - GAP * 5) / 4
    for (let i = 0; i < 4; i++) {
      rects.push({ x: GAP, y: GAP * (i + 1) + h * i, width: w, height: h })
    }
  } else if (layout === '4x1') {
    const w = (canvasWidth - GAP * 5) / 4
    const h = canvasHeight - GAP * 2
    for (let i = 0; i < 4; i++) {
      rects.push({ x: GAP * (i + 1) + w * i, y: GAP, width: w, height: h })
    }
  }

  return rects
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

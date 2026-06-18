export interface PhotoRect {
  x: number
  y: number
  width: number
  height: number
}

const DISPLAY_WIDTH = 400

export function getDisplayDimensions(photoWidth: number, photoHeight: number) {
  const h = Math.round(DISPLAY_WIDTH * photoHeight / photoWidth)
  return { width: DISPLAY_WIDTH, height: h }
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

export interface PhotoSlot {
  x: number
  y: number
  width: number
  height: number
}

export interface FrameMetadata {
  frameId: string
  originalWidth: number
  originalHeight: number
  slots: PhotoSlot[]
}

export const FRAME_METADATA: FrameMetadata[] = [
  {
    frameId: 'frame-01',
    originalWidth: 1200,
    originalHeight: 1800,
    slots: [
      { x: 46,  y: 46,  width: 535, height: 734 },
      { x: 622, y: 46,  width: 535, height: 734 },
      { x: 46,  y: 822, width: 535, height: 734 },
      { x: 622, y: 822, width: 535, height: 734 },
    ],
  },
  {
    frameId: 'frame-02',
    originalWidth: 1800,
    originalHeight: 1200,
    slots: [
      { x: 141,  y: 41,  width: 734, height: 535 },
      { x: 930, y: 41,  width: 734, height: 535 },
      { x: 141,  y: 627, width: 734, height: 535 },
      { x: 930, y: 627, width: 734, height: 535 },
    ],
  },
]

export function getFramePhotoRects(
  frameId: string,
  canvasWidth: number,
  canvasHeight: number
): Array<{ x: number; y: number; width: number; height: number }> | null {
  const meta = FRAME_METADATA.find(m => m.frameId === frameId)
  if (!meta || meta.slots.length === 0) return null

  const scaleX = canvasWidth / meta.originalWidth
  const scaleY = canvasHeight / meta.originalHeight

  return meta.slots.map(slot => ({
    x: slot.x * scaleX,
    y: slot.y * scaleY,
    width: slot.width * scaleX,
    height: slot.height * scaleY,
  }))
}

export type StickerCategory = 'heart' | 'star' | 'flower' | 'ribbon' | 'misc'

export interface StickerDefinition {
  id: string
  label: string
  emoji: string
  category: StickerCategory
}

export interface PlacedSticker {
  instanceId: string
  definitionId: string
  emoji: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  scaleX: number
  scaleY: number
}

export type PhotoLayoutType = '2x2' | '1x4' | '4x1'

export interface DecorateState {
  layout: PhotoLayoutType
  stickers: PlacedSticker[]
  selectedStickerInstanceId: string | null
}

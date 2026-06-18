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

export interface DecorateState {
  stickers: PlacedSticker[]
  selectedStickerInstanceId: string | null
}

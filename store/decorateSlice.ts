import { StateCreator } from 'zustand'
import { DecorateState, PhotoLayoutType, PlacedSticker } from '@/types/decorate'

export interface DecorateSlice extends DecorateState {
  setLayout: (layout: PhotoLayoutType) => void
  addSticker: (sticker: PlacedSticker) => void
  updateSticker: (instanceId: string, updates: Partial<PlacedSticker>) => void
  removeSticker: (instanceId: string) => void
  clearStickers: () => void
  setSelectedStickerInstanceId: (id: string | null) => void
}

export const createDecorateSlice: StateCreator<DecorateSlice> = (set) => ({
  layout: '2x2',
  stickers: [],
  selectedStickerInstanceId: null,
  setLayout: (layout) => set({ layout }),
  addSticker: (sticker) =>
    set((state) => ({ stickers: [...state.stickers, sticker] })),
  updateSticker: (instanceId, updates) =>
    set((state) => ({
      stickers: state.stickers.map((s) =>
        s.instanceId === instanceId ? { ...s, ...updates } : s
      ),
    })),
  removeSticker: (instanceId) =>
    set((state) => ({
      stickers: state.stickers.filter((s) => s.instanceId !== instanceId),
      selectedStickerInstanceId:
        state.selectedStickerInstanceId === instanceId
          ? null
          : state.selectedStickerInstanceId,
    })),
  clearStickers: () => set({ stickers: [], selectedStickerInstanceId: null }),
  setSelectedStickerInstanceId: (id) => set({ selectedStickerInstanceId: id }),
})

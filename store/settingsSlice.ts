import { StateCreator } from 'zustand'
import { Background, CameraDevice, PhotoSize, SettingsState } from '@/types/settings'
import { BACKGROUNDS, DEFAULT_BACKGROUND } from '@/lib/backgrounds'
import { DEFAULT_PHOTO_SIZE } from '@/lib/photoSizes'

export interface SettingsSlice extends SettingsState {
  setSelectedSize: (size: PhotoSize) => void
  setSelectedBackground: (bg: Background) => void
  setSelectedCamera: (camera: CameraDevice | null) => void
}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  selectedSize: DEFAULT_PHOTO_SIZE,
  selectedBackground: DEFAULT_BACKGROUND,
  selectedCamera: null,
  setSelectedSize: (size) => {
    const frameId = size.id === 'portrait-3x4' ? 'frame-01' : 'frame-02'
    const background = BACKGROUNDS.find(b => b.id === frameId) ?? BACKGROUNDS[0]
    set({ selectedSize: size, selectedBackground: background })
  },
  setSelectedBackground: (bg) => set({ selectedBackground: bg }),
  setSelectedCamera: (camera) => set({ selectedCamera: camera }),
})

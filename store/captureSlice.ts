import { StateCreator } from 'zustand'
import { CapturedPhoto, CaptureState } from '@/types/capture'

export interface CaptureSlice extends CaptureState {
  addPhoto: (photo: CapturedPhoto) => void
  removePhoto: (id: string) => void
  clearPhotos: () => void
  toggleSelectPhoto: (index: number) => void
  setSelectedIndices: (indices: number[]) => void
  setIsCameraReady: (ready: boolean) => void
  setIsCapturing: (capturing: boolean) => void
  setCountdown: (count: number | null) => void
}

export const createCaptureSlice: StateCreator<CaptureSlice> = (set) => ({
  photos: [],
  selectedIndices: [],
  isCameraReady: false,
  isCapturing: false,
  countdown: null,
  addPhoto: (photo) =>
    set((state) => ({
      photos: [...state.photos.slice(0, 9), photo],
    })),
  removePhoto: (id) =>
    set((state) => ({
      photos: state.photos.filter((p) => p.id !== id),
      selectedIndices: [],
    })),
  clearPhotos: () => set({ photos: [], selectedIndices: [] }),
  toggleSelectPhoto: (index) =>
    set((state) => {
      const isSelected = state.selectedIndices.includes(index)
      if (isSelected) {
        return { selectedIndices: state.selectedIndices.filter((i) => i !== index) }
      }
      if (state.selectedIndices.length >= 4) return {}
      return { selectedIndices: [...state.selectedIndices, index] }
    }),
  setSelectedIndices: (indices) => set({ selectedIndices: indices }),
  setIsCameraReady: (ready) => set({ isCameraReady: ready }),
  setIsCapturing: (capturing) => set({ isCapturing: capturing }),
  setCountdown: (count) => set({ countdown: count }),
})

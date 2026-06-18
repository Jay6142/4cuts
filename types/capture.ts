export interface CapturedPhoto {
  id: string
  dataUrl: string
  capturedAt: number
}

export interface CaptureState {
  photos: CapturedPhoto[]
  selectedIndices: number[]
  isCameraReady: boolean
  isCapturing: boolean
  countdown: number | null
}

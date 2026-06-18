export interface PhotoSize {
  id: string
  label: string
  width: number
  height: number
  aspectRatio: string
}

export type BackgroundType = 'color' | 'gradient' | 'image'

export interface Background {
  id: string
  label: string
  type: BackgroundType
  value: string
  thumbnail: string
}

export interface CameraDevice {
  deviceId: string
  label: string
}

export interface SettingsState {
  selectedSize: PhotoSize
  selectedBackground: Background
  selectedCamera: CameraDevice | null
}

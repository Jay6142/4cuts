import { PhotoSize } from '@/types/settings'

export const PHOTO_SIZES: PhotoSize[] = [
  {
    id: 'portrait-3x4',
    label: '세로형 (3:4)',
    width: 900,
    height: 1200,
    aspectRatio: '3:4',
  },
  {
    id: 'landscape-4x3',
    label: '가로형 (4:3)',
    width: 1200,
    height: 900,
    aspectRatio: '4:3',
  },
]

export const DEFAULT_PHOTO_SIZE = PHOTO_SIZES[0]

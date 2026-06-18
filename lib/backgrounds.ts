import { Background } from '@/types/settings'

// PNG 파일 경로: public/backgrounds/배경선택_01.png ~ _03.png
// 라벨은 여기서 수정 가능
export const BACKGROUNDS: Background[] = [
  {
    id: 'frame-01',
    label: '바다',
    type: 'image',
    value: '/backgrounds/배경선택_01.png',
    thumbnail: '/backgrounds/배경선택_01.png',
  },
  {
    id: 'frame-02',
    label: '프레임2',
    type: 'image',
    value: '/backgrounds/베경선택_02.png',
    thumbnail: '/backgrounds/베경선택_02.png',
  },
]

export const DEFAULT_BACKGROUND = BACKGROUNDS[0]

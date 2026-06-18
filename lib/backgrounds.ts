import { Background } from '@/types/settings'

// 배경은 "테마"만 선택하고, 실제 프레임 이미지 경로는 테마 + 사진 사이즈(방향)로 계산한다.
// value/thumbnail은 선택 버튼에 쓰이는 썸네일로 세로형(frame01) 기준 고정.
export const BACKGROUNDS: Background[] = [
  {
    id: 'basic',
    label: '기본',
    type: 'image',
    value: '/backgrounds/frame01_basic.png',
    thumbnail: '/backgrounds/frame01_basic.png',
  },
  {
    id: 'color',
    label: '바다',
    type: 'image',
    value: '/backgrounds/frame01_color.png',
    thumbnail: '/backgrounds/frame01_color.png',
  },
  {
    id: 'kor',
    label: '한국',
    type: 'image',
    value: '/backgrounds/frame01_kor.png',
    thumbnail: '/backgrounds/frame01_kor.png',
  },
]

export const DEFAULT_BACKGROUND = BACKGROUNDS[0]

export function getFrameSrc(themeId: string, sizeId: string): string {
  const num = sizeId === 'portrait-3x4' ? '01' : '02'
  return `/backgrounds/frame${num}_${themeId}.png`
}

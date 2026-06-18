import { StickerDefinition } from '@/types/decorate'

export const STICKERS: StickerDefinition[] = [
  { id: 'heart-red', label: '빨간 하트', emoji: '❤️', category: 'heart' },
  { id: 'heart-pink', label: '핑크 하트', emoji: '🩷', category: 'heart' },
  { id: 'heart-orange', label: '주황 하트', emoji: '🧡', category: 'heart' },
  { id: 'heart-yellow', label: '노랑 하트', emoji: '💛', category: 'heart' },
  { id: 'heart-purple', label: '보라 하트', emoji: '💜', category: 'heart' },
  { id: 'star-yellow', label: '별', emoji: '⭐', category: 'star' },
  { id: 'star-sparkle', label: '반짝 별', emoji: '✨', category: 'star' },
  { id: 'star-shooting', label: '유성', emoji: '🌟', category: 'star' },
  { id: 'flower-pink', label: '핑크 꽃', emoji: '🌸', category: 'flower' },
  { id: 'flower-white', label: '흰 꽃', emoji: '🌼', category: 'flower' },
  { id: 'flower-red', label: '장미', emoji: '🌹', category: 'flower' },
  { id: 'flower-sunflower', label: '해바라기', emoji: '🌻', category: 'flower' },
  { id: 'ribbon', label: '리본', emoji: '🎀', category: 'ribbon' },
  { id: 'bow', label: '선물', emoji: '🎁', category: 'ribbon' },
  { id: 'crown', label: '왕관', emoji: '👑', category: 'misc' },
  { id: 'rainbow', label: '무지개', emoji: '🌈', category: 'misc' },
  { id: 'cloud', label: '구름', emoji: '☁️', category: 'misc' },
  { id: 'butterfly', label: '나비', emoji: '🦋', category: 'misc' },
  { id: 'moon', label: '달', emoji: '🌙', category: 'misc' },
  { id: 'sun', label: '태양', emoji: '☀️', category: 'misc' },
]

export const STICKER_CATEGORIES = [
  { id: 'heart', label: '하트' },
  { id: 'star', label: '별' },
  { id: 'flower', label: '꽃' },
  { id: 'ribbon', label: '리본' },
  { id: 'misc', label: '기타' },
] as const

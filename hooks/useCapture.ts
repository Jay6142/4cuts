'use client'

import { useCallback, useRef } from 'react'
import { useAppStore } from '@/store'
import { CapturedPhoto } from '@/types/capture'

const MAX_PHOTOS = 10
const COUNTDOWN_SECONDS = 3

export function useCapture(captureFrame: () => string | null) {
  const { addPhoto, setIsCapturing, setCountdown, photos, isCapturing } = useAppStore()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const shoot = useCallback(async () => {
    if (isCapturing || photos.length >= MAX_PHOTOS) return

    setIsCapturing(true)

    let count = COUNTDOWN_SECONDS
    setCountdown(count)

    await new Promise<void>((resolve) => {
      intervalRef.current = setInterval(() => {
        count -= 1
        if (count <= 0) {
          clearInterval(intervalRef.current!)
          setCountdown(null)
          resolve()
        } else {
          setCountdown(count)
        }
      }, 1000)
    })

    const dataUrl = captureFrame()
    if (dataUrl) {
      const photo: CapturedPhoto = {
        id: crypto.randomUUID(),
        dataUrl,
        capturedAt: Date.now(),
      }
      addPhoto(photo)
    }

    setIsCapturing(false)
  }, [isCapturing, photos.length, captureFrame, addPhoto, setIsCapturing, setCountdown])

  return { shoot, maxPhotos: MAX_PHOTOS }
}

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { CameraDevice } from '@/types/settings'

export function useCamera(
  selectedCamera: CameraDevice | null,
  targetWidth?: number,
  targetHeight?: number
) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const mountedRef = useRef(true)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startCamera = useCallback(async () => {
    if (!mountedRef.current) return
    setIsReady(false)
    setError(null)

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }

    try {
      const videoConstraints: MediaTrackConstraints = {
        ...(selectedCamera?.deviceId ? { deviceId: { exact: selectedCamera.deviceId } } : {}),
        ...(targetWidth  ? { width:  { ideal: targetWidth  } } : {}),
        ...(targetHeight ? { height: { ideal: targetHeight } } : {}),
      }
      const constraints: MediaStreamConstraints = { video: videoConstraints }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (!mountedRef.current) {
        stream.getTracks().forEach((track) => track.stop())
        return
      }

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        try {
          await videoRef.current.play()
          if (mountedRef.current) setIsReady(true)
        } catch (playErr) {
          // 언마운트로 인한 play() 중단 — 정상 동작
          if ((playErr as DOMException).name !== 'AbortError') {
            throw playErr
          }
        }
      }
    } catch (err) {
      if (!mountedRef.current) return
      if ((err as DOMException).name === 'AbortError') return
      setError('카메라를 시작할 수 없습니다.')
      console.error(err)
    }
  }, [selectedCamera, targetWidth, targetHeight])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsReady(false)
  }, [])

  const captureFrame = useCallback((): string | null => {
    if (!videoRef.current || !isReady) return null
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.drawImage(video, 0, 0)
    return canvas.toDataURL('image/png')
  }, [isReady])

  useEffect(() => {
    mountedRef.current = true
    startCamera()
    return () => {
      mountedRef.current = false
      stopCamera()
    }
  }, [startCamera, stopCamera])

  return { videoRef, isReady, error, captureFrame, restartCamera: startCamera }
}

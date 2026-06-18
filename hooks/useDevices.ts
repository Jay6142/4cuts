'use client'

import { useState, useCallback } from 'react'
import { CameraDevice } from '@/types/settings'

export function useDevices() {
  const [devices, setDevices] = useState<CameraDevice[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadDevices = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // 권한 획득 후 enumerate해야 label 이 표시됨
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach((track) => track.stop())

      const allDevices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = allDevices
        .filter((d) => d.kind === 'videoinput')
        .map((d) => ({
          deviceId: d.deviceId,
          label: d.label || `카메라 ${d.deviceId.slice(0, 8)}`,
        }))

      setDevices(videoDevices)
    } catch (err) {
      setError('카메라 접근 권한이 필요합니다.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { devices, isLoading, error, loadDevices }
}

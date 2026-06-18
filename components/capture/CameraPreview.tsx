'use client'

import { RefObject } from 'react'

interface Props {
  videoRef: RefObject<HTMLVideoElement | null>
  isReady: boolean
  error: string | null
  isPortrait: boolean
}

export default function CameraPreview({ videoRef, isReady, error, isPortrait }: Props) {
  return (
    <div className={`relative w-full max-w-md mx-auto bg-gray-900 rounded-2xl overflow-hidden ${isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      {!isReady && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-2 animate-pulse">📷</div>
            <p className="text-sm text-gray-300">카메라 연결 중...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <div className="text-4xl mb-2">⚠️</div>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { clsx } from 'clsx'
import { useCamera } from '@/hooks/useCamera'
import { useCapture } from '@/hooks/useCapture'
import { useAppStore } from '@/store'
import CameraPreview from '@/components/capture/CameraPreview'
import CaptureButton from '@/components/capture/CaptureButton'
import CountdownOverlay from '@/components/capture/CountdownOverlay'

export default function CapturePage() {
  const router = useRouter()
  const {
    selectedCamera,
    selectedSize,
    photos,
    selectedIndices,
    isCapturing,
    countdown,
    toggleSelectPhoto,
    clearPhotos,
  } = useAppStore()

  const isPortrait = selectedSize.id === 'portrait-3x4'
  const cameraW = isPortrait ? 535 : 734
  const cameraH = isPortrait ? 734 : 535

  const { videoRef, isReady, error, captureFrame } = useCamera(selectedCamera, cameraW, cameraH)
  const { shoot, maxPhotos } = useCapture(captureFrame)

  const canProceed = selectedIndices.length === 4

  return (
    <main className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 shrink-0">
        <Link href="/settings" className="text-gray-400 hover:text-white text-xl px-1">←</Link>
        <h1 className="text-white font-semibold text-sm">촬영</h1>
        <button
          onClick={clearPhotos}
          className="text-gray-400 hover:text-red-400 text-xs px-1"
        >
          초기화
        </button>
      </div>

      {/* 바디: 카메라 영역 + 오른쪽 사이드 패널 */}
      <div className="flex flex-1 overflow-hidden">

        {/* 카메라 영역 */}
        <div className="flex flex-col flex-1 items-center justify-center p-3 gap-3 min-w-0">
          <div className="relative w-full max-w-sm">
            <CameraPreview videoRef={videoRef} isReady={isReady} error={error} isPortrait={isPortrait} />
            <CountdownOverlay countdown={countdown} />
          </div>
          <CaptureButton
            onCapture={shoot}
            isCapturing={isCapturing}
            isReady={isReady}
            currentCount={photos.length}
            maxCount={maxPhotos}
          />
        </div>

        {/* 오른쪽: 촬영된 사진 패널 */}
        <div className="w-44 sm:w-52 bg-gray-800 border-l border-gray-700 flex flex-col shrink-0">
          {/* 안내 텍스트 */}
          <div className="px-3 py-2 border-b border-gray-700 shrink-0">
            {photos.length === 0 ? (
              <p className="text-gray-500 text-xs leading-relaxed">
                촬영 버튼을 눌러<br />사진을 찍어보세요
              </p>
            ) : (
              <>
                <p className="text-gray-300 text-xs font-medium">
                  {photos.length}/{maxPhotos}장 촬영
                </p>
                <p className="text-pink-400 text-xs mt-0.5">
                  {selectedIndices.length}/4 선택됨
                </p>
              </>
            )}
          </div>

          {/* 썸네일 그리드 */}
          <div className="flex-1 overflow-y-auto p-2">
            {photos.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-600 text-xs text-center">사진 없음</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1.5">
                {photos.map((photo, index) => {
                  const isSelected = selectedIndices.includes(index)
                  const selectionOrder = selectedIndices.indexOf(index)
                  const isDisabled = !isSelected && selectedIndices.length >= 4

                  return (
                    <button
                      key={photo.id}
                      onClick={() => toggleSelectPhoto(index)}
                      disabled={isDisabled}
                      className={clsx(
                        'relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-150',
                        isSelected
                          ? 'border-pink-500 ring-1 ring-pink-400'
                          : 'border-transparent hover:border-pink-400',
                        isDisabled && 'opacity-30 cursor-not-allowed'
                      )}
                    >
                      <Image
                        src={photo.dataUrl}
                        alt={`사진 ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
                          <span className="w-5 h-5 bg-pink-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow">
                            {selectionOrder + 1}
                          </span>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* 하단: 다음 버튼 */}
          <div className="p-2 border-t border-gray-700 shrink-0 space-y-2">
            {canProceed ? (
              <button
                onClick={() => router.push('/decorate')}
                className="w-full bg-pink-500 text-white py-3 rounded-xl text-sm font-semibold hover:bg-pink-600 active:bg-pink-700 transition-colors shadow-lg"
              >
                꾸미기 →
              </button>
            ) : (
              <div className="text-center py-2">
                <p className="text-gray-500 text-xs">
                  {photos.length < 4
                    ? `${4 - photos.length}장 더 찍어주세요`
                    : selectedIndices.length < 4
                      ? `${4 - selectedIndices.length}장 더 선택하세요`
                      : ''}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  )
}

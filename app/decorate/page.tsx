'use client'

import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Konva from 'konva'
import dynamic from 'next/dynamic'
import LayoutSelector from '@/components/decorate/LayoutSelector'
import StickerPanel from '@/components/decorate/StickerPanel'
import DownloadButton from '@/components/decorate/DownloadButton'
import { useAppStore } from '@/store'
import { getDisplayDimensions } from '@/lib/canvasUtils'

const DecorateCanvas = dynamic(() => import('@/components/decorate/DecorateCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-[400px] h-[533px] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
      <p className="text-gray-400 text-sm">캔버스 로딩 중...</p>
    </div>
  ),
})

export default function DecoratePage() {
  const router = useRouter()
  const stageRef = useRef<Konva.Stage>(null)
  const {
    selectedIndices,
    selectedSize,
    selectedStickerInstanceId,
    removeSticker,
    clearStickers,
  } = useAppStore()

  const { width: canvasW, height: canvasH } = getDisplayDimensions(
    selectedSize.width,
    selectedSize.height
  )

  useEffect(() => {
    if (selectedIndices.length !== 4) {
      router.replace('/capture')
    }
  }, [selectedIndices.length, router])

  if (selectedIndices.length !== 4) return null

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm shrink-0">
        <Link href="/capture" className="text-gray-400 hover:text-gray-600 text-xl">←</Link>
        <h1 className="font-semibold text-gray-800">꾸미기</h1>
        <button
          onClick={clearStickers}
          className="text-sm text-gray-400 hover:text-red-400"
        >
          초기화
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 overflow-auto">
        {/* 캔버스 */}
        <div className="flex flex-col items-center justify-start gap-3 shrink-0">
          <DecorateCanvas stageRef={stageRef} />
        </div>

        {/* 컨트롤 패널 */}
        <div className="flex flex-col gap-4 lg:w-64 w-full">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-700 mb-2">레이아웃</p>
            <LayoutSelector />
          </div>

          <StickerPanel canvasWidth={canvasW} canvasHeight={canvasH} />

          {selectedStickerInstanceId && (
            <button
              onClick={() => removeSticker(selectedStickerInstanceId)}
              className="w-full bg-red-50 text-red-500 border border-red-200 py-2 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
            >
              선택한 스티커 삭제
            </button>
          )}

          <DownloadButton stageRef={stageRef} />

          <Link
            href="/"
            className="w-full text-center text-gray-400 py-2 hover:text-gray-600 text-sm"
          >
            처음으로
          </Link>
        </div>
      </div>
    </main>
  )
}

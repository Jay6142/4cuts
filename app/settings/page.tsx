'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PhotoSizeSelector from '@/components/settings/PhotoSizeSelector'
import CameraSelectModal from '@/components/settings/CameraSelectModal'
import FourCutPreview from '@/components/settings/FourCutPreview'
import { useAppStore } from '@/store'

export default function SettingsPage() {
  const router = useRouter()
  const { selectedCamera } = useAppStore()
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100">
        <Link href="/" className="text-gray-400 hover:text-gray-600 text-xl">←</Link>
        <h1 className="text-base font-semibold text-gray-800">촬영 설정</h1>
        <div className="w-6" />
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-5">

        {/* 4컷 미리보기 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <FourCutPreview />
        </div>

        {/* 사진 사이즈 */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <PhotoSizeSelector />
        </div>

        {/* 카메라 설정 */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h2 className="text-base font-semibold text-gray-700 mb-3">카메라 설정</h2>
          <button
            onClick={() => setIsCameraModalOpen(true)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-pink-300 transition-colors"
          >
            <span className="text-xl">📷</span>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-700">
                {selectedCamera ? selectedCamera.label : '카메라를 선택하세요'}
              </p>
              <p className="text-xs text-gray-400">
                {selectedCamera ? 'USB 카메라 연결됨' : '기본 카메라 사용'}
              </p>
            </div>
            <span className="ml-auto text-gray-300 text-sm">→</span>
          </button>
        </div>

        {/* 촬영 시작 */}
        <button
          onClick={() => router.push('/capture')}
          className="w-full bg-pink-500 text-white text-base font-semibold py-4 rounded-full hover:bg-pink-600 active:bg-pink-700 transition-all duration-200 shadow-md"
        >
          촬영 시작 →
        </button>

        <Link
          href="/"
          className="block w-full text-center text-gray-400 py-2 hover:text-gray-600 text-sm"
        >
          처음으로 돌아가기
        </Link>
      </div>

      <CameraSelectModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
      />
    </main>
  )
}

'use client'

import { useEffect } from 'react'
import { clsx } from 'clsx'
import { useDevices } from '@/hooks/useDevices'
import { useAppStore } from '@/store'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function CameraSelectModal({ isOpen, onClose }: Props) {
  const { selectedCamera, setSelectedCamera } = useAppStore()
  const { devices, isLoading, error, loadDevices } = useDevices()

  useEffect(() => {
    if (isOpen) loadDevices()
  }, [isOpen, loadDevices])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">카메라 선택</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-4 max-h-80 overflow-y-auto">
          {isLoading && (
            <p className="text-center text-gray-400 py-8">카메라 목록 불러오는 중...</p>
          )}
          {error && (
            <p className="text-center text-red-400 py-8">{error}</p>
          )}
          {!isLoading && !error && devices.length === 0 && (
            <p className="text-center text-gray-400 py-8">연결된 카메라가 없습니다.</p>
          )}
          {!isLoading && devices.map((device) => (
            <button
              key={device.deviceId}
              onClick={() => {
                setSelectedCamera(device)
                onClose()
              }}
              className={clsx(
                'w-full text-left px-4 py-3 rounded-xl mb-2 transition-colors',
                selectedCamera?.deviceId === device.deviceId
                  ? 'bg-pink-50 text-pink-700 font-medium'
                  : 'hover:bg-gray-50 text-gray-700'
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📷</span>
                <div>
                  <p className="font-medium text-sm">{device.label}</p>
                  <p className="text-xs text-gray-400">{device.deviceId.slice(0, 16)}...</p>
                </div>
                {selectedCamera?.deviceId === device.deviceId && (
                  <span className="ml-auto text-pink-500">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={loadDevices}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            새로고침
          </button>
          <button
            onClick={onClose}
            className="bg-pink-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-pink-600 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

'use client'

interface Props {
  onCapture: () => void
  isCapturing: boolean
  isReady: boolean
  currentCount: number
  maxCount: number
}

export default function CaptureButton({
  onCapture,
  isCapturing,
  isReady,
  currentCount,
  maxCount,
}: Props) {
  const isDone = currentCount >= maxCount

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onCapture}
        disabled={!isReady || isCapturing || isDone}
        className="w-20 h-20 rounded-full bg-white border-4 border-pink-500 flex items-center justify-center shadow-lg hover:bg-pink-50 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <div className="w-14 h-14 rounded-full bg-pink-500" />
      </button>
      <p className="text-sm text-gray-500 font-medium">
        {isDone ? '촬영 완료' : `${currentCount} / ${maxCount}`}
      </p>
    </div>
  )
}

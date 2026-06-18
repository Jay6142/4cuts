'use client'

interface Props {
  countdown: number | null
}

export default function CountdownOverlay({ countdown }: Props) {
  if (countdown === null) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl z-10">
      <span className="text-9xl font-bold text-white drop-shadow-lg animate-ping-once">
        {countdown}
      </span>
    </div>
  )
}

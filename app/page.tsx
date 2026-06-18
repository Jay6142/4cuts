import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl mb-6">📸</div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight">
          4컷 사진관
        </h1>
        <p className="text-lg text-gray-500 mb-2">
          나만의 특별한 4컷 사진을 찍어보세요
        </p>
        <p className="text-sm text-gray-400 mb-10">
          카메라 연결 후 10장 촬영 · 4장 선택 · 스티커로 꾸미기
        </p>

        <Link
          href="/settings"
          className="inline-flex items-center gap-2 bg-pink-500 text-white text-lg font-semibold px-10 py-4 rounded-full hover:bg-pink-600 active:bg-pink-700 transition-all duration-200 shadow-lg hover:shadow-pink-200 hover:shadow-xl"
        >
          시작하기
          <span className="text-xl">→</span>
        </Link>

        <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-400">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">🎞️</span>
            <span>10장 촬영</span>
          </div>
          <div className="text-gray-200">|</div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">✅</span>
            <span>4장 선택</span>
          </div>
          <div className="text-gray-200">|</div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">🎨</span>
            <span>꾸미기</span>
          </div>
          <div className="text-gray-200">|</div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">💾</span>
            <span>저장</span>
          </div>
        </div>
      </div>
    </main>
  )
}

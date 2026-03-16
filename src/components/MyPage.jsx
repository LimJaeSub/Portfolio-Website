function MyPage() {
  return (
    <section
      id="mypage"
      className="h-screen flex flex-col justify-center items-center text-center px-6 relative bg-white dark:bg-gray-900"
    >
      <div className="flex flex-col items-center gap-4">

        <p className="text-sm tracking-widest text-blue-600 font-medium uppercase">
          QA Engineer
        </p>

        <h1 className="text-6xl font-bold text-gray-900 dark:text-white leading-tight">
          임재섭
        </h1>


        <div className="flex gap-3 mt-6">
          <a
            href="https://github.com/LimJaeSub"
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:your@email.com"
            className="px-7 py-3 border border-gray-200 dark:border-gray-700 hover:border-gray-400 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
          >
            이메일 연락
          </a>
        </div>

      </div>

      {/* 아래 화살표 */}
      <a
        href="#experience"
        className="absolute bottom-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl animate-bounce transition-colors"
      >
        ↓
      </a>
    </section>
  )
}

export default MyPage
import ArrowButton from './ArrowButton'

function MyPage() {
  return (
    <section
      id="mypage"
      className="flex min-h-screen flex-col justify-center md:snap-start md:snap-always"
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-start gap-6 px-[clamp(20px,5vw,72px)] py-[88px]">
        <span className="text-[11px] font-medium tracking-[0.14em] text-accent-700 uppercase dark:text-accent-300">
          QA Automation Engineer
        </span>

        <h1 className="text-[clamp(46px,8vw,76px)] leading-[1.02] font-medium tracking-[-0.03em]">
          임재섭
        </h1>

        <p className="max-w-[44ch] text-[16px] leading-[1.65] text-text/70">
          한국정보통신기술협회(TTA) 소프트웨어 테스팅 엔지니어 · 2년. GS 인증 16건을
          진행하며 기능·부하·보안 테스트를 설계하고, Selenium과 Playwright로 자동화까지
          만듭니다.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="https://github.com/LimJaeSub"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-accent px-[10px] py-2 text-[14px] font-medium text-accent transition-colors hover:bg-accent/10"
          >
            GitHub
          </a>
          <a
            href="mailto:liso_o@naver.com"
            className="inline-flex items-center justify-center rounded-md border border-divider px-[10px] py-2 text-[14px] font-medium transition-colors hover:bg-text/5"
          >
            이메일 연락
          </a>
        </div>

        <p className="text-[12.5px] text-text/50">liso_o@naver.com</p>

        <div className="mt-12">
          <ArrowButton href="#experience" direction="down" />
        </div>
      </div>
    </section>
  )
}

export default MyPage

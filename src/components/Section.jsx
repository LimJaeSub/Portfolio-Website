import ArrowButton from './ArrowButton'

/* 메인 페이지 섹션 공통 골격 — 라벨 + 제목 + 본문, 좌측 정렬 */
function Section({ id, label, title, prev, next, children }) {
  return (
    <section
      id={id}
      className="flex min-h-screen flex-col justify-center md:snap-start md:snap-always"
    >
      <div className="mx-auto w-full max-w-[1180px] px-[clamp(20px,5vw,72px)] py-[88px]">
        {prev && (
          <div className="mb-8">
            <ArrowButton href={prev} direction="up" />
          </div>
        )}

        <h6 className="mb-2 text-[11px] font-medium tracking-[0.1em] text-accent-700 uppercase dark:text-accent-300">
          {label}
        </h6>
        <h2 className="mb-12 text-[clamp(28px,4vw,38px)] leading-[1.12] font-medium tracking-[-0.02em]">
          {title}
        </h2>

        {children}

        {next && (
          <div className="mt-12">
            <ArrowButton href={next} direction="down" />
          </div>
        )}
      </div>
    </section>
  )
}

export default Section

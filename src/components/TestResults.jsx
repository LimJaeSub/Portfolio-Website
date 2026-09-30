import { useEffect, useState } from 'react'

/*
 * CI가 갱신한 최신 E2E 결과를 보여준다 (Phase 5).
 * 이력 축적은 Firestore가 필요해서 Phase 8로 미뤘다 — 여기서는 최신 1회만 다룬다.
 *
 * 로딩·실패를 명시적으로 표현한다. 무한 스피너를 만들지 않는다 ([5. 에러 / 예외 처리])
 */
function TestResults({ src }) {
  const [state, setState] = useState({ status: 'loading' })

  useEffect(() => {
    if (!src) return
    let cancelled = false

    fetch(src, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status))
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setState({ status: 'ready', data })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' })
      })

    return () => {
      cancelled = true
    }
  }, [src])

  if (!src) return null

  if (state.status === 'loading') {
    return (
      <p id="test-results" className="text-[13px] text-text/50">
        테스트 결과를 불러오는 중…
      </p>
    )
  }

  if (state.status === 'error') {
    return (
      <p id="test-results" className="text-[13px] text-text/50">
        테스트 결과를 불러오지 못했습니다.
      </p>
    )
  }

  const r = state.data
  const allPassed = r.failed === 0 && r.total > 0

  return (
    <section id="test-results" className="rounded-md bg-surface p-8 shadow-(--elev-sm)">
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <h3 className="text-[16px] font-medium">E2E 테스트</h3>
        <span
          id="test-results-status"
          className={`inline-flex items-center rounded-[6px] px-[10px] py-[3px] text-[11px] tracking-[0.02em] ${
            allPassed
              ? 'bg-story-200 text-story-800 dark:bg-story-800 dark:text-story-200'
              : 'bg-bug-200 text-bug-800 dark:bg-bug-800 dark:text-bug-200'
          }`}
        >
          {allPassed ? '전체 통과' : `실패 ${r.failed}`}
        </span>
      </div>

      <p id="test-results-total" className="mb-6 text-[13px] text-text/60">
        전체 {r.total}개 중 통과 {r.passed}개
        {r.flaky > 0 && ` · 불안정 ${r.flaky}개`}
        {r.skipped > 0 && ` · 건너뜀 ${r.skipped}개`}
      </p>

      <ul className="mb-6 flex flex-col gap-3">
        {r.files.map((f) => (
          <li key={f.file} className="flex items-center gap-4 text-[13.5px] text-text/80">
            <span
              className={`h-2 w-2 flex-none rounded-full ${
                f.failed === 0 ? 'bg-story-800 dark:bg-story-200' : 'bg-bug-800 dark:bg-bug-200'
              }`}
            />
            <span className="flex-1">{f.file}</span>
            <span className="text-text/50">
              {f.passed}/{f.passed + f.failed + f.flaky + f.skipped}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-[11px] text-text/45">
        {r.browser} · {new Date(r.generatedAt).toLocaleString('ko-KR')} 실행
        {r.source === 'local' && ' · 로컬 실행'}
        {r.commit && ` · ${r.commit}`}
      </p>

      {r.runUrl && (
        <a
          href={r.runUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex text-[12px] font-medium text-accent hover:underline"
        >
          실행 기록 보기 ↗
        </a>
      )}
    </section>
  )
}

export default TestResults

import { useEffect, useState } from 'react'

/*
 * 화면 맨 위 한 줄이 데이터 상태를 전담한다. 같은 자리에서 글자만 바뀐다.
 *
 *   로딩 0 ~ 1.5초   보이지 않음 (보통 0.6초면 끝난다 — 번쩍였다 사라지면 거슬린다)
 *   로딩 1.5초 ~     "불러오는 중"   — 멈춘 건지 기다리는 중인지 알려준다
 *   실패(8초·거부)   "불러오지 못했습니다 + 다시 시도" (결정 56)
 *
 * 페이지 안이 아니라 맨 위에 고정한다. 홈에서는 프로젝트 섹션이 세 번째 화면이라
 * 그 안에 두면 첫 화면을 보는 방문자는 로딩도 실패도 알 수 없다.
 *
 * z-[45] — SideNav(z-40) 위, 테마 토글(z-50) 아래. 토글보다 위에 두지 않는다 (결정 41).
 *
 * id="fallback-banner"는 테스트가 읽는 신호다. 바꾸면 결정 60의 단언이 침묵한다.
 */
const SLOW_MS = 1500

const BAR =
  'fixed inset-x-0 top-0 z-[45] flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-b border-divider bg-surface/85 px-4 py-2 text-[13px] text-text/80 backdrop-blur'

function StatusBanner({ loading, fallback, onRetry }) {
  const [slow, setSlow] = useState(false)

  useEffect(() => {
    if (!loading) return
    const timer = setTimeout(() => setSlow(true), SLOW_MS)
    return () => clearTimeout(timer)
  }, [loading])

  if (fallback) {
    return (
      <div id="fallback-banner" role="status" className={BAR}>
        <span>최신 데이터를 불러오지 못했습니다. 저장된 내용을 표시합니다.</span>
        <button
          id="fallback-retry"
          onClick={onRetry}
          className="rounded-sm px-2 py-0.5 font-medium text-accent hover:bg-text/5"
        >
          다시 시도
        </button>
      </div>
    )
  }

  if (loading) {
    // 1.5초 전에도 화면 낭독기에는 바로 알린다 — 회색 상자는 낭독기에 아무 정보도 주지 않는다.
    // 다시 시도를 누른 경우엔 slow가 이미 true라 곧바로 보인다 (누른 직후의 반응)
    return (
      <div id="loading-banner" role="status" className={slow ? BAR : 'sr-only'}>
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
        <span>데이터를 불러오는 중입니다…</span>
      </div>
    )
  }

  return null
}

export default StatusBanner

/*
 * Firestore를 못 읽어 번들 데이터로 대신 그리는 중임을 알린다 (결정 56).
 *
 * 화면 맨 위에 고정한다. 페이지 안에 두면 홈에서는 프로젝트 섹션까지
 * 스크롤해야 보여서, 방문자가 옛 데이터를 보고 있다는 걸 모른다.
 *
 * z-[45] — SideNav(z-40) 위, 테마 토글(z-50) 아래. 토글보다 위에 두지 않는다 (결정 41).
 *
 * id="fallback-banner"는 테스트가 읽는 신호다. 바꾸면 결정 60의 단언이 침묵한다.
 */
function FallbackBanner({ onRetry }) {
  return (
    <div
      id="fallback-banner"
      role="status"
      className="fixed inset-x-0 top-0 z-[45] flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-b border-divider bg-surface/85 px-4 py-2 text-[13px] text-text/80 backdrop-blur"
    >
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

export default FallbackBanner

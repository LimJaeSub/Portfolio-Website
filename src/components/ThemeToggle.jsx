import { useDispatch, useSelector } from 'react-redux'
import { toggled } from '../store/themeSlice'

/* 클릭하면 전환될 모드의 아이콘을 보여준다 — 지금 상태가 아니라 결과를 가리킨다 */
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

/*
 * 테마는 전역이라 섹션 내비게이션(SideNav)과 분리해 독립 고정한다.
 * SideNav는 홈에만 있어서, 그 안에 두면 목록·상세 페이지에서 토글할 방법이 없다.
 * z-50 — 이 레이어 위에 오는 것을 두지 않는다.
 */
function ThemeToggle() {
  const mode = useSelector((state) => state.theme.mode)
  const dispatch = useDispatch()
  const isDark = mode === 'dark'

  return (
    <button
      id="theme-toggle"
      onClick={() => dispatch(toggled())}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className="fixed right-[clamp(10px,2vw,24px)] bottom-[clamp(10px,2vw,24px)] z-50 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-surface text-text/60 shadow-(--elev-md) transition-colors hover:text-accent"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export default ThemeToggle

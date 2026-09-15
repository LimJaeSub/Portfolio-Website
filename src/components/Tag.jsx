/*
 * 태그 배경은 램프 단계 자체가 반전되어야 해서
 * dark: 접두사를 쓰는 예외에 해당한다 (CLAUDE.md 8. 색상 적용 규칙)
 */
function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-[6px] bg-accent-200 px-[10px] py-[3px] text-[11px] tracking-[0.02em] text-accent-800 dark:bg-accent-800 dark:text-accent-100">
      {children}
    </span>
  )
}

export default Tag

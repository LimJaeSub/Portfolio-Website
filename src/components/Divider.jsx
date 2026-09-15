/* Nocturne 시그니처 — 양 끝 48px 구간이 투명으로 사라지는 구분선 */
function Divider() {
  return (
    <hr className="h-px border-0 bg-[linear-gradient(to_right,transparent,var(--color-divider)_48px,var(--color-divider)_calc(100%_-_48px),transparent)]" />
  )
}

export default Divider

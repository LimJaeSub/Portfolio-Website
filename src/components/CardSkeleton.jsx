// 로딩 중 카드 자리를 잡아두는 회색 상자. 스피너는 레이아웃을 흔든다 (결정 57).
// 홈 · 목록 두 곳에서 쓴다.
function CardSkeleton() {
  return <div className="h-[220px] animate-pulse rounded-md bg-surface" />
}

export default CardSkeleton

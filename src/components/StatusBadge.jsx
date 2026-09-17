/*
 * 프로젝트 상태 배지 (결정 39·40).
 * status 필드가 없으면 아무것도 그리지 않는다 — 기존 프로젝트에 소급 적용하지 않기 위함.
 * 태그와 마찬가지로 램프 단계가 반전돼야 해서 dark: 접두사를 쓰는 예외에 해당한다.
 */
const STATUS = {
  active: {
    label: '진행 중',
    className: 'bg-accent-200 text-accent-800 dark:bg-accent-800 dark:text-accent-100',
  },
  done: {
    label: '완료',
    className: 'bg-story-200 text-story-800 dark:bg-story-800 dark:text-story-200',
  },
  'on-hold': {
    label: '보류',
    className: 'bg-hold-200 text-hold-800 dark:bg-hold-800 dark:text-hold-200',
  },
}

function StatusBadge({ status }) {
  const entry = STATUS[status]
  if (!entry) return null

  return (
    <span
      className={`inline-flex items-center rounded-[6px] px-[10px] py-[3px] text-[11px] tracking-[0.02em] ${entry.className}`}
    >
      {entry.label}
    </span>
  )
}

export default StatusBadge

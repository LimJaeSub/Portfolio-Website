import { useState, useEffect } from 'react'

const sections = [
  { id: 'mypage', label: 'MyPage' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function SideNav() {
  const [active, setActive] = useState('mypage')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.6 }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="섹션 이동"
      className="fixed top-1/2 right-[clamp(10px,2vw,24px)] z-40 -translate-y-1/2"
    >
      {/* 리모콘 캡슐 */}
      <div className="flex flex-col items-center gap-[14px] rounded-full bg-surface px-4 py-6 shadow-(--elev-md)">
        {/* 상단 장식 */}
        <span className="h-[4px] w-[20px] rounded-full bg-neutral-300 dark:bg-neutral-800" />

        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            aria-label={label}
            aria-current={active === id ? 'true' : undefined}
            className={`h-[26px] w-[26px] rounded-full border transition-all ${
              active === id
                ? 'border-accent bg-accent-200 shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_18%,transparent)] dark:bg-accent-800'
                : 'border-neutral-300 bg-transparent hover:border-accent dark:border-neutral-800'
            }`}
          />
        ))}

        {/* 하단 장식 */}
        <span className="h-[18px] w-[18px] rounded-full border border-neutral-300 dark:border-neutral-800" />
      </div>
    </nav>
  )
}

export default SideNav

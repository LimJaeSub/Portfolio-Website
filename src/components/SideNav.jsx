import { useState, useEffect } from 'react'

function scrollToSection(id){
    const el = document.getElementById(id)
    if(el){
        el.scrollIntoView({ behavior: 'smooth' })
    }
}
const sections = [
  { id: 'mypage', label: 'MyPage' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
]

function SideNav() {
  const [active, setActive] = useState('mypage')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
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
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
      {/* 리모콘 컨테이너 */}
      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-5 flex flex-col items-center gap-4 shadow-lg">

        {/* 상단 장식 */}
        <div className="w-6 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 mb-1" />

        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() =>scrollToSection(id)}
            className="group flex flex-col items-center gap-1"
          >
            {/* 버튼 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                active === id
                  ? 'bg-blue-600 shadow-md shadow-blue-200 dark:shadow-blue-900'
                  : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-400'
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  active === id
                    ? 'bg-white'
                    : 'bg-gray-400 group-hover:bg-blue-500'
                }`}
              />
            </div>

            {/* 섹션 이름 */}
            <span
              className={`text-[9px] font-medium tracking-wide transition-colors ${
                active === id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-400'
              }`}
            >
              {label}
            </span>
          </button>
        ))}

        {/* 하단 장식 */}
        <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 mt-1" />
      </div>
    </nav>
  )
}

export default SideNav
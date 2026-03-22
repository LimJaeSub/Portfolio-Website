import { useState } from 'react'
import ArrowButton from './ArrowButton'

const projects = [
  {
    title: 'Wanted 자동화 테스트',
    summary: 'Wanted 홈페이지 Selenium 자동화 테스트',
    tags: ['Selenium', 'pytest', 'POM'],
    description: 'Wanted 홈페이지를 대상으로 Selenium WebDriver와 pytest를 활용한 E2E 자동화 테스트를 구현했습니다. POM 패턴을 적용해 유지보수성을 높였습니다.',
    github: 'https://github.com/LimJaeSub/QA-Portfolio-Wanted',
  },
  {
    title: 'CI/CD 파이프라인',
    summary: 'automationexercise.com 대상 CI/CD 구축',
    tags: ['Selenium', 'pytest', 'GitHub Actions', 'Allure'],
    description: 'GitHub Actions를 통한 CI/CD 파이프라인을 구축하고, Allure Report로 테스트 결과를 시각화했습니다.',
    github: 'https://github.com/LimJaeSub/qa-automation-pipeline',
  },
  {
    title: '포트폴리오 사이트',
    summary: '기획 → 개발 → 테스트 → 배포 SDLC 연습',
    tags: ['React', 'Tailwind', 'Playwright', 'Jira'],
    description: 'Jira/Confluence로 프로젝트를 관리하고 React로 개발, Playwright로 E2E 테스트까지 전체 SDLC를 직접 경험한 프로젝트입니다.',
    github: 'https://github.com/LimJaeSub/Portfolio-Website',
  },
]

function Modal({ project, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-lg w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          GitHub ↗
        </a>
      </div>
    </div>
  )
}

function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section
      id="projects"
      className="h-screen flex flex-col justify-center px-12 relative bg-white dark:bg-gray-900"
    >
      <p className="text-sm tracking-widest text-blue-600 font-medium uppercase mb-2">
        Projects
      </p>
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
        프로젝트
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.title}
            onClick={() => setSelected(project)}
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all"
          >
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              {project.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 위 화살표 */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <ArrowButton href="#experience" direction="up" />
      </div>

      {/* 아래 화살표 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ArrowButton href="#skills" direction="down" />
      </div>

      {/* 모달 */}
      {selected && (
        <Modal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}

export default Projects
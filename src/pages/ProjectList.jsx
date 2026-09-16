import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { projects, CATEGORY_LABELS } from '../data/projects'

const filters = [{ value: 'all', label: '전체' }, ...Object.entries(CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
)]

function ProjectList() {
  const [category, setCategory] = useState('all')

  const visible =
    category === 'all' ? projects : projects.filter((p) => p.category === category)

  return (
    <main className="mx-auto w-full max-w-[1180px] px-[clamp(20px,5vw,72px)] py-[88px]">
      <Link to="/" className="text-[13px] text-text/55 hover:text-accent">
        ← 홈
      </Link>

      <h6 className="mt-8 mb-2 text-[11px] font-medium tracking-[0.1em] text-accent-700 uppercase dark:text-accent-300">
        Projects
      </h6>
      <h1 className="mb-8 text-[clamp(28px,4vw,38px)] leading-[1.12] font-medium tracking-[-0.02em]">
        전체 프로젝트
      </h1>

      <div className="mb-12 flex flex-wrap gap-2">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            id={`filter-${value}`}
            onClick={() => setCategory(value)}
            className={`rounded-md border px-4 py-2 text-[13px] transition-colors ${
              category === value
                ? 'border-accent text-accent'
                : 'border-divider text-text/60 hover:bg-text/5'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  )
}

export default ProjectList

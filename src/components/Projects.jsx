import { Link } from 'react-router-dom'
import Section from './Section'
import ProjectCard from './ProjectCard'
import CardSkeleton from './CardSkeleton'

function Projects({ projects, loading }) {
  return (
    <Section id="projects" label="Projects" title="프로젝트" prev="#experience" next="#skills">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
        {/* 대표작은 최대 3개 (§7) — 자리도 3개만 잡는다 */}
        {loading
          ? [0, 1, 2].map((i) => <CardSkeleton key={i} />)
          : projects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>

      <Link
        id="link-all-projects"
        to="/projects"
        className="mt-6 inline-flex text-[13px] font-medium text-accent hover:underline"
      >
        전체 프로젝트 보기 →
      </Link>
    </Section>
  )
}

export default Projects

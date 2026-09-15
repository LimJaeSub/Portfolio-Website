import { Link } from 'react-router-dom'
import Section from './Section'
import ProjectCard from './ProjectCard'
import { featuredProjects } from '../data/projects'

function Projects() {
  return (
    <Section id="projects" label="Projects" title="프로젝트" prev="#experience" next="#skills">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <Link
        to="/projects"
        className="mt-6 inline-flex text-[13px] font-medium text-accent hover:underline"
      >
        전체 프로젝트 보기 →
      </Link>
    </Section>
  )
}

export default Projects

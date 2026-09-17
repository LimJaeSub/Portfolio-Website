import { Link } from 'react-router-dom'
import Tag from './Tag'
import StatusBadge from './StatusBadge'

function ProjectCard({ project }) {
  return (
    <Link
      id={`project-card-${project.id}`}
      to={`/projects/${project.id}`}
      className="block rounded-md bg-surface p-8 shadow-(--elev-sm) transition-shadow hover:shadow-[0_0_0_1px_var(--color-accent)]"
    >
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <p className="text-[16px] font-medium">{project.title}</p>
        <StatusBadge status={project.status} />
      </div>
      <p className="mb-6 text-[13.5px] leading-[1.55] text-text/60">{project.summary}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  )
}

export default ProjectCard

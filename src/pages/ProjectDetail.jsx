import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Tag from '../components/Tag'
import Divider from '../components/Divider'
import StatusBadge from '../components/StatusBadge'
import { getProject } from '../data/projects'

const ISSUE_TYPE_CLASS = {
  Story: 'bg-story-200 text-story-800 dark:bg-story-800 dark:text-story-200',
  Task: 'bg-task-200 text-task-800 dark:bg-task-800 dark:text-task-200',
  Bug: 'bg-bug-200 text-bug-800 dark:bg-bug-800 dark:text-bug-200',
}

/* On Hold는 판단해서 멈춘 것. 아직 손대지 않은 To Do와 구분한다 (결정 39) */
const COLUMNS = ['To Do', 'In Progress', 'On Hold', 'Done']

const COLUMN_DOT = {
  'To Do': 'bg-neutral-500',
  'In Progress': 'bg-task-800 dark:bg-task-200',
  'On Hold': 'bg-hold-800 dark:bg-hold-200',
  Done: 'bg-story-800 dark:bg-story-200',
}

/* 'In Progress' 같은 표시용 문자열을 id로 쓰기 위한 변환 — 'in-progress' */
function toId(value) {
  return value.toLowerCase().replace(/\s+/g, '-')
}

function ProjectDetail() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [sprint, setSprint] = useState('all')

  const project = getProject(id)

  if (!project) {
    return (
      <main className="mx-auto w-full max-w-[1180px] px-[clamp(20px,5vw,72px)] py-[88px]">
        <h1 className="mb-4 text-[28px] font-medium tracking-[-0.02em]">
          프로젝트를 찾을 수 없습니다
        </h1>
        <Link to="/projects" className="text-[13px] text-accent hover:underline">
          ← 프로젝트 목록
        </Link>
      </main>
    )
  }

  // 데이터가 없는 탭은 렌더링하지 않는다 (결정 기록 21)
  const hasDevLog = project.devLog?.length > 0
  const logEntries = hasDevLog ? project.devLog : (project.retrospective ?? [])

  const tabs = [
    { id: 'overview', label: '개요' },
    project.design && { id: 'design', label: '기획 · 설계' },
    project.issues?.length > 0 && { id: 'issues', label: '이슈 보드' },
    logEntries.length > 0 && { id: 'log', label: hasDevLog ? '개발 일지' : '회고' },
  ].filter(Boolean)

  const visibleIssues =
    sprint === 'all'
      ? project.issues
      : project.issues.filter((issue) => issue.sprint === sprint)

  const doneCount = project.issues.filter((issue) => issue.status === 'Done').length

  return (
    <main className="mx-auto w-full max-w-[1180px] px-[clamp(20px,5vw,72px)] py-[88px]">
      <Link to="/projects" className="text-[13px] text-text/55 hover:text-accent">
        ← 프로젝트 목록
      </Link>

      {/* 헤더 */}
      <div className="mt-8 mb-2 flex flex-wrap items-center gap-4">
        <h1 className="text-[clamp(28px,4vw,38px)] leading-[1.12] font-medium tracking-[-0.02em]">
          {project.title}
        </h1>
        <StatusBadge status={project.status} />
      </div>
      <p className="mb-4 text-[15px] text-text/60">{project.summary}</p>
      {project.period && <p className="mb-4 text-[12.5px] text-text/50">{project.period}</p>}

      <div className="mb-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="mb-12 flex flex-wrap gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-md border border-accent px-[10px] py-2 text-[14px] font-medium text-accent transition-colors hover:bg-accent/10"
          >
            GitHub ↗
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-md border border-divider px-[10px] py-2 text-[14px] font-medium transition-colors hover:bg-text/5"
          >
            배포 사이트 ↗
          </a>
        )}
      </div>

      <Divider />

      {/* 탭 */}
      <div className="my-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-md border px-4 py-2 text-[13px] transition-colors ${
              activeTab === tab.id
                ? 'border-accent text-accent'
                : 'border-divider text-text/60 hover:bg-text/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 개요 */}
      {activeTab === 'overview' && (
        <section>
          <p className="max-w-[70ch] text-[14px] leading-[1.7] text-text/80">
            {project.overview.description}
          </p>
          {project.overview.achievements.length > 0 && (
            <>
              <h3 className="mt-8 mb-4 text-[16px] font-medium">주요 학습 성과</h3>
              <ul className="flex flex-col gap-3">
                {project.overview.achievements.map((item) => (
                  <li key={item} className="flex gap-4 text-[13.5px] leading-[1.6] text-text/80">
                    <span className="mt-[11px] h-px w-[14px] flex-none bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}

      {/* 기획 · 설계 */}
      {activeTab === 'design' && (
        <section className="flex flex-col gap-8">
          {/* 아직 채우지 않은 항목은 제목만 남기지 않고 통째로 숨긴다 */}
          {project.design.purpose && (
            <div>
              <h3 className="mb-4 text-[16px] font-medium">무엇을 왜 만드는가</h3>
              <p className="max-w-[70ch] text-[14px] leading-[1.7] text-text/80">
                {project.design.purpose}
              </p>
            </div>
          )}

          {project.design.elements.length > 0 && (
            <div>
              <h3 className="mb-4 text-[16px] font-medium">포함 요소</h3>
              <ul className="flex flex-col gap-3">
                {project.design.elements.map((item) => (
                  <li key={item} className="flex gap-4 text-[13.5px] leading-[1.6] text-text/80">
                    <span className="mt-[11px] h-px w-[14px] flex-none bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.design.layout && (
            <div>
              <h3 className="mb-4 text-[16px] font-medium">레이아웃 &amp; UI</h3>
              <p className="max-w-[70ch] text-[14px] leading-[1.7] text-text/80">
                {project.design.layout}
              </p>
            </div>
          )}

          <div>
            <h3 className="mb-4 text-[16px] font-medium">완료 조건</h3>
            <ul className="flex flex-col gap-3">
              {project.design.acceptanceCriteria.map((criterion) => (
                <li
                  key={criterion.text}
                  className={`flex items-center gap-4 text-[13.5px] ${
                    criterion.done ? 'text-text/80' : 'text-text/45'
                  }`}
                >
                  <span
                    className={`flex h-[18px] w-[18px] flex-none items-center justify-center rounded-sm border text-[11px] ${
                      criterion.done
                        ? 'border-accent bg-accent-200 text-accent-800 dark:bg-accent-800 dark:text-accent-100'
                        : 'border-divider'
                    }`}
                  >
                    {criterion.done ? '✓' : ''}
                  </span>
                  {criterion.text}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 이슈 보드 */}
      {activeTab === 'issues' && (
        <section>
          <p className="mb-6 text-[13px] text-text/60">
            전체 {project.issues.length}개 중 Done {doneCount}개
          </p>

          {project.sprints.length > 1 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {['all', ...project.sprints].map((value) => (
                <button
                  key={value}
                  id={`sprint-${toId(value)}`}
                  onClick={() => setSprint(value)}
                  className={`rounded-sm border px-3 py-1 text-[12px] transition-colors ${
                    sprint === value
                      ? 'border-accent text-accent'
                      : 'border-divider text-text/60 hover:bg-text/5'
                  }`}
                >
                  {value === 'all' ? '전체' : value}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
            {COLUMNS.map((column) => {
              const columnIssues = visibleIssues.filter((issue) => issue.status === column)
              return (
                <div
                  key={column}
                  id={`column-${toId(column)}`}
                  className="flex flex-col gap-3"
                >
                  <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] text-text/55 uppercase">
                    <span className={`h-2 w-2 rounded-full ${COLUMN_DOT[column]}`} />
                    {column} ({columnIssues.length})
                  </p>

                  {columnIssues.map((issue) => (
                    <div key={issue.id} className="rounded-md bg-surface p-6 shadow-(--elev-sm)">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-[11px] tracking-[0.05em] text-text/50">
                          {issue.id}
                        </span>
                        <span
                          className={`rounded-sm px-2 py-[2px] text-[10px] ${ISSUE_TYPE_CLASS[issue.type]}`}
                        >
                          {issue.type}
                        </span>
                      </div>
                      <p className="mb-2 text-[13.5px] leading-[1.5]">{issue.title}</p>
                      <p className="text-[11px] text-text/45">{issue.sprint}</p>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/*
        개발 일지는 날짜순 타임라인 { date, title, content },
        회고는 날짜 없이 주제별 { topic, content } — 두 필드는 모양이 다르다
      */}
      {activeTab === 'log' && (
        <section className="flex flex-col gap-8">
          {logEntries.map((entry) => (
            <article key={hasDevLog ? `${entry.date}-${entry.title}` : entry.topic}>
              {hasDevLog && (
                <p className="mb-1 text-[11px] tracking-[0.08em] text-accent-700 dark:text-accent-300">
                  {entry.date}
                </p>
              )}
              <h3 className="mb-2 text-[16px] font-medium">
                {hasDevLog ? entry.title : entry.topic}
              </h3>
              <p className="max-w-[70ch] text-[13.5px] leading-[1.7] text-text/75">
                {entry.content}
              </p>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default ProjectDetail

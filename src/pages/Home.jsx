import MyPage from '../components/MyPage'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import SideNav from '../components/SideNav'

import { featuredProjects } from '../data/projects'

/*
 * 스크롤 스냅은 이 페이지에만 적용한다.
 * html에 걸면 목록·상세 페이지까지 따라오므로 래퍼에만 건다.
 * 모바일은 콘텐츠가 잘리지 않도록 스냅을 해제 (결정 기록 18)
 */
function Home() {
  return (
    <>
      <main className="h-screen snap-none overflow-y-auto md:snap-y md:snap-mandatory">
        <MyPage />
        <Experience />
        <Projects projects={featuredProjects} />
        <Skills />
      </main>
      <SideNav />
    </>
  )
}

export default Home

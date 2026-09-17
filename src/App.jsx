import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ThemeToggle from './components/ThemeToggle'
import Home from './pages/Home'
import ProjectList from './pages/ProjectList'
import ProjectDetail from './pages/ProjectDetail'
import { STORAGE_KEY } from './store/themeSlice'

import './App.css'

function App() {
  const mode = useSelector((state) => state.theme.mode)

  /*
   * 테마는 <html>에 적용한다 — 스크롤바와 color-scheme이 루트 기준으로 동작한다 (결정 35).
   * React 밖의 DOM이라 useEffect에서 처리한다.
   * 라우트마다 필요하므로 SideNav가 아니라 여기에 둔다 (상세 페이지엔 SideNav가 없다).
   */
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', mode === 'dark')
    root.style.colorScheme = mode

    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // 시크릿 모드·사이트 데이터 차단 — 저장만 못 할 뿐 동작에는 지장이 없다
    }
  }, [mode])

  return (
    <BrowserRouter>
      {/* 라우트 밖에 둔다 — 모든 페이지에서 같은 자리에 있어야 한다 */}
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

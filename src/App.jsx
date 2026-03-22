import './App.css'

// components
import MyPage from './components/MyPage.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'

function App() {
  return (
    <div className="app">
      <main>
        <MyPage />
        <Experience />
        <Projects />
        <Skills />
      </main>
    </div>
  )
}

export default App
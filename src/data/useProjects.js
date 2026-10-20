import { useEffect, useState } from 'react'
import { collection, getDocsFromServer, orderBy, query } from 'firebase/firestore'
import { db, withTimeout } from './firestore'
import { projects as bundledProjects } from './projects'

// 페이지는 데이터가 어디서 오는지 모른다. 출처를 바꿀 때는 이 파일만 고친다 (결정 54).
// Firestore는 id 알파벳순으로 돌려주므로 시드가 붙인 order로 정렬해야
// projects.js의 순서(= 화면 순서)가 유지된다.
export default function useProjects() {
  // 다시 시도할 때마다 올라간다. 결과에 몇 번째 시도의 응답인지 함께 담아,
  // 지금 시도와 다르면 '로딩 중'으로 취급한다
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState({ attempt: -1, projects: [], fallback: false })

  useEffect(() => {
    // 응답이 오기 전에 페이지를 떠나면 이미 사라진 화면에 값을 넣게 된다
    let cancelled = false

    // getDocs가 아니라 FromServer — getDocs는 서버에 못 닿으면 에러 대신 로컬 캐시를
    // 돌려준다. 첫 방문은 캐시가 비어 있어 '0건'이 오고 화면이 "프로젝트가 없습니다"라고
    // 말한다. 실패가 조용히 '없음'이 된다 (2026-10-19 확인). 서버 전용은 실패를 실패로 낸다
    withTimeout(window.location.pathname === '/projects' ? new Promise(() => {}) /* [데모] 목록만 무응답 */ : getDocsFromServer(query(collection(db, 'projects'), orderBy('order'))))
      .then((snapshot) => {
        if (cancelled) return
        setResult({ attempt, projects: snapshot.docs.map((doc) => doc.data()), fallback: false })
      })
      .catch((error) => {
        if (cancelled) return
        // 빈 화면 대신 번들 데이터를 보여주되, 폴백 중이라는 사실은 숨기지 않는다 (결정 56)
        console.warn('Firestore 읽기 실패 — 번들 데이터로 대체합니다', error)
        setResult({ attempt, projects: bundledProjects, fallback: true })
      })

    return () => {
      cancelled = true
    }
  }, [attempt])

  const loading = result.attempt !== attempt
  return {
    projects: loading ? [] : result.projects,
    loading,
    fallback: !loading && result.fallback,
    retry: () => setAttempt((n) => n + 1),
  }
}

import { useEffect, useState } from 'react'
import { doc, getDocFromServer } from 'firebase/firestore'
import { db, withTimeout } from './firestore'
import { getProject as getBundledProject } from './projects'

// 상세 페이지용 단건 조회. 출처를 바꿀 때는 이 파일만 고친다 (결정 54).
export default function useProject(id) {
  const [attempt, setAttempt] = useState(0)
  // 결과에 '어느 id의 몇 번째 시도'인지 함께 담는다. 주소가 바뀌거나 다시 시도하면
  // 이전 결과는 자동으로 '로딩 중'으로 취급된다 — effect 안에서 상태를 미리 비울 필요가 없다
  const key = `${id}#${attempt}`
  const [result, setResult] = useState({ key: null, project: null, fallback: false })

  useEffect(() => {
    let cancelled = false

    // getDoc이 아니라 FromServer — 캐시로 대신 답하면 실패가 '없음'으로 보인다 (useProjects 참고)
    withTimeout(getDocFromServer(doc(db, 'projects', id)))
      .then((snapshot) => {
        if (cancelled) return
        setResult({ key, project: snapshot.exists() ? snapshot.data() : null, fallback: false })
      })
      .catch((error) => {
        if (cancelled) return
        // '읽기 실패'를 '없음'으로 보여주지 않는다 — 번들 데이터로 대신하고 폴백임을 알린다 (결정 56)
        console.warn('Firestore 읽기 실패 — 번들 데이터로 대체합니다', error)
        setResult({ key, project: getBundledProject(id) ?? null, fallback: true })
      })

    return () => {
      cancelled = true
    }
  }, [id, key])

  const loading = result.key !== key
  return {
    project: loading ? null : result.project,
    loading,
    fallback: !loading && result.fallback,
    retry: () => setAttempt((n) => n + 1),
  }
}

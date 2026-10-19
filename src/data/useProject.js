import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firestore'

// 상세 페이지용 단건 조회. 출처를 바꿀 때는 이 파일만 고친다 (결정 54).
export default function useProject(id) {
  // 결과에 어떤 id의 응답인지 함께 담는다. 주소가 바뀌면 이전 결과는 자동으로
  // '아직 로딩 중'으로 취급된다 — effect 안에서 상태를 미리 비울 필요가 없다
  const [result, setResult] = useState({ id: null, project: null, error: null })

  useEffect(() => {
    let cancelled = false

    getDoc(doc(db, 'projects', id))
      .then((snapshot) => {
        if (cancelled) return
        setResult({ id, project: snapshot.exists() ? snapshot.data() : null, error: null })
      })
      .catch((error) => {
        if (cancelled) return
        setResult({ id, project: null, error })
      })

    return () => {
      cancelled = true
    }
  }, [id])

  const loading = result.id !== id
  return {
    project: loading ? null : result.project,
    loading,
    error: loading ? null : result.error,
  }
}

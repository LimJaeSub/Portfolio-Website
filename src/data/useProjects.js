import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from './firestore'

// 페이지는 데이터가 어디서 오는지 모른다. 출처를 바꿀 때는 이 파일만 고친다 (결정 54).
// Firestore는 id 알파벳순으로 돌려주므로 시드가 붙인 order로 정렬해야
// projects.js의 순서(= 화면 순서)가 유지된다.
export default function useProjects() {
  const [state, setState] = useState({ projects: [], loading: true, error: null })

  useEffect(() => {
    // 응답이 오기 전에 페이지를 떠나면 이미 사라진 화면에 값을 넣게 된다
    let cancelled = false

    getDocs(query(collection(db, 'projects'), orderBy('order')))
      .then((snapshot) => {
        if (cancelled) return
        setState({ projects: snapshot.docs.map((doc) => doc.data()), loading: false, error: null })
      })
      .catch((error) => {
        if (cancelled) return
        setState({ projects: [], loading: false, error })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}

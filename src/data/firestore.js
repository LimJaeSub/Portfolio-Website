import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// 이 값들은 비밀이 아니다 (결정 59·64).
// apiKey는 인증 토큰이 아니라 프로젝트 식별자이고, 번들에 어차피 포함된다.
// 접근 제어는 Firestore 보안 규칙이 담당한다.
// .env를 쓰지 않는 이유: GitHub Actions와 Vercel 양쪽에 등록해야 하고,
// 한쪽을 빠뜨리면 폴백이 켜져 CI가 영구 빨강이 된다 (결정 60).
const firebaseConfig = {
  apiKey: 'AIzaSyBdrf8lYnQOSRBtIeKz5RzwOu4zQVeiIxw',
  authDomain: 'portfolio-website-215e3.firebaseapp.com',
  projectId: 'portfolio-website-215e3',
  storageBucket: 'portfolio-website-215e3.firebasestorage.app',
  messagingSenderId: '190538832408',
  appId: '1:190538832408:web:4dec1089101050ca05016d',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

// 응답이 오지 않으면 스켈레톤이 끝나지 않는다. 시간을 정해 실패로 넘긴다 (결정 57)
const TIMEOUT_MS = 8000

export function withTimeout(promise) {
  let timer
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`Firestore 응답 없음 (${TIMEOUT_MS / 1000}초)`)),
      TIMEOUT_MS,
    )
  })
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
}

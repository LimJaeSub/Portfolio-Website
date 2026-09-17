import { createSlice } from '@reduxjs/toolkit'

export const STORAGE_KEY = 'theme'

/*
 * 이 판정 로직은 index.html의 FOUC 방지 인라인 스크립트와 **동일해야 한다**.
 * 어긋나면 첫 화면과 토글 상태가 불일치한다 (CLAUDE.md 8. 다크/라이트 토글 사양).
 *
 * localStorage 접근은 시크릿 모드·사이트 데이터 차단 환경에서 예외를 던지므로
 * 반드시 try/catch로 감싼다.
 */
export function readStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function resolveInitialTheme() {
  const stored = readStoredTheme()
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

const themeSlice = createSlice({
  name: 'theme',
  // 'system'을 두지 않는다 — 토글이 2상태인데 내부가 3상태면 모호해진다 (결정 34)
  initialState: { mode: resolveInitialTheme() },
  reducers: {
    toggled(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
    set(state, action) {
      state.mode = action.payload
    },
  },
})

export const { toggled, set } = themeSlice.actions
export default themeSlice.reducer

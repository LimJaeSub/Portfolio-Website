import { test, expect } from '@playwright/test'

import { projects } from '../src/data/projects.js'

test('홈이 열린다', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#mypage')).toBeVisible()
  await expect(page.locator('h1')).toContainText('임재섭')
})

test('프로젝트 목록이 열린다', async ({ page }) => {
  await page.goto('/projects')
  await expect(page.locator('h1')).toContainText('전체 프로젝트')
})

/*
 * 주소창 직접 접근 — vercel.json의 rewrites가 실제로 먹는지 보는 유일한 경로다.
 * 앱 안에서 링크를 타면 라우터가 처리해서 서버에 요청이 가지 않는다.
 */
test('상세 페이지에 직접 접근할 수 있다', async ({ page }) => {
  const target = projects[0]
  await page.goto(`/projects/${target.id}`)
  await expect(page.locator('h1')).toContainText(target.title)
})

test('없는 id는 안내 화면을 보여준다', async ({ page }) => {
  await page.goto('/projects/이런-프로젝트는-없다')
  await expect(page.locator('h1')).toContainText('프로젝트를 찾을 수 없습니다')
  // 빈 화면을 띄우지 않는다 — 돌아갈 링크가 있어야 한다 ([5. 에러 / 예외 처리])
  await expect(page.getByRole('link', { name: '프로젝트 목록' })).toBeVisible()
})

test('카드에서 상세로, 뒤로가기로 목록으로 돌아온다', async ({ page }) => {
  const target = projects[0]
  await page.goto('/projects')
  await page.locator(`#project-card-${target.id}`).click()
  await expect(page).toHaveURL(`/projects/${target.id}`)

  await page.goBack()
  await expect(page).toHaveURL('/projects')
})

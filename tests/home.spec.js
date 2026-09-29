import { test, expect } from '@playwright/test'

import { featuredProjects } from '../src/data/projects.js'

const SECTIONS = ['mypage', 'experience', 'projects', 'skills']

test('섹션 4개가 모두 있다', async ({ page }) => {
  await page.goto('/')
  for (const id of SECTIONS) {
    await expect(page.locator(`#${id}`)).toBeAttached()
  }
})

test('SideNav 버튼으로 각 섹션에 이동한다', async ({ page }) => {
  await page.goto('/')

  for (const id of SECTIONS) {
    await page.locator(`#nav-${id}`).click()
    // scrollIntoView가 smooth라 즉시 도달하지 않는다 — toBeInViewport가 재시도한다
    await expect(page.locator(`#${id}`)).toBeInViewport({ timeout: 5000 })
  }
})

test('홈에는 대표 프로젝트만 노출된다', async ({ page }) => {
  await page.goto('/')
  const cards = page.locator('#projects [id^="project-card-"]')
  await expect(cards).toHaveCount(featuredProjects.length)

  for (const p of featuredProjects) {
    await expect(page.locator(`#projects #project-card-${p.id}`)).toBeAttached()
  }
})

test('전체 보기 링크가 목록 페이지로 간다', async ({ page }) => {
  await page.goto('/')
  await page.locator('#link-all-projects').click()
  await expect(page).toHaveURL('/projects')
})

/*
 * 스냅이 실제로 "걸리는지"는 브라우저 물리 동작이라 테스트가 불안정하다.
 * 대신 전제 조건(컨테이너에 스냅이 적용됐는지)을 본다.
 * md(768px) 미만에서는 해제되므로 뷰포트를 명시한다 ([12. 알려진 이슈] 5번)
 */
test.describe('스크롤 스냅', () => {
  test('md 이상에서는 스냅이 걸려 있다', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')

    const snapType = await page
      .locator('main')
      .evaluate((el) => getComputedStyle(el).scrollSnapType)
    expect(snapType).toContain('y')
    expect(snapType).toContain('mandatory')
  })

  test('md 미만에서는 스냅이 해제된다', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 800 })
    await page.goto('/')

    const snapType = await page
      .locator('main')
      .evaluate((el) => getComputedStyle(el).scrollSnapType)
    expect(snapType).toBe('none')
  })
})

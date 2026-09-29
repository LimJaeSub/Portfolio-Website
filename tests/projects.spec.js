import { test, expect } from '@playwright/test'

import { projects, CATEGORY_LABELS } from '../src/data/projects.js'

/*
 * 데이터 주도 (결정 42) — 개수·제목을 여기 박아두지 않는다.
 * projects.js에 항목을 추가하면 테스트도 따라 늘어난다.
 */

/* 데이터가 있는 탭만 노출된다 (결정 21) — 화면이 아니라 데이터에서 기대값을 만든다 */
function expectedTabs(project) {
  const hasDevLog = project.devLog?.length > 0
  const logEntries = hasDevLog ? project.devLog : (project.retrospective ?? [])

  return {
    overview: true,
    design: Boolean(project.design),
    issues: project.issues?.length > 0,
    log: logEntries.length > 0,
  }
}

test('목록 페이지에 전 프로젝트가 노출된다', async ({ page }) => {
  await page.goto('/projects')
  const cards = page.locator('[id^="project-card-"]')
  await expect(cards).toHaveCount(projects.length)
})

for (const project of projects) {
  test.describe(project.title, () => {
    test('상세 페이지가 열린다', async ({ page }) => {
      await page.goto(`/projects/${project.id}`)
      await expect(page.locator('h1')).toContainText(project.title)
      await expect(page.getByText(project.summary)).toBeVisible()
    })

    test('데이터가 있는 탭만 노출된다', async ({ page }) => {
      await page.goto(`/projects/${project.id}`)

      for (const [tab, shouldExist] of Object.entries(expectedTabs(project))) {
        const locator = page.locator(`#tab-${tab}`)
        if (shouldExist) {
          await expect(locator, `${tab} 탭이 있어야 한다`).toBeVisible()
        } else {
          await expect(locator, `${tab} 탭이 없어야 한다`).toHaveCount(0)
        }
      }
    })

    test('탭을 전환하면 내용이 바뀐다', async ({ page }) => {
      await page.goto(`/projects/${project.id}`)

      if (expectedTabs(project).issues) {
        await page.locator('#tab-issues').click()
        await expect(page.locator('#column-to-do')).toBeVisible()
        await expect(page.locator('#column-done')).toBeVisible()

        const doneCount = project.issues.filter((i) => i.status === 'Done').length
        await expect(
          page.getByText(`전체 ${project.issues.length}개 중 Done ${doneCount}개`),
        ).toBeVisible()
      }

      if (expectedTabs(project).design) {
        await page.locator('#tab-design').click()
        await expect(page.getByText(project.design.purpose)).toBeVisible()
      }
    })

    /* 링크가 없으면 버튼을 그리지 않는다 (결정 40) */
    test('링크 버튼이 데이터와 일치한다', async ({ page }) => {
      await page.goto(`/projects/${project.id}`)
      const github = page.getByRole('link', { name: 'GitHub ↗' })
      const demo = page.getByRole('link', { name: '배포 사이트 ↗' })

      await expect(github).toHaveCount(project.github ? 1 : 0)
      await expect(demo).toHaveCount(project.demo ? 1 : 0)
    })
  })
}

test.describe('카테고리 필터', () => {
  for (const [value, label] of Object.entries(CATEGORY_LABELS)) {
    test(`${label} 필터가 해당 카테고리만 남긴다`, async ({ page }) => {
      await page.goto('/projects')
      await page.locator(`#filter-${value}`).click()

      const expected = projects.filter((p) => p.category === value)
      await expect(page.locator('[id^="project-card-"]')).toHaveCount(expected.length)

      for (const p of expected) {
        await expect(page.locator(`#project-card-${p.id}`)).toBeVisible()
      }
    })
  }

  test('전체 필터는 모두 되돌린다', async ({ page }) => {
    await page.goto('/projects')
    await page.locator('#filter-side').click()
    await page.locator('#filter-all').click()
    await expect(page.locator('[id^="project-card-"]')).toHaveCount(projects.length)
  })
})

import { test, expect } from '@playwright/test'

import { projects } from '../src/data/projects.js'

/*
 * 자기 자신의 테스트 결과를 표시하는 화면을 테스트한다.
 * 숫자를 하드코딩하면 실행할 때마다 깨지므로, 화면에 뜬 값이
 * public/test-results.json과 일치하는지만 본다.
 *
 * ⚠️ 실제 결과는 대체로 전부 통과라, 그 데이터만으로는
 *    실패 표시 경로가 검증되지 않는다 (passed와 total이 같아 구분이 안 된다).
 *    실패·에러 경로는 응답을 가로채 따로 확인한다.
 */

const withResults = projects.filter((p) => p.testResults)
const withoutResults = projects.filter((p) => !p.testResults)

const RESULTS_URL = '**/test-results.json'
const DETAIL_PATH = `/projects/${withResults[0]?.id}`

test('testResults가 있는 프로젝트가 정확히 하나 있다', () => {
  expect(withResults).toHaveLength(1)
})

for (const project of withResults) {
  test(`${project.title} — 실제 결과가 JSON과 일치한다`, async ({ page }) => {
    const res = await page.request.get(project.testResults)
    expect(res.ok(), 'test-results.json을 받을 수 있어야 한다').toBeTruthy()
    const data = await res.json()

    await page.goto(`/projects/${project.id}`)
    await expect(page.locator('#test-results')).toBeVisible()

    await expect(page.locator('#test-results-total')).toContainText(
      `전체 ${data.total}개 중 통과 ${data.passed}개`,
    )
    await expect(page.locator('#test-results-status')).toHaveText(
      data.failed === 0 ? '전체 통과' : `실패 ${data.failed}`,
    )

    for (const f of data.files) {
      await expect(page.locator('#test-results')).toContainText(f.file)
    }
  })
}

for (const project of withoutResults) {
  test(`${project.title} — 테스트 결과를 그리지 않는다`, async ({ page }) => {
    await page.goto(`/projects/${project.id}`)
    await expect(page.locator('#test-results')).toHaveCount(0)
  })
}

/* 실제 데이터로는 밟을 수 없는 경로 */
test.describe('응답을 가로채 확인하는 경로', () => {
  test('실패가 있으면 실패 개수를 그대로 보여준다', async ({ page }) => {
    await page.route(RESULTS_URL, (route) =>
      route.fulfill({
        json: {
          generatedAt: '2026-09-30T00:00:00.000Z',
          source: 'ci',
          commit: 'abc1234',
          runUrl: 'https://example.invalid/run/1',
          browser: 'chromium',
          total: 10,
          passed: 7,
          failed: 2,
          flaky: 1,
          skipped: 0,
          durationMs: 1234,
          files: [{ file: 'broken.spec.js', passed: 7, failed: 2, flaky: 1, skipped: 0 }],
        },
      }),
    )

    await page.goto(DETAIL_PATH)

    await expect(page.locator('#test-results-status')).toHaveText('실패 2')
    // passed를 total로 잘못 표시하면 여기서 걸린다
    await expect(page.locator('#test-results-total')).toContainText('전체 10개 중 통과 7개')
    await expect(page.locator('#test-results-total')).toContainText('불안정 1개')
    await expect(page.getByRole('link', { name: '실행 기록 보기 ↗' })).toBeVisible()
  })

  test('불러오지 못하면 실패했다고 말한다', async ({ page }) => {
    await page.route(RESULTS_URL, (route) => route.fulfill({ status: 500 }))

    await page.goto(DETAIL_PATH)

    // 빈 화면이나 무한 스피너를 두지 않는다 ([5. 에러 / 예외 처리])
    await expect(page.locator('#test-results')).toContainText('불러오지 못했습니다')
  })
})

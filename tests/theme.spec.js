import { test, expect } from '@playwright/test'

/*
 * 초기값 판정은 index.html의 FOUC 스크립트와 themeSlice가 같은 로직이어야 한다.
 * 어긋나면 첫 화면과 토글 상태가 불일치한다 ([8. 다크/라이트 토글 사양]).
 * Playwright의 colorScheme으로 시스템 설정을 흉내내 그 분기를 직접 확인한다.
 */

const html = (page) => page.locator('html')

test.describe('최초 진입 — 저장값이 없을 때', () => {
  test.describe('시스템이 다크', () => {
    test.use({ colorScheme: 'dark' })

    test('다크로 뜬다', async ({ page }) => {
      await page.goto('/')
      await expect(html(page)).toHaveClass(/dark/)
    })
  })

  test.describe('시스템이 라이트', () => {
    test.use({ colorScheme: 'light' })

    test('라이트로 뜬다', async ({ page }) => {
      await page.goto('/')
      await expect(html(page)).not.toHaveClass(/dark/)
    })
  })
})

test.describe('토글', () => {
  test.use({ colorScheme: 'dark' })

  test('누르면 모드가 바뀐다', async ({ page }) => {
    await page.goto('/')
    await expect(html(page)).toHaveClass(/dark/)

    await page.locator('#theme-toggle').click()
    await expect(html(page)).not.toHaveClass(/dark/)

    await page.locator('#theme-toggle').click()
    await expect(html(page)).toHaveClass(/dark/)
  })

  /* 저장값이 시스템 설정을 이긴다 */
  test('새로고침해도 유지된다', async ({ page }) => {
    await page.goto('/')
    await page.locator('#theme-toggle').click()
    await expect(html(page)).not.toHaveClass(/dark/)

    await page.reload()
    await expect(html(page)).not.toHaveClass(/dark/)
  })

  test('페이지를 옮겨도 유지된다', async ({ page }) => {
    await page.goto('/')
    await page.locator('#theme-toggle').click()

    await page.goto('/projects')
    await expect(html(page)).not.toHaveClass(/dark/)

    await page.goto('/projects/portfolio-website')
    await expect(html(page)).not.toHaveClass(/dark/)
  })

  /* SideNav가 없는 화면에서도 토글할 수 있어야 한다 (결정 41) */
  test('목록·상세 페이지에도 토글이 있다', async ({ page }) => {
    for (const path of ['/', '/projects', '/projects/portfolio-website']) {
      await page.goto(path)
      await expect(page.locator('#theme-toggle')).toBeVisible()
    }
  })

  test('color-scheme도 함께 갱신된다', async ({ page }) => {
    await page.goto('/')
    const dark = await html(page).evaluate((el) => getComputedStyle(el).colorScheme)
    expect(dark).toBe('dark')

    await page.locator('#theme-toggle').click()
    const light = await html(page).evaluate((el) => getComputedStyle(el).colorScheme)
    expect(light).toBe('light')
  })
})

import { defineConfig, devices } from '@playwright/test'

/*
 * 개발 서버가 아니라 프로덕션 빌드를 대상으로 돌린다.
 * 실제로 배포되는 산출물과 같은 것을 검증하기 위함이고,
 * CI(Phase 5 후반)에서도 같은 명령이 그대로 쓰인다.
 *
 * 포트 4173 — 5173/5174는 다른 프로젝트가 점유하는 경우가 있다 ([12. 인수인계 메모])
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  /*
   * CI에서는 JSON도 함께 뽑는다. 이 원본을 scripts/summarize-tests.js가
   * public/test-results.json으로 줄여서 사이트가 읽는다.
   * 원본은 러너의 절대 경로·스택이 들어 있어 그대로 공개하지 않는다.
   */
  reporter: process.env.CI
    ? [['list'], ['json', { outputFile: 'playwright-report.json' }]]
    : 'list',

  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },

  /*
   * 지금은 chromium만. webkit(Safari/iOS)은 color-mix와 스크롤 스냅 때문에
   * 추가할 값어치가 있지만, 필요해질 때 이 배열에 한 줄 더하고
   * `npx playwright install webkit`만 하면 된다.
   */
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})

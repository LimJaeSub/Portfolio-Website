import { test, expect } from '@playwright/test'

/*
 * ⚠️ 임시 파일 — CI 검증이 끝나면 삭제한다.
 *
 * 목적: 테스트가 실패했을 때 파이프라인이 정직하게 동작하는지 확인한다.
 * - 워크플로가 if: always()로 결과를 갱신하는가 (결정 50)
 * - 요약 JSON의 failed가 실제로 올라가는가
 * - 사이트 카드가 '전체 통과' 대신 실패 개수를 보여주는가
 *
 * 통과했을 때만 갱신하면 사이트가 마지막 성공을 계속 보여준다.
 * 그게 실제로 일어나지 않는지 눈으로 확인하기 위한 일부러 실패다.
 */
test('[임시] 일부러 실패 — CI 실패 경로 검증용', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('이 문구는 화면에 없다')
})

/*
 * Playwright JSON 리포터 원본 → 사이트가 읽을 요약본.
 *
 * 원본을 그대로 공개하지 않는 이유:
 * - CI 러너의 절대 경로, 에러 스택, 설정 전체가 들어 있다
 * - 39개 기준 수백 KB다. 사이트가 fetch하기에 과하다
 *
 * 실패해도 그대로 기록한다. 통과한 것처럼 꾸미지 않는다
 * ([8. 결과 공개] — 하드코딩한 가짜 결과를 넣지 않는다)
 *
 * 사용: node scripts/summarize-tests.js [입력] [출력]
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const inputPath = process.argv[2] ?? 'playwright-report.json'
const outputPath = process.argv[3] ?? 'public/test-results.json'

const report = JSON.parse(readFileSync(inputPath, 'utf8'))

/* 파일명만 남긴다 — 러너의 디렉토리 구조를 공개하지 않기 위함 */
const baseName = (file) => (file ?? '').split(/[\\/]/).pop()

const counts = { passed: 0, failed: 0, flaky: 0, skipped: 0 }
const byFile = new Map()

function walk(suite, file) {
  const current = suite.file ? baseName(suite.file) : file

  for (const spec of suite.specs ?? []) {
    /* Playwright는 재시도까지 포함해 tests[].status로 최종 판정을 준다 */
    const status = spec.tests?.[0]?.status ?? (spec.ok ? 'expected' : 'unexpected')
    const key =
      status === 'expected'
        ? 'passed'
        : status === 'flaky'
          ? 'flaky'
          : status === 'skipped'
            ? 'skipped'
            : 'failed'

    counts[key] += 1

    /* 파일별 집계도 상위와 같은 기준을 쓴다 — flaky를 통과로 세면 합이 total과 어긋난다 */
    if (!byFile.has(current)) {
      byFile.set(current, { file: current, passed: 0, failed: 0, flaky: 0, skipped: 0 })
    }
    byFile.get(current)[key] += 1
  }

  for (const child of suite.suites ?? []) walk(child, current)
}

for (const suite of report.suites ?? []) walk(suite, baseName(suite.file))

const total = counts.passed + counts.failed + counts.flaky + counts.skipped

const summary = {
  generatedAt: new Date().toISOString(),
  /* 로컬에서 돌린 결과가 CI 결과처럼 보이면 안 된다 */
  source: process.env.GITHUB_ACTIONS === 'true' ? 'ci' : 'local',
  commit: (process.env.GITHUB_SHA ?? '').slice(0, 7),
  runUrl:
    process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
      ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
      : '',
  browser: 'chromium',
  total,
  ...counts,
  durationMs: Math.round(report.stats?.duration ?? 0),
  files: [...byFile.values()].sort((a, b) => a.file.localeCompare(b.file)),
}

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, JSON.stringify(summary, null, 2) + '\n')

console.log(
  `${outputPath} — 전체 ${summary.total} / 통과 ${summary.passed} / 실패 ${summary.failed}` +
    (summary.flaky ? ` / flaky ${summary.flaky}` : ''),
)

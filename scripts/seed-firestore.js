/*
 * projects.js → Firestore `projects` 컬렉션 시드.
 *
 * Phase 6에서 Firestore는 읽기 전용 사본이고 원본은 projects.js다 (결정 52).
 * 그래서 시드는 덮어쓰기가 아니라 "미러링"이다:
 * - 문서는 set()으로 통째로 교체한다 — projects.js에서 지운 필드가 Firestore에 남지 않도록
 * - projects.js에 없는 문서는 지운다 — 남겨두면 목록에 유령 프로젝트가 뜬다
 *
 * Admin SDK를 쓰는 이유: 클라이언트 SDK는 보안 규칙(쓰기 차단)에 막힌다 (결정 62).
 * 서비스 계정 키는 규칙을 전부 우회하는 진짜 비밀이다. scripts/secrets/에만 둔다.
 *
 * 실행 전 현재 내용을 scripts/.backup/에 덤프한다.
 * git revert는 projects.js만 되돌리므로, Firestore를 되돌릴 때 이 덤프가 쓰인다 (결정 66).
 *
 * CI에서 돌리지 않는다. 사람이 의도적으로 돌린다.
 *
 * 사용: npm run seed              (백업 → 기록)
 *       npm run seed -- --dry-run  (백업만 하고 무엇이 바뀔지 출력)
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

import { projects } from '../src/data/projects.js'

const SECRETS_DIR = 'scripts/secrets'
const BACKUP_DIR = 'scripts/.backup'
const COLLECTION = 'projects'

const dryRun = process.argv.includes('--dry-run')

/* 파일명을 고정하지 않는다 — 콘솔 기본 이름에 키 id가 붙어 PC마다 달라진다 */
function findKeyFile() {
  let files = []
  try {
    files = readdirSync(SECRETS_DIR).filter((f) => f.endsWith('.json'))
  } catch {
    /* 폴더가 없으면 아래에서 0개로 처리 */
  }
  if (files.length !== 1) {
    console.error(
      `${SECRETS_DIR}/ 에 서비스 계정 키 JSON이 정확히 1개 있어야 합니다 (현재 ${files.length}개).\n` +
        'Firebase 콘솔 → 프로젝트 설정 → 서비스 계정 → 새 비공개 키 생성',
    )
    process.exit(1)
  }
  return join(SECRETS_DIR, files[0])
}

/* 같은 id가 둘이면 뒤엣것이 앞엣것을 조용히 덮는다. 시드 전에 막는다 */
const ids = projects.map((p) => p.id)
const duplicated = ids.filter((id, i) => ids.indexOf(id) !== i)
if (duplicated.length) {
  console.error(`projects.js에 중복된 id가 있습니다: ${[...new Set(duplicated)].join(', ')}`)
  process.exit(1)
}

const serviceAccount = JSON.parse(readFileSync(findKeyFile(), 'utf8'))
initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore()

const snapshot = await db.collection(COLLECTION).get()
const existing = Object.fromEntries(snapshot.docs.map((doc) => [doc.id, doc.data()]))

/* Windows 파일명에 ':'를 쓸 수 없다 */
const stamp = new Date().toISOString().replace(/[:.]/g, '-')
mkdirSync(BACKUP_DIR, { recursive: true })
const backupPath = join(BACKUP_DIR, `${stamp}.json`)
writeFileSync(backupPath, JSON.stringify(existing, null, 2) + '\n')
console.log(`백업  ${backupPath} (문서 ${snapshot.size}건)`)

const toDelete = Object.keys(existing).filter((id) => !ids.includes(id))
const toCreate = ids.filter((id) => !(id in existing))
const toReplace = ids.filter((id) => id in existing)

console.log(`생성  ${toCreate.length}건 ${toCreate.join(', ')}`)
console.log(`교체  ${toReplace.length}건 ${toReplace.join(', ')}`)
console.log(`삭제  ${toDelete.length}건 ${toDelete.join(', ')}`)

if (dryRun) {
  console.log('--dry-run: Firestore에 쓰지 않았습니다')
  process.exit(0)
}

/* 배치는 전부 성공하거나 전부 실패한다 — 절반만 반영된 상태를 만들지 않는다 */
const batch = db.batch()
for (const project of projects) {
  batch.set(db.collection(COLLECTION).doc(project.id), project)
}
for (const id of toDelete) {
  batch.delete(db.collection(COLLECTION).doc(id))
}
await batch.commit()

const after = await db.collection(COLLECTION).get()
console.log(`완료  Firestore ${COLLECTION} ${after.size}건 / projects.js ${projects.length}건`)
if (after.size !== projects.length) {
  console.error('문서 수가 projects.js와 다릅니다. 콘솔에서 확인하세요')
  process.exit(1)
}

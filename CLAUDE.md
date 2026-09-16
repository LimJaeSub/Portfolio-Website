# Portfolio Website — CLAUDE.md

> **이 문서를 먼저 읽고 작업을 시작할 것.**
> 이 프로젝트는 세션마다 다른 AI가 투입되는 것을 전제로 운영된다.
> 이 문서에 적히지 않은 결정은 존재하지 않는 것으로 간주한다.
> 프로젝트의 방향과 최종 판단은 개발자(임재섭)에게 있다.

---

# 0. 역할 분담

이 프로젝트는 PM 1명과 AI 도구 3종으로 운영된다.
**AI끼리는 서로 대화하지 못한다. 모든 연결은 이 문서를 거친다.**

| 역할 | 담당 | 주 업무 | 하지 않는 것 |
|---|---|---|---|
| PM / 최종 결정권자 | 임재섭 | 방향 결정, 우선순위, 최종 승인<br>AI 결과물 검수 (`git diff` 확인)<br>이 문서 갱신 | — (모든 최종 판단은 여기) |
| 기획 · 설계 | Claude 채팅 세션 | 요구사항 정리, 구조 설계<br>기술 선택지 비교, 트레이드오프 설명<br>이 문서 작성 | 코드 직접 작성/커밋<br>레포 수정 |
| 디자인 | Claude Design | 시안 탐색, 레이아웃·색상 확정<br>다크/라이트 비교 | 최종 코드 생산<br>(결과물은 "결정"이지 코드가 아님) |
| 개발 | Claude Code | 구현, 리팩토링, 커밋<br>이 문서의 규칙 준수 | 스택 임의 변경<br>요청 안 한 파일 수정<br>방향 결정 |

## 작업 흐름
```
임재섭 (PM)
   │  "이거 만들고 싶어"
   ▼
기획 세션 ──→ 디자인 (필요할 때만)
   │              │
   └──→ CLAUDE.md ←┘
           │
           ▼
      Claude Code ──→ 임재섭이 검수 ──→ 커밋
```

## 전제
- **디자인 도구의 산출물은 코드가 아니라 결정이다.**
  Claude Design이 만든 HTML을 그대로 가져다 쓰지 않는다.
  확정된 레이아웃/색상 규칙을 [8. 코딩 컨벤션]에 텍스트로 옮긴 뒤,
  Claude Code가 그 규칙대로 새로 구현한다.
- **검수는 위임되지 않는다.** AI는 자기가 틀렸는지 알지 못한다.
  커밋 전 `git diff`로 변경 범위를 반드시 확인한다.

---

# 1. AI 협업 규칙

> **이 섹션은 권고이지 강제가 아니다.**
> AI가 이 규칙을 항상 지킨다는 보장은 없다. 적어두면 지킬 확률이 올라가는 정도다.
> 반드시 막아야 하는 것은 문서가 아니라 도구로 강제한다
> (`.claude/settings.json`의 `deny`, `.gitignore` 등).
>
> **따라서 최종 방어선은 커밋 전 `git diff` 확인이다.**

## 작업 전
- 이 문서 전체를 읽고, 특히 **[3. 현재 상태]** 와 **[4. 결정 기록]** 을 확인한다.
- 요청받은 작업이 [4. 결정 기록]과 충돌하면, 진행하지 말고 먼저 알린다.

## 작업 중
- **요청받은 범위만 수정한다.** 요청하지 않은 파일은 건드리지 않는다.
  → 변경 범위가 커지면 사람이 검수할 수 없게 되고, 검수 없는 커밋은 사고로 이어진다
- 요청하지 않은 리팩토링, 코드 정리, 의존성 추가/변경을 하지 않는다.
  → 같은 이유. "더 나아 보여서" 한 변경이 가장 추적하기 어렵다
- 스택이나 구조를 바꿔야 한다고 판단되면, 실행하지 말고 이유와 함께 제안만 한다.
  → 프로젝트 전체 방향은 이 문서와 PM만 알고 있다. 국소 최적이 전체 최적이 아니다
- 요구사항이 애매하면 추측해서 진행하지 말고 질문한다.
  → 잘못된 방향으로 완성된 코드는 미완성 코드보다 되돌리기 어렵다
- 기존 컴포넌트/데이터를 재사용할 수 있는지 먼저 확인한다.

## 작업 후
- 변경한 파일 목록과 변경 이유를 요약해 보고한다.
- 새로운 결정이 발생했다면 [4. 결정 기록]에 추가할 내용을 제안한다.
- [3. 현재 상태]를 갱신할 내용을 제안한다.
- 막혔거나 선택한 것이 있으면 `portfolio.md`에 추가할 내용을 제안한다.

> 마지막 세 줄이 이 문서가 살아 있게 하는 장치다.
> 갱신되지 않는 문서는 다음 세션에 **잘못된 정보**를 준다. 없느니만 못하다.

## 하지 말 것
- 임의로 다른 UI 라이브러리 도입 (MUI, Chakra, styled-components 등)
- Tailwind 대신 인라인 스타일 / 별도 CSS 파일 사용
- `src/data/` 밖에 데이터 하드코딩
- 기존 파일 삭제 또는 대규모 구조 변경
- 테스트 코드를 통과시키기 위해 기능 코드를 임의 수정
- 실제로 진행하지 않은 이슈/일지를 데이터에 채워 넣기

---

# 2. 프로젝트 개요

개인 포트폴리오 웹사이트. 단순 포트폴리오가 아닌 지속적으로 발전시킬 나만의 플랫폼.
QA Automation Engineer로서의 경력/프로젝트를 소개한다.

이 사이트의 핵심 차별점은 **각 프로젝트의 SDLC 전 과정을 사이트 안에서 직접 보여주는 것**이다.
Jira/Confluence 링크를 거는 대신, 기획 문서 · 이슈 보드 · 개발 일지를
프로젝트 상세 페이지에 자체 구현해서 노출한다.

## 기술 스택
- Frontend: React (Vite) + Tailwind CSS v4
- 라우팅: React Router
- 상태관리: Redux Toolkit (예정 - 다크모드)
- 인증/DB: Firebase Auth + Firestore (예정)
- 테스트: Playwright E2E
- CI/CD: GitHub Actions
- 배포: Vercel

## 개발자 정보
- 이름: 임재섭
- GitHub: https://github.com/LimJaeSub
- 이메일: liso_o@naver.com
- 직함: QA Automation Engineer

---

# 3. 현재 상태

> **매 세션 시작 시 여기를 먼저 확인. 작업 종료 시 갱신.**

## 최종 갱신
2026-09-16

## 완료된 작업
- [x] Vite + React 프로젝트 초기 셋업
- [x] Tailwind CSS v4 적용
- [x] GitHub 레포 연결
- [x] MyPage (Hero) 섹션 구현
- [x] Experience 섹션 구현
- [x] Projects 섹션 구현 (카드 + 모달)
- [x] Skills 섹션 구현
- [x] SideNav 구현 (리모콘 스타일, IntersectionObserver)
- [x] ArrowButton 공통 컴포넌트 분리
- [x] CSS Scroll Snap 적용
- [x] 디자인 방향 확정 — Nocturne 디자인 시스템
- [x] 프로젝트 확장 구조 설계 (대표작 분리 + 카테고리)
- [x] Nocturne 디자인 시스템으로 리뉴얼 (토큰 정의 + 전 컴포넌트 적용)
- [x] React Router 도입 (`/projects`, `/projects/:id`)
- [x] 프로젝트 상세 페이지 구현 (탭 4종, 데이터 없으면 미노출)
- [x] 데이터를 `src/data/projects.js`로 이관
- [x] **Vercel 배포** (Phase 3)

## 진행 중 / 다음 작업
- [ ] **다크/라이트 토글 (Redux Toolkit)** ← 현재 여기 (Phase 4)
- [ ] Playwright E2E 테스트 (Phase 5)

## 미확정 사항

> **임재섭 확인이 필요한 것** (Claude Code는 확인 전까지 문서의 제안대로 진행)
- 테마 토글 버튼 위치 — SideNav 하단 제안. 상세 페이지에는 SideNav가 없어 그곳 배치 미정
- 테스트 셀렉터 전략 — 역할 기반 + `data-testid` 제안 ([8. 테스트 셀렉터 전략])

> **내용을 채워야 하는 것**
- 기존 프로젝트 2개(Wanted, CI/CD)의 회고 내용 작성
- 대표 프로젝트 3개 선정
- 실무 프로젝트를 언제 추가할지

> **정리해야 하는 것**
- `portfolio.md` ↔ `projects.js` 이중 관리 — Phase 6 Firestore 이관 시 자연히 해소될지 검토

---

# 4. 결정 기록 (Decision Log)

> 이미 내린 결정과 그 이유. **여기 적힌 내용은 재논의하지 않는다.**
> 변경이 필요하다고 판단되면 실행하지 말고 먼저 제안할 것.

| # | 결정 | 이유 |
|---|------|------|
| 1 | Vite + React 사용 (CRA/Next.js 아님) | CRA는 구식, Next.js는 SSR이 불필요한 이 규모에 과함. Vite가 가볍고 Playwright 연동도 용이 |
| 2 | Tailwind CSS 사용 (styled-components 아님) | 설정 없이 바로 쓸 수 있고 번들 사이즈 이점. 동적 스타일링도 충분히 커버됨<br>⚠️ 도입 당시 근거였던 "`dark:` 접두사로 다크모드 구현"은 **결정 16 이후 폐기**됐다. 현재는 CSS 변수 교체 방식이다 ([8. 색상 적용 규칙]) |
| 3 | Vite 7 / plugin-react 4로 다운그레이드 | Vite 8은 Tailwind 미지원. 최신 버전 유지보다 안정적 동작 우선 |
| 4 | 우측 고정 사이드 Nav (상단 헤더 아님) | 풀페이지 스크롤 구조와 어울리고 개성 있는 레이아웃 |
| 5 | CSS Scroll Snap으로 섹션 단위 스크롤 | 스크롤 1회에 섹션 1개 이동. 라이브러리 없이 CSS만으로 구현 가능 |
| 6 | 화살표는 ArrowButton 공통 컴포넌트로 분리 | 모든 섹션에서 재사용. 디자인 변경 시 한 곳만 수정 |
| 7 | 페이지 이동은 `scrollIntoView` 사용 (`href="#id"` 아님) | 앵커 링크는 즉시 점프해서 이동하는 느낌이 없음. smooth 동작 필요 |
| 8 | 프로젝트 상세는 **별도 페이지** (모달 아님) | 기획/이슈/일지까지 담기에 모달은 공간이 부족. React Router 경험도 함께 확보 |
| 9 | Jira/Confluence 링크 대신 **사이트 내 자체 구현** | 외부 링크는 방문자가 볼 수 없음. SDLC 전 과정을 사이트 안에서 보여주는 것이 이 프로젝트의 차별점 |
| 10 | 이슈는 **칸반 보드 형태**로 표시 | 단순 테이블보다 실제 Jira 보드의 느낌을 살릴 수 있음 |
| 11 | 데이터는 `src/data/projects.js`에 하드코딩으로 시작 | Firestore는 **Phase 6**에서 도입. 스키마를 먼저 확정하고 그대로 이관 |
| 12 | 다크모드는 Redux Toolkit으로 구현 예정 | 전역 상태 관리가 필요한 기능. Redux 사용 경험을 포트폴리오에 포함 |
| 13 | 백엔드 직접 구축 대신 Firebase 사용 예정 | 서버 관리 부담 없이 인증/DB 확보. REST API 형태라 API 테스트도 가능 |
| 14 | 배포는 Vercel | GitHub 연동으로 push 시 자동 배포. 설정 간단하고 무료 |
| 15 | ~~디자인 컨셉: 테스트 리포트 스타일~~ → **폐기** | Claude Design 목업을 보고 변경. pytest 출력 형식은 컨셉으로는 좋았으나, 실제 시안에서 미니멀 다크 쪽이 완성도가 높았음 |
| 16 | 디자인 시스템: **Nocturne** (Claude Design 생성) | Inter 폰트, 블러플 accent, 페이드 구분선. 라이트/다크 토큰 2벌. 상세는 [8. 코딩 컨벤션] |
| 17 | 다크/라이트는 **토글 기능**으로 제공 | 한쪽 고정이 아닌 사용자 선택. Redux Toolkit으로 전역 상태 관리 (결정 12와 연결) |
| 18 | 풀페이지 스크롤(scroll snap) 유지 | 콘텐츠가 적을 때 각 섹션이 화면을 다 쓰므로 휑해 보이지 않음. 단 상세 페이지는 제외, 모바일은 스냅 해제 |
| 19 | 상단 고정 헤더를 두지 않음 | 목업에는 있었으나 우측 리모콘 Nav와 기능이 중복됨 |
| 20 | 전화번호를 사이트에 노출하지 않음 | 공개 배포 사이트라 크롤러에 수집됨. 연락은 이메일로 일원화 |
| 21 | 프로젝트 상세 탭은 **프로젝트마다 다르게** 노출 | 기존 3개 중 2개는 SDLC 산출물이 없음. 없는 이슈/스프린트를 지어내지 않는다. [6. 프로젝트 상세 페이지] 참고 |
| 22 | 기존 프로젝트는 '개발 일지' 대신 **'회고'** | 사후 작성임을 이름에 드러내어 정직하게 표기 |
| 23 | 홈에는 **대표 프로젝트 3개만**, 전체는 `/projects` 별도 페이지 | 홈 섹션이 `h-screen`이라 카드가 늘면 레이아웃이 깨짐. 프로젝트 증가가 확정된 미래이므로 미리 분리 |
| 24 | 프로젝트 분류: `work` / `automation` / `side` | 실무·자동화·사이드는 성격이 달라 한 덩어리로 보면 읽기 어려움. 목록 페이지 필터로 사용 |
| 25 | 실무 프로젝트는 도구·기법·역할까지만 기술 | 고객사 정보 보호. 발견한 결함 상세는 판단이 애매하면 제외 |
| 26 | 각 프로젝트 레포에 **`portfolio.md`** 를 두어 인계 | 프로젝트 레포에는 이 CLAUDE.md가 없으므로, 템플릿 파일 자체가 작성 규칙을 담도록 함. 구조가 스키마와 같아 옮길 때 기계적 변환만 필요 |
| 27 | 개발 일지는 **막힌 순간에** 기록 | 사후에 몰아 쓰면 에러 메시지·시도 과정 등 세부사항이 사라짐. 그 세부사항이 일지의 가치 |
| 28 | 상태 관리 경계: **페이지 이동해도 유지돼야 하면 전역** | 기준이 없으면 세션마다 판단이 달라짐. 애매하면 지역에서 시작 — 처음부터 전역에 두면 되돌리기 어려움 |
| 29 | 컴포넌트는 데이터를 직접 import 하지 않고 **페이지가 props로 내림** | Firestore 이관(Phase 6) 시 페이지만 수정하면 되도록 |
| 30 | 목업 HTML보다 **결정 기록이 우선** | 목업에는 확정된 결정과 충돌하는 부분이 있음(상단 헤더, 모달 등). 참고 자료이지 정답이 아님 |
| 31 | 그림자만 `@theme` 밖의 일반 CSS 변수(`--elev-*`)로 둔다 | Tailwind v4는 `shadow-*` 유틸에 `@theme` 값을 `var()`가 아니라 문자열로 인라인한다. `@theme`에 넣으면 `.dark`에서 그림자가 바뀌지 않는다. `shadow-(--elev-md)` 형태로 참조해야 런타임 교체가 동작 |
| 32 | 이슈 타입 색상(Story/Task/Bug)은 자체 토큰으로 정의 | Nocturne 팔레트에 초록·빨강이 없다. Tailwind 기본 색상 직접 사용 금지([8. 코딩 컨벤션])를 지키려고 `--color-story/task/bug`의 200·800 단계 6개를 accent 램프와 같은 명도로 추가. 2026-09-16 디자인 승인 |
| 33 | 섹션 높이는 `h-screen`이 아니라 `min-h-screen` | 내용이 많은 섹션(Experience)이 잘리는 대신 늘어나게 한다. 스냅은 `snap-start`라 섹션이 뷰포트보다 커도 시작점에 붙는다 (결정 18의 구현 세부) |
| 34 | 테마 상태는 `'dark' \| 'light'` 2값. `'system'`을 두지 않음 | 토글 버튼이 2상태인데 내부가 3상태면 "지금 뭘 누른 건가"가 모호해진다. 시스템 설정은 최초 진입 기본값을 정할 때만 참조 |
| 35 | `.dark` 클래스는 `<body>`가 아닌 `<html>`에 | 스크롤바 색상과 `color-scheme`이 루트 기준으로 동작한다 |
| 36 | 테스트 셀렉터를 **Phase 4에서 미리** 부여 | Phase 5에 몰아서 하면 이미 만든 컴포넌트를 전부 다시 열어야 한다. 만들 때 함께 넣으면 재작업이 없다 |

---

# 5. 프로젝트 구조

```
src/
├── components/
│   ├── MyPage.jsx           # Hero 섹션 - 자기소개
│   ├── Experience.jsx       # 경력 & 자격증
│   ├── Projects.jsx         # 프로젝트 카드 그리드
│   ├── Skills.jsx           # 기술 스택 카드 그리드
│   ├── SideNav.jsx          # 우측 고정 네비게이션
│   ├── ArrowButton.jsx      # 재사용 화살표 버튼
│   ├── Section.jsx          # 메인 섹션 공통 골격 (라벨 + 제목 + 위아래 화살표)
│   ├── ProjectCard.jsx      # 프로젝트 카드 (홈 · 목록 페이지 공용)
│   ├── Tag.jsx              # 기술 스택 태그
│   └── Divider.jsx          # 페이드 구분선 (Nocturne 시그니처)
├── pages/
│   ├── Home.jsx             # 메인 (섹션 4개 스크롤)
│   ├── ProjectList.jsx      # 전체 프로젝트 목록 + 카테고리 필터
│   └── ProjectDetail.jsx    # 프로젝트 상세 (탭)
├── data/
│   └── projects.js          # 프로젝트 데이터 (하드코딩)
├── store/                   # Phase 4에서 생성
│   ├── index.js             # configureStore
│   └── themeSlice.js        # 다크/라이트 상태
├── App.jsx                  # 라우터 설정
├── App.css                  # @import "tailwindcss" + 디자인 토큰
└── main.jsx                 # Provider 래핑 + App.css import
```

프로젝트 루트에 `docs/` — 참고 자료 ([11. 레퍼런스] 참고)
```
portfolio.md                 # 이 프로젝트의 기획·이슈·개발 일지
docs/
├── mockup.html              # Claude Design 목업 (참고용)
└── nocturne/
    ├── styles.css           # 다크 토큰 원본
    └── styles-light.css     # 라이트 토큰 원본
```

## 라우팅
```
/                      → Home (메인 페이지)
/projects              → ProjectList (전체 프로젝트 목록)
/projects/:id          → ProjectDetail (프로젝트 상세)
```
- 홈의 Projects 섹션에는 **대표 프로젝트만** 노출 (`featured: true`)
- "전체 보기" 링크로 `/projects` 이동
- `:id`는 projects.js의 `id` 값과 매칭
- **스크롤 스냅은 홈에만 적용.** 목록·상세 페이지는 일반 스크롤

## 메인 페이지 섹션 구성
- MyPage (Hero) - 자기소개
- Experience - 경력 & 자격증
- Projects - **대표 프로젝트 3개** + 전체 보기 링크
- Skills - 기술 스택

---

## 데이터 흐름
```
src/data/projects.js
    ↓ import
pages/Home.jsx  →  featured: true 인 항목만 필터 → components/Projects.jsx
pages/ProjectList.jsx  →  전체 + category 필터
pages/ProjectDetail.jsx  →  useParams()의 id로 단건 조회
```
- 컴포넌트는 데이터를 **직접 import 하지 않는다.** 페이지가 import해서 props로 내린다
  (Firestore 이관 시 페이지만 수정하면 되도록)
- 예외: `SideNav`처럼 데이터가 아닌 상수는 컴포넌트 안에 두어도 된다

## 상태 관리 경계

**전역(Redux Toolkit)에 두는 것**
- 여러 페이지에 걸쳐 유지돼야 하는 값
- 현재: 테마(다크/라이트) 뿐
- 예정: 관리자 로그인 상태 (Phase 6)

**지역(`useState`)에 두는 것**
- 한 컴포넌트 안에서만 쓰이고 언마운트되면 사라져도 되는 값
- 탭 선택, 필터 선택, 모달 열림 여부, 스크롤 활성 섹션 등

> **판단 기준: 페이지를 이동해도 유지돼야 하는가.**
> 아니면 지역 상태다. 애매하면 지역에서 시작하고, 필요해지면 그때 올린다.
> 처음부터 전역에 두면 되돌리기 어렵다.

## 컴포넌트 분리 기준
- 같은 UI가 **2곳 이상**에서 쓰이면 분리 (ArrowButton이 이 경우)
- 한 파일이 **200줄**을 넘으면 분리를 검토
- 단, 한 곳에서만 쓰이는 것을 미리 분리하지 않는다

## 에러 / 예외 처리
- **존재하지 않는 프로젝트 id** (`/projects/없는거`)
  → "프로젝트를 찾을 수 없습니다" 안내 + 목록으로 돌아가는 링크. 빈 화면을 띄우지 않는다
- **데이터 필드 누락** (`issues`가 없는 프로젝트 등)
  → 해당 탭 자체를 렌더링하지 않는다. 빈 탭이나 "데이터 없음"을 표시하지 않는다
- **Firestore 도입 후** (Phase 6~)
  → 로딩 상태와 실패 상태를 명시적으로 표현한다. 무한 스피너를 만들지 않는다

---

# 6. 프로젝트 상세 페이지 (핵심 기능)

프로젝트 하나당 최대 4개 탭으로 구성. 각 탭이 실무 도구의 역할을 대신한다.

## ⚠️ 탭은 프로젝트마다 다르게 노출한다

기존 프로젝트 2개는 SDLC 산출물이 실제로 존재하지 않는다.
**없는 이슈·스프린트·완료조건을 만들어내지 않는다.** 데이터가 없으면 탭을 렌더링하지 않는다.

| 프로젝트 | 개요 | 기획·설계 | 이슈 보드 | 기록 |
|---|---|---|---|---|
| Wanted 자동화 테스트 | ✅ | — | — | 회고 |
| CI/CD 파이프라인 | ✅ | — | — | 회고 |
| 포트폴리오 사이트 | ✅ | ✅ | ✅ | 개발 일지 |

앞으로 진행하는 프로젝트는 4개 탭을 모두 채우는 것을 기본으로 한다.

## 탭 1. 개요 (Overview)
- 프로젝트 제목, 한 줄 설명
- 기술 스택 태그
- 진행 기간
- GitHub / 배포 URL 링크
- 주요 학습 성과

## 탭 2. 기획 · 설계 (Design) — Confluence 역할
- 개요: 무엇을 왜 만드는가
- 포함 요소: 표시할 데이터, UI 구성
- 레이아웃 & UI 설명
- 완료 조건 (Acceptance Criteria) — 체크박스로 표시, 달성 여부 시각화

## 탭 3. 이슈 보드 (Issues) — Jira 역할
- **칸반 보드 형태**: `To Do` / `In Progress` / `Done` 3개 컬럼
- 이슈 카드 표시 정보
  - 이슈 ID (예: JW-7)
  - 제목
  - 타입 배지: Story / Task / Bug
  - 스프린트 명
- 스프린트 필터 또는 스프린트별 그룹핑 제공
- 진행률 요약 (예: 전체 12개 중 Done 9개)

### 이슈 타입별 색상
```
Story  → 초록 계열
Task   → 파랑 계열
Bug    → 빨강 계열
```

### 이슈 상태별 색상
```
To Do        → 회색
In Progress  → 파랑
Done         → 초록
```

## 탭 4. 개발 일지 (Dev Log) / 회고 (Retrospective)
- 날짜순 타임라인 형태
- 각 항목: 날짜, 제목, 내용
- 막혔던 부분과 해결 과정, 배운 점 기록
- 트러블슈팅 경험이 드러나도록 작성
- **명칭 구분**
  - `개발 일지` — 작업하며 실시간으로 남긴 기록
  - `회고` — 프로젝트 종료 후 돌아보며 작성한 글
  - 사후 작성분을 '개발 일지'로 표기하지 않는다

---

# 7. 데이터 스키마

`src/data/projects.js`에 배열로 관리한다. (추후 Firestore로 이관 예정)

```js
export const projects = [
  {
    id: 'portfolio-website',          // URL 파라미터로 사용
    title: '포트폴리오 사이트',
    summary: '기획 → 개발 → 테스트 → 배포 SDLC 연습',
    category: 'side',                  // work | automation | side
    featured: true,                    // 홈 Projects 섹션 노출 여부
    tags: ['React', 'Tailwind', 'Playwright'],
    period: '2026.03 ~ 진행 중',
    github: 'https://github.com/LimJaeSub/Portfolio-Website',
    demo: '',                          // 배포 URL

    overview: {
      description: '...',
      achievements: ['...'],
    },

    design: {
      purpose: '...',                  // 무엇을 왜 만드는가
      elements: ['...'],               // 포함 요소
      layout: '...',                   // 레이아웃 & UI 설명
      acceptanceCriteria: [
        { text: '섹션 4개가 정상 표시된다', done: true },
        { text: '카드 클릭 시 상세 페이지로 이동한다', done: false },
      ],
    },

    sprints: ['Sprint 1', 'Sprint 2'],

    issues: [
      {
        id: 'JW-7',
        title: 'MyPage 컴포넌트 구현',
        type: 'Story',                 // Story | Task | Bug
        status: 'Done',                // To Do | In Progress | Done
        sprint: 'Sprint 1',
      },
    ],

    devLog: [
      {
        date: '2026-03-16',
        title: 'Tailwind 설치 중 Vite 버전 충돌',
        content: 'Vite 8에서 @tailwindcss/vite 설치 시 ERESOLVE 에러 발생. vite@7, @vitejs/plugin-react@4로 다운그레이드하여 해결.',
      },
    ],

    // devLog 대신 쓰는 사후 기록 (날짜 없음, 주제별)
    // 두 필드를 동시에 갖지 않는다 — 실시간 기록이면 devLog, 사후면 retrospective
    retrospective: [
      {
        topic: 'POM 패턴을 택한 이유',
        content: '...',
      },
    ],
  },
]
```

## 카테고리

| 값 | 표시명 | 내용 |
|---|---|---|
| `work` | 실무 | 회사에서 진행한 업무 |
| `automation` | 자동화 | 테스트 자동화 프로젝트 |
| `side` | 사이드 | 개인 학습·토이 프로젝트 |

`/projects` 목록 페이지에서 `전체 / 실무 / 자동화 / 사이드` 필터로 사용한다.

## 대표 프로젝트 (featured)
- 홈 Projects 섹션은 `featured: true`인 항목만 노출한다
- **최대 3개.** 홈 섹션이 `h-screen`이라 그 이상은 레이아웃이 깨진다
- 4개째를 추가하려면 기존 항목 하나를 내려야 한다
- 나머지는 `/projects`에서만 보인다

> 프로젝트가 늘어나도 홈 레이아웃은 고정된다.
> 대표작 선정은 큐레이션이지 전시가 아니다.

## 데이터 작성 규칙
- 이슈는 실제로 진행한 작업만 기록한다 (임의 생성 금지)
- 완료 조건의 `done`은 실제 구현 여부와 일치시킨다
- 개발 일지는 성공담보다 **막힌 지점과 해결 과정** 중심으로 작성
- 새 프로젝트 추가 시 이 스키마를 그대로 따른다
- **실무(`work`) 프로젝트 작성 시 주의**
  - 고객사명·제품명·내부 문서·스크린샷은 포함하지 않는다
  - 사용한 도구·기법·프로세스와 본인 역할까지만 기술한다
  - 판단이 애매하면 "무엇을 했는가"까지만 쓰고 "무엇을 발견했는가"는 뺀다

---

# 8. 코딩 컨벤션

## 디자인 시스템 — Nocturne

Claude Design에서 생성한 디자인 시스템. 라이트/다크 두 벌의 토큰을 가진다.

### 핵심 원칙
**톤 램프(neutral·accent 100~900)는 라이트/다크가 동일하다.**
모드에 따라 바뀌는 것은 아래 4개 + 그림자뿐이다.

| 토큰 | 다크 | 라이트 |
|---|---|---|
| `--color-bg` | `#161826` | `#f7f7fa` |
| `--color-surface` | `#232532` | `#eeeef4` |
| `--color-text` | `#e9e9ed` | `#1e2030` |
| `--color-accent` | `#9184d9` | `#5d5294` |

`--color-divider`는 두 모드 모두 `--color-text`의 16% 투명도.

### 톤 램프 (양 모드 공통)
```
neutral-100 #f3f5fe   accent-100 #f5f4ff
neutral-200 #e4e7f5   accent-200 #e7e5fe
neutral-300 #cfd3e5   accent-300 #d2cefd
neutral-400 #b2b6ca   accent-400 #b5abfc
neutral-500 #9397ab   accent-500 #968ae0
neutral-600 #75798c   accent-600 #796cbf
neutral-700 #595d6c   accent-700 #5d5294
neutral-800 #3f424d   accent-800 #423a6a
neutral-900 #292b31   accent-900 #2b2741
```

### 그림자
`@theme` 밖의 일반 CSS 변수로 정의하고 `shadow-(--elev-sm)` 형태로 참조한다 (결정 31).

```css
:root {
  --elev-sm: 0 0 0 1px #cfd3e5;
  --elev-md: 0 0 0 1px #e4e7f5, 0 6px 18px rgba(30,32,48,.10);
  --elev-lg: 0 0 0 1px #cfd3e5, 0 16px 40px rgba(30,32,48,.16);
}
.dark {
  --elev-sm: 0 0 0 1px #3f424d;
  --elev-md: 0 0 0 1px #595d6c, 0 6px 18px rgba(0,0,0,.55);
  --elev-lg: 0 0 0 1px #9397ab, 0 16px 40px rgba(0,0,0,.65);
}
```

### 타이포그래피
- 폰트: **Inter** (heading·body 공용), weight 400 / 500
- 제목 weight는 항상 500. 600·700은 사용하지 않는다
- `letter-spacing: -0.015em` (제목), `line-height: 1.12`
- 섹션 라벨(h6): 11px, `letter-spacing .1em`, 대문자, accent-300
- 본문 기본 15px / `line-height 1.55`

### 간격 스케일
```
space-1  2.8px    space-4  11.2px
space-2  5.6px    space-6  16.8px
space-3  8.4px    space-8  22.4px
```

### 모서리
```
radius-sm  4px   (작은 버튼)
radius-md  8px   (카드, 입력)
radius-lg  14px  (모달)
```

### 시그니처 — 페이드 구분선
구분선은 양 끝이 투명으로 사라진다. 48px 구간에 걸쳐 페이드.
```css
background: linear-gradient(to right,
  transparent, var(--color-divider) 48px,
  var(--color-divider) calc(100% - 48px), transparent);
```
단, 박스 테두리·컨트롤 내부 구분선·짧은 악센트 마크는 페이드 없이 실선.

---

## 레이아웃 규칙
- 최대 폭 `1180px`, 좌우 패딩 `clamp(20px, 5vw, 72px)`
- 각 섹션은 `min-h-screen`(스크롤 스냅 유지 — [4. 결정 기록] 18·33번)
- 섹션 내부 정렬: 좌측 정렬 (중앙 정렬 아님)
- 카드 그리드: `repeat(auto-fit, minmax(240~300px, 1fr))`, gap `16.8px`
- 우측 고정 리모콘 Nav — 캡슐 컨테이너 + 원형 버튼
- 상단 헤더는 두지 않는다 (우측 Nav와 중복)

> ⚠️ Experience 섹션은 내용이 많아 **세로**가 짧은 화면에서 문제가 되기 쉽다.
> `min-h-screen`이라 잘리는 대신 늘어난다.
> **세로 768px(예: 1366×768) 기준 확인 완료 — 2026-09-16.**
> 이 섹션에 항목을 추가하면 같은 기준으로 다시 확인할 것.
>
> 참고: **가로** 768px은 뜻이 다르다. Tailwind `md` 브레이크포인트이고
> 이 미만에서 스크롤 스냅이 해제된다 ([12. 알려진 이슈] 5번). 같은 숫자지만 별개 기준이다.

## 색상 적용 규칙 — 다크모드 구현 방식

**`dark:` 접두사를 클래스마다 붙이지 않는다.**
CSS 변수를 `.dark` 클래스에서 교체하는 방식을 쓴다.

```css
/* App.css */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-bg: #f7f7fa;
  --color-surface: #eeeef4;
  --color-text: #1e2030;
  --color-accent: #5d5294;
}

.dark {
  --color-bg: #161826;
  --color-surface: #232532;
  --color-text: #e9e9ed;
  --color-accent: #9184d9;
}
```

**그림자만 예외다.** `@theme` 밖의 일반 변수로 두고 `shadow-(--elev-md)`로 참조한다.
`@theme`에 넣으면 Tailwind가 값을 문자열로 인라인해서 `.dark` 교체가 통하지 않는다.
([4. 결정 기록] 31번)

```jsx
// 이렇게 쓴다 — 모드 전환은 변수가 처리
<div className="bg-surface text-text">

// 이렇게 쓰지 않는다
<div className="bg-white dark:bg-gray-900">
```

예외: 태그 배경처럼 램프 단계 자체가 반전돼야 하는 경우만 `dark:` 사용.
```
tag  라이트 → bg accent-200 / text accent-800
     다크   → bg accent-800 / text accent-100
```

## 다크/라이트 토글 사양 (Phase 4)

> ⚠️ **일부는 임재섭 확인 필요 — 아래 "확인 필요" 표시된 항목.**
> 확인 전까지는 이 사양대로 구현하되, 다르면 알려줄 것.

### 상태 위치
- Redux Toolkit 슬라이스 `theme`에 둔다 (결정 12·17·28)
- 값은 `'dark' | 'light'` 두 가지. `'system'`은 두지 않는다
  → 토글 버튼이 2상태인데 내부가 3상태면 "지금 뭘 누른 건가"가 모호해진다

### DOM 적용 지점
- `<html>` 엘리먼트에 `class="dark"`를 붙이고 뗀다
- `<body>`가 아니라 `<html>`인 이유: 스크롤바 색상과 `color-scheme`이 루트 기준으로 동작한다
- React 밖의 DOM 조작이므로 `useEffect`에서 처리한다

### 최초 진입 시 기본값
1. `localStorage`에 저장된 값이 있으면 그것
2. 없으면 `prefers-color-scheme` 시스템 설정
3. 그래도 없으면 **다크**

### FOUC 방지 — 빠뜨리기 쉬움
React가 마운트되기 전에 라이트 화면이 한 번 번쩍인다.
`index.html`의 `<head>`에 **인라인 스크립트**로 클래스를 미리 붙여야 한다.

```html
<script>
  (function () {
    var t = localStorage.getItem('theme')
    if (!t) t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    if (t === 'dark') document.documentElement.classList.add('dark')
  })()
</script>
```

> 이 스크립트와 Redux 초기값은 **같은 판정 로직**이어야 한다.
> 어긋나면 첫 화면과 토글 상태가 불일치한다.

### 토글 버튼 위치 — **확인 필요**
- 제안: 우측 SideNav 리모콘 하단 (현재 장식용 원형이 있는 자리)
- 근거: 상단 헤더가 없으므로([4] 19번) 전역 컨트롤을 둘 곳이 SideNav뿐이다
- 상세 페이지에는 SideNav가 없다 → **그곳에서는 토글을 어디에 둘지 미정**

### 접근성
- 버튼에 `aria-label` 필수 (아이콘만 있으므로)
- `<html>`에 `style="color-scheme: dark"`도 함께 갱신하면 폼 컨트롤·스크롤바가 따라온다

### 파일 배치
```
src/store/
├── index.js          # configureStore
└── themeSlice.js     # theme 슬라이스
```
`main.jsx`에서 `<Provider store={store}>`로 감싼다.

---

## 네이밍

| 대상 | 규칙 | 예시 |
|---|---|---|
| 컴포넌트 | PascalCase | `ArrowButton`, `ProjectDetail` |
| 컴포넌트 파일 | 컴포넌트명과 동일 | `ArrowButton.jsx` |
| 함수·변수 | camelCase | `scrollToSection`, `activeTab` |
| 상수 배열 | camelCase, 파일 상단 | `const sections = [...]` |
| 데이터 파일 | kebab-case 또는 단수형 | `projects.js` |
| 프로젝트 `id` | kebab-case (URL에 노출) | `portfolio-website` |

## 파일
- 한 파일에 컴포넌트 하나. 단, 그 컴포넌트 안에서만 쓰이는 보조 컴포넌트는 같은 파일에 둬도 된다
  (현재 해당 사례 없음 — `Projects.jsx`의 `Modal`은 결정 8에 따라 상세 페이지로 대체되며 삭제됨)
- 컴포넌트는 `export default`로 내보낸다

## import 순서
```jsx
// 1. 외부 라이브러리
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// 2. 내부 컴포넌트
import ArrowButton from '../components/ArrowButton'

// 3. 데이터
import { projects } from '../data/projects'

// 4. 스타일
import './App.css'
```

## 주석
- 무엇을 하는지가 아니라 **왜 그렇게 했는지**를 쓴다
- 자명한 코드에는 주석을 달지 않는다

## 컴포넌트 작성 규칙
- 스타일은 Tailwind CSS 클래스만 사용 (인라인 스타일 금지)
- 자주 쓰는 UI는 별도 컴포넌트로 분리 (ArrowButton 참고)
- 다크모드는 `dark:` 접두사가 아닌 CSS 변수 교체로 처리 (위 [색상 적용 규칙] 참고)
- 데이터는 컴포넌트에 하드코딩하지 않는다.
  단 **컴포넌트가 직접 import 하지도 않는다** — 페이지가 import해서 props로 내린다 (결정 29)
- 색상은 반드시 디자인 토큰 변수를 통해 사용한다 (`bg-surface`, `text-accent` 등)
  Tailwind 기본 색상(`gray-900`, `blue-600` 등)을 직접 쓰지 않는다

## 테스트 셀렉터 전략 — **확인 필요**

> **지금 정해야 하는 이유:** Phase 5에서 Playwright를 붙일 때 셀렉터가 없으면
> 이미 만든 컴포넌트를 전부 다시 열어 속성을 추가해야 한다.
> Phase 4를 진행하면서 함께 넣으면 그 재작업이 없다.

### 제안하는 방식 — 역할 기반 우선, 구조에는 `data-testid`

| 대상 | 셀렉터 | 이유 |
|---|---|---|
| 버튼·링크 등 인터랙티브 | `getByRole` + `aria-label` | 접근성 속성과 테스트 훅을 겸한다. 따로 관리할 게 늘지 않는다 |
| 섹션·카드 등 구조 | `data-testid` | 한국어 문구는 자주 바뀐다. 텍스트 기반 셀렉터는 깨진다 |
| 본문 내용 검증 | `getByText` | 내용 자체가 검증 대상일 때만 |

### `data-testid` 명명 규칙
```
section-mypage        섹션
project-card          반복되는 카드 (nth로 접근)
tab-issues            탭
theme-toggle          단일 컨트롤
```
- kebab-case, 영문
- **컴포넌트명이 아니라 역할**로 짓는다 (`ProjectCard` → `project-card`)
- 반복 요소는 인덱스를 붙이지 않는다. Playwright의 `.nth()`로 접근한다

### 붙이는 위치
- 각 섹션 최상위 엘리먼트
- 프로젝트 카드 최상위
- 탭 버튼, 필터 버튼, 테마 토글
- **본문 텍스트 하나하나에는 붙이지 않는다.** 과하면 마크업이 지저분해진다

---
## 커밋 메시지 컨벤션
```
feat:     새 기능 추가
fix:      버그 수정
refactor: 리팩토링
style:    스타일/디자인 변경
docs:     문서 수정
test:     테스트 코드 추가/수정
chore:    빌드, 설정 등 기타
```
예) `feat: Skills 섹션 구현`

---

# 9. 개발 워크플로우

실무 SDLC를 그대로 따라가되, 산출물을 사이트 안에 남기는 것을 목표로 한다.

## 1. 기획
- 무엇을 왜 만드는지, 완료 조건은 무엇인지 먼저 정리
- 정리한 내용을 `projects.js`의 `design` 필드에 작성

## 2. 이슈 등록
- 작업 단위로 이슈를 쪼개서 `issues` 배열에 등록
- 타입 구분
  - Story: 기능 단위 (예: Skills 섹션 구현)
  - Task: Story를 잘게 쪼갠 작업
  - Bug: 테스트 중 발견된 결함
- 작업 시작 시 `status`를 `In Progress`로 변경

## 3. 개발
- 기능 단위로 커밋 (컨벤션은 [8. 코딩 컨벤션] 참고)

## 4. 테스트
- 기능 구현 후 Playwright E2E 테스트 작성
- 발견된 결함은 `issues`에 `type: 'Bug'`로 등록

## 5. 배포
- `main` 브랜치 push 시 Vercel 자동 배포
- 배포 후 실제 URL에서 동작 확인

## 6. 마무리

### 완료 기준 (Definition of Done)
아래를 모두 통과해야 "끝났다"고 보고한다.

```bash
npm run lint     # 통과
npm run build    # 통과
```

- [ ] 린트·빌드 통과
- [ ] 다크·라이트 **양쪽**에서 화면 확인 (한쪽만 보고 끝내지 않는다)
- [ ] 세로 768px 화면에서 잘림 없음 ([8. 레이아웃 규칙])
- [ ] 새로 만든 인터랙티브 요소에 `aria-label` / `data-testid` 부여
- [ ] 변경한 파일 목록과 이유를 보고

### 문서 갱신
- 이슈 `status`를 `Done`으로 변경
- 완료 조건 `done: true`로 갱신
- 막혔던 부분 / 해결 과정을 `devLog`에 기록
- **[3. 현재 상태] 갱신**
- **새 결정이 있었다면 [4. 결정 기록]에 추가**

> ⚠️ **`portfolio.md`와 `src/data/projects.js`는 같은 내용을 두 곳에 둔 상태다.**
> 한쪽만 고치면 어긋난다.
> **반드시 `portfolio.md` → `projects.js` 순서로 반영한다.**
> (`portfolio.md`가 원본, `projects.js`는 화면에 뿌리기 위한 사본)

---

# 10. 새 프로젝트 추가 절차

> 다른 레포에서 진행한 프로젝트를 이 사이트에 넣을 때의 절차.

## 원칙
각 프로젝트 레포는 루트에 **`portfolio.md`** 를 둔다.
이 파일이 프로젝트 쪽과 포트폴리오 사이트 사이의 **유일한 인계 문서**다.

템플릿은 별도 레포에 보관한다 → **`LimJaeSub/template`** (단수, **private**)
- `CLAUDE-template.md` — 새 프로젝트용 작업 지시서 골격
- `portfolio-template.md` — 포트폴리오 이관용 기록 양식

> ⚠️ private 레포다. **인증 없이 조회하면 GitHub가 404를 반환한다** —
> 존재 여부를 숨기기 위한 동작이라 "없는 레포"와 구분되지 않는다.
> 접근이 안 되면 레포가 없는 것이 아니라 자격증명 문제일 수 있다.

프로젝트 레포에는 이 CLAUDE.md가 없다.
그래서 `portfolio.md` 템플릿 자체가 작성 규칙을 포함하도록 되어 있다.

## 프로젝트를 시작할 때 (다른 레포에서)
1. `template` 레포에서 두 템플릿을 가져온다
2. `CLAUDE-template.md` → 새 레포 루트에 `CLAUDE.md`로 두고 프로젝트에 맞게 채운다
3. `portfolio-template.md` → 새 레포 루트에 `portfolio.md`로 둔다
4. 메타·기획 섹션을 먼저 채운다
5. 작업하면서 이슈 상태와 개발 일지를 그때그때 갱신한다

## 사이트에 추가할 때 (이 레포에서)
1. 해당 프로젝트의 `portfolio.md`를 가져온다
2. [7. 데이터 스키마] 형식에 맞춰 `src/data/projects.js`에 항목 추가
3. `featured` 여부 결정 — **대표작은 3개 제한.** 넣으려면 기존 하나를 내린다
4. `category` 지정 (`work` / `automation` / `side`)
5. 비어 있는 섹션은 해당 탭을 렌더링하지 않는다 ([6. 프로젝트 상세 페이지] 참고)

## 변환 시 지켜야 할 것
- **`portfolio.md`에 없는 내용을 채워 넣지 않는다.**
  이슈가 비어 있으면 이슈 탭이 없는 프로젝트로 처리한다
- 날짜가 없는 기록을 `devLog`(날짜 필수)로 넣지 않는다.
  주제별 기록이면 `retrospective`로 넣는다
- 실무(`work`) 프로젝트는 고객사 정보가 섞이지 않았는지 확인한다

---

# 11. 레퍼런스

> **Claude Code가 실제로 열어볼 수 있는 파일 경로를 적는다.**
> 레포 밖에 있는 자료는 요약해서 이 문서 안에 옮긴다.

## 레포 내 문서
| 경로 | 내용 |
|---|---|
| `CLAUDE.md` | 이 문서. 프로젝트의 유일한 공유 기억 |
| `portfolio.md` | 이 프로젝트의 기획·이슈·개발 일지 기록 |
| `docs/nocturne/styles.css` | Nocturne 다크 토큰 원본 |
| `docs/nocturne/styles-light.css` | Nocturne 라이트 토큰 원본 |
| `docs/mockup.html` | Claude Design 생성 목업 (참고용) |

## 다른 레포
| 레포 | 내용 |
|---|---|
| `LimJaeSub/template` | 새 프로젝트용 CLAUDE.md · portfolio.md 템플릿 (private) |

> ⚠️ **목업 HTML은 참고 자료이지 정답이 아니다.**
> 목업에는 이 문서의 결정과 충돌하는 부분이 있다 (상단 헤더, 모달 방식 등).
> 충돌 시 항상 [4. 결정 기록]이 우선한다.

> ⚠️ Nocturne CSS를 그대로 import 하지 않는다.
> 토큰값만 가져와 Tailwind `@theme`으로 정의한다 ([8. 코딩 컨벤션] 참고).

## 디자인 시스템 출처
- Claude Design에서 생성 (디자인 시스템명: Nocturne)
- 핵심 토큰은 [8. 코딩 컨벤션]에 전사되어 있으므로, 원본 파일이 없어도 작업 가능

## 외부 링크
- GitHub: https://github.com/LimJaeSub/Portfolio-Website
- 배포 URL: https://jasubwebsite.vercel.app
- Tailwind v4 문서: https://tailwindcss.com/docs
- React Router 문서: https://reactrouter.com

---

# 12. 환경 셋업 / 인수인계

> 다른 PC나 환경에서 이어서 작업할 때 참고

## 인수인계 메모

> 갱신 2026-09-16 — Phase 3(배포) 완료 시점

### 지금 상태
- `main` 브랜치, `origin/main`과 동기화
- 린트·빌드 통과
- Vercel 배포 완료 (URL은 [11. 레퍼런스] 참고)

### 넘겨받으면 먼저 할 것
1. `npm install` — `react-router-dom`이 추가됐다
2. `npm run dev` — **5173이 다른 프로젝트에 점유돼 있으면 Vite가 5174 등으로 자동 이동한다.** 터미널에 찍힌 주소를 확인할 것
3. [3. 현재 상태]와 [4. 결정 기록]을 읽을 것

### 확인이 끝나지 않은 항목

| 항목 | 상태 |
|---|---|
| 회고(`retrospective`) 렌더링 | 코드는 작성됐으나 데이터가 비어 있어 **화면에 그려진 적 없음** |
| 라이트 모드 전체 | 토큰은 정의됐으나 토글이 없어 `<html>`의 `class="dark"`를 지워야 확인 가능 |

### 알아둘 것
- **git identity가 이 레포에만 설정돼 있다** (`재섭 <wotjw734843@gmail.com>`).
  전역 설정이 비어 있어 커밋이 막혔던 이력이 있다.
  새 환경에서 같은 증상이 나면 `git config user.email`부터 확인할 것
- Wanted·CI/CD의 `period: '2026.01'`은 다른 레포에서 진행돼
  이 레포 이력으로는 확인할 수 없는 값이다. 임재섭이 직접 지정했다
- `portfolio.md`와 `src/data/projects.js`는 **같은 내용을 두 곳에 둔 상태**다.
  한쪽만 고치면 어긋난다. `portfolio.md`를 먼저 고치고 `projects.js`에 반영하는 순서를 지킬 것

## 필수 요구사항
- Node.js LTS (기존 개발 환경 기준 v24.14.0)
- npm (v11.9.0)
- Git
- VSCode (권장)

## 최초 셋업
```bash
git clone https://github.com/LimJaeSub/Portfolio-Website.git
cd Portfolio-Website
npm install
npm run dev
# → http://localhost:5173 (점유 중이면 5174 등으로 자동 이동)
```

## 주요 명령어
```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

## 알려진 이슈 / 주의사항

### 1. Vite 버전 충돌 (Tailwind 설치 시)
Vite 8은 Tailwind가 지원하지 않는다.
`npm install -D tailwindcss @tailwindcss/vite` 실행 시 `ERESOLVE` 에러 발생.

```bash
npm install -D vite@7 --legacy-peer-deps
npm install -D @vitejs/plugin-react@4 --legacy-peer-deps
npm install -D tailwindcss @tailwindcss/vite
```
- `@vitejs/plugin-react@6`은 Vite 8을 요구하므로 반드시 v4로 다운그레이드
- 새 환경에서는 `npm install`만 하면 package.json 고정 버전이 설치되므로 문제없음

### 2. Tailwind v4 설정 방식
v3와 v4는 설정 방식이 다르다.
- **v4에서는 `tailwind.config.js`가 필요 없다.**
- `postcss.config.js`가 있으면 충돌 → 삭제할 것
- `src/App.css`에는 아래 한 줄만 있으면 된다
  ```css
  @import "tailwindcss";
  ```
- `vite.config.js`에 플러그인 등록 필수
  ```js
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [react(), tailwindcss()],
  })
  ```

### 3. App.css import 누락 주의
`src/main.jsx`에 아래 줄이 없으면 Tailwind 스타일이 전혀 적용되지 않는다.
```js
import './App.css'
```

### 4. Windows PowerShell 사용 시
- `rm` 미동작 → `Remove-Item` 사용
- Git 기본 브랜치가 `master`일 수 있음 → `git branch -M main`

### 5. 스크롤 스냅
**`App.css`에 있지 않다.** `src/pages/Home.jsx`의 래퍼 `<main>`에 Tailwind 유틸로 걸려 있다.

```jsx
<main className="h-screen snap-none overflow-y-auto md:snap-y md:snap-mandatory">
```

각 섹션은 `min-h-screen` + `md:snap-start md:snap-always`가 전제다.

- 전역(`html`)에 걸면 목록·상세 페이지까지 스냅이 따라온다. 그래서 Home 래퍼로 옮겼다
- 모바일(`md` 미만)은 스냅을 해제한다 — 콘텐츠가 뷰포트보다 길 때 잘리지 않도록 ([4. 결정 기록] 18번)
- 섹션 높이 규칙을 바꾸면 스냅 동작이 깨진다

### 6. Vercel 배포 시 라우팅
React Router 사용 시 `/projects/xxx`로 직접 접근하면 404가 발생한다.
프로젝트 루트에 `vercel.json` 추가 필요.
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## 배포 환경
- 플랫폼: Vercel
- GitHub 연동으로 `main` 브랜치 push 시 자동 배포
- 빌드 명령어: `npm run build`
- 출력 디렉토리: `dist`

## 관련 링크
- GitHub: https://github.com/LimJaeSub/Portfolio-Website
- 배포 URL: https://jasubwebsite.vercel.app

---

# 13. 이 문서의 유지보수

> **CLAUDE.md도 코드다.** 방치하면 썩고, 틀린 문서는 없는 문서보다 해롭다.

## 갱신 시점
| 언제 | 무엇을 |
|---|---|
| 작업 끝날 때마다 | [3. 현재 상태] |
| 방향을 정했을 때 | [4. 결정 기록] — 이유까지 |
| 새 패턴이 자리잡았을 때 | [8. 코딩 컨벤션] |
| 막혔다 풀었을 때 | [12. 환경 셋업] 알려진 이슈 |

## 정리 신호
아래에 해당하면 문서를 손볼 때다.

- **빈 섹션이 있다** → 삭제한다. 제목만 남은 섹션은 AI를 혼란스럽게 한다
- **문서와 실제 코드가 다르다** → 문서를 고친다. 실제가 정답이다
- **AI가 같은 실수를 반복한다** → 규칙이 없거나, 있어도 묻혀 있다
- **길어서 안 읽힌다** → 별도 파일로 뺀다

## 넣지 말아야 할 것
- **AI가 읽어도 할 수 있는 게 없는 내용** — 개인 할 일, 학습 메모
  → 별도 파일로 분리하고, 여기엔 "그 파일에 쓴다"는 규칙만 남긴다
- **지금 쓰이지 않는 규칙** — 미리 정해둔 컨벤션은 대부분 죽은 규칙이 된다
  → 실제 코드가 나온 뒤 그 패턴을 보고 적는다

## 현재 알려진 부채
- [8. 코딩 컨벤션]의 네이밍·import 규칙을 2026-09-16 리뉴얼 후 코드와 대조 완료.
  2026-09-16 `docs/portfolio-template.md` 삭제 — `LimJaeSub/template` 레포의 사본과
  내용이 동일해 중복이었다. 빈 양식의 정본은 그 레포다

---

# 14. 로드맵 (Phase)

- **Phase 1** ✅ React 골격 완성 (섹션 4개 + SideNav)
- **Phase 2** ✅ 디자인 리뉴얼 + React Router + 프로젝트 상세 페이지
- **Phase 3** ✅ Vercel 배포
- **Phase 4** 🔲 Redux Toolkit (다크모드 토글)
- **Phase 5** 🔲 Playwright E2E 테스트 + 결과 JSON 저장
- **Phase 6** 🔲 Firebase Auth (관리자 로그인) + Firestore 이관
- **Phase 7** 🔲 관리자 페이지 — 사이트에서 직접 이슈/일지/완료조건 편집
- **Phase 8** 🔲 테스트 결과 대시보드 (Playwright 결과 표시)
- **Phase 9** 🔲 Firebase REST API 자동화 테스트

> Phase 6에서 `projects.js` 하드코딩 데이터를 Firestore로 이관한다.
> [7. 데이터 스키마]는 그대로 컬렉션 구조로 옮기는 것을 전제로 설계되었다.

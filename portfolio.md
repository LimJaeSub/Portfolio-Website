# 포트폴리오용 기록

> 이 프로젝트(포트폴리오 사이트) 자체의 기획·이슈·개발 일지 기록.
> `src/data/projects.js`의 `portfolio-website` 항목이 이 파일에서 나온다.
>
> **작성 원칙**
> - 개발 일지는 막힌 그 순간에 쓴다.
> - 없는 내용은 비워둔다. 채우려고 지어내지 않는다.
> - 커밋 메시지를 그대로 옮기지 않는다. 막혔거나·선택했거나·배운 것만 쓴다.

---

## 메타

```
id:       portfolio-website
title:    포트폴리오 사이트
summary:  기획 → 개발 → 테스트 → 배포 SDLC 연습
category: side
period:   2026.03 ~ 진행 중
github:   https://github.com/LimJaeSub/Portfolio-Website
demo:     https://jasubwebsite.vercel.app
tags:     [React, Tailwind, Playwright, Jira]
```

---

## 개요

**설명**

기획부터 배포까지 SDLC 전 과정을 직접 밟아보는 프로젝트다.
Jira/Confluence로 관리하던 산출물을 외부 링크로 거는 대신,
기획 문서 · 이슈 보드 · 개발 일지를 이 사이트 안에 직접 구현해 노출한다.

**주요 학습 성과**

- CSS Scroll Snap만으로 라이브러리 없이 풀페이지 스크롤 구현
- IntersectionObserver로 현재 섹션을 추적하는 사이드 내비게이션 구현
- Tailwind CSS v4의 `@theme`으로 디자인 시스템 토큰을 정의하고
  CSS 변수 교체 방식으로 다크/라이트 구성

---

## 기획 · 설계

**목적** — 무엇을 왜 만드는가

QA 엔지니어로서의 경력과 프로젝트를 소개하되, 결과물만 나열하지 않고
그 결과에 이르는 과정 — 기획, 이슈 관리, 트러블슈팅 — 을 함께 보여주는 것이 목표다.

**포함 요소**

- 메인: 자기소개 / 경력·자격 / 대표 프로젝트 3개 / 기술 스택
- 프로젝트 목록: 카테고리(실무·자동화·사이드) 필터
- 프로젝트 상세: 개요 / 기획·설계 / 이슈 보드 / 개발 일지 탭

**레이아웃 & UI**

최대 폭 1180px, 좌측 정렬. 메인은 섹션 단위 스크롤 스냅을 적용하고
우측에 고정 리모콘 내비게이션을 둔다. 상단 헤더는 내비게이션과 기능이
중복되어 두지 않는다. 목록·상세 페이지는 일반 스크롤.

**완료 조건 (Acceptance Criteria)**

- [x] 메인 섹션 4개가 정상 표시된다
- [x] 우측 내비게이션으로 섹션 간 이동이 된다
- [x] Nocturne 디자인 토큰으로 전체 스타일이 통일된다
- [x] 프로젝트 카드 클릭 시 상세 페이지로 이동한다
- [x] 산출물이 없는 프로젝트는 해당 탭이 노출되지 않는다
- [x] Vercel에 배포되어 외부에서 접속된다
- [ ] 다크/라이트 토글이 동작한다
- [ ] Playwright E2E 테스트가 통과한다

---

## 이슈

> 스프린트는 [14. 로드맵]의 Phase를 그대로 사용한다.

| ID | 제목 | 타입 | 상태 | 스프린트 |
|----|------|------|------|---------|
| PW-1 | Vite + React 프로젝트 초기 셋업 | Task | Done | Phase 1 |
| PW-2 | MyPage(Hero) 섹션 구현 | Story | Done | Phase 1 |
| PW-3 | Experience 섹션 구현 | Story | Done | Phase 1 |
| PW-4 | Projects 섹션 구현 | Story | Done | Phase 1 |
| PW-5 | Skills 섹션 구현 | Story | Done | Phase 1 |
| PW-6 | SideNav 구현 및 섹션 이동 애니메이션 | Story | Done | Phase 1 |
| PW-7 | Nocturne 디자인 시스템으로 리뉴얼 | Story | Done | Phase 2 |
| PW-8 | React Router 도입 및 프로젝트 상세 페이지 구현 | Story | Done | Phase 2 |
| PW-9 | Vercel 배포 | Task | Done | Phase 3 |
| PW-10 | 다크/라이트 토글 (Redux Toolkit) | Story | To Do | Phase 4 |
| PW-11 | Playwright E2E 테스트 작성 | Story | To Do | Phase 5 |

---

## 개발 일지

### 2026-03-16 · Tailwind 설치 중 Vite 버전 충돌

무엇이 안 됐는지: `npm install -D tailwindcss @tailwindcss/vite` 실행 시 `ERESOLVE` 에러.

원인: `@vitejs/plugin-react@6`이 Vite 8을 요구하는데, Vite 8은 Tailwind가 지원하지 않는다.

해결: `vite@7`, `@vitejs/plugin-react@4`로 다운그레이드.

배운 점: 최신 버전을 유지하는 것보다 안정적으로 동작하는 조합을 고르는 편이 낫다.

---

### 2026-03-26 · 앵커 링크로는 섹션 이동 느낌이 나지 않음

무엇이 안 됐는지: `href="#id"` 방식은 화면이 즉시 점프해서 섹션을 넘어가는 감각이 없었다.

해결: `scrollIntoView({ behavior: 'smooth' })`로 교체.

---

### 2026-09-15 · 그림자 토큰이 다크모드에서 바뀌지 않음

무엇이 안 됐는지: 색상 토큰은 `@theme`에 정의하고 `.dark`에서 교체하면 반영되는데,
그림자만 다크에서 바뀌지 않았다.

원인: Tailwind v4가 `shadow-*` 유틸을 만들 때 `@theme`의 값을
`var()` 참조가 아니라 **문자열로 인라인**하기 때문.

해결: 그림자는 `@theme` 밖의 일반 CSS 변수(`--elev-*`)로 빼고
`shadow-(--elev-md)` 형태로 참조.

배운 점: `@theme`에 넣으면 다 런타임 교체가 되는 게 아니다.
빌드된 CSS를 직접 열어 `var()`로 남았는지 확인하는 편이 빠르다.

---

### 2026-09-15 · 스크롤 스냅이 상세 페이지까지 따라옴

무엇이 안 됐는지: React Router로 추가한 목록·상세 페이지에서도 스냅이 동작했다.

원인: `scroll-snap-type`을 `html`에 걸어둔 탓.

해결: 스냅을 전역이 아니라 메인 페이지 래퍼에만 Tailwind 유틸
(`snap-y snap-mandatory`)로 적용. 모바일에서는 콘텐츠가 잘리지 않도록 스냅 해제.

---

### 2026-09-16 · 회고와 개발 일지의 필드 모양이 달랐다

무엇이 안 됐는지: `retrospective`를 `devLog`와 같은 모양(`date`/`title`/`content`)으로
가정하고 렌더링해두었는데, 스키마상 회고는 `{ topic, content }`로 날짜가 없다.

당시에는 회고 데이터가 비어 있어 화면상 문제가 드러나지 않았다.
회고를 채우는 순간 날짜 칸이 비고 제목이 사라졌을 상황.

해결: 렌더링을 `hasDevLog` 기준으로 분기.

배운 점: 데이터가 비어 있으면 잘못된 렌더링 코드도 멀쩡해 보인다.
빈 배열은 테스트를 통과시키지 검증해주지 않는다.

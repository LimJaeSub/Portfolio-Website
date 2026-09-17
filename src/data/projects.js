/*
 * 프로젝트 데이터. Phase 6에서 Firestore로 이관 예정이므로 스키마를 그대로 유지한다.
 *
 * 작성 규칙 (CLAUDE.md 7. 데이터 작성 규칙)
 * - 실제로 진행한 작업만 기록한다. 없는 이슈/스프린트/일지는 만들지 않는다.
 * - 데이터가 없는 필드는 비워둔다. 상세 페이지가 해당 탭을 렌더링하지 않는다.
 */

export const CATEGORY_LABELS = {
  work: '실무',
  automation: '자동화',
  side: '사이드',
}

export const projects = [
  {
    id: 'wanted-automation',
    title: 'Wanted 자동화 테스트',
    summary: 'Wanted 홈페이지 Selenium 자동화 테스트',
    category: 'automation',
    featured: true,
    status: 'done',
    tags: ['Selenium', 'pytest', 'POM'],
    period: '2026.01',
    github: 'https://github.com/LimJaeSub/QA-Portfolio-Wanted',
    demo: '',

    overview: {
      description:
        'Wanted 홈페이지를 대상으로 Selenium WebDriver와 pytest를 활용한 E2E 자동화 테스트를 구현했습니다. POM 패턴을 적용해 유지보수성을 높였습니다.',
      achievements: [],
    },

    // 기획·설계 / 이슈 보드 산출물 없음 — 해당 탭은 노출되지 않는다
    design: null,
    sprints: [],
    issues: [],
    retrospective: [], // 회고 미작성 (CLAUDE.md 3. 미확정 사항)
  },
  {
    id: 'cicd-pipeline',
    title: 'CI/CD 파이프라인',
    summary: 'automationexercise.com 대상 CI/CD 구축',
    category: 'automation',
    // 2026-09-17 대표작에서 내림 — TeamTodo를 올리기 위해 (3개 제한)
    featured: false,
    status: 'done',
    tags: ['Selenium', 'pytest', 'GitHub Actions', 'Allure'],
    period: '2026.01',
    github: 'https://github.com/LimJaeSub/qa-automation-pipeline',
    demo: '',

    overview: {
      description:
        'GitHub Actions를 통한 CI/CD 파이프라인을 구축하고, Allure Report로 테스트 결과를 시각화했습니다.',
      achievements: [],
    },

    design: null,
    sprints: [],
    issues: [],
    retrospective: [],
  },
  {
    id: 'portfolio-website',
    title: '포트폴리오 사이트',
    summary: '기획 → 개발 → 테스트 → 배포 SDLC 연습',
    category: 'side',
    featured: true,
    status: 'active',
    tags: ['React', 'Tailwind', 'Playwright', 'Jira'],
    period: '2026.03 ~ 진행 중',
    github: 'https://github.com/LimJaeSub/Portfolio-Website',
    demo: 'https://jasubwebsite.vercel.app',

    overview: {
      description:
        '기획부터 배포까지 SDLC 전 과정을 직접 밟아보는 프로젝트입니다. Jira/Confluence로 관리하던 산출물을 외부 링크로 거는 대신, 기획 문서·이슈 보드·개발 일지를 이 사이트 안에 직접 구현해 노출합니다.',
      achievements: [
        'CSS Scroll Snap만으로 라이브러리 없이 풀페이지 스크롤 구현',
        'IntersectionObserver로 현재 섹션을 추적하는 사이드 내비게이션 구현',
        'Tailwind CSS v4의 @theme으로 디자인 시스템 토큰을 정의하고 CSS 변수 교체 방식으로 다크/라이트 구성',
      ],
    },

    design: {
      purpose:
        'QA 엔지니어로서의 경력과 프로젝트를 소개하되, 결과물만 나열하지 않고 그 결과에 이르는 과정 — 기획, 이슈 관리, 트러블슈팅 — 을 함께 보여주는 것이 목표입니다.',
      elements: [
        '메인: 자기소개 / 경력·자격 / 대표 프로젝트 3개 / 기술 스택',
        '프로젝트 목록: 카테고리(실무·자동화·사이드) 필터',
        '프로젝트 상세: 개요 / 기획·설계 / 이슈 보드 / 개발 일지 탭',
      ],
      layout:
        '최대 폭 1180px, 좌측 정렬. 메인은 섹션 단위 스크롤 스냅을 적용하고 우측에 고정 리모콘 내비게이션을 둔다. 상단 헤더는 내비게이션과 기능이 중복되어 두지 않는다. 목록·상세 페이지는 일반 스크롤.',
      acceptanceCriteria: [
        { text: '메인 섹션 4개가 정상 표시된다', done: true },
        { text: '우측 내비게이션으로 섹션 간 이동이 된다', done: true },
        { text: 'Nocturne 디자인 토큰으로 전체 스타일이 통일된다', done: true },
        { text: '프로젝트 카드 클릭 시 상세 페이지로 이동한다', done: true },
        { text: '산출물이 없는 프로젝트는 해당 탭이 노출되지 않는다', done: true },
        { text: '다크/라이트 토글이 동작한다', done: false },
        { text: 'Vercel에 배포되어 외부에서 접속된다', done: true },
        { text: 'Playwright E2E 테스트가 통과한다', done: false },
      ],
    },

    // 스프린트는 CLAUDE.md 14. 로드맵의 Phase를 그대로 사용한다
    sprints: ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5'],

    issues: [
      { id: 'PW-1', title: 'Vite + React 프로젝트 초기 셋업', type: 'Task', status: 'Done', sprint: 'Phase 1' },
      { id: 'PW-2', title: 'MyPage(Hero) 섹션 구현', type: 'Story', status: 'Done', sprint: 'Phase 1' },
      { id: 'PW-3', title: 'Experience 섹션 구현', type: 'Story', status: 'Done', sprint: 'Phase 1' },
      { id: 'PW-4', title: 'Projects 섹션 구현', type: 'Story', status: 'Done', sprint: 'Phase 1' },
      { id: 'PW-5', title: 'Skills 섹션 구현', type: 'Story', status: 'Done', sprint: 'Phase 1' },
      { id: 'PW-6', title: 'SideNav 구현 및 섹션 이동 애니메이션', type: 'Story', status: 'Done', sprint: 'Phase 1' },
      { id: 'PW-7', title: 'Nocturne 디자인 시스템으로 리뉴얼', type: 'Story', status: 'Done', sprint: 'Phase 2' },
      { id: 'PW-8', title: 'React Router 도입 및 프로젝트 상세 페이지 구현', type: 'Story', status: 'Done', sprint: 'Phase 2' },
      { id: 'PW-9', title: 'Vercel 배포', type: 'Task', status: 'Done', sprint: 'Phase 3' },
      { id: 'PW-10', title: '다크/라이트 토글 (Redux Toolkit)', type: 'Story', status: 'To Do', sprint: 'Phase 4' },
      { id: 'PW-11', title: 'Playwright E2E 테스트 작성', type: 'Story', status: 'To Do', sprint: 'Phase 5' },
    ],

    devLog: [
      {
        date: '2026-03-16',
        title: 'Tailwind 설치 중 Vite 버전 충돌',
        content:
          'Vite 8에서 @tailwindcss/vite 설치 시 ERESOLVE 에러 발생. @vitejs/plugin-react@6이 Vite 8을 요구하는 것이 원인이었다. vite@7, @vitejs/plugin-react@4로 다운그레이드하여 해결. 최신 버전을 유지하는 것보다 안정적으로 동작하는 조합을 고르는 편이 낫다고 판단했다.',
      },
      {
        date: '2026-03-26',
        title: '앵커 링크로는 섹션 이동 느낌이 나지 않음',
        content:
          'href="#id" 방식은 화면이 즉시 점프해서 섹션을 넘어가는 감각이 없었다. scrollIntoView({ behavior: "smooth" })로 교체해 부드럽게 이동하도록 변경.',
      },
      {
        date: '2026-09-15',
        title: '그림자 토큰이 다크모드에서 바뀌지 않음',
        content:
          '색상 토큰은 @theme에 정의하고 .dark에서 교체하면 그대로 반영되는데, 그림자만 다크에서 바뀌지 않았다. Tailwind v4가 shadow-* 유틸을 만들 때 @theme의 값을 var() 참조가 아니라 문자열로 인라인하기 때문이었다. 그림자는 @theme 밖의 일반 CSS 변수(--elev-*)로 빼고 shadow-(--elev-md) 형태로 참조해 해결.',
      },
      {
        date: '2026-09-15',
        title: '스크롤 스냅이 상세 페이지까지 따라옴',
        content:
          'scroll-snap-type을 html에 걸어둔 탓에 React Router로 추가한 목록·상세 페이지에서도 스냅이 동작했다. 스냅을 전역이 아니라 메인 페이지 래퍼에만 Tailwind 유틸(snap-y snap-mandatory)로 적용하도록 변경. 모바일에서는 콘텐츠가 잘리지 않도록 스냅을 해제했다.',
      },
      {
        date: '2026-09-16',
        title: '회고와 개발 일지의 필드 모양이 달랐다',
        content:
          'retrospective를 devLog와 같은 모양(date/title/content)으로 가정하고 렌더링해두었는데, 스키마상 회고는 { topic, content }로 날짜가 없다. 당시 회고 데이터가 비어 있어 화면상 문제가 드러나지 않았고, 회고를 채우는 순간 날짜 칸이 비고 제목이 사라졌을 상황이었다. 렌더링을 분기해 해결. 데이터가 비어 있으면 잘못된 렌더링 코드도 멀쩡해 보인다는 걸 배웠다.',
      },
    ],
  },
  {
    id: 'team-todo',
    title: 'QA Part 팀 To-do 보드',
    summary: '3인 팀이 로그인 없이 공유하는 주간 To-do 웹앱 (준실시간 동기화)',
    category: 'side',
    featured: true,
    status: 'on-hold',
    tags: ['Next.js', 'PostgreSQL', 'Docker', 'TypeScript', '자체호스팅'],
    period: '2026.09 ~ (2026.09.17 보류)',
    // 보류 사유는 개발 일지에 있다. 링크가 없으면 버튼을 그리지 않는다 (결정 40)
    github: '',
    demo: '',

    overview: {
      description:
        '팀 관리자(head)가 주간 할 일을 배정하면, 나머지 팀원이 로그인 없이 이름만 선택해 실시간으로 확인·진행하는 웹 기반 To-do 앱. 사람별 리스트 뷰와 요일별 보드 뷰를 함께 제공한다.',
      achievements: [],
    },

    design: {
      purpose:
        '3인 팀의 주간 업무 배정과 진행 상황 공유를 인증 절차 없이 가볍게 처리하기 위함',
      elements: [
        '이름 3개 중 클릭으로 사용자 식별 (로그인 없음)',
        'head 전용 Todo 작성 화면',
        '사람별 리스트 뷰 / 요일별 보드 뷰',
        'Polling 기반 준실시간 반영 (수 초 간격 재조회)',
        '(Phase 2) 주간 완료 항목 집계 및 요약 보고서',
      ],
      layout: '', // 원본이 '(진행하며 채움)' 상태 — 채워지면 기입
      acceptanceCriteria: [
        { text: 'head가 작성한 Todo가 팀원 화면에 새로고침 없이 반영된다', done: false },
        { text: '이름 선택만으로 자신의 할 일을 구분해 볼 수 있다', done: false },
        { text: '리스트 뷰와 보드 뷰를 전환할 수 있다', done: false },
      ],
    },

    sprints: ['Sprint 1', 'Sprint 2'],

    issues: [
      { id: 'A-1', title: '프로젝트 초기 세팅 (Next.js)', type: 'Task', status: 'Done', sprint: 'Sprint 1' },
      { id: 'A-2', title: '이름 선택 화면', type: 'Task', status: 'On Hold', sprint: 'Sprint 1' },
      { id: 'A-3', title: 'Todo 테이블 스키마 설계', type: 'Task', status: 'On Hold', sprint: 'Sprint 1' },
      { id: 'A-4', title: 'head 작성 화면', type: 'Story', status: 'On Hold', sprint: 'Sprint 1' },
      { id: 'A-5', title: '팀원 조회/체크 화면 (리스트+보드)', type: 'Story', status: 'On Hold', sprint: 'Sprint 1' },
      { id: 'A-6', title: 'Polling 기반 갱신 연결', type: 'Task', status: 'On Hold', sprint: 'Sprint 1' },
      { id: 'A-7', title: '주간보고서 API', type: 'Story', status: 'To Do', sprint: 'Sprint 2' },
      { id: 'A-8', title: 'Docker Postgres 컨테이너 구성', type: 'Task', status: 'On Hold', sprint: 'Sprint 1' },
      { id: 'A-9', title: '배포 환경 구축 (pm2 상시 구동, 방화벽 포트 허용)', type: 'Task', status: 'On Hold', sprint: 'Sprint 1' },
      { id: 'A-10', title: 'DB 백업 스크립트', type: 'Task', status: 'On Hold', sprint: 'Sprint 1' },
    ],

    devLog: [
      {
        date: '2026-09-16',
        title: '기획 세션',
        content:
          '기획 세션에서 스택, 화면 구성(이름 선택 / 리스트 / 보드), 계정 분리 원칙을 결정했다.',
      },
      {
        date: '2026-09-17',
        title: '아키텍처 전환 (클라우드 → 자체 호스팅)',
        content:
          'Supabase 기준으로 초기 세팅을 마친 직후, Todo 본문에 실제 업무 내용이 들어간다는 점 때문에 클라우드 저장 자체를 재검토하게 됐다. 초기 스택 선정 시 "실시간 동기화"라는 기능 요구만 보고 데이터가 어디에 저장되는지를 제약 조건으로 넣지 않은 것이 원인. Postgres(Docker) 자체 호스팅으로 전환하고 realtime 구독은 polling으로 대체했다. 부수적으로, 새 기획 문서가 "서버 IP·사내 경로는 공개 불가"라고 규정하면서도 본문에 실제 값을 담고 있어 플레이스홀더로 치환했다. 업무 데이터를 클라우드에 넣는 것 자체가 민감한 사항이고, 업무와 조금이라도 관련되면 클라우드 사용을 먼저 고민해야 한다는 걸 배웠다.',
      },
      {
        date: '2026-09-17',
        title: 'Phase 1 보류 결정',
        content:
          '배포 검증 단계에서 서버 폴더가 네트워크 매핑 드라이브라는 것을 확인했다. 개발 PC에서 그 폴더를 열어 작업해도 Node·Docker·pm2는 전부 개발 PC에서 돌기 때문에 서버 구동 검증이 성립하지 않았다. "서버 폴더에 접근 가능하다"와 "서버에서 실행할 수 있다"를 같은 것으로 전제한 것이 원인 — 매핑 드라이브는 파일 시스템만 공유하고 실행 환경은 공유하지 않는다. 여기서 기술 문제가 아니라 권한 문제로 넘어갔고, PM 단독으로 결정할 수 없는 사안 4가지(사내 도구의 공개 범위, 공용 서버 점유와 방화벽, 설치 권한, 실업무 데이터의 보존·인계 책임)가 드러나 진행을 멈췄다. 레포 공개·서버 구동·데이터 축적처럼 되돌리기 어려운 상태가 먼저 만들어지는 것을 피하기 위함. 큰 환경에 들어가기 전에 작은 환경에서 목업으로 만들어 보고 환경 제약을 먼저 의논하는 편이 낫다는 걸 배웠다.',
      },
    ],
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export function getProject(id) {
  return projects.find((project) => project.id === id)
}

import { BEHIND_VISUAL, TONE } from './const'
import type { ArchiveItem, BehindNote, CareerItem, Intro, MoreWork, Principle, Product, Profile, StackGroup, Stat, Work } from './type'

// 화면에 들어가는 내용을 모아 둔 파일이다. 내용을 바꿀 때는 이 파일만 고친다.
// 이력서·포트폴리오(2026.10 기준) 내용이다. 문서에 없는 숫자는 넣지 않고, 아직 받지 못한 내용은 자리표시자([…])로 둔다.

export const PROFILE: Profile = {
  name: '오병환',
  since: '2013',
  current: {
    company: '엠브레이스',
    role: '프론트엔드 개발자',
  },
  email: 'away8909@gmail.com',
  resumeUrl: '#',
  links: {
    github: 'https://github.com/stuckyis',
    linkedin: 'https://www.linkedin.com/in/byeonghwan-oh-874b8b438',
  },
}

export const INTRO: Intro = {
  role: 'FRONTEND ENGINEER',
  headline: ['화면 너머의', '구조까지 설계하는', '프론트엔드 엔지니어'],
  highlight: '구조',
  lead: [
    `안녕하세요, 경력 12년의 프론트엔드 개발자 ${PROFILE.name}입니다.`,
    'OTT·미디어 서비스의 웹 화면과 관리자 시스템을 React·Vue로 만들어 왔습니다.',
  ],
  // 참여한 프로젝트 수 (엠브레이스 4, 에이클라미디어그룹 2, 트리포스 7)
  metric: { label: 'PROJECTS', value: '13' },
}

/**
 * 숫자 띠. 4개를 기준으로 디자인했다 (색은 순서대로 라일락·민트·버터·복숭아).
 * 경력 연수는 회사별 재직 기간의 합(2026.10 기준 12년 2개월), React·TypeScript는 2022.06부터다.
 */
export const STATS: Stat[] = [
  { value: '12+', label: '년 웹 개발 경력' },
  { value: '13', label: '개 프로젝트 참여' },
  { value: '5', label: '개 OTT·미디어 서비스' },
  { value: '4+', label: '년 React·TypeScript 실무' },
]

/** 참여한 제품. 로고 띠에서 이 순서대로 흐른다 */
export const PRODUCTS: Product[] = [
  { name: 'Ostream for Coupangplay', tone: TONE.LILAC },
  { name: 'Ostream for NCP', tone: TONE.MINT },
  { name: 'CJ ENM GENII', tone: TONE.BUTTER },
  { name: 'TVING BackOffice', tone: TONE.PEACH },
  { name: 'SPOTV NOW', tone: TONE.ACCENT },
  { name: 'SPOTV ASIA', tone: TONE.INK },
]

/** 대표 작업. 위에서부터 01, 02 … 순서로 번호가 붙는다. 성과 수치(metrics)·팀 규모(team)는 실제 숫자가 있을 때만 적는다 */
export const WORKS: Work[] = [
  {
    id: 'ostream-ncp',
    title: 'Ostream for NCP',
    company: '엠브레이스',
    period: '2024.06 – 진행 중',
    role: '프론트엔드 개발',
    summary: '자사 솔루션으로 LIVE·VOD 재생, 광고 삽입, 채널 편성을 제공하는 웹 서비스',
    tasks: ['React 기반 개발 환경 구축', '공통 컴포넌트 개발', '콘텐츠 영상 재생·클립 기능 개발'],
    tags: ['React', 'TypeScript', 'TanStack Query', 'Recoil', 'Video.js', 'SCSS', 'Vite'],
    tone: TONE.LILAC,
  },
  {
    id: 'cj-enm-genii',
    title: 'CJ ENM GENII',
    company: '엠브레이스',
    period: '2024.10 – 2025.02',
    role: '프론트엔드 리드',
    summary: 'CJ ENM 전사의 AI 활용을 위한 관리자 웹 서비스',
    tasks: ['프론트엔드 개발 리딩', 'React 기반 개발 환경 구축', '공통 컴포넌트 개발'],
    tags: ['React', 'TypeScript', 'TanStack Query', 'Recoil', 'Video.js', 'Webpack', 'SCSS', 'Figma'],
    tone: TONE.MINT,
  },
  {
    id: 'tving-backoffice',
    title: 'TVING BackOffice',
    company: '엠브레이스',
    period: '2022.06 – 2025.06',
    role: '프론트엔드 개발',
    summary: 'TVING 내부 관리자를 위한 백오피스 시스템',
    tasks: ['테이블 공통 컴포넌트 개발', '홈 편성을 위한 화면 구축', '프로젝트 전반의 화면 개발과 유지보수'],
    tags: ['React', 'TypeScript', 'TanStack Query', 'Recoil', 'Webpack', 'SCSS'],
    tone: TONE.BUTTER,
  },
  {
    id: 'spotv-now',
    title: 'SPOTV NOW',
    company: '에이클라미디어그룹',
    period: '2020.08 – 2022.04',
    role: '웹 프론트엔드 개발',
    summary: '실시간 LIVE 방송과 VOD를 제공하는 스포츠 OTT 웹 서비스',
    tasks: ['웹 화면 추가 개발과 성능 개선', 'UX 3.2 버전 리뉴얼', '멀티플레이어 기능 개선', 'LIVE 채팅·광고 삽입 기능 개발'],
    tags: ['Vue', 'Vuex', 'Video.js', 'Webpack', 'Sendbird', 'Zeplin'],
    tone: TONE.PEACH,
  },
  {
    id: 'spotv-asia',
    title: 'SPOTV ASIA',
    company: '에이클라미디어그룹',
    period: '2022.02 – 2022.04',
    role: '웹 프론트엔드 개발',
    summary: 'SPOTV NOW의 글로벌 소개 웹 서비스',
    tasks: ['Spring Boot 기반 SSR 프로젝트를 Vue 2 프로젝트로 리뉴얼', 'Storybook으로 공통 디자인과 웹 화면 구축'],
    tags: ['Vue', 'Vuex', 'Video.js', 'Webpack', 'Storybook'],
    tone: TONE.LILAC_SOFT,
  },
]

/** 그 밖의 작업. 3개를 기준으로 디자인했다. 주소(url)가 있으면 카드 전체가 링크가 된다 */
export const MORE_WORKS: MoreWork[] = [
  { title: 'Ostream for Coupangplay', company: '엠브레이스', year: '2025', tone: TONE.LILAC_SOFT },
  { title: 'LG전자 정밀금형센터 생산관제 실시간 시스템', company: '트리포스', year: '2018', tone: TONE.MINT_SOFT },
  { title: 'KT Sat GNOC 운용지원시스템', company: '트리포스', year: '2016', tone: TONE.BUTTER_SOFT },
]

/** 일하는 방식. 3개를 기준으로 디자인했다 (카드 색은 순서대로 연보라·연민트·연버터) */
export const PRINCIPLES: Principle[] = [
  {
    title: '개발 환경부터 단단하게',
    description: 'CJ ENM GENII와 Ostream에서 React 기반 개발 환경을 직접 구축해, 팀이 같은 규칙으로 시작할 수 있게 했어요.',
  },
  {
    title: '영상 경험은 끊기지 않게',
    description: 'SPOTV NOW의 멀티플레이어, LIVE 채팅, 광고 삽입부터 Ostream의 재생·클립 기능까지 영상 화면을 꾸준히 다뤘어요.',
  },
  {
    title: '사용자가 기다리지 않게',
    description: 'SPOTV NOW에서 화면을 추가로 개발하면서 성능 개선도 함께 챙겼어요.',
  },
]

/** 경력 섹션 제목. 연차가 바뀌면 함께 고친다 (회사별 재직 기간의 합, 2026.10 기준 12년 2개월) */
export const CAREER_TITLE = '12년의 경력'

/** 경력 타임라인. 오래된 곳부터 적는다. 끝난 연도(end)가 없는 곳이 지금 다니는 곳이다 */
export const CAREER: CareerItem[] = [
  { start: '2013', end: '2019', company: '트리포스', role: '웹 개발', summary: 'B2B 웹 서비스와 실시간 관제 시스템 개발·유지보수' },
  { start: '2020', end: '2022', company: '에이클라미디어그룹', role: '웹 프론트엔드', summary: '스포츠 OTT SPOTV NOW·SPOTV ASIA 웹 개발' },
  { start: '2022', company: '엠브레이스', role: '프론트엔드', summary: 'TVING 백오피스, CJ ENM GENII, Ostream 웹 서비스 개발' },
]

/** 초기 경력 아카이브(트리포스 프로젝트). 최근 것부터 적는다. 펼치면 2열로 보인다 */
export const ARCHIVE: ArchiveItem[] = [
  { period: '2018.08 – 2019.09', name: '사내 내부 프로젝트 운영·유지보수', org: '트리포스' },
  { period: '2018.03 – 2018.07', name: 'LG전자 정밀금형센터 생산관제 실시간 시스템', org: '트리포스' },
  { period: '2017.03 – 2018.01', name: 'V3 사내외 내방객 시스템', org: '트리포스' },
  { period: '2016.05 – 2017.01', name: 'KT Sat GNOC 운용지원시스템', org: '트리포스' },
  { period: '2016.02 – 2016.05', name: 'TSC 포털 시스템', org: '트리포스' },
  { period: '2015.01 – 2016.01', name: 'AT센터 농수산물 사이버거래소', org: '트리포스' },
  { period: '2014.01 – 2014.12', name: '실시간 차량 관제 시스템 유지보수', org: '트리포스' },
]

/**
 * 기술 스택. 분야 4개를 기준으로 디자인했다 (분류는 포트폴리오의 사용 기술을 따른다).
 * 사용 연수는 그 기술을 쓴 프로젝트 기간으로 계산했다(2026.10 기준, 내림). 기간을 알 수 없는 기술은 비워 둔다.
 */
export const STACK: StackGroup[] = [
  {
    label: 'FRAMEWORK',
    title: '프레임워크',
    tone: TONE.LILAC,
    items: [
      { name: 'React', short: 'Re', years: '4년' },
      { name: 'Vue 2', short: 'Vu', years: '1년 9개월' },
    ],
  },
  {
    label: 'LANGUAGE · STYLE',
    title: '언어 · 스타일',
    tone: TONE.MINT,
    items: [
      { name: 'TypeScript', short: 'TS', years: '4년' },
      { name: 'JavaScript', short: 'JS', years: '12년' },
      { name: 'SCSS', short: 'Sc', years: '4년' },
      { name: 'CSS', short: 'Cs' },
    ],
  },
  {
    label: 'STATE · DATA',
    title: '상태 관리',
    tone: TONE.BUTTER,
    items: [
      { name: 'TanStack Query', short: 'TQ', years: '4년' },
      { name: 'Recoil', short: 'Rc', years: '4년' },
      { name: 'Zustand', short: 'Zu' },
    ],
  },
  {
    label: 'BUILD · PACKAGE',
    title: '빌드 · 패키지',
    tone: TONE.PEACH,
    items: [
      { name: 'Webpack', short: 'Wp', years: '4년' },
      { name: 'Vite', short: 'Vi', years: '2년' },
      { name: 'npm', short: 'np' },
      { name: 'pnpm', short: 'pn' },
    ],
  },
]

/**
 * 이 화면의 구조: 이 사이트를 어떻게 설계하고 검증했는지. 실제로 구현·확인한 내용만 적는다.
 * 바뀔 수 있는 숫자(테스트 수 등)는 넣지 않는다.
 */
export const BEHIND_NOTES: BehindNote[] = [
  {
    label: 'DESIGN',
    title: '블록 하나에서 시작한 화면',
    description:
      '색·글꼴·모서리·그림자를 이름 붙인 디자인 토큰으로 관리하고, 네 칸 블록 하나를 로고와 경력, 장식에 되풀이해 화면 전체의 결을 맞췄어요.',
    tone: TONE.LILAC,
    visual: BEHIND_VISUAL.TOKENS,
  },
  {
    label: 'ACCESSIBILITY',
    title: '키보드만으로도 전부',
    description:
      '작업 목록과 아카이브는 키보드로 열 수 있어요. 스크린리더가 읽을 이름과 움직임 줄이기 설정, 글자 대비까지 계산해 맞췄어요. Tab 키로 이 페이지를 둘러보세요.',
    tone: TONE.MINT,
    visual: BEHIND_VISUAL.KEYS,
  },
  {
    label: 'QUALITY',
    title: '단계마다 검증',
    description: '화면을 하나 만들 때마다 타입 검사와 코드 검사, 테스트를 통과시키고, 실제 브라우저에서 위치와 폭을 재서 확인했어요.',
    tone: TONE.BUTTER,
    visual: BEHIND_VISUAL.CHECKS,
  },
]

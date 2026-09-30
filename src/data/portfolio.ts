import { TONE } from './const'
import type { ArchiveItem, CareerItem, Intro, MoreWork, Principle, Product, Profile, Stat, Work } from './type'

// 화면에 들어가는 내용을 모아 둔 파일이다. 내용을 바꿀 때는 이 파일만 고친다.
// 실제 내용을 받기 전까지는 시안의 자리표시자([이름], [YYYY] 등)를 쓴다.

export const PROFILE: Profile = {
  name: '[이름]',
  since: '[YYYY]',
  current: {
    company: '[회사명]',
    role: '[역할]',
  },
  email: '[이메일 주소]',
  resumeUrl: '#',
  links: {
    github: '#',
    linkedin: '#',
    blog: '#',
  },
}

export const INTRO: Intro = {
  role: 'FRONTEND ENGINEER',
  headline: ['화면 너머의', '구조까지 설계하는', '프론트엔드 엔지니어'],
  highlight: '구조',
  lead: [`안녕하세요, 10년 차 프론트엔드 개발자 ${PROFILE.name}입니다.`, '[어떤 제품을 어떤 방식으로 만들어 왔는지 한 문장]'],
  metric: '+[N]%',
}

/** 숫자 띠. 4개를 기준으로 디자인했다 (색은 순서대로 라일락·민트·버터·복숭아) */
export const STATS: Stat[] = [
  { value: '10+', label: '년 차 프론트엔드 경력' },
  { value: '[N]+', label: '출시에 참여한 제품' },
  { value: '[N]만+', label: '제품을 쓴 사용자' },
  { value: '[N]%', label: '[대표 지표] 개선' },
]

/** 출시에 참여한 제품. 로고 띠에서 이 순서대로 흐른다 */
export const PRODUCTS: Product[] = [
  { name: '[제품 A]', tone: TONE.LILAC },
  { name: '[제품 B]', tone: TONE.MINT },
  { name: '[제품 C]', tone: TONE.BUTTER },
  { name: '[제품 D]', tone: TONE.PEACH },
  { name: '[제품 E]', tone: TONE.ACCENT },
  { name: '[제품 F]', tone: TONE.INK },
]

/** 대표 작업. 위에서부터 01, 02 … 순서로 번호가 붙는다 */
export const WORKS: Work[] = [
  {
    id: 'work-1',
    title: '[대표 프로젝트]',
    company: '[회사명]',
    period: '[YYYY]',
    role: '[역할]',
    team: '[N]명 팀',
    summary: '[무엇을, 누구를 위해 만들었는지 한 줄]',
    metrics: [
      { value: '+[N]%', label: '[핵심 지표] 개선' },
      { value: '[N]만', label: '월간 사용자' },
    ],
    tags: ['React', 'TypeScript', 'Zustand'],
    tone: TONE.LILAC,
    caseUrl: '#',
  },
  {
    id: 'work-2',
    title: '[회사 프로젝트]',
    company: '[회사명]',
    period: '[YYYY]',
    role: '[역할]',
    team: '[N]명 팀',
    summary: '[무엇을, 누구를 위해 만들었는지 한 줄]',
    metrics: [
      { value: '-[N]%', label: '[로딩 시간] 단축' },
      { value: '[N]개', label: '[적용한 서비스 수]' },
    ],
    tags: ['Next.js', 'TanStack Query'],
    tone: TONE.MINT,
    caseUrl: '#',
  },
  {
    id: 'work-3',
    title: '[플랫폼 · 디자인 시스템]',
    company: '[회사명]',
    period: '[YYYY]',
    role: '[역할]',
    team: '[N]명 팀',
    summary: '[팀 전체가 쓰는 기반을 만든 이야기 한 줄]',
    metrics: [
      { value: '[N]종', label: '[공통 컴포넌트]' },
      { value: '-[N]일', label: '[화면 개발 기간] 단축' },
    ],
    tags: ['TypeScript', 'SCSS', 'Storybook'],
    tone: TONE.BUTTER,
    caseUrl: '#',
  },
  {
    id: 'work-4',
    title: '[리딩한 프로젝트]',
    company: '[회사명]',
    period: '[YYYY]',
    role: '[리드 역할]',
    team: '[N]명 팀',
    summary: '[이끈 범위와 결과 한 줄]',
    metrics: [
      { value: '[N]명', label: '[함께한 팀원]' },
      { value: '+[N]%', label: '[비즈니스 지표] 개선' },
    ],
    tags: ['React', 'Vite', 'Vitest'],
    tone: TONE.PEACH,
    caseUrl: '#',
  },
  {
    id: 'work-5',
    title: '[개인 · 사이드 프로젝트]',
    company: '개인',
    period: '[YYYY]',
    role: '1인 개발',
    team: '1명',
    summary: '[만든 이유와 핵심 기능 한 줄]',
    metrics: [
      { value: '[N]명', label: '[사용자 · 스타]' },
      { value: '[N]개', label: '[기여 · 배포 횟수]' },
    ],
    tags: ['React', 'Zustand'],
    tone: TONE.LILAC_SOFT,
    caseUrl: '#',
  },
]

/** 그 밖의 작업. 3개를 기준으로 디자인했다 */
export const MORE_WORKS: MoreWork[] = [
  { title: '[프로젝트명 1]', company: '[회사명]', year: '[YYYY]', tone: TONE.LILAC_SOFT, url: '#' },
  { title: '[프로젝트명 2]', company: '[회사명]', year: '[YYYY]', tone: TONE.MINT_SOFT, url: '#' },
  { title: '[프로젝트명 3]', company: '[회사명]', year: '[YYYY]', tone: TONE.BUTTER_SOFT, url: '#' },
]

/** 일하는 방식. 3개를 기준으로 디자인했다 (카드 색은 순서대로 연보라·연민트·연버터) */
export const PRINCIPLES: Principle[] = [
  { title: '[일하는 원칙 하나]', description: '[이 원칙이 드러난 경험 한두 문장]' },
  { title: '[일하는 원칙 둘]', description: '[이 원칙이 드러난 경험 한두 문장]' },
  { title: '[일하는 원칙 셋]', description: '[이 원칙이 드러난 경험 한두 문장]' },
]

/** 경력 섹션 제목. 연차가 바뀌면 함께 고친다 */
export const CAREER_TITLE = '10년의 경력'

/** 경력 타임라인. 오래된 곳부터 적는다. 끝난 연도(end)가 없는 곳이 지금 다니는 곳이다 */
export const CAREER: CareerItem[] = [
  { start: '[YYYY]', end: '[YYYY]', company: '[첫 회사명]', role: '[직무]', summary: '[이때 맡은 일 한 줄]' },
  { start: '[YYYY]', end: '[YYYY]', company: '[두 번째 회사명]', role: '[직무]', summary: '[이때 맡은 일 한 줄]' },
  { start: '[YYYY]', end: '[YYYY]', company: '[세 번째 회사명]', role: '[직무]', summary: '[이때 맡은 일 한 줄]' },
  { start: '[YYYY]', end: '[YYYY]', company: '[네 번째 회사명]', role: '[직무]', summary: '[이때 맡은 일 한 줄]' },
  { start: '[YYYY]', company: '[현재 회사명]', role: '[직무]', summary: '[요즘 하는 일 한 줄]' },
]

/** 초기 경력 아카이브. 펼치면 2열로 보인다 */
export const ARCHIVE: ArchiveItem[] = Array.from({ length: 8 }, (_, index) => ({
  period: '[YYYY.MM – YYYY.MM]',
  name: `[프로젝트명 ${index + 1}]`,
  org: '[회사명]',
}))

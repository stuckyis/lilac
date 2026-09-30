import type { Tone } from './const'

/** 외부 프로필 링크 */
export interface SocialLinks {
  github: string
  linkedin: string
  blog: string
}

/** 기본 정보. 헤더, 첫 화면, 연락 섹션에서 같이 쓴다. */
export interface Profile {
  name: string
  /** 경력을 시작한 연도 (예: '2016') */
  since: string
  /** 지금 일하는 곳 */
  current: {
    company: string
    role: string
  }
  email: string
  /** 이력서 PDF 주소 */
  resumeUrl: string
  /** 프로필 사진 주소. 없으면 자리표시 원을 보여준다 */
  photoUrl?: string
  links: SocialLinks
}

/** 첫 화면 소개 */
export interface Intro {
  /** 라벨 앞부분 (예: 'FRONTEND ENGINEER'). 뒤에 `· SINCE 시작 연도`가 붙는다 */
  role: string
  /** 큰 문장. 한 칸이 한 줄이다 */
  headline: string[]
  /** 큰 문장에서 라일락 바탕으로 강조할 단어 */
  highlight: string
  /** 소개 문장. 한 칸이 한 줄이다 */
  lead: string[]
  /** 오른쪽 지표 패널(PERFORMANCE)에 보여줄 수치 */
  metric: string
}

/** 숫자 띠의 숫자 하나. 설명은 숫자 뒤에 이어 읽히도록 쓴다 (예: '10+' + '년 차 프론트엔드 경력') */
export interface Stat {
  value: string
  label: string
}

/** 출시에 참여한 제품 (제품 로고 띠) */
export interface Product {
  name: string
  /** 로고 이미지 주소. 없으면 tone 색의 네모를 대신 보여준다 */
  logoUrl?: string
  tone: Tone
}

/** 성과 수치 하나. 설명은 수치 뒤에 이어 읽히도록 쓴다 (예: '+32%' + '전환율 개선') */
export interface Metric {
  value: string
  label: string
}

/** 대표 작업 */
export interface Work {
  /** 목록 선택에 쓰는 고유 id */
  id: string
  title: string
  company: string
  period: string
  role: string
  /** 팀 규모 (예: '6명 팀') */
  team: string
  /** 무엇을, 누구를 위해 만들었는지 한 줄 */
  summary: string
  /** 성과 수치 2개 */
  metrics: [Metric, Metric]
  /** 사용 기술 */
  tags: string[]
  /** 썸네일 바탕색 (대표 화면 캡처가 없을 때) */
  tone: Tone
  /** 대표 화면 캡처 이미지 주소 */
  imageUrl?: string
  /** 케이스 스터디 주소. 있을 때만 버튼을 보여준다 */
  caseUrl?: string
}

/** 그 밖의 작업 (카드) */
export interface MoreWork {
  title: string
  company: string
  year: string
  tone: Tone
  imageUrl?: string
  /** 자세히 볼 주소. 있으면 카드 전체가 링크가 된다 */
  url?: string
}

/** 일하는 방식: 원칙 하나 */
export interface Principle {
  title: string
  /** 이 원칙이 드러난 경험 한두 문장 */
  description: string
}

/** 경력 타임라인의 마디 하나 (회사) */
export interface CareerItem {
  /** 시작 연도 */
  start: string
  /** 끝난 연도. 없으면 지금 다니는 곳이다 (타임라인에서 강조하고 기간 끝에 NOW를 붙인다) */
  end?: string
  company: string
  role: string
  /** 이때 맡은 일 한 줄 */
  summary: string
}

/** 초기 경력 아카이브의 프로젝트 하나 */
export interface ArchiveItem {
  /** 기간 (예: '2016.03 – 2016.11') */
  period: string
  name: string
  org: string
}

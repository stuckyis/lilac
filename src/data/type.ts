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

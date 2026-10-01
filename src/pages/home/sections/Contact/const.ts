import { PROFILE } from '@/data/portfolio'

/** 연락 링크 (새 창). 블로그는 사용자 요청으로 넣지 않는다 */
export const SOCIAL_LINKS = [
  { label: 'GitHub', href: PROFILE.links.github },
  { label: 'LinkedIn', href: PROFILE.links.linkedin },
] as const

/** 이 사이트를 만든 기술. 실제로 쓰는 것만 적는다 (Zustand: 헤더 메뉴의 지금 보는 섹션 표시) */
export const BUILT_WITH = ['React', 'TypeScript', 'Zustand'] as const

import { PROFILE } from '@/data/portfolio'

/** 연락 링크 (새 창). 블로그는 사용자 요청으로 넣지 않는다 */
export const SOCIAL_LINKS = [
  { label: 'GitHub', href: PROFILE.links.github },
  { label: 'LinkedIn', href: PROFILE.links.linkedin },
] as const

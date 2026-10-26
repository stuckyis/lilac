/** 화면 폭 경계(px). variables.scss의 $breakpoint-*와 값을 맞춘다 */
export const BREAKPOINT = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1280,
} as const

/** mixins.scss의 반응형 믹스인과 같은 구간. useMediaQuery에 넘긴다 */
export const MEDIA_QUERY = {
  /** 1024px 미만 (@include tablet) */
  TABLET: `(width < ${BREAKPOINT.DESKTOP}px)`,
  /** 768px 미만 (@include mobile) */
  MOBILE: `(width < ${BREAKPOINT.TABLET}px)`,
} as const

/** 색 칸에 쓰는 색 이름 (제품 로고 자리, 작업 썸네일 등). 실제 색은 variables.scss의 $tones 맵에 있다 */
export const TONE = {
  LILAC: 'lilac',
  MINT: 'mint',
  BUTTER: 'butter',
  PEACH: 'peach',
  /** 한 단계 연한 색: 그 밖의 작업 썸네일 등 */
  LILAC_SOFT: 'lilac-soft',
  MINT_SOFT: 'mint-soft',
  BUTTER_SOFT: 'butter-soft',
  ACCENT: 'accent',
  INK: 'ink',
} as const

export type Tone = (typeof TONE)[keyof typeof TONE]

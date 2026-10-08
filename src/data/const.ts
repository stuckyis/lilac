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

/** "이 화면의 구조" 카드 위쪽 그림의 종류 */
export const BEHIND_VISUAL = {
  /** 블록 마크 + 디자인 토큰 이름 */
  TOKENS: 'tokens',
  /** 키보드 자판 */
  KEYS: 'keys',
  /** 검사 명령이 통과한 터미널 창 */
  CHECKS: 'checks',
} as const

export type BehindVisual = (typeof BEHIND_VISUAL)[keyof typeof BEHIND_VISUAL]

export const BLOCK_MARK_VARIANT = {
  /** 기본: 라일락 · 강조 · 민트 · 버터 */
  DEFAULT: 'default',
  /** 어두운 바탕: 강조 칸을 흰색으로 */
  ON_DARK: 'on-dark',
  /** 파스텔 바탕 위: 흰 칸 셋 + 잉크색 한 칸 (작업 미리보기 썸네일) */
  ON_PASTEL: 'on-pastel',
} as const

export type BlockMarkVariant = (typeof BLOCK_MARK_VARIANT)[keyof typeof BLOCK_MARK_VARIANT]

/** 24×24 viewBox 안의 네 칸 (왼쪽 위 → 오른쪽 위 → 왼쪽 아래 → 오른쪽 아래) */
export const BLOCK_MARK_CELLS = [
  { x: 2, y: 2, tone: 'lilac' },
  { x: 13, y: 2, tone: 'accent' },
  { x: 2, y: 13, tone: 'mint' },
  { x: 13, y: 13, tone: 'butter' },
] as const

export const HERO_LAYOUT = {
  STACK: 'stack',
  GRID: 'grid',
  SCATTER: 'scatter',
} as const

export type HeroLayout = (typeof HERO_LAYOUT)[keyof typeof HERO_LAYOUT]

/** 레이아웃 바꾸기를 누를 때 도는 순서. 각 레이아웃의 패널 위치는 styles.scss의 $hero-layouts에 있다 */
export const HERO_LAYOUT_ORDER = [HERO_LAYOUT.STACK, HERO_LAYOUT.GRID, HERO_LAYOUT.SCATTER] as const

/** 버튼에 보여줄 레이아웃 이름 */
export const HERO_LAYOUT_LABEL: Record<HeroLayout, string> = {
  [HERO_LAYOUT.STACK]: 'Stack',
  [HERO_LAYOUT.GRID]: 'Grid',
  [HERO_LAYOUT.SCATTER]: 'Scatter',
}

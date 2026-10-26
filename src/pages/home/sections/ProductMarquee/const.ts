import { PRODUCTS } from '@/data/portfolio'

/** 화면을 채우는 데 필요한 제품 카드 수. 가장 넓은 화면(2560px)을 가장 좁은 카드(약 170px)로 채우는 기준이다 */
export const MIN_ITEMS_ON_SCREEN = 16

/**
 * 띠에 이어 붙이는 목록 벌 수 = 화면을 채울 벌 수 + 왼쪽으로 빠져나가는 1벌.
 * 첫 번째 벌만 스크린리더가 읽고, 나머지는 흐름을 잇기 위한 복제본이다(aria-hidden).
 * 제품이 적거나 이름이 짧아도 한 바퀴가 끝날 즈음 오른쪽에 빈틈이 보이지 않는다.
 */
export const MARQUEE_COPIES = Math.ceil(MIN_ITEMS_ON_SCREEN / Math.max(PRODUCTS.length, 1)) + 1

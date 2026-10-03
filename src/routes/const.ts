export const Menus = {
  Home: '/',
} as const

/** 홈 화면 섹션 id. 메뉴 링크(`#work`)와 각 섹션이 같이 쓴다. 화면에 놓인 순서(위 → 아래)대로 적는다. */
export const SECTION_ID = {
  WORK: 'work',
  WAY: 'way',
  CAREER: 'career',
  STACK: 'stack',
  BEHIND: 'behind',
  CONTACT: 'contact',
} as const

export type SectionId = (typeof SECTION_ID)[keyof typeof SECTION_ID]

/** 홈 섹션 id 목록 (위 → 아래). 지금 보는 섹션을 찾을 때 쓴다 */
export const SECTION_IDS: readonly SectionId[] = Object.values(SECTION_ID)

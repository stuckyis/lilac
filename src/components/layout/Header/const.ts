import { SECTION_ID } from '@/routes/const'

/** 펼침 메뉴(dialog)의 id. 메뉴 버튼의 aria-controls가 가리킨다 */
export const MOBILE_MENU_ID = 'mobile-menu'

/** 헤더 메뉴. 순서대로 표시한다. PC 메뉴와 펼침 메뉴가 같이 쓴다. */
export const NAV_ITEMS = [
  { id: SECTION_ID.WORK, label: '작업' },
  { id: SECTION_ID.WAY, label: '일하는 방식' },
  { id: SECTION_ID.CAREER, label: '경력' },
  { id: SECTION_ID.STACK, label: '기술' },
  { id: SECTION_ID.BEHIND, label: '구조' },
] as const

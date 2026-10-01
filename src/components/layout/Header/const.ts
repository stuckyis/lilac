import { SECTION_ID } from '@/routes/const'

/** 헤더 메뉴. 순서대로 표시한다. */
export const NAV_ITEMS = [
  { id: SECTION_ID.WORK, label: '작업' },
  { id: SECTION_ID.WAY, label: '일하는 방식' },
  { id: SECTION_ID.CAREER, label: '경력' },
  { id: SECTION_ID.STACK, label: '기술' },
  { id: SECTION_ID.BEHIND, label: '구조' },
] as const

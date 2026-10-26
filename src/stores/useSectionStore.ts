import type { SectionId } from '@/routes/const'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface SectionState {
  /** 지금 화면에서 보고 있는 홈 섹션. 첫 화면처럼 해당하는 섹션이 없으면 null */
  activeId: SectionId | null
  setActiveId: (id: SectionId | null) => void
}

/**
 * 홈에서 지금 보는 섹션.
 * 섹션은 홈(Outlet)에, 메뉴는 헤더에 있어서 서로 props로 이어지지 않는다. 홈이 쓰고(useActiveSection) 헤더가 읽는다.
 */
export const useSectionStore = create<SectionState>()(
  devtools(
    set => ({
      activeId: null,
      setActiveId: id => set({ activeId: id }),
    }),
    {
      name: 'section-store',
      enabled: import.meta.env.DEV,
    },
  ),
)

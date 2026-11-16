import type { SectionId } from '@/routes/const'
import { useSectionStore } from '@/stores/useSectionStore'
import { useEffect } from 'react'

/** 화면 위에서 40% 지점의 얇은 띠(높이 1%). 이 띠에 걸친 섹션을 "지금 보는 섹션"으로 본다 */
const READING_LINE_MARGIN = '-40% 0px -59% 0px'

/**
 * `ids` 섹션 중 지금 보는 섹션을 찾아 useSectionStore에 넣는다. 띠에 걸친 섹션이 없으면(첫 화면 등) null이다.
 * - `ids`는 화면에 놓인 순서(위 → 아래)로, 렌더링마다 새로 만들지 않는 상수로 넘긴다.
 * - 섹션을 그리는 컴포넌트에서 부른다. 화면을 떠나면 null로 되돌린다.
 */
const useActiveSection = (ids: readonly SectionId[]) => {
  const setActiveId = useSectionStore(state => state.setActiveId)

  useEffect(() => {
    // 지원하지 않는 환경(테스트용 jsdom 등)에서는 메뉴 표시 없이 지나간다
    if (typeof IntersectionObserver === 'undefined') return

    const crossing = new Set<string>()
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) crossing.add(entry.target.id)
          else crossing.delete(entry.target.id)
        })
        // 띠가 두 섹션의 경계에 걸치면 둘 다 들어오므로 위쪽 섹션을 고른다
        setActiveId(ids.find(id => crossing.has(id)) ?? null)
      },
      { rootMargin: READING_LINE_MARGIN },
    )

    ids.forEach(id => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => {
      observer.disconnect()
      setActiveId(null)
    }
  }, [ids])
}

export default useActiveSection

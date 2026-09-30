import { WORKS } from '@/data/portfolio'
import clsx from 'clsx'
import { useRef, useState, type KeyboardEvent } from 'react'
import WorkPreview from './WorkPreview'

const PANEL_ID = 'work-panel'
const toTabId = (workId: string) => `${workId}-tab`
/** 목록 번호 (0 → '01') */
const toNumber = (index: number) => String(index + 1).padStart(2, '0')

/**
 * 대표 작업 목록(세로 탭)과 미리보기(탭 패널).
 * 제목에 마우스를 올리거나 클릭하면 고르고, 키보드는 위·아래 방향키와 Home·End로 고른다(WAI-ARIA 탭 패턴).
 */
const WorkTabs = () => {
  const [activeId, setActiveId] = useState(WORKS[0].id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const activeWork = WORKS.find(work => work.id === activeId) ?? WORKS[0]

  const selectAndFocus = (index: number) => {
    setActiveId(WORKS[index].id)
    tabRefs.current[index]?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = WORKS.findIndex(work => work.id === activeId)
    const last = WORKS.length - 1

    // 끝에서 누르면 반대쪽 끝으로 돈다
    if (event.key === 'ArrowDown') selectAndFocus(current === last ? 0 : current + 1)
    else if (event.key === 'ArrowUp') selectAndFocus(current === 0 ? last : current - 1)
    else if (event.key === 'Home') selectAndFocus(0)
    else if (event.key === 'End') selectAndFocus(last)
    else return

    event.preventDefault()
  }

  return (
    <div className="work__main">
      <div className="work__tabs" role="tablist" aria-orientation="vertical" aria-labelledby="work-title" onKeyDown={handleKeyDown}>
        {WORKS.map((work, index) => {
          const isActive = work.id === activeId

          return (
            <button
              key={work.id}
              ref={element => {
                tabRefs.current[index] = element
              }}
              type="button"
              role="tab"
              id={toTabId(work.id)}
              className={clsx('work__tab', isActive && 'work__tab--active')}
              aria-selected={isActive}
              aria-controls={PANEL_ID}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(work.id)}
              onMouseEnter={() => setActiveId(work.id)}
            >
              <span className="work__tab-no" aria-hidden>
                {toNumber(index)}
              </span>
              <span className="work__tab-title">{work.title}</span>{' '}
              <span className="work__tab-meta">
                {work.company} · {work.period}
              </span>
            </button>
          )
        })}
      </div>

      <WorkPreview id={PANEL_ID} labelledBy={toTabId(activeWork.id)} work={activeWork} />
    </div>
  )
}

export default WorkTabs

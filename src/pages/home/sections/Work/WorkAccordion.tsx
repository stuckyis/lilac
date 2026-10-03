import { ChevronDownIcon } from '@/components/ui/Icon'
import { WORKS } from '@/data/portfolio'
import { toOrderNumber } from '@/utils/helpers/helpers'
import clsx from 'clsx'
import { useRef } from 'react'
import WorkDetail from './WorkDetail'

const toButtonId = (workId: string) => `${workId}-accordion-button`
const toPanelId = (workId: string) => `${workId}-accordion-panel`

interface WorkAccordionProps {
  /** 펼친 작업 id. 모두 접혀 있으면 null */
  openId: string | null
  onChange: (workId: string | null) => void
}

/**
 * 대표 작업 아코디언 (1024px 미만, WAI-ARIA 아코디언 패턴).
 * 제목을 누르면 목록 안에서 상세가 펼쳐진다. 한 번에 하나만 펼치고, 펼친 제목을 다시 누르면 접힌다.
 */
const WorkAccordion = ({ openId, onChange }: WorkAccordionProps) => {
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const handleToggle = (workId: string) => {
    const nextId = openId === workId ? null : workId
    onChange(nextId)

    // 위에 펼쳐져 있던 작업이 접히면 고른 제목이 화면 위로 밀려날 수 있다. 화면을 다시 그린 뒤 제목이 보이게 한다
    if (nextId) requestAnimationFrame(() => buttonRefs.current[nextId]?.scrollIntoView?.({ block: 'nearest' }))
  }

  return (
    <ul className="work-accordion" role="list">
      {WORKS.map((work, index) => {
        const isOpen = work.id === openId

        return (
          <li key={work.id} className={clsx('work-accordion__item', isOpen && 'work-accordion__item--open')}>
            <h3 className="work-accordion__heading">
              <button
                ref={element => {
                  buttonRefs.current[work.id] = element
                }}
                type="button"
                id={toButtonId(work.id)}
                className="work-accordion__button"
                aria-expanded={isOpen}
                aria-controls={toPanelId(work.id)}
                onClick={() => handleToggle(work.id)}
              >
                <span className="work-accordion__no" aria-hidden>
                  {toOrderNumber(index)}
                </span>
                <span className="work-accordion__text">
                  <span className="work-accordion__title">{work.title}</span>{' '}
                  <span className="work-accordion__meta">
                    {work.company} · {work.period}
                  </span>
                </span>
                <ChevronDownIcon size={22} className="work-accordion__chevron" />
              </button>
            </h3>

            <div id={toPanelId(work.id)} className="work-accordion__panel" role="region" aria-labelledby={toButtonId(work.id)} hidden={!isOpen}>
              <WorkDetail work={work} showPlace={false} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default WorkAccordion

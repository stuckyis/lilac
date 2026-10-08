import { ChevronDownIcon } from '@/components/ui/Icon'
import { ARCHIVE } from '@/data/portfolio'
import { reveal } from '@/utils/reveal'
import { useState } from 'react'

const LIST_ID = 'career-archive'

/** 초기 경력 아카이브: 버튼으로 펼치고 접는 2열 목록 (WAI-ARIA 펼침 패턴) */
const Archive = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div ref={reveal} className="career-archive">
      <button
        type="button"
        className="career-archive__toggle"
        aria-expanded={isOpen}
        aria-controls={LIST_ID}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {isOpen ? '아카이브 접기' : '초기 경력 아카이브 펼치기'}{' '}
        <span className="career-archive__count" aria-hidden>
          {ARCHIVE.length}
        </span>
        <span className="visually-hidden">({ARCHIVE.length}개)</span>
        <ChevronDownIcon className="career-archive__chevron" size={18} />
      </button>

      <ul id={LIST_ID} className="career-archive__list" role="list" hidden={!isOpen}>
        {ARCHIVE.map(item => (
          <li key={item.name} className="career-archive__item">
            <span className="career-archive__period">{item.period}</span>{' '}
            <span>
              {item.name} <span className="career-archive__org">· {item.org}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Archive

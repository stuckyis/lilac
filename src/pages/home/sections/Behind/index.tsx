import SectionHeading from '@/components/ui/SectionHeading'
import { BEHIND_NOTES } from '@/data/portfolio'
import { SECTION_ID } from '@/routes/const'
import { BEHIND_VISUAL, type BehindVisual } from '@/data/const'
import clsx from 'clsx'
import type { ComponentType } from 'react'
import { ChecksVisual, KeysVisual, TokensVisual } from './Visuals'
import './styles.scss'

/** 데이터의 visual 값 → 카드 그림 */
const VISUALS: Record<BehindVisual, ComponentType> = {
  [BEHIND_VISUAL.TOKENS]: TokensVisual,
  [BEHIND_VISUAL.KEYS]: KeysVisual,
  [BEHIND_VISUAL.CHECKS]: ChecksVisual,
}

/**
 * 이 화면의 구조: 이 사이트를 어떻게 설계하고 검증했는지 보여주는 카드 3개.
 * 1024px 미만에서는 카드를 1열로 쌓는다 (가로로 넘기지 않는다).
 */
const Behind = () => {
  return (
    <section id={SECTION_ID.BEHIND} className="behind" aria-labelledby="behind-title">
      <SectionHeading id="behind-title" index="05" label="BEHIND THIS PAGE" title="이 화면의 구조" note="직접 눌러 보며 확인할 수 있어요" />

      <ul className="behind__list" role="list">
        {BEHIND_NOTES.map(note => {
          const Visual = VISUALS[note.visual]

          return (
            <li key={note.label} className="behind__card">
              <div className={clsx('behind__visual', `behind__visual--${note.tone}`)} aria-hidden>
                <Visual />
              </div>
              <div className="behind__body">
                <p className="behind__label" aria-hidden>
                  {note.label}
                </p>
                <h3 className="behind__title">{note.title}</h3>
                <p className="behind__description">{note.description}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Behind

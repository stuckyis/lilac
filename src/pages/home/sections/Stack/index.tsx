import SectionHeading from '@/components/ui/SectionHeading'
import { STACK } from '@/data/portfolio'
import { SECTION_ID } from '@/routes/const'
import clsx from 'clsx'
import './styles.scss'

/** 기술 스택: 분야 카드 4개. 기술마다 두 글자 아이콘 칸, 이름, 사용 연수 */
const Stack = () => {
  return (
    <section id={SECTION_ID.STACK} className="stack" aria-labelledby="stack-title">
      <SectionHeading id="stack-title" index="04" label="STACK" title="기술 스택" />

      <ul className="stack__groups" role="list">
        {STACK.map(group => (
          <li key={group.label} className="stack__card">
            {/* 영문 라벨은 한글 제목과 같은 뜻의 장식이라 스크린리더는 제목만 읽는다 */}
            <p className="stack__label" aria-hidden>
              {group.label}
            </p>
            <h3 className="stack__title">{group.title}</h3>

            <ul className="stack__items" role="list">
              {group.items.map(item => (
                <li key={item.name} className="stack__item">
                  <span className={clsx('stack__icon', `stack__icon--${group.tone}`)} aria-hidden>
                    {item.short}
                  </span>
                  <span className="stack__text">
                    <span className="stack__name">{item.name}</span> <span className="stack__years">{item.years}</span>
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Stack

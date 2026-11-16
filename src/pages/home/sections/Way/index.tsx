import SectionHeading from '@/components/ui/SectionHeading'
import { PRINCIPLES } from '@/data/portfolio'
import { SECTION_ID } from '@/routes/const'
import { toOrderNumber } from '@/utils/helpers/helpers'
import { reveal } from '@/utils/reveal'
import './styles.scss'

/** 일하는 방식: 번호가 붙은 원칙 카드 3개 */
const Way = () => {
  return (
    <section id={SECTION_ID.WAY} className="way" aria-labelledby="way-title">
      <SectionHeading id="way-title" index="02" label="HOW I WORK" title="일하는 방식" />

      <ol className="way__list" role="list">
        {PRINCIPLES.map((principle, index) => (
          <li key={principle.title} ref={reveal} className="way__card">
            <span className="way__no" aria-hidden>
              {toOrderNumber(index)}
            </span>
            <h3 className="way__title">{principle.title}</h3>
            <p className="way__description">{principle.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Way

import BlockMark from '@/components/ui/BlockMark'
import { BLOCK_MARK_VARIANT } from '@/components/ui/BlockMark/const'
import { STATS } from '@/data/portfolio'
import { reveal } from '@/utils/reveal'
import './styles.scss'

/** 숫자 띠: 경력 규모를 숫자 4개로 요약한 어두운 블록 */
const Stats = () => {
  return (
    <section ref={reveal} className="stats" aria-labelledby="stats-title">
      <h2 id="stats-title" className="visually-hidden">
        숫자로 보는 경력
      </h2>
      <BlockMark className="stats__mark" size={160} variant={BLOCK_MARK_VARIANT.ON_DARK} />

      <ul className="stats__list" role="list">
        {STATS.map(stat => (
          <li key={stat.label} className="stats__item">
            <strong className="stats__value">{stat.value}</strong>
            <span className="stats__label">{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Stats

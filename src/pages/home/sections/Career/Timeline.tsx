import { CAREER } from '@/data/portfolio'
import { reveal } from '@/utils/reveal'
import clsx from 'clsx'

/** 끝난 연도가 없으면 지금 다니는 곳이라 NOW로 적는다 */
const formatPeriod = (start: string, end?: string) => `${start} — ${end ?? 'NOW'}`

/**
 * 경력 타임라인: 오래된 곳부터 왼쪽에서 오른쪽으로 놓고, 최근으로 올수록 블록이 커지고 진해진다.
 * 지금 다니는 곳(end 없음)은 가장 큰 강조색 블록에 둘레 빛을 준다.
 */
const Timeline = () => {
  return (
    <ol className="career__timeline" role="list">
      {CAREER.map(item => {
        const isCurrent = !item.end

        return (
          <li key={`${item.company}-${item.start}`} ref={reveal} className={clsx('career__node', isCurrent && 'career__node--current')}>
            <span className="career__marker-area" aria-hidden>
              <span className="career__marker" />
            </span>
            <p className="career__period">{formatPeriod(item.start, item.end)}</p>
            <h3 className="career__company">{item.company}</h3>
            <p className="career__summary">
              {item.role} · {item.summary}
            </p>
          </li>
        )
      })}
    </ol>
  )
}

export default Timeline

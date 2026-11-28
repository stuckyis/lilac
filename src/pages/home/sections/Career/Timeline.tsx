import { CAREER } from '@/data/portfolio'
import { reveal } from '@/utils/reveal'
import clsx from 'clsx'
import type { CSSProperties } from 'react'
import { formatTenure, getTenureMonths } from './tenure'

/** 퇴사한 달이 없으면 지금 다니는 곳이라 NOW로 적는다 */
const formatPeriod = (start: string, end?: string) => `${start} — ${end ?? 'NOW'}`

/**
 * 경력 타임라인: 오래된 곳부터 왼쪽에서 오른쪽으로 놓고, 최근으로 올수록 블록이 커지고 진해진다.
 * 칸 폭(다음 블록까지의 선 길이)은 재직 개월 수에 비례한다. 좁은 화면(세로)에서는 칸 높이로 보여준다.
 * 지금 다니는 곳(end 없음)은 가장 큰 강조색 블록에 둘레 빛을 준다.
 */
const Timeline = () => {
  const months = CAREER.map(item => getTenureMonths(item.start, item.end))

  return (
    <ol
      className="career__timeline"
      role="list"
      style={{ '--career-columns': months.map(count => `minmax(220px, ${count}fr)`).join(' ') } as CSSProperties}
    >
      {CAREER.map((item, index) => {
        const isCurrent = !item.end

        return (
          <li
            key={`${item.company}-${item.start}`}
            ref={reveal}
            className={clsx('career__node', isCurrent && 'career__node--current')}
            style={{ '--career-months': months[index] } as CSSProperties}
          >
            <span className="career__marker-area" aria-hidden>
              <span className="career__marker" />
            </span>
            <p className="career__period">
              {formatPeriod(item.start, item.end)}
              <span className="career__tenure">
                <span className="visually-hidden">, 재직 </span>
                {formatTenure(months[index])}
              </span>
            </p>
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

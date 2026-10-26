import BlockMark from '@/components/ui/BlockMark'
import { BLOCK_MARK_VARIANT } from '@/components/ui/BlockMark/const'
import { ArrowRightIcon } from '@/components/ui/Icon'
import type { Work } from '@/data/type'
import clsx from 'clsx'

interface WorkDetailProps {
  work: Work
  /** 회사·기간을 보여줄지. 아코디언은 제목 줄에 이미 있어서 뺀다 */
  showPlace?: boolean
}

/** 대표 작업 상세: 썸네일, 회사·기간·역할·팀, 요약, 성과 수치, 기술, 케이스 스터디. 탭 패널(PC)과 아코디언(좁은 화면)이 같이 쓴다 */
const WorkDetail = ({ work, showPlace = true }: WorkDetailProps) => {
  const meta = showPlace ? [work.company, work.period, work.role, work.team] : [work.role, work.team]

  return (
    <div className="work-detail">
      <div className={clsx('work-detail__thumb', `work-detail__thumb--${work.tone}`)}>
        {work.imageUrl ? (
          <img className="work-detail__image" src={work.imageUrl} alt={`${work.title} 대표 화면`} />
        ) : (
          <div className="work-detail__placeholder" aria-hidden>
            <BlockMark size={72} variant={BLOCK_MARK_VARIANT.ON_PASTEL} />
            <span className="work-detail__caption">[대표 화면 캡처]</span>
          </div>
        )}
      </div>

      <div className="work-detail__body">
        <p className="work-detail__meta">{meta.join(' · ')}</p>
        <p className="work-detail__summary">{work.summary}</p>

        <ul className="work-detail__metrics" role="list">
          {work.metrics.map(metric => (
            <li key={metric.label} className="work-detail__metric">
              <strong className="work-detail__metric-value">{metric.value}</strong> <span className="work-detail__metric-label">{metric.label}</span>
            </li>
          ))}
        </ul>

        <ul className="work-detail__tags" role="list" aria-label="사용 기술">
          {work.tags.map(tag => (
            <li key={tag} className="work-detail__tag">
              {tag}
            </li>
          ))}
        </ul>

        {work.caseUrl && (
          <a className="work-detail__link" href={work.caseUrl} target="_blank" rel="noopener noreferrer">
            케이스 스터디 보기 <span className="visually-hidden">(새 창에서 열림)</span>
            <ArrowRightIcon size={18} />
          </a>
        )}
      </div>
    </div>
  )
}

export default WorkDetail

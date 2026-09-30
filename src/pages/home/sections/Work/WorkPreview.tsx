import BlockMark from '@/components/ui/BlockMark'
import { BLOCK_MARK_VARIANT } from '@/components/ui/BlockMark/const'
import { ArrowRightIcon } from '@/components/ui/Icon'
import type { Work } from '@/data/type'
import clsx from 'clsx'

interface WorkPreviewProps {
  /** 탭 패널 id (탭의 aria-controls와 같다) */
  id: string
  /** 지금 선택된 탭의 id */
  labelledBy: string
  work: Work
}

/** 대표 작업 미리보기(탭 패널): 썸네일, 회사·기간·역할·팀, 요약, 성과 수치, 기술, 케이스 스터디 */
const WorkPreview = ({ id, labelledBy, work }: WorkPreviewProps) => {
  return (
    <div id={id} className="work-preview" role="tabpanel" aria-labelledby={labelledBy} tabIndex={0}>
      {/* 작업이 바뀌면 key가 바뀌어 새로 그려지면서 살짝 떠오른다 */}
      <div key={work.id} className="work-preview__content">
        <div className={clsx('work-preview__thumb', `work-preview__thumb--${work.tone}`)}>
          {work.imageUrl ? (
            <img className="work-preview__image" src={work.imageUrl} alt={`${work.title} 대표 화면`} />
          ) : (
            <div className="work-preview__placeholder" aria-hidden>
              <BlockMark size={72} variant={BLOCK_MARK_VARIANT.ON_PASTEL} />
              <span className="work-preview__caption">[대표 화면 캡처]</span>
            </div>
          )}
        </div>

        <div className="work-preview__body">
          <p className="work-preview__meta">
            {work.company} · {work.period} · {work.role} · {work.team}
          </p>
          <p className="work-preview__summary">{work.summary}</p>

          <ul className="work-preview__metrics" role="list">
            {work.metrics.map(metric => (
              <li key={metric.label} className="work-preview__metric">
                <strong className="work-preview__metric-value">{metric.value}</strong>{' '}
                <span className="work-preview__metric-label">{metric.label}</span>
              </li>
            ))}
          </ul>

          <ul className="work-preview__tags" role="list" aria-label="사용 기술">
            {work.tags.map(tag => (
              <li key={tag} className="work-preview__tag">
                {tag}
              </li>
            ))}
          </ul>

          {work.caseUrl && (
            <a className="work-preview__link" href={work.caseUrl} target="_blank" rel="noopener noreferrer">
              케이스 스터디 보기 <span className="visually-hidden">(새 창에서 열림)</span>
              <ArrowRightIcon size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default WorkPreview

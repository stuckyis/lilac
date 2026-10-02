import type { Work } from '@/data/type'
import WorkDetail from './WorkDetail'

interface WorkPreviewProps {
  /** 탭 패널 id (탭의 aria-controls와 같다) */
  id: string
  /** 지금 선택된 탭의 id */
  labelledBy: string
  work: Work
}

/** 대표 작업 미리보기(탭 패널): 목록 오른쪽 카드에 고른 작업의 상세를 보여준다 */
const WorkPreview = ({ id, labelledBy, work }: WorkPreviewProps) => {
  return (
    <div id={id} className="work-preview" role="tabpanel" aria-labelledby={labelledBy} tabIndex={0}>
      {/* 작업이 바뀌면 key가 바뀌어 새로 그려지면서 살짝 떠오른다 */}
      <div key={work.id} className="work-preview__content">
        <WorkDetail work={work} />
      </div>
    </div>
  )
}

export default WorkPreview

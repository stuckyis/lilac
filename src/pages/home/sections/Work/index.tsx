import SectionHeading from '@/components/ui/SectionHeading'
import { WORKS } from '@/data/portfolio'
import useMediaQuery from '@/hooks/useMediaQuery'
import { SECTION_ID } from '@/routes/const'
import { MEDIA_QUERY } from '@/styles/breakpoints'
import { useState } from 'react'
import MoreWork from './MoreWork'
import WorkAccordion from './WorkAccordion'
import WorkTabs from './WorkTabs'
import './styles.scss'

/**
 * 대표 작업: 목록 + 상세, 그 아래 그 밖의 작업.
 * 1024px 이상은 탭(목록 + 미리보기 카드), 그보다 좁으면 아코디언(목록 안에서 펼침)으로 보여준다.
 */
const Work = () => {
  const isCompact = useMediaQuery(MEDIA_QUERY.TABLET)
  // 고른 작업. 탭과 아코디언이 같이 써서 화면 폭이 바뀌어도 이어진다. 아코디언은 모두 접을 수 있어 null도 된다
  const [selectedId, setSelectedId] = useState<string | null>(WORKS[0].id)

  return (
    <section id={SECTION_ID.WORK} className="work" aria-labelledby="work-title">
      <SectionHeading
        id="work-title"
        index="01"
        label="SELECTED WORK"
        title="대표 작업"
        note={isCompact ? '제목을 누르면 자세히 보여요' : '제목에 마우스를 올리면 자세히 보여요'}
      />
      {isCompact ? (
        <WorkAccordion openId={selectedId} onChange={setSelectedId} />
      ) : (
        <WorkTabs activeId={selectedId ?? WORKS[0].id} onSelect={setSelectedId} />
      )}
      <MoreWork />
    </section>
  )
}

export default Work

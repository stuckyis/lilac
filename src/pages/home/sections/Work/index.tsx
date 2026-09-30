import SectionHeading from '@/components/ui/SectionHeading'
import { SECTION_ID } from '@/routes/const'
import MoreWork from './MoreWork'
import WorkTabs from './WorkTabs'
import './styles.scss'

/** 대표 작업: 목록 + 미리보기, 그 아래 그 밖의 작업 */
const Work = () => {
  return (
    <section id={SECTION_ID.WORK} className="work" aria-labelledby="work-title">
      <SectionHeading id="work-title" index="01" label="SELECTED WORK" title="대표 작업" note="제목에 마우스를 올리면 자세히 보여요" />
      <WorkTabs />
      <MoreWork />
    </section>
  )
}

export default Work

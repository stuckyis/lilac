import SectionHeading from '@/components/ui/SectionHeading'
import { CAREER_TITLE } from '@/data/portfolio'
import { SECTION_ID } from '@/routes/const'
import Archive from './Archive'
import Timeline from './Timeline'
import './styles.scss'

/** 경력: 블록 타임라인 + 초기 경력 아카이브 */
const Career = () => {
  return (
    <section id={SECTION_ID.CAREER} className="career" aria-labelledby="career-title">
      <SectionHeading id="career-title" index="03" label="CAREER" title={CAREER_TITLE} note="블록이 쌓이듯, 한 단계씩" />
      <Timeline />
      <Archive />
    </section>
  )
}

export default Career

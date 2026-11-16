import { reveal } from '@/utils/reveal'
import './styles.scss'

interface SectionHeadingProps {
  /** 제목(h2)의 id. 섹션의 aria-labelledby로 연결한다 */
  id: string
  /** 섹션 번호 (예: '01') */
  index: string
  /** 영문 라벨 (예: 'SELECTED WORK') */
  label: string
  title: string
  /** 오른쪽에 붙는 짧은 안내 문구 */
  note?: string
}

/**
 * 섹션 제목 줄: 모노 라벨(`01 — SELECTED WORK`) + 큰 제목 + (선택) 오른쪽 안내 문구.
 * 라벨은 제목과 같은 뜻의 장식이라 스크린리더는 제목만 읽는다.
 */
const SectionHeading = ({ id, index, label, title, note }: SectionHeadingProps) => {
  return (
    <div ref={reveal} className="section-heading">
      <div className="section-heading__main">
        <p className="section-heading__label" aria-hidden>
          <span className="section-heading__mark" />
          {index} — {label}
        </p>
        <h2 id={id} className="section-heading__title">
          {title}
        </h2>
      </div>
      {note && <p className="section-heading__note">{note}</p>}
    </div>
  )
}

export default SectionHeading

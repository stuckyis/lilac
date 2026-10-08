import { MORE_WORKS } from '@/data/portfolio'
import type { MoreWork as MoreWorkItem } from '@/data/type'
import { reveal } from '@/utils/reveal'
import clsx from 'clsx'

const MoreWorkCard = ({ work }: { work: MoreWorkItem }) => {
  const content = (
    <>
      <div className={clsx('more-work__thumb', `more-work__thumb--${work.tone}`)}>
        {work.imageUrl ? <img className="more-work__image" src={work.imageUrl} alt="" /> : <span aria-hidden>[작업 화면]</span>}
      </div>
      <strong className="more-work__name">{work.title}</strong>{' '}
      <span className="more-work__meta">
        {work.company} · {work.year}
      </span>
    </>
  )

  // 주소가 있으면 카드 전체가 링크, 없으면 그냥 카드
  if (work.url) {
    return (
      <a className="more-work__card" href={work.url} target="_blank" rel="noopener noreferrer">
        {content}
        <span className="visually-hidden">(새 창에서 열림)</span>
      </a>
    )
  }

  return <div className="more-work__card">{content}</div>
}

/** 그 밖의 작업: 대표 작업 아래의 카드 3개 */
const MoreWork = () => {
  return (
    <div className="more-work">
      <h3 ref={reveal} className="more-work__title">
        <span className="more-work__mark" aria-hidden />그 밖의 작업
      </h3>
      <ul className="more-work__list" role="list">
        {MORE_WORKS.map(work => (
          <li key={work.title} ref={reveal}>
            <MoreWorkCard work={work} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MoreWork

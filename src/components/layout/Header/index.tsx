import BlockMark from '@/components/ui/BlockMark'
import { PROFILE } from '@/data/portfolio'
import useScrolled from '@/hooks/useScrolled'
import useSeoulTime from '@/hooks/useSeoulTime'
import clsx from 'clsx'
import { NAV_ITEMS } from './const'
import './styles.scss'

/**
 * 화면 위에 고정된 헤더. 로고, 메뉴, 서울 시각·이력서 세 묶음으로 나뉜다.
 * 맨 위에서는 메뉴만 반투명 알약이고, 스크롤하면 세 묶음이 모두 떠 있는 블록이 된다.
 */
const Header = () => {
  const time = useSeoulTime()
  const isScrolled = useScrolled()

  return (
    <header className={clsx('header', isScrolled && 'header--scrolled')}>
      {/* #top은 같은 id가 없으면 문서 맨 위로 이동한다 (HTML 표준) */}
      <a className="header__block header__brand" href="#top">
        <BlockMark size={28} />
        {PROFILE.name}
      </a>

      <nav className="header__block header__nav" aria-label="주요 메뉴">
        <ul className="header__menu" role="list">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <a className="header__link" href={`#${item.id}`}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header__block header__side">
        <span className="header__time">
          SEOUL <time dateTime={time}>{time}</time>
        </span>
        <a className="header__resume" href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer">
          이력서 <span className="visually-hidden">(새 창에서 열림)</span>
        </a>
      </div>
    </header>
  )
}

export default Header

import BlockMark from '@/components/ui/BlockMark'
import useScrolled from '@/hooks/useScrolled'
import { useSectionStore } from '@/stores/useSectionStore'
import clsx from 'clsx'
import { NAV_ITEMS } from './const'
import MobileMenu from './MobileMenu'
import './styles.scss'
// [숨김] 서울 시각·이력서 묶음에서 쓰는 import. 다시 보이게 할 때 아래 주석을 모두 푼다.
// import { PROFILE } from '@/data/portfolio'
// import useSeoulTime from '@/hooks/useSeoulTime'

/**
 * 화면 위에 고정된 헤더. 왼쪽 로고, 가운데 메뉴로 나뉜다.
 * 맨 위에서는 메뉴만 반투명 알약이고, 스크롤하면 로고도 떠 있는 블록이 된다.
 * 지금 보는 섹션의 메뉴는 어두운 알약으로 표시한다 (홈이 useSectionStore에 넣는다).
 * 1024px 미만에서는 가운데 메뉴 대신 오른쪽 메뉴 버튼(MobileMenu)이 펼침 메뉴를 연다.
 */
const Header = () => {
  const isScrolled = useScrolled()
  const activeId = useSectionStore(state => state.activeId)
  // const time = useSeoulTime() // [숨김] 서울 시각

  return (
    <header className={clsx('header', isScrolled && 'header--scrolled')}>
      {/* #top은 같은 id가 없으면 문서 맨 위로 이동한다 (HTML 표준) */}
      <a className="header__block header__brand" href="#top">
        <BlockMark size={28} />
        <span className="visually-hidden">맨 위로</span>
      </a>

      <nav className="header__block header__nav" aria-label="주요 메뉴">
        <ul className="header__menu" role="list">
          {NAV_ITEMS.map(item => {
            const isActive = item.id === activeId

            return (
              <li key={item.id}>
                <a
                  className={clsx('header__link', isActive && 'header__link--active')}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <MobileMenu />

      {/* [숨김] 서울 시각·이력서 묶음. 다시 보이게 할 때 위 import와 useSeoulTime 호출, styles.scss·index.test.tsx의 [숨김] 주석을 함께 푼다.
      <div className="header__block header__side">
        <span className="header__time">
          SEOUL <time dateTime={time}>{time}</time>
        </span>
        <a className="header__resume" href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer">
          이력서 <span className="visually-hidden">(새 창에서 열림)</span>
        </a>
      </div>
      */}
    </header>
  )
}

export default Header

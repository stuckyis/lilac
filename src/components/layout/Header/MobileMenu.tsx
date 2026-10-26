import BlockMark from '@/components/ui/BlockMark'
import { CloseIcon, MailIcon, MenuIcon } from '@/components/ui/Icon'
import { PROFILE } from '@/data/portfolio'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useSectionStore } from '@/stores/useSectionStore'
import { MEDIA_QUERY } from '@/styles/breakpoints'
import { toOrderNumber } from '@/utils/helpers/helpers'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { MOBILE_MENU_ID, NAV_ITEMS } from './const'

/**
 * 1024px 미만에서 보이는 메뉴 버튼과 펼침 메뉴.
 * 기본 <dialog>를 showModal()로 열어서 ESC로 닫기, 뒤 화면 비활성(포커스가 메뉴 안에 머묾),
 * 닫은 뒤 메뉴 버튼으로 포커스 되돌리기를 브라우저가 맡는다.
 */
const MobileMenu = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  // 메뉴 버튼의 aria-expanded용. 실제로 열고 닫는 것은 dialog이고, ESC로 닫혀도 close 이벤트로 맞춘다
  const [isOpen, setIsOpen] = useState(false)
  const isCompact = useMediaQuery(MEDIA_QUERY.TABLET)
  const activeId = useSectionStore(state => state.activeId)

  const open = () => {
    dialogRef.current?.showModal()
    setIsOpen(true)
  }

  // 링크를 누르면 섹션 이동(기본 동작)보다 먼저 닫혀야 스크롤 막기가 풀린 채로 이동한다. 그래서 상태를 거치지 않고 바로 닫는다
  const close = () => dialogRef.current?.close()

  // PC 폭으로 넓어지면 메뉴 버튼이 사라지므로 열려 있던 메뉴를 닫는다
  useEffect(() => {
    if (!isCompact) close()
  }, [isCompact])

  return (
    <>
      <button
        type="button"
        className="header__menu-button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={MOBILE_MENU_ID}
        onClick={open}
      >
        <MenuIcon />
        <span className="visually-hidden">메뉴 열기</span>
      </button>

      <dialog id={MOBILE_MENU_ID} ref={dialogRef} className="mobile-menu" aria-label="메뉴" onClose={() => setIsOpen(false)}>
        {/* 로고와 닫기 버튼은 헤더의 로고·메뉴 버튼과 같은 자리에 둔다 */}
        <div className="mobile-menu__top">
          <span className="mobile-menu__mark">
            <BlockMark size={24} />
          </span>
          <button type="button" className="mobile-menu__close" onClick={close}>
            <CloseIcon />
            <span className="visually-hidden">메뉴 닫기</span>
          </button>
        </div>

        <nav aria-label="주요 메뉴">
          <ul className="mobile-menu__list" role="list">
            {NAV_ITEMS.map((item, index) => {
              const isActive = item.id === activeId

              return (
                <li key={item.id}>
                  <a
                    className={clsx('mobile-menu__link', isActive && 'mobile-menu__link--active')}
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={close}
                  >
                    <span className="mobile-menu__no" aria-hidden>
                      {toOrderNumber(index)}
                    </span>
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <a className="mobile-menu__contact" href={`mailto:${PROFILE.email}`}>
          <MailIcon />
          메일 보내기
        </a>
      </dialog>
    </>
  )
}

export default MobileMenu

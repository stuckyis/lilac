import { SECTION_ID } from '@/routes/const'
import { useSectionStore } from '@/stores/useSectionStore'
import { mockScreenWidth } from '@/test/matchMedia'
import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import MobileMenu from './MobileMenu'

const getMenuButton = () => screen.getByRole('button', { name: '메뉴 열기' })
const getDialog = () => document.querySelector('dialog')!

const openMenu = () => {
  fireEvent.click(getMenuButton())
  return screen.getByRole('dialog', { name: '메뉴' })
}

describe('MobileMenu', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    useSectionStore.setState({ activeId: null })
  })

  it('메뉴 버튼을 누르면 섹션 링크 5개가 있는 메뉴가 열려야 합니다', () => {
    mockScreenWidth(390)
    render(<MobileMenu />)
    expect(getMenuButton()).toHaveAttribute('aria-expanded', 'false')
    expect(getMenuButton()).toHaveAttribute('aria-controls', getDialog().id)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    const dialog = openMenu()

    expect(getMenuButton()).toHaveAttribute('aria-expanded', 'true')
    const nav = within(dialog).getByRole('navigation', { name: '주요 메뉴' })
    expect(
      within(nav)
        .getAllByRole('link')
        .map(link => [link.textContent, link.getAttribute('href')]),
    ).toEqual([
      ['01작업', '#work'],
      ['02일하는 방식', '#way'],
      ['03경력', '#career'],
      ['04기술', '#stack'],
      ['05구조', '#behind'],
    ])
    // 번호는 장식이라 링크 이름에는 들어가지 않는다
    expect(within(nav).getByRole('link', { name: '작업' })).toBeInTheDocument()
  })

  it('닫기 버튼을 누르면 메뉴가 닫혀야 합니다', () => {
    mockScreenWidth(390)
    render(<MobileMenu />)
    const dialog = openMenu()

    fireEvent.click(within(dialog).getByRole('button', { name: '메뉴 닫기' }))

    expect(getDialog().open).toBe(false)
    expect(getMenuButton()).toHaveAttribute('aria-expanded', 'false')
  })

  it('메뉴 링크를 고르면 메뉴가 닫혀야 합니다', () => {
    mockScreenWidth(390)
    render(<MobileMenu />)
    const dialog = openMenu()

    fireEvent.click(within(dialog).getByRole('link', { name: '경력' }))

    expect(getDialog().open).toBe(false)
    expect(getMenuButton()).toHaveAttribute('aria-expanded', 'false')
  })

  it('ESC 등으로 메뉴가 닫히면(close 이벤트) 메뉴 버튼도 닫힘 상태가 되어야 합니다', () => {
    mockScreenWidth(390)
    render(<MobileMenu />)
    openMenu()

    // 브라우저는 ESC를 누르면 dialog를 닫고 close 이벤트를 보낸다
    act(() => getDialog().close())

    expect(getMenuButton()).toHaveAttribute('aria-expanded', 'false')
  })

  it('지금 보는 섹션을 메뉴에서도 표시해야 합니다', () => {
    mockScreenWidth(390)
    render(<MobileMenu />)
    const dialog = openMenu()

    act(() => {
      useSectionStore.getState().setActiveId(SECTION_ID.STACK)
    })

    const current = within(dialog).getByRole('link', { current: true })
    expect(current).toHaveAccessibleName('기술')
    expect(current).toHaveClass('mobile-menu__link--active')
  })

  it('PC 폭으로 넓어지면 열려 있던 메뉴를 닫아야 합니다', () => {
    const { resize } = mockScreenWidth(390)
    render(<MobileMenu />)
    openMenu()

    resize(1280)

    expect(getDialog().open).toBe(false)
    expect(getMenuButton()).toHaveAttribute('aria-expanded', 'false')
  })
})

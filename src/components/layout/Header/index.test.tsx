// import { PROFILE } from '@/data/portfolio' // [숨김] 이력서 테스트에서 쓴다
import { SECTION_ID } from '@/routes/const'
import { useSectionStore } from '@/stores/useSectionStore'
import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Header from '.'

describe('Header', () => {
  afterEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
    useSectionStore.setState({ activeId: null })
  })

  it('메뉴는 각 섹션으로 이동하는 링크 5개여야 합니다', () => {
    render(<Header />)

    const nav = screen.getByRole('navigation', { name: '주요 메뉴' })
    const links = within(nav).getAllByRole('link')

    expect(links.map(link => [link.textContent, link.getAttribute('href')])).toEqual([
      ['작업', '#work'],
      ['일하는 방식', '#way'],
      ['경력', '#career'],
      ['기술', '#stack'],
      ['구조', '#behind'],
    ])
  })

  it('지금 보는 섹션의 메뉴만 표시해야 합니다', () => {
    render(<Header />)
    const nav = screen.getByRole('navigation', { name: '주요 메뉴' })
    expect(within(nav).queryAllByRole('link', { current: true })).toHaveLength(0)

    act(() => {
      useSectionStore.getState().setActiveId(SECTION_ID.CAREER)
    })
    const current = within(nav).getByRole('link', { current: true })
    expect(current).toHaveTextContent('경력')
    expect(current).toHaveClass('header__link--active')

    // 연락 섹션은 메뉴에 없어서 아무 메뉴도 표시하지 않는다
    act(() => {
      useSectionStore.getState().setActiveId(SECTION_ID.CONTACT)
    })
    expect(within(nav).queryAllByRole('link', { current: true })).toHaveLength(0)
  })

  it('로고는 이름 없이 블록만 보이고, 누르면 맨 위로 이동해야 합니다', () => {
    render(<Header />)

    const logo = screen.getByRole('link', { name: '맨 위로' })
    expect(logo).toHaveAttribute('href', '#top')
    expect(logo.querySelector('svg')).toBeInTheDocument()
  })

  // [숨김] 서울 시각·이력서 묶음을 다시 보이게 하면 아래 테스트도 되살린다 (파일 맨 위 PROFILE import 포함)
  // it('이력서는 새 창에서 열려야 합니다', () => {
  //   render(<Header />)
  //
  //   const resume = screen.getByRole('link', { name: '이력서 (새 창에서 열림)' })
  //   expect(resume).toHaveAttribute('href', PROFILE.resumeUrl)
  //   expect(resume).toHaveAttribute('target', '_blank')
  //   expect(resume).toHaveAttribute('rel', 'noopener noreferrer')
  // })
  //
  // it('서울 시각을 HH:mm 형식으로 보여줘야 합니다', () => {
  //   render(<Header />)
  //
  //   const time = screen.getByText(/^\d{2}:\d{2}$/)
  //   expect(time.tagName).toBe('TIME')
  //   expect(time).toHaveAttribute('dateTime', time.textContent)
  // })

  it('스크롤하면 떠 있는 블록 모양으로 바뀌어야 합니다', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).not.toHaveClass('header--scrolled')

    Object.defineProperty(window, 'scrollY', { value: 200, configurable: true })
    act(() => {
      fireEvent.scroll(window)
    })

    expect(header).toHaveClass('header--scrolled')
  })
})

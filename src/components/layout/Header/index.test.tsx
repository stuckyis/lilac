import { PROFILE } from '@/data/portfolio'
import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Header from '.'

describe('Header', () => {
  afterEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
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
      ['활동', '#activity'],
    ])
  })

  it('로고는 맨 위로 이동하고, 이력서는 새 창에서 열려야 합니다', () => {
    render(<Header />)

    expect(screen.getByRole('link', { name: PROFILE.name })).toHaveAttribute('href', '#top')

    const resume = screen.getByRole('link', { name: '이력서 (새 창에서 열림)' })
    expect(resume).toHaveAttribute('href', PROFILE.resumeUrl)
    expect(resume).toHaveAttribute('target', '_blank')
    expect(resume).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('서울 시각을 HH:mm 형식으로 보여줘야 합니다', () => {
    render(<Header />)

    const time = screen.getByText(/^\d{2}:\d{2}$/)
    expect(time.tagName).toBe('TIME')
    expect(time).toHaveAttribute('dateTime', time.textContent)
  })

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

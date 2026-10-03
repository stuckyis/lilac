import { BEHIND_NOTES } from '@/data/portfolio'
import { mockScreenWidth } from '@/test/matchMedia'
import { render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Behind from '.'

describe('Behind', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('메뉴의 #behind로 이동할 수 있는 "이 화면의 구조" 영역이어야 합니다', () => {
    render(<Behind />)

    expect(screen.getByRole('region', { name: '이 화면의 구조' })).toHaveAttribute('id', 'behind')
  })

  it('카드마다 제목(h3)과 설명을 보여주고, 위쪽 그림은 스크린리더에서 숨겨야 합니다', () => {
    const { container } = render(<Behind />)

    BEHIND_NOTES.forEach(note => {
      const heading = screen.getByRole('heading', { level: 3, name: note.title })
      expect(within(heading.closest('li') as HTMLElement).getByText(note.description)).toBeInTheDocument()
    })

    expect(container.querySelectorAll('.behind__visual[aria-hidden="true"]')).toHaveLength(BEHIND_NOTES.length)
  })

  it('가로로 넘겨 보는 1024px 미만에서만 카드 목록이 키보드로 포커스되어야 합니다', () => {
    const { resize } = mockScreenWidth(390)
    render(<Behind />)

    const list = screen.getByRole('list', { name: '이 화면의 구조' })
    expect(list).toHaveAttribute('tabindex', '0')

    // PC에서는 카드가 한 줄에 모두 보여서 넘길 일이 없다
    resize(1440)
    expect(list).not.toHaveAttribute('tabindex')
  })

  it('저장소 등 바깥으로 나가는 링크는 두지 않아야 합니다', () => {
    render(<Behind />)

    expect(within(screen.getByRole('region', { name: '이 화면의 구조' })).queryAllByRole('link')).toHaveLength(0)
  })
})

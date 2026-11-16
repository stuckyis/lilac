import { ARCHIVE, CAREER, CAREER_TITLE } from '@/data/portfolio'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Career from '.'

describe('Career', () => {
  it('메뉴의 #career로 이동할 수 있는 경력 영역이어야 합니다', () => {
    render(<Career />)

    expect(screen.getByRole('region', { name: CAREER_TITLE })).toHaveAttribute('id', 'career')
  })

  it('경력을 오래된 순서의 목록으로, 회사는 제목(h3)으로 보여줘야 합니다', () => {
    const { container } = render(<Career />)

    const timeline = container.querySelector('.career__timeline') as HTMLElement
    const items = within(timeline).getAllByRole('listitem')
    expect(items).toHaveLength(CAREER.length)

    items.forEach((item, index) => {
      expect(within(item).getByRole('heading', { level: 3, name: CAREER[index].company })).toBeInTheDocument()
    })
  })

  it('끝난 연도가 없는 곳은 지금 다니는 곳으로 강조하고 기간 끝에 NOW를 붙여야 합니다', () => {
    const { container } = render(<Career />)

    const current = container.querySelectorAll('.career__node--current')
    const currentCount = CAREER.filter(item => !item.end).length
    expect(current).toHaveLength(currentCount)
    expect(within(current[0] as HTMLElement).getByText(/— NOW$/)).toBeInTheDocument()
  })

  it('아카이브 버튼으로 초기 경력 목록을 펼치고 접을 수 있어야 합니다', async () => {
    const user = userEvent.setup()
    render(<Career />)

    const toggle = screen.getByRole('button', { name: `초기 경력 아카이브 펼치기 (${ARCHIVE.length}개)` })
    const list = document.getElementById(toggle.getAttribute('aria-controls') ?? '')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(list).not.toBeVisible()

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAccessibleName(`아카이브 접기 (${ARCHIVE.length}개)`)
    expect(list).toBeVisible()
    expect(within(list as HTMLElement).getAllByRole('listitem')).toHaveLength(ARCHIVE.length)

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(list).not.toBeVisible()
  })
})

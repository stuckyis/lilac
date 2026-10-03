import { PRODUCTS } from '@/data/portfolio'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ProductMarquee from '.'
import { MARQUEE_COPIES } from './const'

describe('ProductMarquee', () => {
  it('"출시에 참여한 제품들" 영역으로 찾을 수 있어야 합니다', () => {
    render(<ProductMarquee />)

    expect(screen.getByRole('region', { name: '출시에 참여한 제품들' })).toBeInTheDocument()
  })

  it('스크린리더에는 제품 목록이 한 번만 읽혀야 합니다 (흐름용 복제본은 숨김)', () => {
    const { container } = render(<ProductMarquee />)

    const lists = screen.getAllByRole('list')
    expect(lists).toHaveLength(1)
    expect(
      within(lists[0])
        .getAllByRole('listitem')
        .map(item => item.textContent),
    ).toEqual(PRODUCTS.map(product => product.name))

    expect(container.querySelectorAll('ul[aria-hidden="true"]')).toHaveLength(MARQUEE_COPIES - 1)
  })

  it('멈춤 버튼을 누르면 흐름이 멈추고, 다시 누르면 흘러야 합니다', async () => {
    const user = userEvent.setup()
    render(<ProductMarquee />)
    const section = screen.getByRole('region', { name: '출시에 참여한 제품들' })
    const toggle = screen.getByRole('button', { name: '움직임 멈추기' })

    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(section).not.toHaveClass('product-marquee--paused')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(section).toHaveClass('product-marquee--paused')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(section).not.toHaveClass('product-marquee--paused')
  })
})

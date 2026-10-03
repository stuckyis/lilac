import { PRINCIPLES } from '@/data/portfolio'
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Way from '.'

describe('Way', () => {
  it('메뉴의 #way로 이동할 수 있는 "일하는 방식" 영역이어야 합니다', () => {
    render(<Way />)

    expect(screen.getByRole('region', { name: '일하는 방식' })).toHaveAttribute('id', 'way')
  })

  it('원칙을 순서 있는 목록으로, 각 원칙은 제목(h3)과 설명으로 보여줘야 합니다', () => {
    render(<Way />)

    const items = within(screen.getByRole('list')).getAllByRole('listitem')
    expect(items).toHaveLength(PRINCIPLES.length)
    expect(screen.getByRole('list').tagName).toBe('OL')

    items.forEach((item, index) => {
      expect(within(item).getByRole('heading', { level: 3, name: PRINCIPLES[index].title })).toBeInTheDocument()
      expect(within(item).getByText(PRINCIPLES[index].description)).toBeInTheDocument()
    })
  })
})

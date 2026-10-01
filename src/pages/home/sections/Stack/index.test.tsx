import { STACK } from '@/data/portfolio'
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Stack from '.'

describe('Stack', () => {
  it('메뉴의 #stack으로 이동할 수 있는 "기술 스택" 영역이어야 합니다', () => {
    render(<Stack />)

    expect(screen.getByRole('region', { name: '기술 스택' })).toHaveAttribute('id', 'stack')
  })

  it('분야마다 제목(h3)과 기술 이름·사용 연수를 보여줘야 합니다', () => {
    render(<Stack />)

    STACK.forEach(group => {
      const heading = screen.getByRole('heading', { level: 3, name: group.title })
      const card = heading.closest('li') as HTMLElement
      const items = within(within(card).getByRole('list')).getAllByRole('listitem')

      expect(items).toHaveLength(group.items.length)
      items.forEach((item, index) => {
        expect(item).toHaveTextContent(group.items[index].name)
        expect(item).toHaveTextContent(group.items[index].years)
      })
    })
  })
})

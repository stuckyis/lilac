import { STATS } from '@/data/portfolio'
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Stats from '.'

describe('Stats', () => {
  it('"숫자로 보는 경력" 영역으로 찾을 수 있어야 합니다', () => {
    render(<Stats />)

    expect(screen.getByRole('region', { name: '숫자로 보는 경력' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: '숫자로 보는 경력' })).toBeInTheDocument()
  })

  it('숫자와 설명을 데이터 순서대로 보여줘야 합니다', () => {
    render(<Stats />)

    const items = within(screen.getByRole('list')).getAllByRole('listitem')
    expect(items).toHaveLength(STATS.length)

    items.forEach((item, index) => {
      expect(within(item).getByText(STATS[index].value)).toBeInTheDocument()
      expect(within(item).getByText(STATS[index].label)).toBeInTheDocument()
    })
  })
})

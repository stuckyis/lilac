import { MORE_WORKS, WORKS } from '@/data/portfolio'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Work from '.'

const getTabs = () => within(screen.getByRole('tablist', { name: '대표 작업' })).getAllByRole('tab')
const getPanel = () => screen.getByRole('tabpanel')

describe('Work', () => {
  it('메뉴의 #work로 이동할 수 있는 "대표 작업" 영역이어야 합니다', () => {
    render(<Work />)

    const section = screen.getByRole('region', { name: '대표 작업' })
    expect(section).toHaveAttribute('id', 'work')
  })

  it('작업 목록은 탭이고, 처음에는 첫 작업이 선택되어 미리보기에 보여야 합니다', () => {
    render(<Work />)

    const tabs = getTabs()
    expect(tabs).toHaveLength(WORKS.length)
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[0]).toHaveAttribute('tabindex', '0')
    expect(tabs[1]).toHaveAttribute('tabindex', '-1')

    const panel = getPanel()
    expect(panel).toHaveAttribute('aria-labelledby', tabs[0].id)
    expect(within(panel).getByText(WORKS[0].summary)).toBeInTheDocument()
    WORKS[0].metrics.forEach(metric => expect(within(panel).getByText(metric.value)).toBeInTheDocument())
    expect(within(within(panel).getByRole('list', { name: '사용 기술' })).getAllByRole('listitem')).toHaveLength(WORKS[0].tags.length)
  })

  it('제목에 마우스를 올리면 그 작업이 미리보기에 보여야 합니다', async () => {
    const user = userEvent.setup()
    render(<Work />)

    await user.hover(getTabs()[2])

    expect(getTabs()[2]).toHaveAttribute('aria-selected', 'true')
    expect(getPanel()).toHaveAttribute('aria-labelledby', getTabs()[2].id)
  })

  it('방향키와 Home·End로 고를 수 있고, 끝에서는 반대쪽으로 돌아야 합니다', async () => {
    const user = userEvent.setup()
    render(<Work />)
    const last = WORKS.length - 1

    await user.click(getTabs()[0])
    await user.keyboard('{ArrowDown}')
    expect(getTabs()[1]).toHaveAttribute('aria-selected', 'true')
    expect(getTabs()[1]).toHaveFocus()

    await user.keyboard('{End}')
    expect(getTabs()[last]).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowDown}')
    expect(getTabs()[0]).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowUp}')
    expect(getTabs()[last]).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{Home}')
    expect(getTabs()[0]).toHaveAttribute('aria-selected', 'true')
    expect(getTabs()[0]).toHaveFocus()
  })

  it('케이스 스터디 주소가 있으면 새 창으로 여는 링크를 보여줘야 합니다', () => {
    render(<Work />)

    const link = within(getPanel()).getByRole('link', { name: '케이스 스터디 보기 (새 창에서 열림)' })
    expect(link).toHaveAttribute('href', WORKS[0].caseUrl)
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('그 밖의 작업 카드를 보여줘야 합니다', () => {
    render(<Work />)

    expect(screen.getByRole('heading', { level: 3, name: '그 밖의 작업' })).toBeInTheDocument()
    MORE_WORKS.forEach(work => {
      expect(screen.getByRole('link', { name: new RegExp(work.title.replace(/[[\]]/g, '\\$&')) })).toHaveAttribute('href', work.url)
    })
  })
})

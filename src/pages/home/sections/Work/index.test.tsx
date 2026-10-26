import { MORE_WORKS, WORKS } from '@/data/portfolio'
import { mockScreenWidth } from '@/test/matchMedia'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Work from '.'

const getTabs = () => within(screen.getByRole('tablist', { name: '대표 작업' })).getAllByRole('tab')
const getPanel = () => screen.getByRole('tabpanel')
/** 아코디언 제목 버튼 (펼침 상태를 가진 버튼) */
const getAccordionButtons = () => screen.getAllByRole('button').filter(button => button.hasAttribute('aria-expanded'))
/** 펼친 상세 영역 (접힌 영역은 hidden이라 찾지 않는다). 대표 작업 섹션 자체도 영역이라 뺀다 */
const getOpenPanels = () => screen.queryAllByRole('region').filter(region => region.id !== 'work')

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

describe('Work (1024px 미만)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('목록이 아코디언으로 바뀌고, 처음에는 첫 작업만 펼쳐져 있어야 합니다', () => {
    mockScreenWidth(390)
    render(<Work />)

    expect(screen.queryByRole('tablist')).not.toBeInTheDocument()
    expect(screen.getByText('제목을 누르면 자세히 보여요')).toBeInTheDocument()

    const buttons = getAccordionButtons()
    expect(buttons).toHaveLength(WORKS.length)
    // 제목 버튼은 h3 안에 있어 제목 목록으로도 훑을 수 있다
    buttons.forEach(button => expect(button.closest('h3')).not.toBeNull())
    expect(buttons.map(button => button.getAttribute('aria-expanded'))).toEqual(WORKS.map((_, index) => String(index === 0)))

    const [panel] = getOpenPanels()
    expect(getOpenPanels()).toHaveLength(1)
    expect(buttons[0]).toHaveAttribute('aria-controls', panel.id)
    expect(within(panel).getByText(WORKS[0].summary)).toBeInTheDocument()
    // 회사·기간은 제목 줄에 있어서 상세에서는 역할·팀만 보여준다
    expect(within(panel).getByText(`${WORKS[0].role} · ${WORKS[0].team}`)).toBeInTheDocument()
  })

  it('다른 제목을 누르면 그 작업만 펼치고, 펼친 제목을 다시 누르면 접혀야 합니다', async () => {
    const user = userEvent.setup()
    mockScreenWidth(390)
    render(<Work />)

    await user.click(getAccordionButtons()[2])
    expect(getAccordionButtons()[2]).toHaveAttribute('aria-expanded', 'true')
    expect(getAccordionButtons()[0]).toHaveAttribute('aria-expanded', 'false')
    expect(within(getOpenPanels()[0]).getByText(WORKS[2].summary)).toBeInTheDocument()

    await user.click(getAccordionButtons()[2])
    expect(getAccordionButtons().every(button => button.getAttribute('aria-expanded') === 'false')).toBe(true)
    expect(getOpenPanels()).toHaveLength(0)
  })

  it('화면 폭이 바뀌어도 고른 작업이 이어져야 합니다', async () => {
    const user = userEvent.setup()
    const { resize } = mockScreenWidth(390)
    render(<Work />)

    await user.click(getAccordionButtons()[3])
    resize(1280)
    expect(getTabs()[3]).toHaveAttribute('aria-selected', 'true')

    await user.hover(getTabs()[1])
    resize(768)
    expect(getAccordionButtons()[1]).toHaveAttribute('aria-expanded', 'true')
  })

  it('모두 접은 채 넓은 화면이 되면 첫 작업을 보여줘야 합니다', async () => {
    const user = userEvent.setup()
    const { resize } = mockScreenWidth(390)
    render(<Work />)

    await user.click(getAccordionButtons()[0])
    resize(1440)

    expect(getTabs()[0]).toHaveAttribute('aria-selected', 'true')
  })
})

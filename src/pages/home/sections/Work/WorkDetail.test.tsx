import type { Work } from '@/data/type'
import { TONE } from '@/data/const'
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import WorkDetail from './WorkDetail'

/** 선택 항목(팀, 맡은 일, 성과 수치, 케이스 스터디)을 모두 채운 작업 */
const FULL_WORK: Work = {
  id: 'full',
  title: '전부 있는 작업',
  company: '회사',
  period: '2024',
  role: '프론트엔드',
  team: '6명 팀',
  summary: '요약 한 줄',
  tasks: ['공통 컴포넌트 개발', '개발 환경 구축'],
  metrics: [
    { value: '+32%', label: '전환율 개선' },
    { value: '12만', label: '월간 사용자' },
  ],
  tags: ['React', 'TypeScript'],
  tone: TONE.LILAC,
  caseUrl: 'https://example.com/case',
}

/** 선택 항목을 모두 비운 작업 */
const MINIMAL_WORK: Work = {
  id: 'minimal',
  title: '최소 작업',
  company: '회사',
  period: '2024',
  role: '프론트엔드',
  summary: '요약 한 줄',
  tags: ['Vue'],
  tone: TONE.MINT,
}

describe('WorkDetail', () => {
  it('팀, 맡은 일, 성과 수치, 케이스 스터디 링크가 있으면 모두 보여줘야 합니다', () => {
    render(<WorkDetail work={FULL_WORK} />)

    expect(screen.getByText('회사 · 2024 · 프론트엔드 · 6명 팀')).toBeInTheDocument()
    expect(
      within(screen.getByRole('list', { name: '맡은 일' }))
        .getAllByRole('listitem')
        .map(item => item.textContent),
    ).toEqual(FULL_WORK.tasks)
    expect(screen.getByText('+32%')).toBeInTheDocument()
    expect(screen.getByText('12만')).toBeInTheDocument()

    const link = screen.getByRole('link', { name: '케이스 스터디 보기 (새 창에서 열림)' })
    expect(link).toHaveAttribute('href', FULL_WORK.caseUrl)
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('없는 항목은 빈 칸 없이 숨겨야 합니다 (지어낸 숫자를 넣지 않아도 되게)', () => {
    const { container } = render(<WorkDetail work={MINIMAL_WORK} />)

    // 팀이 없으면 구분점(·)도 남기지 않는다
    expect(screen.getByText('회사 · 2024 · 프론트엔드')).toBeInTheDocument()
    expect(screen.queryByRole('list', { name: '맡은 일' })).not.toBeInTheDocument()
    expect(container.querySelector('.work-detail__metrics')).toBeNull()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})

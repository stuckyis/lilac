import { INTRO, PROFILE } from '@/data/portfolio'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Hero from '.'

describe('Hero', () => {
  it('큰 문장은 줄바꿈과 커서 없이 한 문장으로 읽혀야 합니다', () => {
    render(<Hero />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveAccessibleName(INTRO.headline.join(' '))
    expect(screen.getByText(INTRO.highlight).tagName).toBe('MARK')
  })

  it('버튼은 대표 작업, GitHub(새 창), 이메일로 연결되어야 합니다', () => {
    render(<Hero />)

    expect(screen.getByRole('link', { name: '대표 작업 보기' })).toHaveAttribute('href', '#work')

    const github = screen.getByRole('link', { name: 'GitHub (새 창에서 열림)' })
    expect(github).toHaveAttribute('href', PROFILE.links.github)
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')

    expect(screen.getByRole('link', { name: '이메일 보내기' })).toHaveAttribute('href', `mailto:${PROFILE.email}`)
  })

  // [숨김] 이력서 PDF 버튼을 다시 보이게 하면 아래 테스트도 되살린다
  // it('이력서 PDF는 새 창에서 열려야 합니다', () => {
  //   render(<Hero />)
  //
  //   const resume = screen.getByRole('link', { name: '이력서 PDF (새 창에서 열림)' })
  //   expect(resume).toHaveAttribute('href', PROFILE.resumeUrl)
  //   expect(resume).toHaveAttribute('target', '_blank')
  // })

  it('레이아웃 바꾸기를 누를 때마다 Stack → Grid → Scatter → Stack 순서로 바뀌어야 합니다', async () => {
    const user = userEvent.setup()
    const { container } = render(<Hero />)
    const button = screen.getByRole('button', { name: /레이아웃 바꾸기/ })
    const stage = container.querySelector('.hero-composition__stage')

    expect(button).toHaveAccessibleName('레이아웃 바꾸기 (지금 Stack, 누르면 Grid)')
    expect(stage).toHaveClass('hero-composition__stage--stack')

    await user.click(button)
    expect(button).toHaveAccessibleName('레이아웃 바꾸기 (지금 Grid, 누르면 Scatter)')
    expect(stage).toHaveClass('hero-composition__stage--grid')

    await user.click(button)
    expect(button).toHaveAccessibleName('레이아웃 바꾸기 (지금 Scatter, 누르면 Stack)')
    expect(stage).toHaveClass('hero-composition__stage--scatter')

    await user.click(button)
    expect(button).toHaveAccessibleName('레이아웃 바꾸기 (지금 Stack, 누르면 Grid)')
    expect(stage).toHaveClass('hero-composition__stage--stack')
  })

  it('장식용 패널은 스크린리더가 읽지 않아야 합니다', () => {
    const { container } = render(<Hero />)

    expect(container.querySelector('.hero-composition__stage')).toHaveAttribute('aria-hidden', 'true')
  })

  it('현재 회사와 역할을 보여줘야 합니다', () => {
    render(<Hero />)

    expect(screen.getByText(`현재 ${PROFILE.current.company} · ${PROFILE.current.role}`)).toBeInTheDocument()
  })
})

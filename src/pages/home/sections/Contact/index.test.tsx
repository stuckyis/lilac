import { PROFILE } from '@/data/portfolio'
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Contact from '.'

const getSection = () => screen.getByRole('region', { name: "Let's build the next one." })

describe('Contact', () => {
  it('#contact 영역이고, 영어 제목은 영어로 읽히도록 lang="en"이어야 합니다', () => {
    render(<Contact />)

    expect(getSection()).toHaveAttribute('id', 'contact')
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('lang', 'en')
  })

  it('이메일 버튼은 메일 쓰기(mailto:)로 연결되어야 합니다', () => {
    render(<Contact />)

    expect(screen.getByRole('link', { name: PROFILE.email })).toHaveAttribute('href', `mailto:${PROFILE.email}`)
  })

  it('GitHub·LinkedIn은 새 창으로 열리고, 블로그 링크는 없어야 합니다', () => {
    render(<Contact />)

    for (const [label, href] of [
      ['GitHub', PROFILE.links.github],
      ['LinkedIn', PROFILE.links.linkedin],
    ]) {
      const link = screen.getByRole('link', { name: `${label} (새 창에서 열림)` })
      expect(link).toHaveAttribute('href', href)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
    expect(within(getSection()).queryByRole('link', { name: /블로그/ })).not.toBeInTheDocument()
  })

  it('푸터에 올해 연도와 이름을 보여줘야 합니다', () => {
    const { container } = render(<Contact />)

    expect(container.querySelector('.contact__footer')).toHaveTextContent(`© ${new Date().getFullYear()} ${PROFILE.name}`)
  })
})

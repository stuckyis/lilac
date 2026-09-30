/// <reference types="vitest/jsdom" />
import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Router from '.'

const renderAt = (path: string) => {
  window.history.pushState({}, '', path)
  return render(<Router />)
}

describe('Router', () => {
  afterEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('첫 화면(/)에서 다른 페이지로 보내지 않고 홈 레이아웃을 보여줘야 합니다', async () => {
    // jsdom은 window.location 이동을 실제로 하지 않고 "Not implemented: navigation" 오류만 남기므로, 그 오류로 이동 시도를 감지한다
    const navigationErrors: string[] = []
    const onJsdomError = (error: Error) => {
      if (error.message.includes('Not implemented: navigation')) navigationErrors.push(error.message)
    }
    jsdom.virtualConsole.on('jsdomError', onJsdomError)

    renderAt('/')

    expect(await screen.findByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '홈' })).toBeInTheDocument()
    expect(window.location.pathname).toBe('/')
    jsdom.virtualConsole.off('jsdomError', onJsdomError)
    expect(navigationErrors).toHaveLength(0)
  })

  it('삭제된 /login 경로는 404 화면을 보여줘야 합니다', async () => {
    renderAt('/login')

    expect(await screen.findByRole('heading', { name: '404' })).toBeInTheDocument()
    expect(screen.getByText('페이지를 찾을 수 없습니다')).toBeInTheDocument()
  })
})

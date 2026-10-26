import { mockScreenWidth } from '@/test/matchMedia'
import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import useMediaQuery from './useMediaQuery'

describe('useMediaQuery', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('지금 화면 폭이 구간에 맞는지 알려주고, 폭이 바뀌면 따라가야 합니다', () => {
    const screen = mockScreenWidth(390)
    const { result } = renderHook(() => useMediaQuery('(width < 1024px)'))
    expect(result.current).toBe(true)

    screen.resize(1440)
    expect(result.current).toBe(false)

    screen.resize(1023)
    expect(result.current).toBe(true)
  })

  it('화면을 떠나면 변경 알림 구독을 해제해야 합니다', () => {
    const screen = mockScreenWidth(390)
    const { unmount } = renderHook(() => useMediaQuery('(width < 1024px)'))
    expect(screen.listenerCount()).toBe(1)

    unmount()
    expect(screen.listenerCount()).toBe(0)
  })

  it('matchMedia가 없는 환경에서는 false여야 합니다', () => {
    vi.stubGlobal('matchMedia', undefined)

    const { result } = renderHook(() => useMediaQuery('(width < 1024px)'))
    expect(result.current).toBe(false)
  })
})

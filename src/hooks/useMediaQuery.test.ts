import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import useMediaQuery from './useMediaQuery'

/** 화면 폭을 바꿀 수 있는 가짜 matchMedia. `(width < Npx)` 형태만 해석한다 */
const mockMatchMedia = (initialWidth: number) => {
  let width = initialWidth
  const listeners = new Set<() => void>()
  const matches = (query: string) => width < Number(query.match(/(\d+)px/)?.[1])

  vi.stubGlobal('matchMedia', (query: string) => ({
    get matches() {
      return matches(query)
    },
    addEventListener: (_: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
  }))

  return {
    resize: (nextWidth: number) => {
      width = nextWidth
      act(() => listeners.forEach(listener => listener()))
    },
    listenerCount: () => listeners.size,
  }
}

describe('useMediaQuery', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('지금 화면 폭이 구간에 맞는지 알려주고, 폭이 바뀌면 따라가야 합니다', () => {
    const screen = mockMatchMedia(390)
    const { result } = renderHook(() => useMediaQuery('(width < 1024px)'))
    expect(result.current).toBe(true)

    screen.resize(1440)
    expect(result.current).toBe(false)

    screen.resize(1023)
    expect(result.current).toBe(true)
  })

  it('화면을 떠나면 변경 알림 구독을 해제해야 합니다', () => {
    const screen = mockMatchMedia(390)
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

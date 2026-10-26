import { act } from '@testing-library/react'
import { vi } from 'vitest'

/**
 * 화면 폭을 바꿀 수 있는 가짜 matchMedia (jsdom에는 matchMedia가 없다).
 * `(width < 1024px)` 같은 범위 쿼리만 해석한다. 테스트가 끝나면 vi.unstubAllGlobals()로 되돌린다.
 */
export const mockScreenWidth = (initialWidth: number) => {
  let width = initialWidth
  const listeners = new Set<() => void>()

  vi.stubGlobal('matchMedia', (query: string) => ({
    get matches() {
      return width < Number(query.match(/(\d+)px/)?.[1])
    },
    addEventListener: (_: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
  }))

  return {
    /** 화면 폭을 바꾸고 변경 알림을 보낸다 */
    resize: (nextWidth: number) => {
      width = nextWidth
      act(() => listeners.forEach(listener => listener()))
    },
    /** 지금 변경 알림을 듣고 있는 곳의 수 */
    listenerCount: () => listeners.size,
  }
}

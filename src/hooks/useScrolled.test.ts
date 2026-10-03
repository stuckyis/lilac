import { act, fireEvent, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import useScrolled from './useScrolled'

const scrollTo = (y: number) => {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
  act(() => {
    fireEvent.scroll(window)
  })
}

describe('useScrolled', () => {
  afterEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
  })

  it('기준 거리보다 아래로 스크롤하면 true, 다시 올라오면 false여야 합니다', () => {
    const { result } = renderHook(() => useScrolled(8))
    expect(result.current).toBe(false)

    scrollTo(8)
    expect(result.current).toBe(false)

    scrollTo(120)
    expect(result.current).toBe(true)

    scrollTo(0)
    expect(result.current).toBe(false)
  })
})

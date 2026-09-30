import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useSeoulTime, { formatSeoulTime } from './useSeoulTime'

describe('formatSeoulTime', () => {
  it('UTC 시각을 서울 시각(UTC+9) HH:mm으로 바꿔야 합니다', () => {
    expect(formatSeoulTime(new Date('2026-09-30T05:05:00Z'))).toBe('14:05')
  })

  it('자정은 24:00이 아니라 00:00으로 표시해야 합니다', () => {
    expect(formatSeoulTime(new Date('2026-09-30T15:00:00Z'))).toBe('00:00')
  })
})

describe('useSeoulTime', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-30T05:05:30Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('분이 바뀌는 순간에 시각을 갱신해야 합니다', () => {
    const { result } = renderHook(() => useSeoulTime())
    expect(result.current).toBe('14:05')

    act(() => vi.advanceTimersByTime(29_999))
    expect(result.current).toBe('14:05')

    act(() => vi.advanceTimersByTime(1))
    expect(result.current).toBe('14:06')

    act(() => vi.advanceTimersByTime(60_000))
    expect(result.current).toBe('14:07')
  })

  it('화면에서 사라지면 타이머를 정리해야 합니다', () => {
    const { unmount } = renderHook(() => useSeoulTime())
    expect(vi.getTimerCount()).toBe(1)

    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
})

import { describe, expect, it } from 'vitest'
import { formatTenure, getTenureMonths } from './tenure'

describe('getTenureMonths', () => {
  it('시작 달과 끝 달을 모두 넣어 세야 합니다', () => {
    expect(getTenureMonths('2013.10', '2019.09')).toBe(72)
    expect(getTenureMonths('2020.08', '2022.04')).toBe(21)
    expect(getTenureMonths('2022.06', '2022.06')).toBe(1)
  })

  it('끝 달이 없으면 지금 달까지 세야 합니다', () => {
    expect(getTenureMonths('2022.06', undefined, new Date(2026, 10, 28))).toBe(54)
  })
})

describe('formatTenure', () => {
  it('0인 쪽은 빼고 N년 N개월로 보여줘야 합니다', () => {
    expect(formatTenure(72)).toBe('6년')
    expect(formatTenure(21)).toBe('1년 9개월')
    expect(formatTenure(9)).toBe('9개월')
  })
})

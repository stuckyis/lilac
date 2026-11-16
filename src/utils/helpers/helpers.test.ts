import { describe, expect, it } from 'vitest'
import { formatNumber, isValidEmail, toOrderNumber, truncateText } from './helpers'

describe('formatNumber', () => {
  it('숫자를 천 단위로 구분하여 포맷팅해야 합니다', () => {
    expect(formatNumber(1000)).toBe('1,000')
    expect(formatNumber(1234567)).toBe('1,234,567')
  })

  it('0을 포맷팅해야 합니다', () => {
    expect(formatNumber(0)).toBe('0')
  })
})

describe('truncateText', () => {
  it('최대 길이보다 짧은 문자열은 그대로 반환해야 합니다', () => {
    expect(truncateText('안녕하세요', 10)).toBe('안녕하세요')
  })

  it('최대 길이보다 긴 문자열은 잘라야 합니다', () => {
    expect(truncateText('안녕하세요 반갑습니다', 5)).toBe('안녕하세요...')
  })

  it('최대 길이와 같은 문자열은 그대로 반환해야 합니다', () => {
    expect(truncateText('12345', 5)).toBe('12345')
  })
})

describe('isValidEmail', () => {
  it('유효한 이메일 형식을 검증해야 합니다', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('user.name@domain.co.kr')).toBe(true)
  })

  it('유효하지 않은 이메일 형식을 거부해야 합니다', () => {
    expect(isValidEmail('invalid')).toBe(false)
    expect(isValidEmail('test@')).toBe(false)
    expect(isValidEmail('@example.com')).toBe(false)
    expect(isValidEmail('test @example.com')).toBe(false)
  })
})

describe('toOrderNumber', () => {
  it('0부터 시작하는 순서를 두 자리 번호로 만들어야 합니다', () => {
    expect(toOrderNumber(0)).toBe('01')
    expect(toOrderNumber(8)).toBe('09')
    expect(toOrderNumber(9)).toBe('10')
  })
})

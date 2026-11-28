/** 'YYYY.MM'을 0년 1월부터 센 달 번호로 바꾼다 */
const toMonthIndex = (value: string) => {
  const [year, month] = value.split('.').map(Number)
  return year * 12 + month - 1
}

/**
 * 재직 개월 수. 시작 달과 끝 달을 모두 넣어 센다 (2013.10 – 2019.09 = 72개월 = 6년).
 * 끝 달이 없으면 지금 다니는 곳이라 이번 달까지 센다.
 */
export const getTenureMonths = (start: string, end?: string, now = new Date()) => {
  const last = end ? toMonthIndex(end) : now.getFullYear() * 12 + now.getMonth()
  return last - toMonthIndex(start) + 1
}

/** 개월 수를 'N년 N개월'로. 0인 쪽은 뺀다 (72 → '6년', 21 → '1년 9개월', 9 → '9개월') */
export const formatTenure = (months: number) => {
  const years = Math.floor(months / 12)
  const rest = months % 12
  return [years > 0 && `${years}년`, rest > 0 && `${rest}개월`].filter(Boolean).join(' ')
}

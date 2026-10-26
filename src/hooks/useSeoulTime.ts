import { useEffect, useState } from 'react'

const MINUTE = 60_000

const seoulTimeFormat = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  hour: '2-digit',
  minute: '2-digit',
  // hour12: false는 브라우저에 따라 자정을 24:00으로 표시해서 h23을 쓴다
  hourCycle: 'h23',
})

/** 서울 시각을 `HH:mm`으로 만든다. 보는 사람의 시간대와 상관없이 서울 기준이다. */
export const formatSeoulTime = (date: Date) => {
  const parts = seoulTimeFormat.formatToParts(date)
  const hour = parts.find(part => part.type === 'hour')?.value
  const minute = parts.find(part => part.type === 'minute')?.value

  return `${hour}:${minute}`
}

/** 서울 시각(`HH:mm`). 분이 바뀌는 순간에 맞춰 갱신한다. */
const useSeoulTime = () => {
  const [time, setTime] = useState(() => formatSeoulTime(new Date()))

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const scheduleNextMinute = () => {
      timer = setTimeout(
        () => {
          setTime(formatSeoulTime(new Date()))
          scheduleNextMinute()
        },
        MINUTE - (Date.now() % MINUTE),
      )
    }

    scheduleNextMinute()

    return () => clearTimeout(timer)
  }, [])

  return time
}

export default useSeoulTime

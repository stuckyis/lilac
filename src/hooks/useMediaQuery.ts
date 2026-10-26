import { useCallback, useSyncExternalStore } from 'react'

const isSupported = () => typeof window.matchMedia === 'function'

/**
 * CSS 미디어 쿼리(예: `(width < 1024px)`)가 지금 맞는지 알려준다. 화면 폭이 구간을 넘나들 때만 다시 렌더링된다.
 * `matchMedia`가 없는 환경(테스트용 jsdom 등)에서는 false다. 구간은 src/styles/breakpoints.ts의 MEDIA_QUERY를 쓴다.
 */
const useMediaQuery = (query: string) => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!isSupported()) return () => {}

      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)

      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(subscribe, () => isSupported() && window.matchMedia(query).matches)
}

export default useMediaQuery

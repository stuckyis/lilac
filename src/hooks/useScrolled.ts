import { useSyncExternalStore } from 'react'

const subscribe = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true })

  return () => window.removeEventListener('scroll', onChange)
}

/** 페이지를 `offset`(px)보다 아래로 스크롤했는지 알려준다. 값이 바뀔 때만 다시 렌더링된다. */
const useScrolled = (offset = 8) => useSyncExternalStore(subscribe, () => window.scrollY > offset)

export default useScrolled

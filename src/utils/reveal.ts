import type { RefCallback } from 'react'

/**
 * 스크롤 등장 효과: 요소가 화면에 들어올 때마다 조금 아래에서 올라오며 나타난다 (스타일은 global.scss).
 * 아래로 내릴 때도, 위로 올릴 때도 나온다. 화면 밖으로 충분히 나가면 다시 숨겨 두었다가 들어오면 또 올라온다.
 *
 * 쓰는 법: `<li ref={reveal}>`. 상태는 React가 다루지 않는 `data-reveal` 속성(hidden → shown)에 둔다.
 * className에 두면 React가 className을 다시 쓸 때 지워진다.
 *
 * 메뉴가 가리키는 섹션(`section[id]`) 자체에는 붙이지 않는다.
 * 숨김 상태에서 내려가 있는 만큼 메뉴로 이동하는 위치와 "지금 보는 섹션" 표시 기준이 어긋난다.
 */

/** 보이게 하는 기준: 위쪽은 화면 끝, 아래쪽은 화면 안쪽 8%까지 들어오면 (아래에서 올라오는 모습이 보이게) */
const SHOW_MARGIN = '0px 0px -8% 0px'
/**
 * 다시 숨기는 기준: 화면 위아래 100px 밖으로 완전히 나가면.
 * 숨긴 요소는 32px 내려가 있어서 같은 기준을 쓰면 화면 끝에서 보임 ↔ 숨김이 번갈아 깜빡인다. 그래서 두 기준 사이를 띄운다.
 */
const HIDE_MARGIN = '100px 0px 100px 0px'
/** 한 번에 여러 개가 들어오면(PC 카드 한 줄 등) 차례로 늦게 시작한다 */
const STAGGER_MS = 90
const MAX_STAGGER_STEPS = 4

interface RevealObservers {
  show: IntersectionObserver
  hide: IntersectionObserver
}

/** 모든 요소가 관찰자 2개를 같이 쓴다. 처음 등록할 때 만든다 */
let observers: RevealObservers | null = null

/**
 * 키보드로 포커스가 들어가면 바로 보이게 한다.
 * 브라우저는 포커스된 요소가 화면 맨 아래에 겨우 들어올 만큼만 스크롤해서, 보이게 하는 기준(안쪽 8%)에 닿지 않을 수 있다.
 */
const showFocused = (event: FocusEvent) => {
  const container = (event.target as Element | null)?.closest<HTMLElement>('[data-reveal="hidden"]')
  if (container) container.dataset.reveal = 'shown'
}

const getObservers = (): RevealObservers => {
  if (observers) return observers

  const show = new IntersectionObserver(
    entries => {
      entries
        .filter(entry => entry.isIntersecting && (entry.target as HTMLElement).dataset.reveal === 'hidden')
        // 위 → 아래, 왼쪽 → 오른쪽 순서
        .sort((a, b) => Math.round(a.boundingClientRect.top - b.boundingClientRect.top) || a.boundingClientRect.left - b.boundingClientRect.left)
        .forEach((entry, index) => {
          const element = entry.target as HTMLElement
          element.style.setProperty('--reveal-delay', `${Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS}ms`)
          element.dataset.reveal = 'shown'
        })
    },
    { rootMargin: SHOW_MARGIN },
  )

  const hide = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) return
        const element = entry.target as HTMLElement
        element.dataset.reveal = 'hidden'
        element.style.removeProperty('--reveal-delay')
      })
    },
    { rootMargin: HIDE_MARGIN },
  )

  document.addEventListener('focusin', showFocused)

  observers = { show, hide }
  return observers
}

export const reveal: RefCallback<HTMLElement> = element => {
  // 지원하지 않는 환경(테스트용 jsdom 등)에서는 숨기지 않아서 그대로 보인다
  if (!element || typeof IntersectionObserver === 'undefined') return

  element.dataset.reveal = 'hidden'
  const { show, hide } = getObservers()
  show.observe(element)
  hide.observe(element)

  // 요소가 사라질 때(탭 ↔ 아코디언 전환 등) 관찰을 멈춘다
  return () => {
    show.unobserve(element)
    hide.unobserve(element)
    delete element.dataset.reveal
    element.style.removeProperty('--reveal-delay')
  }
}

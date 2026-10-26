import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

/** jsdom에는 IntersectionObserver가 없어서, 화면에 들어오고 나가는 상황을 직접 만들 수 있는 가짜를 쓴다 */
class FakeIntersectionObserver {
  static all: FakeIntersectionObserver[] = []
  readonly targets = new Set<Element>()
  readonly rootMargin: string

  constructor(
    private readonly callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.rootMargin = options?.rootMargin ?? ''
    FakeIntersectionObserver.all.push(this)
  }

  observe(target: Element) {
    this.targets.add(target)
  }

  unobserve(target: Element) {
    this.targets.delete(target)
  }

  disconnect() {
    this.targets.clear()
  }

  takeRecords() {
    return []
  }

  /** 요소마다 기준 안에 들어왔는지(isIntersecting)와 화면 속 위치(top, left)를 알린다 */
  notify(changes: { target: Element; isIntersecting: boolean; top?: number; left?: number }[]) {
    // reveal이 읽는 값만 채운다
    const entries = changes.map(({ target, isIntersecting, top = 0, left = 0 }) => ({
      target,
      isIntersecting,
      boundingClientRect: { top, left } as DOMRectReadOnly,
    }))
    this.callback(entries as unknown as IntersectionObserverEntry[], this as unknown as IntersectionObserver)
  }
}

/** 보이게 하는 관찰자(화면 안쪽 기준)와 다시 숨기는 관찰자(화면 밖 100px 기준) */
const showObserver = () => FakeIntersectionObserver.all.find(observer => observer.rootMargin.startsWith('0px'))!
const hideObserver = () => FakeIntersectionObserver.all.find(observer => observer.rootMargin.startsWith('100px'))!

/** reveal.ts는 관찰자를 모듈 안에 하나만 만들어 두므로, 테스트마다 새로 불러온다 */
const loadReveal = async () => {
  vi.resetModules()
  return (await import('./reveal')).reveal
}

describe('reveal', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    FakeIntersectionObserver.all = []
  })

  describe('IntersectionObserver가 있는 환경', () => {
    beforeEach(() => {
      vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver)
    })

    it('등록하면 숨김 상태가 되고, 화면에 들어오면 보임 상태가 되어야 합니다', async () => {
      const reveal = await loadReveal()
      const { getByText } = render(<p ref={reveal}>카드</p>)
      const card = getByText('카드')

      expect(card).toHaveAttribute('data-reveal', 'hidden')

      showObserver().notify([{ target: card, isIntersecting: true }])
      expect(card).toHaveAttribute('data-reveal', 'shown')
    })

    it('화면 밖으로 멀리 나가면 다시 숨김 상태가 되어, 다시 들어올 때(위로 올릴 때 포함) 또 올라와야 합니다', async () => {
      const reveal = await loadReveal()
      const { getByText } = render(<p ref={reveal}>카드</p>)
      const card = getByText('카드')

      showObserver().notify([{ target: card, isIntersecting: true }])
      hideObserver().notify([{ target: card, isIntersecting: false }])
      expect(card).toHaveAttribute('data-reveal', 'hidden')

      showObserver().notify([{ target: card, isIntersecting: true }])
      expect(card).toHaveAttribute('data-reveal', 'shown')
    })

    it('화면 근처(숨기는 기준 안)에 있는 동안에는 보임 상태를 유지해야 합니다', async () => {
      const reveal = await loadReveal()
      const { getByText } = render(<p ref={reveal}>카드</p>)
      const card = getByText('카드')

      showObserver().notify([{ target: card, isIntersecting: true }])
      // 보이게 하는 기준에서만 벗어나고 숨기는 기준 안에는 있다
      showObserver().notify([{ target: card, isIntersecting: false }])
      hideObserver().notify([{ target: card, isIntersecting: true }])

      expect(card).toHaveAttribute('data-reveal', 'shown')
    })

    it('한 번에 여러 개가 들어오면 위 → 아래, 왼쪽 → 오른쪽 순서로 0.09초씩 늦게 시작해야 합니다', async () => {
      const reveal = await loadReveal()
      const { getByText } = render(
        <ul>
          {['A', 'B', 'C'].map(name => (
            <li key={name} ref={reveal}>
              {name}
            </li>
          ))}
        </ul>,
      )
      const [a, b, c] = ['A', 'B', 'C'].map(name => getByText(name))

      // 같은 줄의 C(왼쪽)·A(오른쪽), 그 아래 줄의 B
      showObserver().notify([
        { target: a, isIntersecting: true, top: 100, left: 300 },
        { target: b, isIntersecting: true, top: 400, left: 0 },
        { target: c, isIntersecting: true, top: 100, left: 0 },
      ])

      expect(c.style.getPropertyValue('--reveal-delay')).toBe('0ms')
      expect(a.style.getPropertyValue('--reveal-delay')).toBe('90ms')
      expect(b.style.getPropertyValue('--reveal-delay')).toBe('180ms')
    })

    it('숨김 상태인 덩어리 안으로 키보드 포커스가 들어가면 바로 보여야 합니다', async () => {
      const reveal = await loadReveal()
      const { getByRole } = render(
        <div ref={reveal}>
          <button type="button">멈추기</button>
        </div>,
      )
      const button = getByRole('button')

      button.focus()
      expect(button.parentElement).toHaveAttribute('data-reveal', 'shown')
    })

    it('요소가 사라지면 관찰을 멈춰야 합니다', async () => {
      const reveal = await loadReveal()
      const { getByText, unmount } = render(<p ref={reveal}>카드</p>)
      const card = getByText('카드')

      expect(showObserver().targets.has(card)).toBe(true)
      expect(hideObserver().targets.has(card)).toBe(true)

      unmount()
      expect(showObserver().targets.size).toBe(0)
      expect(hideObserver().targets.size).toBe(0)
    })
  })

  it('IntersectionObserver가 없는 환경에서는 숨기지 않아야 합니다 (그대로 보임)', async () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    const reveal = await loadReveal()
    const { getByText } = render(<p ref={reveal}>카드</p>)

    expect(getByText('카드')).not.toHaveAttribute('data-reveal')
  })
})

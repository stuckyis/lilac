import { SECTION_ID } from '@/routes/const'
import { useSectionStore } from '@/stores/useSectionStore'
import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useActiveSection from './useActiveSection'

const IDS = [SECTION_ID.WORK, SECTION_ID.WAY, SECTION_ID.CAREER] as const

/** jsdom에는 IntersectionObserver가 없어서, 띠에 걸치는 상황을 직접 만들 수 있는 가짜를 쓴다 */
class FakeIntersectionObserver {
  static latest: FakeIntersectionObserver | null = null
  readonly targets = new Set<Element>()
  isConnected = true

  constructor(private readonly callback: IntersectionObserverCallback) {
    FakeIntersectionObserver.latest = this
  }

  observe(target: Element) {
    this.targets.add(target)
  }

  unobserve(target: Element) {
    this.targets.delete(target)
  }

  disconnect() {
    this.isConnected = false
    this.targets.clear()
  }

  takeRecords() {
    return []
  }

  /** 섹션 id별로 띠에 걸쳤는지(true) 벗어났는지(false) 알린다 */
  cross(changes: Record<string, boolean>) {
    // 훅이 읽는 값(target, isIntersecting)만 채운다
    const entries: Pick<IntersectionObserverEntry, 'target' | 'isIntersecting'>[] = Object.entries(changes).map(([id, isIntersecting]) => ({
      target: document.getElementById(id)!,
      isIntersecting,
    }))
    act(() => {
      this.callback(entries as IntersectionObserverEntry[], this as unknown as IntersectionObserver)
    })
  }
}

const Sections = () => {
  useActiveSection(IDS)

  return (
    <>
      {IDS.map(id => (
        <section key={id} id={id} />
      ))}
    </>
  )
}

const activeId = () => useSectionStore.getState().activeId
const observer = () => FakeIntersectionObserver.latest!

describe('useActiveSection', () => {
  beforeEach(() => {
    FakeIntersectionObserver.latest = null
    useSectionStore.setState({ activeId: null })
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('넘겨받은 섹션을 모두 지켜봐야 합니다', () => {
    render(<Sections />)

    expect([...observer().targets].map(target => target.id)).toEqual(IDS)
  })

  it('띠에 걸친 섹션을 지금 보는 섹션으로 저장하고, 걸친 섹션이 없으면 null이어야 합니다', () => {
    render(<Sections />)
    expect(activeId()).toBeNull()

    observer().cross({ work: true })
    expect(activeId()).toBe('work')

    observer().cross({ work: false, way: true })
    expect(activeId()).toBe('way')

    // 다시 첫 화면으로 올라가면 걸친 섹션이 없다
    observer().cross({ way: false })
    expect(activeId()).toBeNull()
  })

  it('띠가 두 섹션의 경계에 걸치면 위쪽 섹션을 골라야 합니다', () => {
    render(<Sections />)

    observer().cross({ career: true, way: true })
    expect(activeId()).toBe('way')
  })

  it('화면을 떠나면 지켜보기를 멈추고 null로 되돌려야 합니다', () => {
    const { unmount } = render(<Sections />)
    observer().cross({ career: true })
    expect(activeId()).toBe('career')

    unmount()

    expect(observer().isConnected).toBe(false)
    expect(activeId()).toBeNull()
  })

  it('IntersectionObserver가 없는 환경에서도 오류 없이 null이어야 합니다', () => {
    vi.stubGlobal('IntersectionObserver', undefined)

    expect(() => render(<Sections />)).not.toThrow()
    expect(activeId()).toBeNull()
  })
})

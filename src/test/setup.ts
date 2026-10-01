import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// jsdom에는 <dialog>의 showModal·close가 없다. 열림 속성과 close 이벤트만 흉내 낸다.
// ESC로 닫기, 포커스 가두기, 뒤 화면 비활성은 브라우저 기능이라 테스트하지 않고 브라우저에서 확인한다.
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.open = true
  }
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    if (!this.open) return
    this.open = false
    this.dispatchEvent(new Event('close'))
  }
}

// SVG 모킹
vi.mock('*.svg?react', () => ({
  default: vi.fn(() => 'svg'),
}))

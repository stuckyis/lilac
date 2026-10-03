import { LayoutIcon } from '@/components/ui/Icon'
import BlockMark from '@/components/ui/BlockMark'
import clsx from 'clsx'
import { useState } from 'react'
import { HERO_LAYOUT_LABEL, HERO_LAYOUT_ORDER } from './const'
import { AppPanel, ComponentsPanel, MetricPanel, ProfilePhoto } from './Panels'

/**
 * 첫 화면 오른쪽의 패널 조합과 "레이아웃 바꾸기" 버튼.
 * 지금 레이아웃만 상태로 들고 있고, 패널 위치는 레이아웃 클래스(stage--grid 등)에 따라 CSS가 옮긴다.
 */
const HeroComposition = () => {
  const [layoutIndex, setLayoutIndex] = useState(0)
  const layout = HERO_LAYOUT_ORDER[layoutIndex]
  const nextLayout = HERO_LAYOUT_ORDER[(layoutIndex + 1) % HERO_LAYOUT_ORDER.length]

  const handleSwitch = () => setLayoutIndex(prev => (prev + 1) % HERO_LAYOUT_ORDER.length)

  return (
    <div className="hero-composition">
      <div className="hero-composition__glow" aria-hidden />

      <div className={clsx('hero-composition__stage', `hero-composition__stage--${layout}`)} aria-hidden>
        <div className="hero-composition__slot hero-composition__slot--mark">
          <BlockMark size={64} />
        </div>
        <div className="hero-composition__slot hero-composition__slot--app">
          <AppPanel />
        </div>
        <div className="hero-composition__slot hero-composition__slot--metric">
          <MetricPanel />
        </div>
        <div className="hero-composition__slot hero-composition__slot--components">
          <ComponentsPanel />
        </div>
        <div className="hero-composition__slot hero-composition__slot--profile">
          <ProfilePhoto />
        </div>
      </div>

      <button type="button" className="hero-composition__switch" onClick={handleSwitch}>
        <LayoutIcon size={18} />
        레이아웃 바꾸기{' '}
        <span className="hero-composition__switch-state" aria-hidden>
          {HERO_LAYOUT_LABEL[layout]} → {HERO_LAYOUT_LABEL[nextLayout]}
        </span>
        <span className="visually-hidden">
          (지금 {HERO_LAYOUT_LABEL[layout]}, 누르면 {HERO_LAYOUT_LABEL[nextLayout]})
        </span>
      </button>
    </div>
  )
}

export default HeroComposition

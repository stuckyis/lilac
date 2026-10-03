import { INTRO, PROFILE } from '@/data/portfolio'

// 첫 화면 오른쪽에 쌓는 장식용 패널들. 실제 화면 조각을 단순한 도형으로 표현한다.
// 패널 묶음 전체가 aria-hidden이라 스크린리더는 읽지 않는다.

/** 앱 화면 (라일락): 머리글, 이미지 자리, 글줄 두 개, 버튼 */
export const AppPanel = () => (
  <div className="hero-panel hero-panel--app">
    <div className="hero-panel__row">
      <span className="hero-panel__avatar" />
      <span className="hero-panel__bar" />
    </div>
    <div className="hero-panel__media" />
    <span className="hero-panel__line hero-panel__line--220" />
    <span className="hero-panel__line hero-panel__line--160 hero-panel__line--faint" />
    <div className="hero-panel__cta">
      <span className="hero-panel__cta-main" />
      <span className="hero-panel__cta-side" />
    </div>
  </div>
)

/** 성능 지표 (민트): 막대그래프와 수치 */
export const MetricPanel = () => (
  <div className="hero-panel hero-panel--metric">
    <span className="hero-panel__label">PERFORMANCE</span>
    <div className="hero-panel__chart">
      <span />
      <span />
      <span />
      <span />
    </div>
    <span className="hero-panel__metric">{INTRO.metric}</span>
  </div>
)

/** 컴포넌트 (버터): 토글, 칩, 글줄 */
export const ComponentsPanel = () => (
  <div className="hero-panel hero-panel--components">
    <span className="hero-panel__label">COMPONENTS</span>
    <div className="hero-panel__row">
      <span className="hero-panel__toggle" />
      <span className="hero-panel__chip hero-panel__chip--wide" />
      <span className="hero-panel__chip" />
    </div>
    <div className="hero-panel__row">
      <span className="hero-panel__line hero-panel__line--90" />
      <span className="hero-panel__line hero-panel__line--50 hero-panel__line--faint" />
    </div>
  </div>
)

/** 프로필 사진. 사진이 없으면 자리표시 원을 보여준다 */
export const ProfilePhoto = () => (
  <div className="hero-panel hero-panel--profile">
    {PROFILE.photoUrl ? <img className="hero-panel__photo" src={PROFILE.photoUrl} alt="" /> : '[프로필 사진]'}
  </div>
)

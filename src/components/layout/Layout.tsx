import { Outlet } from 'react-router'
import Header from './Header'
import './Layout.scss'

const Layout = () => {
  return (
    <div className="layout">
      {/* 키보드 사용자가 메뉴를 건너뛰고 본문으로 바로 가는 링크. 포커스를 받을 때만 보인다 */}
      <a className="skip-link" href="#main">
        본문 바로가기
      </a>

      <Header />

      {/* 사이트 푸터는 홈의 연락 섹션 안에 있다 (어두운 마무리 블록의 아래쪽) */}
      <main id="main" className="main-content" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

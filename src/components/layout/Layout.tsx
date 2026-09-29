import { Outlet } from 'react-router'
import './Layout.scss'
import Navigation from './Navigation'

const Layout = () => {
  return (
    <div className="layout">
      <Navigation />

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout

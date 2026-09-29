import Layout from '@/components/layout/Layout'
import Loading from '@/components/loading'
import Pages from '@/pages'
import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Menus } from './const'

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={Menus.Home} element={<Pages.Home />} />
          </Route>
          <Route path="*" element={<Pages.NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default Router

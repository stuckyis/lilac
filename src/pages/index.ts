import { lazy } from 'react'

export default {
  Home: lazy(() => import('./home')),
  NotFound: lazy(() => import('./errorPage')),
}

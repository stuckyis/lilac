import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import Router from './routes'

import './styles/fonts'
import './styles/global.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => {
  useEffect(() => {
    const isDev = import.meta.env.DEV

    // bfcache에서 복원될 때 처리
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted && !isDev) {
        window.location.reload()
      }
    }

    window.addEventListener('pageshow', handlePageShow)

    return () => {
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  )
}

export default App

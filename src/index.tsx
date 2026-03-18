/* eslint-disable no-console */
import React from 'react'
import ReactDOM from 'react-dom/client'
import i18n from './i18n'
import { QueryClient, QueryClientProvider } from 'react-query'
import ErrorBoundary from '@/components/ErrrosBoundary'
import App from './App'
import { initAmplitude, initFacebookPixel, initSentry } from '@/services/analytics'
import { PUBLIC_URL } from '@/constants/variables'
import '@/assets/scss/style.scss'

initFacebookPixel()
initAmplitude()
initSentry()

document.documentElement.lang = i18n.language

if ('serviceWorker' in navigator) {
  const basePath = PUBLIC_URL || ''
  const swPath = `${basePath}${basePath.endsWith('/') ? '' : '/'}sw.js`

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(swPath)
      .then((registration) => {
        // 🔁 Force a check for a new Service Worker version
        registration.update()

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (!newWorker) return

          newWorker.addEventListener('statechange', () => {
            // The new SW is installed while the old one is still controlling the page
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // 👉 Tell the new Service Worker to activate immediately
              newWorker.postMessage({ type: 'SKIP_WAITING' })
            }
          })
        })
      })
      .catch((error) => {
        console.log('Service worker registration failed:', error)
      })

    // 🔄 Reload the app when the active Service Worker changes
    let refreshing = false

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return
      refreshing = true

      window.location.reload()
    })
  })
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ErrorBoundary>,
)

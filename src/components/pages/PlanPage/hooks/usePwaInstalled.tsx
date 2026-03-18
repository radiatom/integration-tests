/* eslint-disable no-console */
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'is_pwa_installed'

export const usePwaInstalled = () => {
  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ua = navigator.userAgent.toLowerCase()

    const isIOS = /iphone|ipad|ipod/.test(ua)
    const isAndroid = /android/.test(ua)
    const isDesktop = !isIOS && !isAndroid

    const checkPwaInstalled = () => {
      const displayModeStandalone = window.matchMedia('(display-mode: standalone)').matches

      const iosStandalone = (window.navigator as any).standalone

      const result = displayModeStandalone || iosStandalone

      console.group('[PWA INSTALLED CHECK]')
      console.log('User Agent →', navigator.userAgent)
      console.log('Platform →', { isIOS, isAndroid, isDesktop })
      console.log('display-mode: standalone →', displayModeStandalone)
      console.log('navigator.standalone (iOS) →', iosStandalone)
      console.log('FINAL isInstalled →', result)
      console.log('Stored is_pwa_installed →', localStorage.getItem(STORAGE_KEY))
      console.groupEnd()

      setIsInstalled(result)

      if (result) {
        localStorage.setItem(STORAGE_KEY, 'true')
        console.warn('[PWA] Saved install state to localStorage')
      }
    }

    checkPwaInstalled()

    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    mediaQuery.addEventListener('change', checkPwaInstalled)

    return () => {
      mediaQuery.removeEventListener('change', checkPwaInstalled)
    }
  }, [])

  return {
    isInstalled,
    hasEverInstalled: localStorage.getItem(STORAGE_KEY) === 'true',
  }
}

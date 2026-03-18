import { useState, useEffect } from 'react'

interface DeviceInfo {
  isIOS: boolean
  isAndroid: boolean
  isMobile: boolean
  isApple: boolean
  isReady: boolean // Додаємо цей параметр
}

export const useDeviceDetect = (): DeviceInfo => {
  const [device, setDevice] = useState<DeviceInfo>({
    isIOS: false,
    isAndroid: false,
    isMobile: false,
    isApple: false,
    isReady: false,
  })

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase()

    const isIPhone = /iphone|ipod/.test(ua)
    const isIPad =
      /ipad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

    const isIOS = isIPhone || isIPad
    const isAndroid = /android/.test(ua)
    const isApple = /mac|iphone|ipad|ipod/.test(ua)

    setDevice({
      isIOS,
      isAndroid,
      isMobile: isIOS || isAndroid || /mobile/.test(ua),
      isApple,
      isReady: true,
    })
  }, [])

  return device
}

import { useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'pwa_install_prompt_closed_at'
const ONE_DAY = 24 * 60 * 60 * 1000

export const usePwaInstallPrompt = (hasEverInstalled: boolean) => {
  const [isOpen, setIsOpen] = useState(false)

  const canShow = useCallback(() => {
    if (hasEverInstalled) return false

    const closedAt = localStorage.getItem(STORAGE_KEY)
    if (!closedAt) return true

    return Date.now() - Number(closedAt) >= ONE_DAY
  }, [hasEverInstalled])

  const open = useCallback(() => {
    if (canShow()) {
      setIsOpen(true)
    }
  }, [canShow])

  const close = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString())
    setIsOpen(false)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      open()
    }, 3000)
    return () => clearTimeout(timeout)
  }, [open])

  return {
    isOpen,
    open,
    close,
  }
}

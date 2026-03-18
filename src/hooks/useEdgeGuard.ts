import { useEffect } from 'react'

const useEdgeGuard = () => {
  useEffect(() => {
    const guard = document.createElement('div')
    guard.id = 'edge-guard'
    Object.assign(guard.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '12px',
      height: '100vh',
      zIndex: '9999',
    })

    const cancel = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    guard.addEventListener('touchstart', cancel, { passive: false })
    guard.addEventListener('touchmove', cancel, { passive: false })
    document.body.appendChild(guard)

    return () => guard.remove()
  }, [])
}

export default useEdgeGuard

import React, { FC, ReactNode, useEffect, useRef } from 'react'

interface ICloseClickOutsideComponentProps {
  children: ReactNode
  onClick: () => void
}

// component
const OnClickOutside: FC<Readonly<ICloseClickOutsideComponentProps>> = ({ children, onClick }) => {
  const ref = useRef<HTMLDivElement>(null)
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClick()
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // return
  return <div ref={ref}>{children}</div>
}

export default OnClickOutside

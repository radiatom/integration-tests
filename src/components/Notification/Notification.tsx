import React, { useEffect } from 'react'

interface NotificationProps {
  children: React.ReactNode
  state: boolean
  className?: string
  handleResetNotification: () => void
}

export default function Notification(props: NotificationProps) {
  useEffect(() => {
    if (props.state) {
      let timer: NodeJS.Timeout
      if (props.state) {
        timer = setTimeout(() => {
          props.handleResetNotification()
        }, 3000)
      }

      return () => clearTimeout(timer)
    }
  }, [props.state])

  return (
    <div
      className={`notification ${props.state ? 'opacity-100 z-50 visible' : 'opacity-0 invisible'} ${props.className}`}
    >
      {props.children}
    </div>
  )
}

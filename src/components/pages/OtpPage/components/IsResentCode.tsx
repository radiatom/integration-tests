import React, { useEffect, useState } from 'react'
import { Trans } from 'react-i18next'

export const IsResentCode = ({ onClick }: { onClick: () => void }) => {
  const [seconds, setSeconds] = useState(60)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          onClick()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [onClick])

  return (
    <Trans
      i18nKey="codeResent"
      values={{ seconds }}
      components={{
        bold: <span className="font-bold text-dark" />,
      }}
    />
  )
}

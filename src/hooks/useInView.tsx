import { useEffect, useState } from 'react'

export const useInView = (startVisible = false) => {
  const [node, setNode] = useState<Element | null>(null)
  const [isVisible, setIsVisible] = useState(startVisible)

  useEffect(() => {
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [node])
  const ref = setNode

  // return
  return { isVisible, ref }
}

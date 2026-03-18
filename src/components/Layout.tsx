import React from 'react'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

const Layout = (props: LayoutProps) => {
  return (
    <main className={props.className + 'base w-full flex flex-col relative h-full overflow-hidden'}>
      {props.children}
    </main>
  )
}

export default Layout

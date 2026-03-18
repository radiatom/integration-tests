/* eslint-disable no-console */

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { trackErrors } from '@/helpers/facebookPixelEvents'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const fullError = { ...error, errorInfo }
    trackErrors('boundary', fullError)
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try reload page.</div>
    }

    return this.props.children
  }
}

export default ErrorBoundary

import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '@/components/Header/Header'

test('show title', () => {
  render(<Header title={'hello world'} />)
  expect(screen.getByText(/hello world/i)).toBeInTheDocument()
})

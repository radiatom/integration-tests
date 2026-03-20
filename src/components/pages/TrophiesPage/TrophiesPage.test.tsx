import React from 'react'
import { render, screen } from '@testing-library/react'
import TrophiesPage from '@/components/pages/TrophiesPage/TrophiesPage'

describe('TrophiesPage', () => {
  test.skip('name test', async () => {
    // render(<TrophiesPage />)

    const list = await screen.findAllByTestId('trophies-list')

    expect(list).toBeInTheDocument()
  })
})

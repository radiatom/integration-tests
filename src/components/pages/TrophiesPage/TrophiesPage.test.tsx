import React from 'react'
import { screen } from '@testing-library/react'
import TrophiesPage from '@/components/pages/TrophiesPage/TrophiesPage'
import { render } from '@/test-utils'
import { UserChallengeTrophiesResponse } from '@/types/interfaces'
import { trophie } from '@/constants/test.contants'
import user from '@testing-library/user-event'
import { mockUseGetUserChallengeTrophies, mockUseNavigate } from '@/setupTests'

describe('TrophiesPage', () => {
  test('loading', () => {
    mockUseGetUserChallengeTrophies({
      data: undefined,
      isLoading: true,
    })

    const { container } = render(<TrophiesPage />)
    expect(container.firstChild).toBeNull()
  })

  test('trophies===undefined', async () => {
    mockUseGetUserChallengeTrophies({
      data: undefined,
      isLoading: false,
    })
    const { container } = render(<TrophiesPage />)
    expect(container.firstChild).not.toBeNull()
    const img = await screen.findByAltText('trophy')
    expect(img).toBeInTheDocument()
  })

  test('trophies===[]', async () => {
    mockUseGetUserChallengeTrophies({
      data: [],
      isLoading: false,
    })
    const { container } = render(<TrophiesPage />)
    expect(container.firstChild).not.toBeNull()
    const img = await screen.findByAltText('trophy')
    expect(img).toBeInTheDocument()
  })

  test('there are trophies', async () => {
    mockUseGetUserChallengeTrophies({
      data: [trophie, trophie, trophie] as UserChallengeTrophiesResponse,
      isLoading: false,
    })
    render(<TrophiesPage />)

    const list = screen.getByTestId('trophies-list')
    expect(list).toBeInTheDocument()

    const allImg = screen.getAllByAltText('')
    expect(allImg.length).toBe(3)
  })

  test('close page', async () => {
    user.setup()
    mockUseGetUserChallengeTrophies({
      data: undefined,
      isLoading: false,
    })
    render(<TrophiesPage />)
    const btn = screen.getByTestId('back-button')
    expect(btn).toBeInTheDocument()
    await user.click(btn)
    expect(mockUseNavigate).toHaveBeenCalled()
  })
})

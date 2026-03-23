import React from 'react'
import { getRoles, logRoles, screen } from '@testing-library/react'
import TrophiesPage from '@/components/pages/TrophiesPage/TrophiesPage'
import { render } from '@/test-utils'

import useGetUserChallengeTrophies from '@/hooks/useGetUserChallengeTrophies'
import useGetUserChallengeAvailable from '@/hooks/useGetUserChallengeAvailable'

jest.mock('@/hooks/useGetUserChallengeTrophies')
jest.mock('@/hooks/useGetUserChallengeAvailable')

describe('TrophiesPage', () => {
  test('loading', () => {
    ;(useGetUserChallengeTrophies as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    })
    ;(useGetUserChallengeAvailable as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    })
    const { container } = render(<TrophiesPage />)
    expect(container.firstChild).toBeNull()
  })

  test('trophies===undefined', async () => {
    ;(useGetUserChallengeTrophies as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
    })
    ;(useGetUserChallengeAvailable as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
    })
    const { container } = render(<TrophiesPage />)
    expect(container.firstChild).not.toBeNull()
    const img = await screen.findByAltText('trophy')
    // logRoles(container)
    expect(img).toBeInTheDocument()
  })
})

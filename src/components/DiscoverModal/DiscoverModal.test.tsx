import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '@/test-utils'
import DiscoverModal from '@/components/DiscoverModal/DiscoverModal'
import user from '@testing-library/user-event'
import { mockUseGetUserChallengeAvailable, mockUseNavigate } from '@/setupTests'

describe('DiscoverModal folder', () => {
  test('isEmpty={true}', () => {
    mockUseGetUserChallengeAvailable({
      data: undefined,
      isLoading: false,
    })
    render(<DiscoverModal isEmpty={true} />)
    const btn = screen.getByText('New challenges soon')

    expect(btn).toBeInTheDocument()
  })

  test('with title', () => {
    mockUseGetUserChallengeAvailable({
      data: undefined,
      isLoading: false,
    })
    render(<DiscoverModal isEmpty={true} withTitle onHome={() => {}} />)
    const header = screen.getByRole('heading', { name: 'Your Next Challenge Awaits!' })
    expect(header).toBeInTheDocument()

    const paragraph = screen.getByText(
      'Ready to build new habits? Find an exciting challenge to start your journey.',
    )
    expect(paragraph).toBeInTheDocument()
  })

  test('isEmpty={true} onHome()', async () => {
    user.setup()
    const onHome = jest.fn()
    mockUseGetUserChallengeAvailable({
      data: undefined,
      isLoading: false,
    })
    render(<DiscoverModal isEmpty={true} onHome={onHome} />)

    const btn = screen.getByRole('button', { name: 'Back Home' })
    expect(btn).toBeInTheDocument()
    await user.click(btn)

    expect(onHome).toHaveBeenCalled()
  })

  test('challenges undefined onHome()', async () => {
    mockUseGetUserChallengeAvailable({
      data: undefined,
      isLoading: false,
    })
    render(<DiscoverModal isEmpty={true} />)
    const btn = screen.getByText('New challenges soon')

    expect(btn).toBeInTheDocument()
  })

  test('challenges []', async () => {
    mockUseGetUserChallengeAvailable({
      data: undefined,
      isLoading: false,
    })
    render(<DiscoverModal isEmpty={true} />)
    const btn = screen.getByText('New challenges soon')

    expect(btn).toBeInTheDocument()
  })

  test('there are challenges', async () => {
    user.setup()
    mockUseGetUserChallengeAvailable({
      data: undefined,
      isLoading: false,
    })

    render(<DiscoverModal isEmpty={false} />)

    const btn = screen.getByRole('button', { name: 'Discover New Challenges' })
    expect(btn).toBeInTheDocument()

    await user.click(btn)
    expect(mockUseNavigate).toHaveBeenCalled()
  })
})

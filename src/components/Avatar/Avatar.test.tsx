import React from 'react'
import { render, screen } from '@testing-library/react'
import Avatar from '@/components/Avatar/Avatar'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('avatar folder', () => {
  const name = 'name'

  test('avatar is first-letter-name', () => {
    render(<Avatar name={name} />)

    expect(screen.getByTestId('first-letter-name-avatar')).toBeInTheDocument()
    expect(screen.getByText(name[0])).toBeInTheDocument()
    expect(screen.queryByAltText('avatar')).not.toBeInTheDocument()
  })

  test('avatar is img', () => {
    render(<Avatar name={name} linkImg={'/'} />)
    expect(screen.getByTestId('img-avatar')).toBeInTheDocument()
    expect(screen.queryByText(name[0])).not.toBeInTheDocument()
    expect(screen.queryByTestId('first-letter-name-avatar')).not.toBeInTheDocument()
  })

  test('is small size', () => {
    render(<Avatar name={name} isSmall />)

    expect(screen.getByTestId('first-letter-name-avatar')).toHaveClass(
      'h-[40px]',
      ' w-[40px]',
      ' text-xl2',
    )
  })

  test('is big size', () => {
    render(<Avatar name={name} />)

    expect(screen.getByTestId('first-letter-name-avatar')).toHaveClass(
      'h-[86px]',
      ' w-[86px]',
      ' text-xl6',
    )
  })
})

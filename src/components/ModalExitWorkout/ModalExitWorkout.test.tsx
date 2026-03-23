import React from 'react'
import { screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import ModalExitWorkout from '@/components/ModalExitWorkout/ModalExitWorkout'
import { render } from '@/test-utils'
import { mockUseNavigate } from '@/setupTests'

describe('ModalExitWorkout folder', () => {
  const mockOnClose = jest.fn()

  test('open modal with no error content', () => {
    const view = render(<ModalExitWorkout isOpenModal onClose={() => {}} />)

    expect(view.container.firstChild).not.toHaveClass('hidden')
    expect(screen.getByRole('button', { name: 'End workout' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Keep going' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'ok' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'End workout?' })).toBeInTheDocument()
    expect(screen.getByText('Are you sure you want to end workout?')).toBeInTheDocument()
  })

  test('hide modal', () => {
    const view = render(<ModalExitWorkout isOpenModal={false} onClose={() => {}} />)

    expect(view.container.firstChild).toHaveClass('hidden')
  })

  test('show buttons:endWorkout & keepGoing', () => {
    render(<ModalExitWorkout isOpenModal onClose={() => {}} />)
    expect(screen.getByRole('button', { name: 'End workout' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Keep going' })).toBeInTheDocument()
  })

  test('set error workoutNotCompleted', async () => {
    user.setup()
    render(<ModalExitWorkout isOpenModal onClose={() => {}} />)

    await user.click(screen.getByRole('button', { name: 'End workout' }))

    expect(screen.queryByRole('button', { name: 'End workout' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Keep going' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ok' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Workout not completed' })).toBeInTheDocument()
    expect(screen.getByText('Just a few more steps to finish!')).toBeInTheDocument()
  })

  test('close modal with Keep going', async () => {
    user.setup()
    render(<ModalExitWorkout isOpenModal onClose={mockOnClose} />)
    await user.click(screen.getByRole('button', { name: 'Keep going' }))
    expect(mockOnClose).toHaveBeenCalled()
  })

  test('close modal with close-modal-svg', async () => {
    user.setup()
    render(<ModalExitWorkout isOpenModal onClose={mockOnClose} />)
    await user.click(screen.getByTestId('close-modal-svg'))
    expect(mockOnClose).toHaveBeenCalled()
  })

  test('close modal with close-modal-svg in error', async () => {
    user.setup()
    render(<ModalExitWorkout isOpenModal onClose={() => {}} />)
    await user.click(screen.getByRole('button', { name: 'End workout' }))
    await user.click(screen.getByTestId('close-modal-svg'))
    expect(mockUseNavigate).toHaveBeenCalled()
  })

  test('close modal with OK in error', async () => {
    user.setup()
    render(<ModalExitWorkout isOpenModal onClose={() => {}} />)
    await user.click(screen.getByRole('button', { name: 'End workout' }))
    await user.click(screen.getByRole('button', { name: 'ok' }))
    expect(mockUseNavigate).toHaveBeenCalled()
  })

  test('close modal with isCompletedWorkout', async () => {
    user.setup()
    render(<ModalExitWorkout isOpenModal onClose={() => {}} isCompletedWorkout />)
    await user.click(screen.getByRole('button', { name: 'End workout' }))
    expect(mockUseNavigate).toHaveBeenCalled()
  })
})

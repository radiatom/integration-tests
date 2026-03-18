import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '@/components/Header/Header'

describe('header folder', () => {
  test('show title', () => {
    render(<Header title={'hello world'} />)
    expect(screen.getByText(/hello world/i)).toBeInTheDocument()
  })

  test('show css shadow-header', () => {
    expect(render(<Header withShadow />).container.firstChild).toHaveClass('shadow-header')
  })

  test('show css not shadow-header', () => {
    expect(render(<Header />).container.firstChild).not.toHaveClass('shadow-header')
  })

  test('fixed header', () => {
    expect(render(<Header fixed />).container.firstChild).toHaveClass('sticky', 'top-0', 'left-0')
  })

  test('hide nav', () => {
    expect(render(<Header hideNav />).container.firstChild).toHaveClass(
      '-translate-y-full',
      'opacity-0',
      'h-0',
    )
  })

  test('show nav', () => {
    expect(render(<Header />).container.firstChild).toHaveClass('translate-y-0')
  })

  test('not fixed header', () => {
    expect(render(<Header />).container.firstChild).not.toHaveClass('sticky', 'top-0', 'left-0')
  })

  test('show arrow-back btn', () => {
    expect(render(<Header showBtn />).container.querySelector('.cursor-pointer')).toHaveClass(
      'opacity-100',
      'visible',
    )
  })

  test('hide arrow-back btn 1', () => {
    expect(
      render(<Header hideBtnHeader hideBackHeader />).container.querySelector('.cursor-pointer'),
    ).not.toHaveClass('opacity-100', 'visible')
  })

  test('hide arrow-back btn 2', () => {
    expect(render(<Header />).container.querySelector('.cursor-pointer')).toHaveClass(
      'opacity-0',
      'invisible',
    )
  })

  test('hide title', () => {
    const title = 'hello world'
    render(<Header hideHeader title={title} />)

    expect(screen.getByText(title)).toHaveClass('opacity-0', 'invisible')
  })

  test('show title', () => {
    const title = 'hello world'
    render(<Header title={title} />)

    expect(screen.getByText(title)).toHaveClass('opacity-100', 'visible')
  })
})

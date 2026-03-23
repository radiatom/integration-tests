import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '@/test-utils'
import img from '@/assets/images/svg/logo-mini.svg'
import ImageComponent from '@/components/ImageComponent/ImageComponent'
import defaultSvg from '@/assets/images/svg/default-foto.svg'

describe('ImageComponent folder', () => {
  test('anim loading', () => {
    expect(render(<ImageComponent src={img} />).container.firstChild).toHaveClass('animate-pulse')
  })

  test('src with broken link', async () => {
    render(<ImageComponent src={'/fail-link.jpg'} />)

    const img = (await screen.findByAltText('/fail-link.jpg')) as HTMLImageElement

    expect(img).toBeInTheDocument()
    expect(img.src).toContain(defaultSvg)
    expect(img).toHaveStyle({
      objectFit: 'cover',
    })
    expect(img).toHaveClass('w-full', 'h-full')
  })

  test('src with broken link second defaultImg', async () => {
    render(<ImageComponent src={'/fail-link.jpg'} defaultImg={img} />)

    const imgElement = (await screen.findByAltText('/fail-link.jpg')) as HTMLImageElement

    expect(imgElement).toBeInTheDocument()
    expect(imgElement.src).toContain(img)
    expect(imgElement).toHaveStyle({
      objectFit: 'cover',
    })
    expect(imgElement).toHaveClass('w-full', 'h-full')
  })

  test('show img', async () => {
    render(<ImageComponent src={img} />)

    const imgElement = (await screen.findByAltText('')) as HTMLImageElement

    expect(imgElement).toBeInTheDocument()
    expect(imgElement.src).toContain(img)
    expect(imgElement).toHaveStyle({
      objectFit: 'cover',
    })
    expect(imgElement).toHaveClass('w-full', 'h-full')
  })

  test('show custom class', async () => {
    render(<ImageComponent src={img} className={'h-4'} />)

    const imgElement = (await screen.findByAltText('')) as HTMLImageElement

    expect(imgElement).toBeInTheDocument()
    expect(imgElement.src).toContain(img)
    expect(imgElement).toHaveStyle({
      objectFit: 'cover',
    })
    expect(imgElement).toHaveClass('h-4')

    render(<ImageComponent src={'/fail-link.jpg'} defaultImg={img} className={'h-4'} />)

    const imgElement1 = (await screen.findByAltText('/fail-link.jpg')) as HTMLImageElement

    expect(imgElement1).toBeInTheDocument()
    expect(imgElement1.src).toContain(img)
    expect(imgElement1).toHaveStyle({
      objectFit: 'cover',
    })
    expect(imgElement1).toHaveClass('h-4')
  })
})

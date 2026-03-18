import { addPathPrefix } from '@/helpers/getPath'
import React, { ComponentProps } from 'react'
import ImageWebp from 'react-image-webp'

interface ImageProps extends ComponentProps<typeof ImageWebp> {}

export default function Image(props: ImageProps) {
  const { webp, src, ...args } = props

  // eslint-disable-next-line
  // @ts-ignore
  return <ImageWebp webp={addPathPrefix(webp)} src={addPathPrefix(src)} {...args} />
}

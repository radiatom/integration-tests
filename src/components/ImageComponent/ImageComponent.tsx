import React, { ComponentProps, FC } from 'react'
import defaultSvg from '@/assets/images/svg/default-foto.svg'
import { Img } from 'react-image'

// type
type IImageComponentProps = Omit<ComponentProps<typeof Img>, 'src'> & {
  src?: string | string[] | null
  defaultImg?: string
  objectFit?:
    | 'contain'
    | 'cover'
    | 'fill'
    | 'scale-down'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revert-layer'
    | 'unset'
}

// component
const ImageComponent: FC<Readonly<IImageComponentProps>> = ({
  src,
  className,
  loading,
  loader,
  unloader,
  alt,
  defaultImg,
  objectFit,
  ...rest
}) => {
  const newClassName = className || 'w-full h-full'

  // return
  return (
    <Img
      {...rest}
      src={src || ''}
      className={newClassName}
      style={{ objectFit: objectFit || 'cover' }}
      loading={loading || 'lazy'}
      loader={
        loader || (
          <div
            {...rest}
            className={`${newClassName} bg-gray animate-pulse`}
            style={{ animationDuration: '2s' }}
          />
        )
      }
      unloader={
        unloader || (
          <img
            {...rest}
            src={defaultImg || defaultSvg}
            alt={typeof src === 'string' ? src : 'default'}
            className={newClassName}
            style={{ objectFit: 'cover' }}
          />
        )
      }
      alt={alt || ''}
    />
  )
}

export default ImageComponent

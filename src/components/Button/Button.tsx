import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Loader } from '@/components/Loader/Loader'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-r53 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none transition',
  {
    variants: {
      variant: {
        default:
          'bg-gradient text-white p-3 w-full uppercase font-semibold text-base shadow-renew active:scale-95 relative',
        red: 'bg-[linear-gradient(180deg,_#F99494_0%,_#FF5858_100%)] text-white p-3 w-full uppercase font-semibold text-base shadow-[0px_6px_14px_0px_#D74D5B0F,0px_12px_24px_0px_#EC6E7B0D] active:scale-95 relative',
        plan: 'bg-green2 !py-1.5 !px-3 uppercase font-semibold active:scale-95 transition-all text-white w-full',
        outline:
          'border min-h-[48px] border-[#3E95644F] text-[16px] text-black font-semibold uppercase !py-1.5 !px-4  active:scale-95 transition-all w-full disabled:border-none disabled:text-[#B7BABE] disabled:bg-[#00000008]',
        'outline-green':
          'border min-h-[48px] border-[#24E57C] text-[16px] text-[#24E57C] font-semibold uppercase !py-1.5 !px-4  active:scale-95 transition-all w-full disabled:border-none disabled:text-[#B7BABE] disabled:bg-[#00000008]',
        secondary:
          'bg-[rgba(255,255,255,0.13)] text-white p-3 w-full uppercase font-semibold text-base active:scale-95 relative',
        'gray-bg-red-text':
          'bg-[#78788029] text-[17px] text-[#FF383C] !py-1.5 !px-3 font-medium  active:scale-95 transition-all w-full',
        'gray-bg-black-text':
          'bg-[#78788029] text-[17px] text-black !py-1.5 !px-3 font-medium  active:scale-95 transition-all w-full',
        'green-small':
          'bg-gradient text-white !py-[5px] !px-4 capitalize !text-[16px] active:scale-95 !rounded-r8 transition',
        'white-small':
          'bg-white text-secondary !py-[5px] !px-4 capitalize !text-[16px] shadow active:scale-95 !rounded-r8 transition',
      },
      size: {
        default: 'p-3',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Loader />}
        {children}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }

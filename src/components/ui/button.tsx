import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center text-white justify-center gap-2 font-bold whitespace-nowrap rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-1 hover:opacity-95 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-90 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-accent-purple ',
        secondary: 'bg-background-tertiary',
        ghost: 'border border-border-primary',
        link: 'text-accent-purple underline-offset-4 !p-0 hover:underline',
        icon: '!rounded-xl size-12 bg-[#1E1E1E] !p-3 hover:bg-[#2E2E2E]'
      },
      size: {
        default: 'h-12 p-3',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

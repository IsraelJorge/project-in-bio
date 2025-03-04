import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `w-full rounded-xl border border-transparent bg-background-secondary p-3 text-white outline-none placeholder:text-base placeholder:text-content-placeholder focus-within:outline-accent-purple hover:border-border-secondary hover:text-content-body active:outline-accent-purple`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }

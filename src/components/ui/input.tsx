import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `w-full rounded-xl border border-transparent bg-background-secondary p-3 text-white placeholder:text-content-placeholder hover:border-border-secondary hover:text-content-body active:border-border-tertiary`,
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

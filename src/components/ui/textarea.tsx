import * as React from 'react'

import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        `w-full rounded-xl border border-transparent bg-background-secondary p-3 text-white outline-none placeholder:text-base placeholder:text-content-placeholder focus-within:outline-accent-purple hover:border-border-secondary hover:text-content-body active:border-border-tertiary`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }

import * as React from 'react'

import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        `w-full rounded-xl border border-transparent bg-background-secondary p-3 text-white placeholder:text-content-placeholder hover:border-border-secondary hover:text-content-body active:border-border-tertiary`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }

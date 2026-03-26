'use client'

import * as React from 'react'
import { Progress as ProgressPrimitive } from '@base-ui/react'

import { cn } from '@/lib/utils'

const Progress = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    value={value ?? null}
    className={cn('relative h-4 w-full overflow-hidden rounded-full', className)}
    {...props}
  >
    <ProgressPrimitive.Track className="relative h-full w-full bg-input">
      <ProgressPrimitive.Indicator
        className="h-full w-full bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Track>
  </ProgressPrimitive.Root>
))
Progress.displayName = 'Progress'

export { Progress }
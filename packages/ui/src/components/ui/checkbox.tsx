import * as React from 'react'
import { Checkbox as CheckboxPrimitive } from '@base-ui/react'
import { Check, Minus } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * Extends Base UI's Checkbox props to accept `checked="indeterminate"` for
 * backwards-compatibility with the Radix UI API. Base UI uses a separate boolean
 * `indeterminate` prop, so we override `checked` here and normalize it internally.
 */
type CheckboxProps = Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'checked'> & {
  checked?: boolean | 'indeterminate'
}

const Checkbox = React.forwardRef<HTMLElement, CheckboxProps>(
  ({ className, checked, indeterminate, ...props }, ref) => {
    // Derive indeterminate state from either the explicit `indeterminate` prop or
    // the Radix-style `checked="indeterminate"` string. An explicit boolean
    // `indeterminate` prop takes precedence (via `??`).
    const isIndeterminate = indeterminate ?? (checked === 'indeterminate')
    // Normalize checked to boolean for Base UI (which does not accept the string 'indeterminate').
    const normalizedChecked = checked === 'indeterminate' ? undefined : checked

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        checked={normalizedChecked}
        indeterminate={isIndeterminate}
        className={cn(
          'peer inline-flex items-center justify-center h-4 w-4 shrink-0 rounded-sm border bg-background border-input/30 transition-colors',
          'hover:border-input/50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:bg-muted/10 disabled:border-muted/10',
          'data-[checked]:bg-primary data-[checked]:border-primary data-[checked]:text-primary-foreground',
          'data-[indeterminate]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:text-primary-foreground',
          className
        )}
        {...props}
      >
        {/* keepMounted ensures the indicator stays in the DOM so we can always render the correct icon */}
        <CheckboxPrimitive.Indicator keepMounted className={cn('flex items-center justify-center text-current data-[unchecked]:hidden')}>
          {isIndeterminate ? (
            <Minus className="h-3 w-3" />
          ) : (
            <Check className="h-3 w-3" />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
import * as React from 'react'
import { Checkbox as CheckboxPrimitive } from '@base-ui/react'
import { CheckIcon, MinusIcon } from '@/components/icons'

import { cn } from '@/lib/utils'

/**
 * Extends Base UI's Checkbox props to accept `checked="indeterminate"` for
 * backwards-compatibility with the Radix UI API. Base UI uses a separate boolean
 * `indeterminate` prop, so we override `checked` here and normalize it internally.
 */
export type CheckboxProps = Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'checked'> & {
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
          'peer inline-flex items-center justify-center h-4 w-4 shrink-0 rounded-[2px] border bg-background border-primary/30 transition-colors',
          'hover:border-primary/50',
          'active:border-primary',
          'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[hsl(var(--checkbox-focus))]',
          'data-[checked]:bg-primary data-[checked]:border-primary data-[checked]:text-primary-foreground',
          'data-[indeterminate]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:text-primary-foreground',
          'data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:bg-[hsl(var(--av-primary)/0.1)] data-[disabled]:border-[hsl(var(--av-primary)/0.1)]',
          'data-[disabled]:data-[checked]:bg-[hsl(var(--av-primary)/0.1)] data-[disabled]:data-[checked]:border-[hsl(var(--av-primary)/0.1)] data-[disabled]:data-[checked]:text-[hsl(var(--av-primary)/0.5)]',
          'data-[disabled]:data-[indeterminate]:bg-[hsl(var(--av-primary)/0.1)] data-[disabled]:data-[indeterminate]:border-[hsl(var(--av-primary)/0.1)] data-[disabled]:data-[indeterminate]:text-[hsl(var(--av-primary)/0.5)]',
          className
        )}
        {...props}
      >
        {/* keepMounted ensures the indicator stays in the DOM so we can always render the correct icon */}
        <CheckboxPrimitive.Indicator keepMounted className={cn('flex items-center justify-center text-current data-[unchecked]:hidden')}>
          {isIndeterminate ? (
            <MinusIcon className="h-2.5 w-2.5" />
          ) : (
            <CheckIcon className="h-2.5 w-2.5" />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
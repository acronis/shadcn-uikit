import * as React from 'react'
import { Select as BaseSelect } from '@base-ui/react/select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '@/lib/utils'

const Select = BaseSelect.Root

const SelectGroup = BaseSelect.Group
const SelectValue = BaseSelect.Value
const SelectPortal = BaseSelect.Portal

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof BaseSelect.Trigger>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Trigger
    ref={ref}
    className={cn(
      'relative flex h-9 w-full items-center rounded-lg border border-border bg-background pl-3 pr-9 py-2 text-sm font-medium text-foreground shadow-sm transition-all',
      'hover:bg-accent/5 hover:border-primary/30',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
      'data-[placeholder]:text-muted-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      '[&>span]:line-clamp-1 [&>span]:text-left',
      className
    )}
    {...props}
  >
    {children}
    <BaseSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-transform data-[state=open]:rotate-180 pointer-events-none">
      <ChevronDown className="h-4 w-4" />
    </BaseSelect.Icon>
  </BaseSelect.Trigger>
))
SelectTrigger.displayName = 'SelectTrigger'

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof BaseSelect.ScrollUpArrow>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.ScrollUpArrow>
>(({ className, ...props }, ref) => (
  <BaseSelect.ScrollUpArrow
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1.5 text-muted-foreground',
      'hover:bg-accent/10 hover:text-foreground transition-colors',
      className
    )}
    {...props}
  >
    <ChevronUp className="h-3.5 w-3.5" />
  </BaseSelect.ScrollUpArrow>
))
SelectScrollUpButton.displayName = 'SelectScrollUpButton'

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof BaseSelect.ScrollDownArrow>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.ScrollDownArrow>
>(({ className, ...props }, ref) => (
  <BaseSelect.ScrollDownArrow
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1.5 text-muted-foreground',
      'hover:bg-accent/10 hover:text-foreground transition-colors',
      className
    )}
    {...props}
  >
    <ChevronDown className="h-3.5 w-3.5" />
  </BaseSelect.ScrollDownArrow>
))
SelectScrollDownButton.displayName = 'SelectScrollDownButton'

const SelectContent = React.forwardRef<
  React.ElementRef<typeof BaseSelect.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Popup> & {
    alignItemWithTrigger?: boolean
    side?: 'top' | 'bottom'
    sideOffset?: number
    portal?: boolean
  }
>(({ className, children, alignItemWithTrigger = false, side, sideOffset = 4, portal = true, ...props }, ref) => {
  const element = (<>
    <BaseSelect.Positioner
      alignItemWithTrigger={alignItemWithTrigger}
      side={side}
      sideOffset={sideOffset}
      className="z-50"
    >
      <BaseSelect.Popup
        ref={ref}
        className={cn(
          'relative max-h-96 w-[var(--anchor-width)] overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          'origin-[var(--transform-origin)]',
          className
        )}
        {...props}
      >
        <SelectScrollUpButton />
        <BaseSelect.List className="p-1.5 overflow-y-auto max-h-[inherit]">
          {children}
        </BaseSelect.List>
        <SelectScrollDownButton />
      </BaseSelect.Popup>
    </BaseSelect.Positioner>
  </>)

  return portal ? <BaseSelect.Portal>{element}</BaseSelect.Portal> : element
})
SelectContent.displayName = 'SelectContent'

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof BaseSelect.GroupLabel>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>
>(({ className, ...props }, ref) => (
  <BaseSelect.GroupLabel
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider',
      className
    )}
    {...props}
  />
))
SelectLabel.displayName = 'SelectLabel'

const SelectItem = React.forwardRef<
  React.ElementRef<typeof BaseSelect.Item>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Item>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors',
      'hover:bg-accent/50 hover:text-accent-foreground',
      'focus-visible:bg-accent focus-visible:text-accent-foreground',
      'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
      'data-[selected]:bg-primary/10 data-[selected]:text-primary data-[selected]:font-medium',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
      className
    )}
    {...props}
  >
    <BaseSelect.ItemIndicator className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
      <Check className="h-3.5 w-3.5" />
    </BaseSelect.ItemIndicator>
    <BaseSelect.ItemText className="flex-1">{children}</BaseSelect.ItemText>
  </BaseSelect.Item>
))
SelectItem.displayName = 'SelectItem'

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof BaseSelect.Separator>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Separator>
>(({ className, ...props }, ref) => (
  <BaseSelect.Separator
    ref={ref}
    className={cn('my-1.5 h-px bg-border', className)}
    {...props}
  />
))
SelectSeparator.displayName = 'SelectSeparator'

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectPortal,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

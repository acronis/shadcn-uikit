'use client'

import * as React from 'react'
import { Accordion } from '@base-ui/react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

const AccordionRoot = React.forwardRef<
  React.ElementRef<typeof Accordion.Root>,
  React.ComponentPropsWithoutRef<typeof Accordion.Root>
>(({ keepMounted = true, ...props }, ref) => (
  <Accordion.Root ref={ref} keepMounted={keepMounted} {...props} />
))
AccordionRoot.displayName = 'Accordion'

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof Accordion.Item>,
  React.ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ className, ...props }, ref) => (
  <Accordion.Item ref={ref} className={cn('border-b', className)} {...props} />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  // Base UI Trigger forwards ref to HTMLElement; button is the concrete element
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ className, children, ...props }, ref) => (
  // Header is required by Base UI — it provides the accessible heading role
  <Accordion.Header className="flex">
    <Accordion.Trigger
      ref={ref as React.Ref<HTMLElement>}
      className={cn(
        // data-open replaces data-[state=open] in Base UI
        'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </Accordion.Trigger>
  </Accordion.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof Accordion.Panel>,
  React.ComponentPropsWithoutRef<typeof Accordion.Panel>
>(({ className, children, ...props }, ref) => (
  // Accordion.Panel replaces Accordion.Content; data-open/data-closed replace data-[state=open/closed]
  <Accordion.Panel
    ref={ref}
    className="overflow-hidden text-sm"
    style={{ height: 'var(--accordion-panel-height)', transition: 'height 0.2s ease-out' }}
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </Accordion.Panel>
))
AccordionContent.displayName = 'AccordionContent'

export { AccordionRoot as Accordion, AccordionItem, AccordionTrigger, AccordionContent }

'use client'

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react'

const Collapsible = CollapsiblePrimitive.Root
const CollapsibleTrigger = CollapsiblePrimitive.Trigger
// Base UI renamed Content → Panel; re-export under the original name for API compatibility
const CollapsibleContent = CollapsiblePrimitive.Panel

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

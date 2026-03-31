import { Button } from '@acronis-platform/shadcn-uikit/react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from '@acronis-platform/shadcn-uikit/react'

export function TooltipCustomDelay() {
  return (
    <TooltipProvider delayDuration={800}>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Slow to appear
        </TooltipTrigger>
        <TooltipContent>
          <p>This tooltip has a longer delay</p>
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

import * as React from 'react'
import { toast } from 'sonner'
import { Button } from '@acronis-platform/shadcn-uikit/react'

export function SonnerPositions() {
  const [position, setPosition] = React.useState<
    'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  >('top-right')

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        <Button
          onClick={() => {
            setPosition('top-left')
            toast('Top Left Position')
          }}
        >
          Top Left
        </Button>
        <Button
          onClick={() => {
            setPosition('top-center')
            toast('Top Center Position')
          }}
        >
          Top Center
        </Button>
        <Button
          onClick={() => {
            setPosition('top-right')
            toast('Top Right Position')
          }}
        >
          Top Right
        </Button>
        <Button
          onClick={() => {
            setPosition('bottom-left')
            toast('Bottom Left Position')
          }}
        >
          Bottom Left
        </Button>
        <Button
          onClick={() => {
            setPosition('bottom-center')
            toast('Bottom Center Position')
          }}
        >
          Bottom Center
        </Button>
        <Button
          onClick={() => {
            setPosition('bottom-right')
            toast('Bottom Right Position')
          }}
        >
          Bottom Right
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Current position: <strong>{position}</strong>. Position is set globally on the Toaster
        component.
      </p>
    </div>
  )
}

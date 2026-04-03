import * as React from 'react'
import { Calendar } from '@acronis-platform/shadcn-uikit/react'

export function CalendarDualMonth() {
  const [rangeDate, setRangeDate] = React.useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  return (
    <div className="flex justify-center rounded-lg border p-4">
      <Calendar
        mode="range"
        numberOfMonths={2}
        selected={rangeDate}
        onSelect={(range) => setRangeDate(range || { from: undefined, to: undefined })}
      />
    </div>
  )
}

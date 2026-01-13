import * as React from 'react'
import { Calendar } from '@acronis-platform/shadcn-uikit/react'

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [multipleDate, setMultipleDate] = React.useState<Date[]>([])
  const [rangeDate, setRangeDate] = React.useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  return (
    <section className="demo-section">
      <h2>Calendar Component</h2>
      <p className="demo-description">
        A date calendar component that allows users to select dates with various modes and
        configurations.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Single Date Selection</h3>
          <p className="text-sm text-gray-600 mb-4">Select a single date from the calendar.</p>
          <div className="flex justify-center rounded-lg border p-4">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
          {date && (
            <p className="mt-4 text-sm text-gray-600">
              Selected date: <strong>{date.toLocaleDateString()}</strong>
            </p>
          )}
        </div>

        <div className="demo-item">
          <h3>Multiple Date Selection</h3>
          <p className="text-sm text-gray-600 mb-4">Select multiple dates from the calendar.</p>
          <div className="flex justify-center rounded-lg border p-4">
            <Calendar mode="multiple" selected={multipleDate} onSelect={setMultipleDate} />
          </div>
          {multipleDate.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Selected dates:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {multipleDate.map((d, i) => (
                  <span key={i} className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                    {d.toLocaleDateString()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="demo-item">
          <h3>Date Range Selection</h3>
          <p className="text-sm text-gray-600 mb-4">Select a range of dates (from and to).</p>
          <div className="flex justify-center rounded-lg border p-4">
            <Calendar
              mode="range"
              selected={rangeDate}
              onSelect={(range) => setRangeDate(range || { from: undefined, to: undefined })}
            />
          </div>
          {rangeDate.from && (
            <p className="mt-4 text-sm text-gray-600">
              Selected range:{' '}
              <strong>
                {rangeDate.from.toLocaleDateString()}
                {rangeDate.to && ` - ${rangeDate.to.toLocaleDateString()}`}
              </strong>
            </p>
          )}
        </div>

        <div className="demo-item">
          <h3>Dual Month View</h3>
          <p className="text-sm text-gray-600 mb-4">
            Display two months side by side for easier range selection.
          </p>
          <div className="flex justify-center rounded-lg border p-4">
            <Calendar
              mode="range"
              numberOfMonths={2}
              selected={rangeDate}
              onSelect={(range) => setRangeDate(range || { from: undefined, to: undefined })}
            />
          </div>
        </div>

        <div className="demo-item">
          <h3>With Dropdown Navigation</h3>
          <p className="text-sm text-gray-600 mb-4">
            Calendar with month and year dropdown selectors.
          </p>
          <div className="flex justify-center rounded-lg border p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              captionLayout="dropdown"
              fromYear={1900}
              toYear={2100}
            />
          </div>
        </div>

        <div className="demo-item">
          <h3>Disabled Dates</h3>
          <p className="text-sm text-gray-600 mb-4">
            Calendar with certain dates disabled (past dates in this example).
          </p>
          <div className="flex justify-center rounded-lg border p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date()}
            />
          </div>
        </div>

        <div className="demo-item">
          <h3>With Week Numbers</h3>
          <p className="text-sm text-gray-600 mb-4">Display week numbers alongside the calendar.</p>
          <div className="flex justify-center rounded-lg border p-4">
            <Calendar mode="single" selected={date} onSelect={setDate} showWeekNumber />
          </div>
        </div>

        <div className="demo-item">
          <h3>Custom Start Month</h3>
          <p className="text-sm text-gray-600 mb-4">
            Calendar starting at a specific month and year.
          </p>
          <div className="flex justify-center rounded-lg border p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              defaultMonth={new Date(1990, 0)}
            />
          </div>
        </div>

        <div className="demo-item">
          <h3>Without Outside Days</h3>
          <p className="text-sm text-gray-600 mb-4">
            Calendar that doesn&apos;t show days from adjacent months.
          </p>
          <div className="flex justify-center rounded-lg border p-4">
            <Calendar mode="single" selected={date} onSelect={setDate} showOutsideDays={false} />
          </div>
        </div>

        <div className="demo-item">
          <h3>Fixed Weeks</h3>
          <p className="text-sm text-gray-600 mb-4">
            Calendar that always shows 6 weeks for consistent height.
          </p>
          <div className="flex justify-center rounded-lg border p-4">
            <Calendar mode="single" selected={date} onSelect={setDate} fixedWeeks />
          </div>
        </div>

        <div className="demo-item">
          <h3>Custom Week Start Day</h3>
          <p className="text-sm text-gray-600 mb-4">
            Calendar starting the week on Sunday instead of Monday.
          </p>
          <div className="flex justify-center rounded-lg border p-4">
            <Calendar mode="single" selected={date} onSelect={setDate} weekStartsOn={0} />
          </div>
        </div>

        <div className="demo-item">
          <h3>Date Range with Min/Max</h3>
          <p className="text-sm text-gray-600 mb-4">
            Calendar with minimum and maximum selectable dates.
          </p>
          <div className="flex justify-center rounded-lg border p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              fromDate={new Date()}
              toDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
            />
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Only dates within the next 3 months can be selected.
          </p>
        </div>
      </div>
    </section>
  )
}

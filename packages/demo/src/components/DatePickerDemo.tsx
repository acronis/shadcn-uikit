import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@acronis-platform/shadcn-uikit/react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import { Calendar } from '@acronis-platform/shadcn-uikit/react'
import { Popover, PopoverContent, PopoverTrigger } from '@acronis-platform/shadcn-uikit/react'

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()
  const [dateRange, setDateRange] = React.useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [birthDate, setBirthDate] = React.useState<Date>()
  const [appointmentDate, setAppointmentDate] = React.useState<Date>()
  const [smallDate, setSmallDate] = React.useState<Date>()

  return (
    <section className="demo-section">
      <h2>DatePicker Component</h2>
      <p className="demo-description">Used to choose a date from a dropdown-style calendar.</p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic DatePicker</h3>
          <p className="text-sm text-gray-600 mb-4">Simple date picker with calendar dropdown.</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="demo-item">
          <h3>Small DatePicker</h3>
          <p className="text-sm text-gray-600 mb-4">Compact date picker with smaller height.</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'h-8 w-[240px] justify-start text-left text-sm font-normal',
                  !smallDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-3 w-3" />
                {smallDate ? format(smallDate, 'PP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={smallDate} onSelect={setSmallDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="demo-item">
          <h3>With Label</h3>
          <p className="text-sm text-gray-600 mb-4">Date picker with a label above the input.</p>
          <div className="space-y-2">
            <label htmlFor="birth-date" className="text-sm font-medium">
              Date of Birth
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="birth-date"
                  variant="outline"
                  className={cn(
                    'w-[280px] justify-start text-left font-normal',
                    !birthDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {birthDate ? format(birthDate, 'PPP') : <span>Select your birth date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={birthDate}
                  onSelect={setBirthDate}
                  initialFocus
                  defaultMonth={new Date(1990, 0)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="demo-item">
          <h3>Date Range Picker</h3>
          <p className="text-sm text-gray-600 mb-4">Select a range of dates (from and to).</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-[320px] justify-start text-left font-normal',
                  !dateRange.from && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(dateRange.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
                numberOfMonths={2}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="demo-item">
          <h3>Form Example</h3>
          <p className="text-sm text-gray-600 mb-4">
            Date picker used within a form with validation.
          </p>
          <div className="max-w-md space-y-4 rounded-lg border p-6">
            <div className="space-y-2">
              <label htmlFor="appointment-date" className="text-sm font-medium">
                Appointment Date <span className="text-red-500">*</span>
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="appointment-date"
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !appointmentDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {appointmentDate ? (
                      format(appointmentDate, 'PPP')
                    ) : (
                      <span>Select appointment date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={appointmentDate}
                    onSelect={setAppointmentDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-gray-500">
                Please select a future date for your appointment.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="event-date" className="text-sm font-medium">
                Event Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="event-date"
                    variant="outline"
                    className="w-full justify-start text-left font-normal text-muted-foreground"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Optional event date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Different Date Formats</h3>
          <p className="text-sm text-gray-600 mb-4">
            Date pickers displaying dates in various formats.
          </p>
          <div className="flex flex-wrap gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-[200px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'MM/dd/yyyy') : <span>MM/DD/YYYY</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-[200px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'dd.MM.yyyy') : <span>DD.MM.YYYY</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-[200px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'yyyy-MM-dd') : <span>YYYY-MM-DD</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="demo-item">
          <h3>With Presets</h3>
          <p className="text-sm text-gray-600 mb-4">Date picker with quick selection presets.</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="flex">
                <div className="border-r p-3 space-y-2">
                  <p className="text-sm font-medium">Quick Select</p>
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                      onClick={() => setDate(new Date())}
                    >
                      Today
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        const tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate() + 1)
                        setDate(tomorrow)
                      }}
                    >
                      Tomorrow
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        const nextWeek = new Date()
                        nextWeek.setDate(nextWeek.getDate() + 7)
                        setDate(nextWeek)
                      }}
                    >
                      In a week
                    </Button>
                  </div>
                </div>
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="demo-item">
          <h3>Disabled State</h3>
          <p className="text-sm text-gray-600 mb-4">Date picker in disabled state.</p>
          <Button
            variant="outline"
            disabled
            className="w-[280px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Pick a date</span>
          </Button>
        </div>
      </div>
    </section>
  )
}

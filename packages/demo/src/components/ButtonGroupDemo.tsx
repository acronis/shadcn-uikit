import * as React from 'react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@acronis-platform/shadcn-uikit/react'
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Undo,
  Redo,
  Copy,
  Scissors,
  Clipboard,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from 'lucide-react'

export function ButtonGroupDemo() {
  const [selectedDay, setSelectedDay] = React.useState<string>('Mon')
  const [alignment, setAlignment] = React.useState<string>('left')
  const [textFormat, setTextFormat] = React.useState<string[]>([])
  const [zoom, setZoom] = React.useState(100)

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const toggleFormat = (format: string) => {
    setTextFormat((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    )
  }

  return (
    <section className="demo-section">
      <h2>Button Group Component</h2>
      <p className="demo-description">
        Group related buttons together with consistent styling and spacing. Supports horizontal and
        vertical orientations.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Button Group</h3>
          <p className="text-sm text-gray-600 mb-4">
            Simple horizontal button group with multiple buttons.
          </p>
          <ButtonGroup>
            <Button variant="outline">First</Button>
            <Button variant="outline">Second</Button>
            <Button variant="outline">Third</Button>
          </ButtonGroup>
        </div>

        <div className="demo-item">
          <h3>Day Selector (Default Size)</h3>
          <p className="text-sm text-gray-600 mb-4">
            Button group for selecting days of the week - Default 48px height.
          </p>
          <ButtonGroup className="border border-border/30 rounded bg-background p-1 h-12">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-2 text-sm font-semibold leading-6 transition-colors rounded ${
                  selectedDay === day
                    ? 'bg-primary text-primary-foreground'
                    : 'text-primary hover:bg-accent/5'
                }`}
              >
                {day}
              </button>
            ))}
          </ButtonGroup>
        </div>

        <div className="demo-item">
          <h3>Day Selector (Small Size)</h3>
          <p className="text-sm text-gray-600 mb-4">
            Button group for selecting days of the week - Small 32px height.
          </p>
          <ButtonGroup className="border border-border/30 rounded bg-background p-1 h-8">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-2 text-sm font-semibold leading-6 transition-colors rounded ${
                  selectedDay === day
                    ? 'bg-primary text-primary-foreground'
                    : 'text-primary hover:bg-accent/5'
                }`}
              >
                {day}
              </button>
            ))}
          </ButtonGroup>
        </div>

        <div className="demo-item">
          <h3>Text Alignment</h3>
          <p className="text-sm text-gray-600 mb-4">Button group for text alignment with icons.</p>
          <ButtonGroup>
            <Button
              variant={alignment === 'left' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setAlignment('left')}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={alignment === 'center' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setAlignment('center')}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant={alignment === 'right' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setAlignment('right')}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>

        <div className="demo-item">
          <h3>Text Formatting</h3>
          <p className="text-sm text-gray-600 mb-4">
            Multi-select button group for text formatting options.
          </p>
          <ButtonGroup>
            <Button
              variant={textFormat.includes('bold') ? 'default' : 'outline'}
              size="icon"
              onClick={() => toggleFormat('bold')}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant={textFormat.includes('italic') ? 'default' : 'outline'}
              size="icon"
              onClick={() => toggleFormat('italic')}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant={textFormat.includes('underline') ? 'default' : 'outline'}
              size="icon"
              onClick={() => toggleFormat('underline')}
            >
              <Underline className="h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>

        <div className="demo-item">
          <h3>With Separators</h3>
          <p className="text-sm text-gray-600 mb-4">
            Button group with visual separators between sections.
          </p>
          <ButtonGroup>
            <Button variant="outline" size="icon">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Redo className="h-4 w-4" />
            </Button>
            <ButtonGroupSeparator />
            <Button variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Scissors className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Clipboard className="h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>

        <div className="demo-item">
          <h3>With Text Labels</h3>
          <p className="text-sm text-gray-600 mb-4">
            Button group with text and icon combinations.
          </p>
          <ButtonGroup>
            <Button variant="outline">
              <List className="mr-2 h-4 w-4" />
              Bullet List
            </Button>
            <Button variant="outline">
              <ListOrdered className="mr-2 h-4 w-4" />
              Numbered List
            </Button>
          </ButtonGroup>
        </div>

        <div className="demo-item">
          <h3>Vertical Orientation</h3>
          <p className="text-sm text-gray-600 mb-4">
            Button group stacked vertically instead of horizontally.
          </p>
          <ButtonGroup orientation="vertical">
            <Button variant="outline">Top</Button>
            <Button variant="outline">Middle</Button>
            <Button variant="outline">Bottom</Button>
          </ButtonGroup>
        </div>

        <div className="demo-item">
          <h3>Media Controls</h3>
          <p className="text-sm text-gray-600 mb-4">Button group for media playback controls.</p>
          <ButtonGroup>
            <Button variant="outline" size="icon">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Play className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Pause className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <SkipForward className="h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>

        <div className="demo-item">
          <h3>Zoom Controls</h3>
          <p className="text-sm text-gray-600 mb-4">
            Button group with text display between buttons.
          </p>
          <ButtonGroup>
            <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(25, zoom - 25))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <ButtonGroupText className="min-w-[80px] justify-center">{zoom}%</ButtonGroupText>
            <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(200, zoom + 25))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>

        <div className="demo-item">
          <h3>Different Sizes</h3>
          <p className="text-sm text-gray-600 mb-4">Button groups with different button sizes.</p>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Small</p>
              <ButtonGroup>
                <Button variant="outline" size="sm">
                  Small
                </Button>
                <Button variant="outline" size="sm">
                  Buttons
                </Button>
                <Button variant="outline" size="sm">
                  Group
                </Button>
              </ButtonGroup>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Default</p>
              <ButtonGroup>
                <Button variant="outline">Default</Button>
                <Button variant="outline">Buttons</Button>
                <Button variant="outline">Group</Button>
              </ButtonGroup>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Large</p>
              <ButtonGroup>
                <Button variant="outline" size="lg">
                  Large
                </Button>
                <Button variant="outline" size="lg">
                  Buttons
                </Button>
                <Button variant="outline" size="lg">
                  Group
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Complex Toolbar</h3>
          <p className="text-sm text-gray-600 mb-4">
            Multiple button groups combined to create a rich toolbar.
          </p>
          <div className="flex flex-wrap gap-4">
            <ButtonGroup>
              <Button variant="outline" size="icon">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Redo className="h-4 w-4" />
              </Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button
                variant={textFormat.includes('bold') ? 'default' : 'outline'}
                size="icon"
                onClick={() => toggleFormat('bold')}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant={textFormat.includes('italic') ? 'default' : 'outline'}
                size="icon"
                onClick={() => toggleFormat('italic')}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant={textFormat.includes('underline') ? 'default' : 'outline'}
                size="icon"
                onClick={() => toggleFormat('underline')}
              >
                <Underline className="h-4 w-4" />
              </Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button
                variant={alignment === 'left' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setAlignment('left')}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant={alignment === 'center' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setAlignment('center')}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant={alignment === 'right' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setAlignment('right')}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button variant="outline">
                <List className="mr-2 h-4 w-4" />
                Bullet
              </Button>
              <Button variant="outline">
                <ListOrdered className="mr-2 h-4 w-4" />
                Numbered
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </section>
  )
}

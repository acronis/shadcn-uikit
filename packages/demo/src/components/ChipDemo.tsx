import { useState } from 'react'
import { Chip } from '@acronis-platform/shadcn-uikit/react'
import {
  User,
  Mail,
  Tag,
  Star,
  Heart,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Shield,
} from 'lucide-react'

export function ChipDemo() {
  const [chips, setChips] = useState([
    { id: 1, label: 'React' },
    { id: 2, label: 'TypeScript' },
    { id: 3, label: 'Tailwind CSS' },
  ])

  const [selectedChips, setSelectedChips] = useState([
    { id: 1, label: 'Design', icon: <Tag className="h-4 w-4" /> },
    { id: 2, label: 'Development', icon: <Zap className="h-4 w-4" /> },
    { id: 3, label: 'Testing', icon: <CheckCircle className="h-4 w-4" /> },
  ])

  const handleRemoveChip = (id: number) => {
    setChips(chips.filter((chip) => chip.id !== id))
  }

  const handleRemoveSelectedChip = (id: number) => {
    setSelectedChips(selectedChips.filter((chip) => chip.id !== id))
  }

  return (
    <section className="demo-section">
      <h2>Chip Component</h2>
      <p className="demo-description">
        Used to represent a list of selected items. Chips are compact elements that represent an
        input, attribute, or action.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Chips</h3>
          <p className="text-sm text-gray-600 mb-4">Simple chips with text only.</p>
          <div className="flex flex-wrap gap-2">
            <Chip>Default</Chip>
            <Chip>Primary</Chip>
            <Chip>Secondary</Chip>
            <Chip>Success</Chip>
            <Chip>Warning</Chip>
            <Chip>Error</Chip>
          </div>
        </div>

        <div className="demo-item">
          <h3>Chips with Icons</h3>
          <p className="text-sm text-gray-600 mb-4">Chips with leading icons.</p>
          <div className="flex flex-wrap gap-2">
            <Chip icon={<User className="h-4 w-4" />}>User</Chip>
            <Chip icon={<Mail className="h-4 w-4" />}>Email</Chip>
            <Chip icon={<Tag className="h-4 w-4" />}>Tag</Chip>
            <Chip icon={<Star className="h-4 w-4" />}>Favorite</Chip>
            <Chip icon={<Heart className="h-4 w-4" />}>Like</Chip>
            <Chip icon={<CheckCircle className="h-4 w-4" />}>Verified</Chip>
          </div>
        </div>

        <div className="demo-item">
          <h3>Removable Chips</h3>
          <p className="text-sm text-gray-600 mb-4">
            Chips with remove button. Click the X to remove.
          </p>
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <Chip key={chip.id} onRemove={() => handleRemoveChip(chip.id)}>
                {chip.label}
              </Chip>
            ))}
          </div>
          {chips.length === 0 && <p className="text-sm text-gray-500 mt-2">All chips removed!</p>}
        </div>

        <div className="demo-item">
          <h3>Chips with Icons and Remove</h3>
          <p className="text-sm text-gray-600 mb-4">
            Chips with both icon and remove functionality.
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedChips.map((chip) => (
              <Chip
                key={chip.id}
                icon={chip.icon}
                onRemove={() => handleRemoveSelectedChip(chip.id)}
              >
                {chip.label}
              </Chip>
            ))}
          </div>
          {selectedChips.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">All chips removed!</p>
          )}
        </div>

        <div className="demo-item">
          <h3>Read-only Chips</h3>
          <p className="text-sm text-gray-600 mb-4">
            Chips without remove functionality (read-only).
          </p>
          <div className="flex flex-wrap gap-2">
            <Chip>JavaScript</Chip>
            <Chip>Python</Chip>
            <Chip>Java</Chip>
            <Chip>C++</Chip>
            <Chip>Go</Chip>
            <Chip>Rust</Chip>
          </div>
        </div>

        <div className="demo-item">
          <h3>Status Chips</h3>
          <p className="text-sm text-gray-600 mb-4">Chips representing different statuses.</p>
          <div className="flex flex-wrap gap-2">
            <Chip icon={<CheckCircle className="h-4 w-4 text-green-600" />}>Active</Chip>
            <Chip icon={<AlertCircle className="h-4 w-4 text-yellow-600" />}>Pending</Chip>
            <Chip icon={<Info className="h-4 w-4 text-blue-600" />}>Info</Chip>
            <Chip icon={<Shield className="h-4 w-4 text-purple-600" />}>Protected</Chip>
          </div>
        </div>

        <div className="demo-item">
          <h3>Filter Chips</h3>
          <p className="text-sm text-gray-600 mb-4">
            Example of chips used as filters with remove functionality.
          </p>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                <Chip icon={<Tag className="h-4 w-4" />} onRemove={() => {}}>
                  Category: Electronics
                </Chip>
                <Chip icon={<Tag className="h-4 w-4" />} onRemove={() => {}}>
                  Price: $100-$500
                </Chip>
                <Chip icon={<Tag className="h-4 w-4" />} onRemove={() => {}}>
                  Brand: Samsung
                </Chip>
                <Chip icon={<Star className="h-4 w-4" />} onRemove={() => {}}>
                  Rating: 4+
                </Chip>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>User Tags</h3>
          <p className="text-sm text-gray-600 mb-4">Chips representing user tags or labels.</p>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">Project Tags:</p>
              <div className="flex flex-wrap gap-2">
                <Chip icon={<Tag className="h-4 w-4" />} onRemove={() => {}}>
                  Frontend
                </Chip>
                <Chip icon={<Tag className="h-4 w-4" />} onRemove={() => {}}>
                  Backend
                </Chip>
                <Chip icon={<Tag className="h-4 w-4" />} onRemove={() => {}}>
                  Database
                </Chip>
                <Chip icon={<Tag className="h-4 w-4" />} onRemove={() => {}}>
                  API
                </Chip>
                <Chip icon={<Tag className="h-4 w-4" />} onRemove={() => {}}>
                  Testing
                </Chip>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Contact Chips</h3>
          <p className="text-sm text-gray-600 mb-4">Chips representing contacts or team members.</p>
          <div className="flex flex-wrap gap-2">
            <Chip icon={<User className="h-4 w-4" />} onRemove={() => {}}>
              John Doe
            </Chip>
            <Chip icon={<User className="h-4 w-4" />} onRemove={() => {}}>
              Jane Smith
            </Chip>
            <Chip icon={<User className="h-4 w-4" />} onRemove={() => {}}>
              Bob Johnson
            </Chip>
            <Chip icon={<User className="h-4 w-4" />} onRemove={() => {}}>
              Alice Williams
            </Chip>
          </div>
        </div>

        <div className="demo-item">
          <h3>Email Recipients</h3>
          <p className="text-sm text-gray-600 mb-4">Example of chips used in an email composer.</p>
          <div className="space-y-3">
            <div className="rounded-lg border p-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <label className="text-sm font-medium text-gray-700 w-12 pt-1">To:</label>
                  <div className="flex flex-1 flex-wrap gap-2">
                    <Chip icon={<Mail className="h-4 w-4" />} onRemove={() => {}}>
                      john@example.com
                    </Chip>
                    <Chip icon={<Mail className="h-4 w-4" />} onRemove={() => {}}>
                      jane@example.com
                    </Chip>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <label className="text-sm font-medium text-gray-700 w-12 pt-1">Cc:</label>
                  <div className="flex flex-1 flex-wrap gap-2">
                    <Chip icon={<Mail className="h-4 w-4" />} onRemove={() => {}}>
                      bob@example.com
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Skill Tags</h3>
          <p className="text-sm text-gray-600 mb-4">
            Read-only chips representing skills or technologies.
          </p>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">Technical Skills:</p>
              <div className="flex flex-wrap gap-2">
                <Chip>React</Chip>
                <Chip>TypeScript</Chip>
                <Chip>Node.js</Chip>
                <Chip>PostgreSQL</Chip>
                <Chip>Docker</Chip>
                <Chip>Kubernetes</Chip>
                <Chip>AWS</Chip>
                <Chip>GraphQL</Chip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

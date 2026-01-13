import { useState } from 'react'
import { Input } from '@acronis-platform/shadcn-uikit/react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import { Mail, Lock, Search, User, Phone, CreditCard, Calendar } from 'lucide-react'

export function InputDemo() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [search, setSearch] = useState('')

  return (
    <section className="demo-section">
      <h2>Input Component</h2>
      <p className="demo-description">
        Used to enter data when the expected input is short. In the case of multiline input, need to
        use the Textarea component.
      </p>

      <div className="demo-grid">
        <div className="demo-item">
          <h3>Basic Input</h3>
          <div className="space-y-4">
            <Input placeholder="Enter text..." />
            <Input placeholder="With default value" defaultValue="Default value" />
          </div>
        </div>

        <div className="demo-item">
          <h3>Input Types</h3>
          <div className="space-y-4">
            <Input type="text" placeholder="Text input" />
            <Input type="email" placeholder="Email input" />
            <Input type="password" placeholder="Password input" />
            <Input type="number" placeholder="Number input" />
            <Input type="tel" placeholder="Phone input" />
            <Input type="url" placeholder="URL input" />
          </div>
        </div>

        <div className="demo-item">
          <h3>With Labels</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[#243143]">
                Email
              </label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[#243143]">
                Password
              </label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>With Icons</h3>
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input className="pl-10" type="email" placeholder="Email" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input className="pl-10" type="password" placeholder="Password" />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input className="pl-10" type="search" placeholder="Search..." />
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Disabled State</h3>
          <div className="space-y-4">
            <Input placeholder="Disabled input" disabled />
            <Input placeholder="Disabled with value" defaultValue="Cannot edit this" disabled />
          </div>
        </div>

        <div className="demo-item">
          <h3>Required Fields</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="required-name" className="text-sm font-medium text-[#243143]">
                Name <span className="text-red-500">*</span>
              </label>
              <Input id="required-name" type="text" placeholder="Enter your name" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="required-email" className="text-sm font-medium text-[#243143]">
                Email <span className="text-red-500">*</span>
              </label>
              <Input id="required-email" type="email" placeholder="Enter your email" required />
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>With Helper Text</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-[#243143]">
                Username
              </label>
              <Input id="username" type="text" placeholder="Enter username" />
              <p className="text-xs text-gray-500">Choose a unique username</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-[#243143]">
                Phone Number
              </label>
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
              <p className="text-xs text-gray-500">Include country code</p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Error State</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="error-email" className="text-sm font-medium text-[#243143]">
                Email
              </label>
              <Input
                id="error-email"
                type="email"
                placeholder="Enter your email"
                className="border-red-500 focus-visible:border-red-500"
              />
              <p className="text-xs text-red-500">Please enter a valid email address</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="error-password" className="text-sm font-medium text-[#243143]">
                Password
              </label>
              <Input
                id="error-password"
                type="password"
                placeholder="Enter your password"
                className="border-red-500 focus-visible:border-red-500"
              />
              <p className="text-xs text-red-500">Password must be at least 8 characters</p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Different Sizes</h3>
          <div className="space-y-4">
            <Input className="h-10 text-sm" placeholder="Small input (40px)" />
            <Input placeholder="Default input (48px)" />
            <Input className="h-14 text-base" placeholder="Large input (56px)" />
          </div>
        </div>

        <div className="demo-item">
          <h3>Form Example</h3>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              alert(`Form submitted!\nEmail: ${email}\nPassword: ${password}`)
            }}
          >
            <div className="space-y-2">
              <label htmlFor="form-email" className="text-sm font-medium text-[#243143]">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="form-email"
                  className="pl-10"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="form-password" className="text-sm font-medium text-[#243143]">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="form-password"
                  className="pl-10"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </div>

        <div className="demo-item">
          <h3>Search Input</h3>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                className="pl-10"
                type="search"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {search && (
              <p className="text-sm text-gray-600">
                Searching for: <strong>{search}</strong>
              </p>
            )}
          </div>
        </div>

        <div className="demo-item">
          <h3>Various Input Types</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#243143]">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input className="pl-10" type="text" placeholder="John Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#243143]">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input className="pl-10" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#243143]">Credit Card</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input className="pl-10" type="text" placeholder="1234 5678 9012 3456" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#243143]">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input className="pl-10" type="date" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { Input } from '@acronis-platform/shadcn-uikit/react'
import { Eye, EyeOff } from 'lucide-react'

export function PasswordInputDemo() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [showPassword3, setShowPassword3] = useState(false)
  const [passwordValue, setPasswordValue] = useState('MyP@ssw0rd')

  return (
    <section className="demo-section">
      <h2>Password Input Component</h2>
      <p className="demo-description">
        Password input component with visibility toggle, error states, hint messages, and disabled states.
        Based on Acronis Design System specifications from Figma.
      </p>

      <div className="demo-grid">
        <div className="demo-item">
          <h3>Password Input - Default State</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Empty password input with placeholder and visibility toggle button.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="pwd-default" className="text-xs font-medium text-[rgba(36,49,67,0.7)]">
                Password
              </label>
              <div className="relative">
                <Input
                  id="pwd-default"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="pr-10 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2668C5] hover:text-[#1a4d8f] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Password Input - Filled State</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Password input with value and floating label inside the input field.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword2 ? 'text' : 'password'}
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  className="pr-10 h-12 pt-5 pb-1"
                />
                <label className="absolute left-4 top-1 text-xs font-medium text-[rgba(36,49,67,0.7)] pointer-events-none">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2668C5] hover:text-[#1a4d8f] transition-colors"
                  aria-label={showPassword2 ? 'Hide password' : 'Show password'}
                >
                  {showPassword2 ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Password Input - With Hint</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Password input with hint message displayed below the input field.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword3 ? 'text' : 'password'}
                  placeholder="Password"
                  className="pr-10 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword3(!showPassword3)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2668C5] hover:text-[#1a4d8f] transition-colors"
                  aria-label={showPassword3 ? 'Hide password' : 'Show password'}
                >
                  {showPassword3 ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs font-medium text-[rgba(36,49,67,0.7)] px-0 py-1">
                Hint message
              </p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Password Input - Error State</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Password input showing error state with red border, icon, and error message.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Password"
                  className="pr-10 h-12 border-[#EA3939] focus-visible:ring-[#EA3939]"
                  aria-invalid="true"
                  aria-describedby="pwd-error-1"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EA3939]"
                  aria-label="Show password"
                >
                  <EyeOff className="h-4 w-4" />
                </button>
              </div>
              <p id="pwd-error-1" className="text-xs font-medium text-[#EA3939] px-0 py-1">
                Error message
              </p>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="password"
                  value="••••••••••"
                  readOnly
                  className="pr-10 h-12 pt-5 pb-1 border-[#EA3939] focus-visible:ring-[#EA3939]"
                  aria-invalid="true"
                  aria-describedby="pwd-error-2"
                />
                <label className="absolute left-4 top-1 text-xs font-medium text-[rgba(36,49,67,0.7)] pointer-events-none">
                  Password
                </label>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EA3939]"
                  aria-label="Show password"
                >
                  <EyeOff className="h-4 w-4" />
                </button>
              </div>
              <p id="pwd-error-2" className="text-xs font-medium text-[#EA3939] px-0 py-1">
                Error message
              </p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Password Input - Disabled State</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Password input in disabled state with reduced opacity and non-interactive elements.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Password"
                  disabled
                  className="pr-10 h-12 bg-[rgba(38,104,197,0.05)]"
                />
                <button
                  type="button"
                  disabled
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(38,104,197,0.3)] cursor-not-allowed"
                  aria-label="Show password"
                >
                  <EyeOff className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="password"
                  value="••••••••••"
                  disabled
                  readOnly
                  className="pr-10 h-12 pt-5 pb-1 bg-[rgba(38,104,197,0.05)]"
                />
                <label className="absolute left-4 top-1 text-xs font-medium text-[rgba(36,49,67,0.7)] pointer-events-none">
                  Password
                </label>
                <button
                  type="button"
                  disabled
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(38,104,197,0.3)] cursor-not-allowed"
                  aria-label="Show password"
                >
                  <EyeOff className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs font-medium text-[rgba(36,49,67,0.7)] px-0 py-1">
                Hint message
              </p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Design Specifications</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Key design tokens and specifications from Figma.
          </p>
          <div className="space-y-3 text-sm">
            <div>
              <strong className="font-semibold">Height:</strong> 48px (fixed)
            </div>
            <div>
              <strong className="font-semibold">Padding:</strong> 16px horizontal
            </div>
            <div>
              <strong className="font-semibold">Border Radius:</strong> 4px
            </div>
            <div>
              <strong className="font-semibold">Icon Size:</strong> 16×16px
            </div>
            <div>
              <strong className="font-semibold">Border Default:</strong> rgba(38, 104, 197, 0.3)
            </div>
            <div>
              <strong className="font-semibold">Border Error:</strong> #EA3939
            </div>
            <div>
              <strong className="font-semibold">Icon Color:</strong> #2668C5 (default), #EA3939 (error)
            </div>
            <div>
              <strong className="font-semibold">Typography:</strong>
              <ul className="ml-4 mt-1 space-y-1">
                <li>Label: Inter Medium, 12px, 16px line-height</li>
                <li>Value: Inter Regular, 14px, 24px line-height</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

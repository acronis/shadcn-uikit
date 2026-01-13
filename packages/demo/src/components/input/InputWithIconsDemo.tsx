import { Input } from '@acronis-platform/shadcn-uikit/react'
import { Mail, Lock, Search, User, Phone, CreditCard, Calendar } from 'lucide-react'

export function InputWithIconsDemo() {
  return (
    <section className="demo-section">
      <h2>Input with Icons</h2>
      <p className="demo-description">
        Input fields with icon decorations for visual context.
      </p>

      <div className="demo-grid">
        <div className="demo-item">
          <h3>Icon Inputs</h3>
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
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input className="pl-10" type="text" placeholder="Full Name" />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input className="pl-10" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input className="pl-10" type="text" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input className="pl-10" type="date" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

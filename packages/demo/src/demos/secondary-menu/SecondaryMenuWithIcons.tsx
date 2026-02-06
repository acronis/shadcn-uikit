import { useState } from 'react'
import {
  SecondaryMenu,
  SecondaryMenuContent,
  SecondaryMenuGroup,
  SecondaryMenuItem,
} from '@acronis-platform/shadcn-uikit/react'
import { Home, Settings, User, Bell, Mail } from 'lucide-react'

export function SecondaryMenuWithIcons() {
  const [activeItem, setActiveItem] = useState('home')

  return (
    <div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
      <SecondaryMenu>
        <SecondaryMenuContent>
          <SecondaryMenuGroup>
            <SecondaryMenuItem
              active={activeItem === 'home'}
              onClick={() => setActiveItem('home')}
              icon={<Home className="h-4 w-4" />}
            >
              Home
            </SecondaryMenuItem>
            <SecondaryMenuItem
              active={activeItem === 'profile'}
              onClick={() => setActiveItem('profile')}
              icon={<User className="h-4 w-4" />}
            >
              Profile
            </SecondaryMenuItem>
            <SecondaryMenuItem
              active={activeItem === 'notifications'}
              onClick={() => setActiveItem('notifications')}
              icon={<Bell className="h-4 w-4" />}
            >
              Notifications
            </SecondaryMenuItem>
            <SecondaryMenuItem
              active={activeItem === 'messages'}
              onClick={() => setActiveItem('messages')}
              icon={<Mail className="h-4 w-4" />}
            >
              Messages
            </SecondaryMenuItem>
            <SecondaryMenuItem
              active={activeItem === 'config'}
              onClick={() => setActiveItem('config')}
              icon={<Settings className="h-4 w-4" />}
            >
              Configuration
            </SecondaryMenuItem>
          </SecondaryMenuGroup>
        </SecondaryMenuContent>
      </SecondaryMenu>
    </div>
  )
}

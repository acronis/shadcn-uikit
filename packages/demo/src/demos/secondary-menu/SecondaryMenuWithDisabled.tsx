import { useState } from 'react'
import {
  SecondaryMenu,
  SecondaryMenuContent,
  SecondaryMenuGroup,
  SecondaryMenuItem,
} from '@acronis-platform/shadcn-uikit/react'
import { FileText, Image, Video, Music } from 'lucide-react'

export function SecondaryMenuWithDisabled() {
  const [activeItem, setActiveItem] = useState('opt1')

  return (
    <div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
      <SecondaryMenu>
        <SecondaryMenuContent>
          <SecondaryMenuGroup title="Options">
            <SecondaryMenuItem
              active={activeItem === 'opt1'}
              onClick={() => setActiveItem('opt1')}
              icon={<FileText className="h-4 w-4" />}
            >
              Available Option
            </SecondaryMenuItem>
            <SecondaryMenuItem disabled icon={<Image className="h-4 w-4" />}>
              Disabled Option
            </SecondaryMenuItem>
            <SecondaryMenuItem
              active={activeItem === 'opt3'}
              onClick={() => setActiveItem('opt3')}
              icon={<Video className="h-4 w-4" />}
            >
              Another Available
            </SecondaryMenuItem>
            <SecondaryMenuItem disabled icon={<Music className="h-4 w-4" />}>
              Coming Soon
            </SecondaryMenuItem>
          </SecondaryMenuGroup>
        </SecondaryMenuContent>
      </SecondaryMenu>
    </div>
  )
}

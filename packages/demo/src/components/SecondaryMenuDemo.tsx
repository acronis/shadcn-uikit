import { useState } from 'react'
import {
  SecondaryMenu,
  SecondaryMenuContent,
  SecondaryMenuGroup,
  SecondaryMenuItem,
  SecondaryMenuHeader,
  SecondaryMenuFooter,
} from '@acronis-platform/shadcn-uikit/react'
import {
  Home,
  Settings,
  User,
  Bell,
  Mail,
  FileText,
  Image,
  Video,
  Music,
  Download,
  Upload,
  Trash,
  Edit,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@acronis-platform/shadcn-uikit/react'

export function SecondaryMenuDemo() {
  const [activeItem, setActiveItem] = useState('dashboard')

  return (
    <section className="demo-section">
      <h2>Secondary Menu Component</h2>
      <p className="demo-description">
        A tertiary navigation menu component designed to work alongside the main sidebar. Can be used
        for sub-navigation, filtering, or organizing content into categories. Based on Acronis Design
        System specifications from Figma.
      </p>

      <div className="demo-grid">
        <div className="demo-item">
          <h3>Basic Menu</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Simple menu with basic items and active state.
          </p>
          <div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <SecondaryMenu>
              <SecondaryMenuContent>
                <SecondaryMenuGroup>
                  <SecondaryMenuItem
                    active={activeItem === 'dashboard'}
                    onClick={() => setActiveItem('dashboard')}
                  >
                    Dashboard
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'analytics'}
                    onClick={() => setActiveItem('analytics')}
                  >
                    Analytics
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'reports'}
                    onClick={() => setActiveItem('reports')}
                  >
                    Reports
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'settings'}
                    onClick={() => setActiveItem('settings')}
                  >
                    Settings
                  </SecondaryMenuItem>
                </SecondaryMenuGroup>
              </SecondaryMenuContent>
            </SecondaryMenu>
          </div>
        </div>

        <div className="demo-item">
          <h3>Menu with Icons</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Menu items with left-aligned icons for visual context.
          </p>
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
        </div>

        <div className="demo-item">
          <h3>Menu with Groups</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Organized menu with titled groups and dividers.
          </p>
          <div className="border rounded-lg overflow-hidden" style={{ height: '500px' }}>
            <SecondaryMenu>
              <SecondaryMenuContent>
                <SecondaryMenuGroup title="Content">
                  <SecondaryMenuItem
                    active={activeItem === 'documents'}
                    onClick={() => setActiveItem('documents')}
                    icon={<FileText className="h-4 w-4" />}
                  >
                    Documents
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'images'}
                    onClick={() => setActiveItem('images')}
                    icon={<Image className="h-4 w-4" />}
                  >
                    Images
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'videos'}
                    onClick={() => setActiveItem('videos')}
                    icon={<Video className="h-4 w-4" />}
                  >
                    Videos
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'audio'}
                    onClick={() => setActiveItem('audio')}
                    icon={<Music className="h-4 w-4" />}
                  >
                    Audio Files
                  </SecondaryMenuItem>
                </SecondaryMenuGroup>

                <SecondaryMenuGroup title="Actions">
                  <SecondaryMenuItem
                    active={activeItem === 'upload'}
                    onClick={() => setActiveItem('upload')}
                    icon={<Upload className="h-4 w-4" />}
                  >
                    Upload
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'download'}
                    onClick={() => setActiveItem('download')}
                    icon={<Download className="h-4 w-4" />}
                  >
                    Download
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'edit'}
                    onClick={() => setActiveItem('edit')}
                    icon={<Edit className="h-4 w-4" />}
                  >
                    Edit
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'delete'}
                    onClick={() => setActiveItem('delete')}
                    icon={<Trash className="h-4 w-4" />}
                  >
                    Delete
                  </SecondaryMenuItem>
                </SecondaryMenuGroup>
              </SecondaryMenuContent>
            </SecondaryMenu>
          </div>
        </div>

        <div className="demo-item">
          <h3>Menu with Tags</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Menu items with tags to highlight new or important features.
          </p>
          <div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <SecondaryMenu>
              <SecondaryMenuContent>
                <SecondaryMenuGroup title="Features">
                  <SecondaryMenuItem
                    active={activeItem === 'feature1'}
                    onClick={() => setActiveItem('feature1')}
                  >
                    Dashboard
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'feature2'}
                    onClick={() => setActiveItem('feature2')}
                    tag="NEW"
                  >
                    Analytics
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'feature3'}
                    onClick={() => setActiveItem('feature3')}
                    tag="BETA"
                  >
                    AI Assistant
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'feature4'}
                    onClick={() => setActiveItem('feature4')}
                  >
                    Reports
                  </SecondaryMenuItem>
                </SecondaryMenuGroup>
              </SecondaryMenuContent>
            </SecondaryMenu>
          </div>
        </div>

        <div className="demo-item">
          <h3>Menu with Right Icons</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Menu items with right-aligned icons for navigation indicators.
          </p>
          <div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <SecondaryMenu>
              <SecondaryMenuContent>
                <SecondaryMenuGroup title="Navigation">
                  <SecondaryMenuItem
                    active={activeItem === 'nav1'}
                    onClick={() => setActiveItem('nav1')}
                    icon={<ChevronRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    General Settings
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'nav2'}
                    onClick={() => setActiveItem('nav2')}
                    icon={<ChevronRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    Privacy & Security
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'nav3'}
                    onClick={() => setActiveItem('nav3')}
                    icon={<ChevronRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    Notifications
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'nav4'}
                    onClick={() => setActiveItem('nav4')}
                    icon={<ChevronRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    Appearance
                  </SecondaryMenuItem>
                </SecondaryMenuGroup>
              </SecondaryMenuContent>
            </SecondaryMenu>
          </div>
        </div>

        <div className="demo-item">
          <h3>Menu with Disabled Items</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Menu with some items in disabled state.
          </p>
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
        </div>

        <div className="demo-item">
          <h3>Complete Menu with Header & Footer</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Full-featured menu with header, content groups, and footer.
          </p>
          <div className="border rounded-lg overflow-hidden" style={{ height: '500px' }}>
            <SecondaryMenu>
              <SecondaryMenuHeader>
                <h3 className="text-sm font-semibold text-[#243143]">File Manager</h3>
              </SecondaryMenuHeader>

              <SecondaryMenuContent>
                <SecondaryMenuGroup title="Recent">
                  <SecondaryMenuItem
                    active={activeItem === 'recent1'}
                    onClick={() => setActiveItem('recent1')}
                    icon={<FileText className="h-4 w-4" />}
                  >
                    Project Proposal
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'recent2'}
                    onClick={() => setActiveItem('recent2')}
                    icon={<Image className="h-4 w-4" />}
                  >
                    Design Mockups
                  </SecondaryMenuItem>
                </SecondaryMenuGroup>

                <SecondaryMenuGroup title="Folders">
                  <SecondaryMenuItem
                    active={activeItem === 'folder1'}
                    onClick={() => setActiveItem('folder1')}
                    icon={<FileText className="h-4 w-4" />}
                    iconPosition="left"
                  >
                    Documents
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'folder2'}
                    onClick={() => setActiveItem('folder2')}
                    icon={<Image className="h-4 w-4" />}
                  >
                    Media
                  </SecondaryMenuItem>
                  <SecondaryMenuItem
                    active={activeItem === 'folder3'}
                    onClick={() => setActiveItem('folder3')}
                    icon={<Download className="h-4 w-4" />}
                  >
                    Downloads
                  </SecondaryMenuItem>
                </SecondaryMenuGroup>
              </SecondaryMenuContent>

              <SecondaryMenuFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
              </SecondaryMenuFooter>
            </SecondaryMenu>
          </div>
        </div>

        <div className="demo-item">
          <h3>Design Specifications</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Key design tokens and specifications from Figma.
          </p>
          <div className="space-y-3 text-sm">
            <div>
              <strong className="font-semibold">Width:</strong> 240px (fixed)
            </div>
            <div>
              <strong className="font-semibold">Padding:</strong> 24px horizontal, 12px vertical
            </div>
            <div>
              <strong className="font-semibold">Title Padding:</strong> 24px horizontal, 16px top, 8px
              bottom
            </div>
            <div>
              <strong className="font-semibold">Gap:</strong> 16px between icon and text
            </div>
            <div>
              <strong className="font-semibold">Icon Size:</strong> 16×16px
            </div>
            <div>
              <strong className="font-semibold">Active Background:</strong> rgba(38, 104, 197, 0.05)
            </div>
            <div>
              <strong className="font-semibold">Divider:</strong> rgba(38, 104, 197, 0.1)
            </div>
            <div>
              <strong className="font-semibold">Typography:</strong>
              <ul className="ml-4 mt-1 space-y-1">
                <li>Menu Item: Inter Semi Bold, 14px, 24px line-height</li>
                <li>Title: Inter Bold, 11px, 16px line-height, uppercase</li>
              </ul>
            </div>
            <div>
              <strong className="font-semibold">Colors:</strong>
              <ul className="ml-4 mt-1 space-y-1">
                <li>Default: #2668C5 (Technical/fixed-link)</li>
                <li>Active: #243143 (Text/fixed-primary)</li>
                <li>Disabled: rgba(36, 49, 67, 0.7)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

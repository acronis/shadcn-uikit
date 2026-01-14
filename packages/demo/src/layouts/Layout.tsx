import { useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
} from '@acronis-platform/shadcn-uikit/react'
import { ScrollArea } from '@acronis-platform/shadcn-uikit/react'
import {
  LayoutDashboard,
  Bell,
  Layers,
  MousePointer,
  Menu,
  Square,
  Type,
  FileText,
  LayoutGrid,
  MessageSquare,
  Inbox,
  Tag,
  Bookmark,
  List,
  Calendar,
  CalendarDays,
  Navigation,
  PanelTop,
  Loader2,
  Circle,
  ChevronDown,
  ToggleLeft,
  RectangleHorizontal,
  RectangleVertical,
  Minus,
  Table as TableIcon,
  Award,
  CheckSquare,
  ClipboardList,
  BellRing,
  Network,
  Palette,
  Image,
  Lock,
} from 'lucide-react'
import { TokenSelector } from '@/components/playground/TokenSelector.tsx'
import { ThemeSwitcher } from '@/components/playground/ThemeSwitcher.tsx'
import { usePlaygroundStore } from '@/store/playground/playgroundStore.ts'
import { applyTokenSet } from '@/lib/playground/cssVariables.ts'
import { ThemeMode } from '@/types/playground/index.ts'

const navigationItems = [
  {
    title: 'Design System',
    items: [
      { id: 'design-tokens', title: 'Design Tokens', icon: Palette, path: '/design-tokens' },
      { id: 'icons', title: 'Icons', icon: Image, path: '/icons' },
    ],
  },
  {
    title: 'Components',
    items: [
      { id: 'alert', title: 'Alert', icon: Bell, path: '/alert' },
      { id: 'badge', title: 'Badge', icon: Award, path: '/badge' },
      { id: 'breadcrumb', title: 'Breadcrumb', icon: Layers, path: '/breadcrumb' },
      { id: 'button', title: 'Button', icon: Square, path: '/button' },
      { id: 'button-group', title: 'Button Group', icon: Square, path: '/button-group' },
      { id: 'calendar', title: 'Calendar', icon: CalendarDays, path: '/calendar' },
      { id: 'carousel', title: 'Carousel', icon: RectangleHorizontal, path: '/carousel' },
      { id: 'card', title: 'Card', icon: RectangleVertical, path: '/card' },
      { id: 'checkbox', title: 'Checkbox', icon: CheckSquare, path: '/checkbox' },
      { id: 'chip', title: 'Chip', icon: Tag, path: '/chip' },
      { id: 'combobox', title: 'Combobox', icon: List, path: '/combobox' },
      { id: 'container', title: 'Container', icon: List, path: '/container' },
      { id: 'datepicker', title: 'DatePicker', icon: Calendar, path: '/datepicker' },
      { id: 'dialog', title: 'Dialog', icon: MessageSquare, path: '/dialog' },
      { id: 'dropdown', title: 'Dropdown Menu', icon: Menu, path: '/dropdown-menu' },
      { id: 'empty', title: 'Empty State', icon: Inbox, path: '/empty' },
      { id: 'filter', title: 'Filter', icon: Layers, path: '/filter' },
      { id: 'form', title: 'Form', icon: ClipboardList, path: '/form' },
      { id: 'input', title: 'Input', icon: Type, path: '/input' },
      {
        id: 'navigation-menu',
        title: 'Navigation Menu',
        icon: Navigation,
        path: '/navigation-menu',
      },
      { id: 'pagination', title: 'Pagination', icon: LayoutGrid, path: '/pagination' },
      { id: 'password-input', title: 'Password Input', icon: Lock, path: '/password-input' },
      { id: 'secondary-menu', title: 'Secondary Menu', icon: Menu, path: '/secondary-menu' },
      { id: 'popover', title: 'Popover', icon: PanelTop, path: '/popover' },
      { id: 'progress', title: 'Progress', icon: Loader2, path: '/progress' },
      { id: 'radio-group', title: 'Radio Group', icon: Circle, path: '/radio-group' },
      { id: 'select', title: 'Select', icon: ChevronDown, path: '/select' },
      { id: 'separator', title: 'Separator', icon: Minus, path: '/separator' },
      { id: 'sidebar', title: 'Sidebar', icon: LayoutGrid, path: '/sidebar' },
      { id: 'sonner', title: 'Sonner (Toast)', icon: BellRing, path: '/sonner' },
      { id: 'spinner', title: 'Spinner (Loading)', icon: Loader2, path: '/spinner' },
      { id: 'switch', title: 'Switch', icon: ToggleLeft, path: '/switch' },
      { id: 'table', title: 'Table', icon: TableIcon, path: '/table' },
      { id: 'data-table', title: 'Data Table', icon: TableIcon, path: '/data-table' },
      { id: 'tabs', title: 'Tabs', icon: RectangleHorizontal, path: '/tabs' },
      { id: 'tag', title: 'Tag', icon: Bookmark, path: '/tag' },
      { id: 'textarea', title: 'Textarea', icon: FileText, path: '/textarea' },
      { id: 'tooltip', title: 'Tooltip', icon: MousePointer, path: '/tooltip' },
      { id: 'tree', title: 'Tree', icon: Network, path: '/tree' },
    ],
  },
]

export function Layout() {
  const location = useLocation()
  const { theme, activeTokenSetId, tokenSets, customTokenSet } = usePlaygroundStore()

  useEffect(() => {
    const activeTokenSet = customTokenSet || tokenSets[activeTokenSetId]
    if (activeTokenSet) {
      const effectiveTheme =
        theme.mode === ThemeMode.SYSTEM
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? ThemeMode.DARK
            : ThemeMode.LIGHT
          : theme.mode
      applyTokenSet(activeTokenSet, effectiveTheme)
    }
  }, [theme, activeTokenSetId, tokenSets, customTokenSet])

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon">
          <SidebarHeader className="border-b border-sidebar-border">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-3 hover:bg-sidebar-accent/50 transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
                <LayoutDashboard className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Acronis UIKit</span>
                <span className="text-xs text-sidebar-foreground/70">
                  Component Library
                </span>
              </div>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <ScrollArea className="h-full">
              {navigationItems.map((section) => (
                <SidebarGroup key={section.title}>
                  <SidebarGroupLabel className="text-xs font-bold uppercase tracking-wider text-sidebar-foreground/70">
                    {section.title}
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {section.items.map((item) => (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            asChild
                            isActive={location.pathname === item.path}
                            tooltip={item.title}
                          >
                            <Link to={item.path}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </ScrollArea>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background text-foreground px-6">
            <h1 className="text-xl font-semibold">Shadcn UIKit - React Demo</h1>
            <div className="flex items-center gap-3">
              <TokenSelector />
              <ThemeSwitcher showLabel />
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

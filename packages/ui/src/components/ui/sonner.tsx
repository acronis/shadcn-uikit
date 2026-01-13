import {
  SuccessIcon,
  InfoIcon,
  WarningIcon,
  // CriticalIcon,
  DangerIcon,
} from '@/components/icons/auto-generated'
import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <SuccessIcon className="h-4 w-4 text-success" />,
        info: <InfoIcon className="h-4 w-4 text-info" />,
        warning: <WarningIcon className="h-4 w-4 text-warning" />,
        error: <DangerIcon className="h-4 w-4 text-destructive" />,
        loading: <InfoIcon className="h-4 w-4 text-info animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:rounded-[4px] group-[.toaster]:shadow-[var(--toast-shadow)] group-[.toaster]:w-[384px]',
          description: 'group-[.toast]:text-foreground group-[.toast]:text-sm',
          actionButton:
            'group-[.toast]:bg-transparent group-[.toast]:text-primary group-[.toast]:hover:text-primary/90 group-[.toast]:font-semibold group-[.toast]:border-0',
          cancelButton:
            'group-[.toast]:bg-transparent group-[.toast]:text-foreground group-[.toast]:hover:bg-muted',
          success:
            'group-[.toaster]:bg-success-light group-[.toaster]:border-success',
          info: 'group-[.toaster]:bg-info-light group-[.toaster]:border-info',
          warning:
            'group-[.toaster]:bg-warning-light group-[.toaster]:border-warning',
          error:
            'group-[.toaster]:bg-destructive-light group-[.toaster]:border-destructive',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

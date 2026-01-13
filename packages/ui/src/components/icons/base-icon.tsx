import React from 'react'
import { cn } from '@/lib/utils'

interface BaseIconProps extends React.SVGProps<SVGSVGElement> {
  children: React.ReactNode
  className?: string
}

/**
 * Base icon wrapper component that provides consistent sizing and styling
 */
export function BaseIcon({ children, className, ...props }: BaseIconProps) {
  return (
    <svg
      className={cn('size-4 shrink-0', className)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  )
}

/**
 * Alternative: Icon wrapper that accepts an SVG path
 */
interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'path'> {
  path: string | React.ReactNode
  className?: string
  viewBox?: string
}

export function Icon({ path, className, viewBox = '0 0 16 16', ...props }: IconProps) {
  return (
    <svg
      className={cn('size-4 shrink-0', className)}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {typeof path === 'string' ? <path d={path} /> : path}
    </svg>
  )
}

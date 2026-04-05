import React from 'react'
import { cn } from '@/lib/utils'

interface BaseIconProps extends React.SVGProps<SVGSVGElement> {
  children: React.ReactNode
  className?: string
  size?: number
}

/**
 * Base icon wrapper component that provides consistent sizing and styling
 */
export function BaseIcon({ children, className, size, viewBox = '0 0 16 16', ...props }: BaseIconProps) {
  return (
    <svg
      className={cn(!size && 'size-4', 'shrink-0', className)}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...(size ? { width: size, height: size, ...props } : props)}
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
  size?: number
}

export function Icon({ path, className, size, viewBox = '0 0 16 16', ...props }: IconProps) {
  return (
    <svg
      className={cn(!size && 'size-4', 'shrink-0', className)}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...(size ? { width: size, height: size, ...props } : props)}
    >
      {typeof path === 'string' ? <path d={path} /> : path}
    </svg>
  )
}

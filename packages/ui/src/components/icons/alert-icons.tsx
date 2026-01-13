import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function InfoIcon({ className = 'size-4', ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="8" fill="#408BEA" />
      <rect x="7" y="4" width="2" height="8" fill="#243143" />
    </svg>
  )
}

export function SuccessIcon({ className = 'size-4', ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="8" fill="#9BC225" />
      <path d="M5 8L7 10L11 6" stroke="#243143" strokeWidth="2" fill="none" />
    </svg>
  )
}

export function WarningIcon({ className = 'size-4', ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M8 1L15 15H1L8 1Z" fill="#FFC107" />
      <rect x="7" y="6" width="2" height="5" fill="#243143" />
    </svg>
  )
}

export function CriticalIcon({ className = 'size-4', ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="8" fill="#FF810D" />
      <rect x="7" y="4" width="2" height="8" fill="#243143" />
    </svg>
  )
}

export function DangerIcon({ className = 'size-4', ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="8" fill="#EA3939" />
      <path d="M5 5L11 11M11 5L5 11" stroke="#243143" strokeWidth="2" />
    </svg>
  )
}

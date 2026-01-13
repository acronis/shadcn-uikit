import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/react/components/button/button.tsx'

describe('Button', () => {
  it('renders properly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    const { container } = render(<Button variant="primary">Primary</Button>)
    const button = container.querySelector('.av-button--primary')
    expect(button).toBeInTheDocument()
  })

  it('applies size classes', () => {
    const { container } = render(<Button size="lg">Large</Button>)
    const button = container.querySelector('.av-button--lg')
    expect(button).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    await userEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not trigger click when disabled', async () => {
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    )

    await userEvent.click(screen.getByText('Click me'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies disabled state', () => {
    const { container } = render(<Button disabled>Disabled</Button>)
    const button = container.querySelector('.is-disabled')
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('applies loading state', () => {
    const { container } = render(<Button loading>Loading</Button>)
    const button = container.querySelector('.is-loading')
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})

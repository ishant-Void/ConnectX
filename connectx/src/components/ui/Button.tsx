import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer rounded-xl',
        {
          'text-white': variant === 'primary',
          'text-[var(--text-primary)] bg-[var(--bg-tertiary)] hover:bg-[var(--border)]': variant === 'secondary',
          'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]': variant === 'ghost',
          'border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]': variant === 'outline',
        },
        {
          'text-xs px-3 py-1.5': size === 'sm',
          'text-sm px-4 py-2.5': size === 'md',
          'text-base px-6 py-3': size === 'lg',
        },
        className
      )}
      style={variant === 'primary' ? { background: 'var(--brand)' } : undefined}
      {...props}
    >
      {children}
    </button>
  )
}

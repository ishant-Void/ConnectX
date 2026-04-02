import React from 'react'
import clsx from 'clsx'

interface AvatarProps {
  src: string
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  isOnline?: boolean
  className?: string
}

const sizes = {
  xs: 'w-7 h-7 text-xs',
  sm: 'w-9 h-9 text-sm',
  md: 'w-11 h-11 text-base',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
}

const dotSizes = {
  xs: 'w-2 h-2 border',
  sm: 'w-2.5 h-2.5 border',
  md: 'w-3 h-3 border-2',
  lg: 'w-3.5 h-3.5 border-2',
  xl: 'w-4 h-4 border-2',
}

export const Avatar: React.FC<AvatarProps> = ({
  src, name, size = 'md', isOnline, className
}) => {
  return (
    <div className={clsx('relative flex-shrink-0', className)}>
      <img
        src={src}
        alt={name}
        className={clsx('rounded-full object-cover', sizes[size])}
        onError={(e) => {
          const el = e.currentTarget
          el.style.display = 'none'
        }}
      />
      {isOnline && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 rounded-full bg-emerald-500 border-white dark:border-gray-900',
            dotSizes[size]
          )}
        />
      )}
    </div>
  )
}

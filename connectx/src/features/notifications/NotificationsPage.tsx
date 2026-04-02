import React, { useState } from 'react'
import { Heart, UserPlus, MessageCircle, Share2, AtSign, Bell } from 'lucide-react'
import { NOTIFICATIONS } from '@/constants/data'
import type { Notification } from '@/types'
import { Avatar } from '@/components/ui/Avatar'
import clsx from 'clsx'

const iconMap = {
  like: { icon: Heart, color: '#ef4444', bg: '#fef2f2' },
  follow: { icon: UserPlus, color: '#6441ff', bg: '#ede9ff' },
  comment: { icon: MessageCircle, color: '#3b82f6', bg: '#eff6ff' },
  share: { icon: Share2, color: '#10b981', bg: '#ecfdf5' },
  mention: { icon: AtSign, color: '#f59e0b', bg: '#fffbeb' },
}

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const { icon: Icon, color, bg } = iconMap[notification.type]
  return (
    <div
      className={clsx(
        'flex items-start gap-3 px-5 py-4 border-b border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer',
        !notification.read && 'bg-[var(--brand-light)]'
      )}
    >
      <div className="relative flex-shrink-0">
        <Avatar src={notification.user.avatar} name={notification.user.name} size="md" />
        <span
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: bg }}
        >
          <Icon size={11} style={{ color }} />
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>
          <span className="font-semibold">{notification.user.name}</span>{' '}
          <span style={{ color: 'var(--text-secondary)' }}>{notification.content}</span>
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          {notification.timeAgo}
        </p>
      </div>
      {!notification.read && (
        <span
          className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
          style={{ background: 'var(--brand)' }}
        />
      )}
    </div>
  )
}

export const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const displayed = filter === 'unread'
    ? NOTIFICATIONS.filter((n) => !n.read)
    : NOTIFICATIONS

  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length

  return (
    <div className="max-w-[640px] mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--brand-light)' }}>
            <Bell size={18} style={{ color: 'var(--brand)' }} />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {unreadCount} unread
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
          {(['all', 'unread'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all duration-150"
              style={
                filter === f
                  ? { background: 'var(--bg-primary)', color: 'var(--text-primary)', boxShadow: 'var(--shadow-sm)' }
                  : { color: 'var(--text-muted)' }
              }
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications list */}
      <div className="card overflow-hidden">
        {displayed.length === 0 ? (
          <div className="py-16 text-center">
            <Bell size={32} className="mx-auto mb-3 opacity-20" style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No notifications</p>
          </div>
        ) : (
          displayed.map((n) => <NotificationItem key={n.id} notification={n} />)
        )}
      </div>
    </div>
  )
}

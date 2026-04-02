import React, { useState } from 'react'
import { Users } from 'lucide-react'
import { SUGGESTED_USERS } from '@/constants/data'
import { Avatar } from '@/components/ui/Avatar'

export const WhoToFollowWidget: React.FC = () => {
  const [followed, setFollowed] = useState<Set<string>>(new Set())

  const toggle = (id: string) =>
    setFollowed((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-4">
        <Users size={16} style={{ color: 'var(--brand)' }} />
        <h3 className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          Who to follow
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {SUGGESTED_USERS.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <Avatar src={user.avatar} name={user.name} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate leading-tight" style={{ color: 'var(--text-primary)' }}>
                {user.name}
              </p>
              <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                @{user.username}
              </p>
            </div>
            <button
              onClick={() => toggle(user.id)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-150 flex-shrink-0"
              style={
                followed.has(user.id)
                  ? { background: 'var(--bg-tertiary)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }
                  : { background: 'var(--brand)', borderColor: 'var(--brand)', color: '#fff' }
              }
            >
              {followed.has(user.id) ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>

      <button className="mt-3 px-2 py-1.5 text-xs font-semibold rounded-lg hover:bg-[var(--brand-light)] transition-colors w-full text-left" style={{ color: 'var(--brand)' }}>
        View all suggestions
      </button>
    </div>
  )
}

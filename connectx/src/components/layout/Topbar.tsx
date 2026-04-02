import React, { useState } from 'react'
import { Search, Sun, Moon, PlusSquare } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { useAuthStore } from '@/store/authStore'
import { Avatar } from '@/components/ui/Avatar'
import { useNavigate } from 'react-router-dom'

export const Topbar: React.FC = () => {
  const { isDark, toggleTheme, openPostModal } = useUIStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  return (
    <header className="fixed top-0 left-[200px] right-0 h-14 flex items-center px-6 gap-4 bg-[var(--bg-primary)] border-b border-[var(--border)] z-10">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          className="input-field pl-10 py-2 h-9 text-sm"
          placeholder="Search ConnectX..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--bg-tertiary)] transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* New Post */}
        <button
          onClick={openPostModal}
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--bg-tertiary)] transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <PlusSquare size={17} />
        </button>

        {/* Post button */}
        <button
          onClick={openPostModal}
          className="btn-primary text-sm"
        >
          Post
        </button>

        {/* Avatar */}
        {user && (
          <button onClick={() => navigate('/profile')} className="cursor-pointer">
            <Avatar src={user.avatar} name={user.name} size="sm" isOnline />
          </button>
        )}
      </div>
    </header>
  )
}

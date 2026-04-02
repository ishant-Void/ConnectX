import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Bell, User, Settings, LogOut, Diamond } from 'lucide-react'
import clsx from 'clsx'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { Avatar } from '@/components/ui/Avatar'

const navItems = [
  { icon: Home, label: 'Feed', to: '/feed' },
  { icon: Bell, label: 'Notifications', to: '/notifications' },
  { icon: User, label: 'Profile', to: '/profile' },
]

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-[200px] flex flex-col py-6 px-3 border-r border-[var(--border)] bg-[var(--bg-primary)] z-20">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--brand)' }}>
          <Diamond size={16} className="text-white" fill="white" />
        </div>
        <span className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>ConnectX</span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx('nav-link', { active: isActive })
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="flex flex-col gap-1 border-t border-[var(--border)] pt-4">
        <NavLink
          to="/settings"
          className={({ isActive }) => clsx('nav-link', { active: isActive })}
        >
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-150 cursor-pointer"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

        {user && (
          <div className="flex items-center gap-2.5 px-2 pt-3 mt-1">
            <Avatar src={user.avatar} name={user.name} size="sm" isOnline />
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
              <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>@{user.username}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

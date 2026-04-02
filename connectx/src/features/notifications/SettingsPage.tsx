import React, { useState } from 'react'
import { Settings, Bell, Shield, Palette, Globe, ChevronRight } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'

const sections = [
  {
    id: 'appearance',
    icon: Palette,
    title: 'Appearance',
    description: 'Theme, fonts, and display settings',
  },
  {
    id: 'notifications',
    icon: Bell,
    title: 'Notifications',
    description: 'Manage push, email, and in-app alerts',
  },
  {
    id: 'privacy',
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Control who sees your activity',
  },
  {
    id: 'language',
    icon: Globe,
    title: 'Language & Region',
    description: 'Set your preferred language',
  },
]

export const SettingsPage: React.FC = () => {
  const { isDark, toggleTheme } = useUIStore()
  const [activeSection, setActiveSection] = useState('appearance')

  return (
    <div className="max-w-[760px] mx-auto py-6 px-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--brand-light)' }}>
          <Settings size={18} style={{ color: 'var(--brand)' }} />
        </div>
        <h1 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
          Settings
        </h1>
      </div>

      <div className="grid grid-cols-[220px_1fr] gap-4">
        {/* Sidebar nav */}
        <div className="card p-2 self-start">
          {sections.map(({ id, icon: Icon, title }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`nav-link w-full ${activeSection === id ? 'active' : ''}`}
            >
              <Icon size={16} />
              <span>{title}</span>
              {activeSection !== id && <ChevronRight size={14} className="ml-auto opacity-40" />}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="card p-6">
          {activeSection === 'appearance' && (
            <div>
              <h2 className="font-display font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                Appearance
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                Customize how ConnectX looks for you.
              </p>

              <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Dark Mode</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Switch between light and dark themes</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0"
                  style={{ background: isDark ? 'var(--brand)' : 'var(--border)' }}
                >
                  <span
                    className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-sm"
                    style={{ left: isDark ? '28px' : '4px' }}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Reduced Motion</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Minimize animations for accessibility</p>
                </div>
                <button
                  className="relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0"
                  style={{ background: 'var(--border)' }}
                >
                  <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-sm" />
                </button>
              </div>
            </div>
          )}

          {activeSection !== 'appearance' && (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'var(--bg-tertiary)' }}>
                {React.createElement(sections.find(s => s.id === activeSection)!.icon, { size: 22, style: { color: 'var(--text-muted)' } })}
              </div>
              <p className="font-medium text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                {sections.find(s => s.id === activeSection)?.title}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {sections.find(s => s.id === activeSection)?.description}
              </p>
              <p className="text-xs mt-4 px-4 py-2 rounded-lg inline-block" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                Coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

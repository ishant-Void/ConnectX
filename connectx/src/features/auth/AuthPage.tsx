import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Moon, Sun, Diamond } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'

export const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuthStore()
  const { isDark, toggleTheme } = useUIStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/feed')
    } catch {
      setError('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-5 right-5 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[var(--bg-tertiary)] transition-colors"
        style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
      >
        {isDark ? <Sun size={17} /> : <Moon size={17} />}
      </button>

      {/* Card */}
      <div className="card w-full max-w-[420px] animate-scale-in" style={{ background: 'var(--bg-primary)' }}>
        <div className="p-8 pb-6">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
              style={{ background: 'var(--brand)' }}
            >
              <Diamond size={22} className="text-white" fill="white" />
            </div>
            <span className="font-display font-bold text-2xl" style={{ color: 'var(--brand)' }}>
              ConnectX
            </span>
            <h1 className="font-display font-bold text-2xl mt-4 mb-1" style={{ color: 'var(--text-primary)' }}>
              Welcome Back
            </h1>
            <p className="text-sm text-center" style={{ color: 'var(--text-muted)' }}>
              Join the conversation and connect with the world.
            </p>
          </div>

          {/* OAuth buttons */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                Continue with
              </span>
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Google', icon: '🔵' },
                { label: 'GitHub', icon: '⬛' },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-[var(--bg-secondary)] hover:-translate-y-0.5"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                >
                  <span>{icon}</span> {label}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
              Or Email
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div
                className="px-4 py-3 rounded-xl text-sm"
                style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }}
              >
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  className="input-field pl-10"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <p className="text-[11px] mt-1 italic" style={{ color: 'var(--text-muted)' }}>
                We'll never share your email.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Remember me</span>
              </label>
              <button type="button" className="text-sm font-medium hover:underline" style={{ color: 'var(--brand)' }}>
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 mt-1"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>Sign In →</>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div
          className="px-8 py-4 text-center rounded-b-2xl border-t border-[var(--border)]"
          style={{ background: 'var(--bg-secondary)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <button className="font-semibold hover:underline" style={{ color: 'var(--brand)' }}>
              Create an account
            </button>
          </p>
        </div>
      </div>

      {/* Bottom links */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6">
        {['Help Center', 'Privacy', 'Terms', 'Contact'].map((link) => (
          <button key={link} className="text-xs hover:underline" style={{ color: 'var(--text-muted)' }}>
            {link}
          </button>
        ))}
      </div>
      <p
        className="absolute bottom-2 left-0 right-0 text-center text-[10px] tracking-widest uppercase"
        style={{ color: 'var(--text-muted)' }}
      >
        Powered by ConnectX Architecture
      </p>
    </div>
  )
}

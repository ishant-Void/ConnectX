import { create } from 'zustand'
import type { User } from '@/types'
import { CURRENT_USER } from '@/constants/data'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (_email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800))
    set({ user: CURRENT_USER, isAuthenticated: true })
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}))

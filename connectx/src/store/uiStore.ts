import { create } from 'zustand'

interface UIState {
  isDark: boolean
  isPostModalOpen: boolean
  toggleTheme: () => void
  openPostModal: () => void
  closePostModal: () => void
}

export const useUIStore = create<UIState>((set, get) => ({
  isDark: false,
  isPostModalOpen: false,
  toggleTheme: () => {
    const next = !get().isDark
    set({ isDark: next })
    document.documentElement.classList.toggle('dark', next)
  },
  openPostModal: () => set({ isPostModalOpen: true }),
  closePostModal: () => set({ isPostModalOpen: false }),
}))

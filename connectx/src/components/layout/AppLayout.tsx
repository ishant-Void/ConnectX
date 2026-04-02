import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { PostModal } from '@/features/posts/PostModal'
import { useUIStore } from '@/store/uiStore'

export const AppLayout: React.FC = () => {
  const { isPostModalOpen } = useUIStore()

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-secondary)' }}>
      <Sidebar />
      <Topbar />
      <main className="ml-[200px] pt-14 min-h-screen">
        <Outlet />
      </main>
      {isPostModalOpen && <PostModal />}
    </div>
  )
}

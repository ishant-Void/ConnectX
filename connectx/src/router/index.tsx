import React from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { FeedPage } from '@/features/feed/FeedPage'
import { ProfilePage } from '@/features/profile/ProfilePage'
import { AuthPage } from '@/features/auth/AuthPage'
import { NotificationsPage } from '@/features/notifications/NotificationsPage'
import { SettingsPage } from '@/features/notifications/SettingsPage'
import { useAuthStore } from '@/store/authStore'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/auth" replace />
  return <>{children}</>
}

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/feed" replace /> },
      { path: 'feed', element: <FeedPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />
}

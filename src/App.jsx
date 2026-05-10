import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import ApiSettings from './pages/ApiSettings'
import BulkOperations from './pages/BulkOperations'
import Layout from './components/Layout'

function ProtectedRoute({ children, user, profile }) {
  if (!user) return <Navigate to="/" replace />
  return <Layout profile={profile}>{children}</Layout>
}

export default function App() {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-zinc-700 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <Auth />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} profile={profile}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bulk"
          element={
            <ProtectedRoute user={user} profile={profile}>
              <BulkOperations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/api-settings"
          element={
            <ProtectedRoute user={user} profile={profile}>
              <ApiSettings profile={profile} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

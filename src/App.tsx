import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { useAuth } from './hooks/useAuth'
import { useUserStore } from './store/useUserStore'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import GoalSelection from './pages/GoalSelection'

const Home = lazy(() => import('./pages/Home'))
const Leaderboard = lazy(() => import('./pages/Leaderboard'))
const Profile = lazy(() => import('./pages/Profile'))
const Settings = lazy(() => import('./pages/Settings'))
const Lesson = lazy(() => import('./pages/Lesson'))
const LessonComplete = lazy(() => import('./pages/LessonComplete'))

// ─── Page loader fallback ─────────────────────────────────────────────────────

function PageLoader() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-accent border-t-transparent animate-spin" />
        <p className="text-text-muted font-semibold">Loading…</p>
      </div>
    </div>
  )
}

// ─── RequireAuth ──────────────────────────────────────────────────────────────

function RequireAuth({ children }: { children: React.ReactNode }) {
  const session = useUserStore((s) => s.session)
  if (!session) return <Navigate to="/" replace />
  return <>{children}</>
}

// ─── AppInitializer ───────────────────────────────────────────────────────────

function AppInitializer({ children }: { children: React.ReactNode }) {
  useAuth()
  return <>{children}</>
}

// ─── AnimatedRoutes ───────────────────────────────────────────────────────────

function AnimatedRoutes() {
  const location = useLocation()
  const session = useUserStore((s) => s.session)

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route
          path="/"
          element={session ? <Navigate to="/home" replace /> : <Landing />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/goal-selection" element={<GoalSelection />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}>
                <Leaderboard />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}>
                <Profile />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}>
                <Settings />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/lesson/:lessonId"
          element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}>
                <Lesson />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/lesson-complete"
          element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}>
                <LessonComplete />
              </Suspense>
            </RequireAuth>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <AppInitializer>
      <AnimatedRoutes />
    </AppInitializer>
  )
}

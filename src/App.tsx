import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useUserStore } from './store/useUserStore';
import { useAuth } from './hooks/useAuth';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GoalSelection from './pages/GoalSelection';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import LessonComplete from './pages/LessonComplete';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const session = useUserStore((s) => s.session);
  if (!session) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/goal"
          element={
            <RequireAuth>
              <GoalSelection />
            </RequireAuth>
          }
        />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/lesson/:lessonId"
          element={
            <RequireAuth>
              <Lesson />
            </RequireAuth>
          }
        />
        <Route
          path="/lesson/:lessonId/complete"
          element={
            <RequireAuth>
              <LessonComplete />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <RequireAuth>
              <Leaderboard />
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useAuth();
  return <AppRoutes />;
}

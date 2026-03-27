import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GymOwl } from '../components/auth/GymOwl'
import { Button } from '../components/ui/Button'
import { useUserStore } from '../store/useUserStore'
import { pageTransition } from '../lib/animations'

export default function Landing() {
  const navigate = useNavigate()
  const session = useUserStore((s) => s.session)

  useEffect(() => {
    if (session) navigate('/home')
  }, [session, navigate])

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-bg flex flex-col items-center justify-between px-6 py-12"
    >
      {/* Top hero section */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 pt-8">
        {/* Glow backdrop behind owl */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: 280,
              height: 280,
              background: 'radial-gradient(circle, #58cc02 0%, transparent 70%)',
            }}
          />
          <GymOwl mood="happy" size={160} animate={true} />
        </div>

        <div className="flex flex-col items-center gap-3">
          <h1
            className="text-5xl font-black text-text-primary text-center leading-tight whitespace-pre-line"
            style={{ letterSpacing: '-0.02em' }}
          >
            {'Get swole.\nGet smart.'}
          </h1>
          <p className="text-base text-text-secondary text-center max-w-xs">
            Learn fitness science the fun way
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { icon: '🏋️', label: 'Training science' },
            { icon: '🥗', label: 'Nutrition' },
            { icon: '🧠', label: 'Anatomy' },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 bg-surface border border-border rounded-full px-3 py-1.5"
            >
              <span className="text-sm">{icon}</span>
              <span className="text-xs font-semibold text-text-secondary">{label}</span>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-8">
          {[
            { value: '50+', label: 'Lessons' },
            { value: '🔥', label: 'Streaks' },
            { value: 'Free', label: 'Forever' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-xl font-black text-accent">{value}</span>
              <span className="text-xs text-text-muted font-semibold uppercase tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA section */}
      <div className="w-full max-w-[400px] flex flex-col gap-3 pb-4">
        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={() => navigate('/signup')}
        >
          Get started — it&apos;s free
        </Button>
        <Button
          variant="outline"
          fullWidth
          size="lg"
          onClick={() => navigate('/login')}
        >
          I already have an account
        </Button>
        <p className="text-xs text-text-muted text-center mt-2">
          By continuing you agree to our{' '}
          <span className="underline cursor-pointer">Terms of Service</span> and{' '}
          <span className="underline cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </motion.div>
  )
}

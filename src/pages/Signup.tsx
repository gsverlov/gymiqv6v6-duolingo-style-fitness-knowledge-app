import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { GymOwl } from '../components/auth/GymOwl'
import { AuthInput } from '../components/auth/AuthInput'
import { Button } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { pageTransition } from '../lib/animations'

// ─── Confetti (local, not exported) ───────────────────────────────────────────

function Confetti() {
  useEffect(() => {
    const colors = ['#58cc02', '#ffc800', '#1cb0f6', '#ff4b4b', '#ffffff']
    const pieces: HTMLDivElement[] = []

    for (let i = 0; i < 60; i++) {
      const el = document.createElement('div')
      el.className = 'confetti-piece'
      el.style.left = `${Math.random() * 100}%`
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      el.style.animationDuration = `${1 + Math.random() * 1.5}s`
      el.style.animationDelay = `${Math.random() * 0.5}s`
      document.body.appendChild(el)
      pieces.push(el)
    }

    return () => {
      pieces.forEach((el) => el.remove())
    }
  }, [])

  return null
}

// ─── Signup page ──────────────────────────────────────────────────────────────

interface FormErrors {
  displayName?: string
  email?: string
  password?: string
  general?: string
}

export default function Signup() {
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!displayName || displayName.length < 2) {
      errs.displayName = 'Display name must be at least 2 characters'
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email'
    }
    if (!password || password.length < 8) {
      errs.password = 'Password must be at least 8 characters'
    }
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setLoading(true)

    const { error } = await signUp(email, password, displayName)

    if (error) {
      if (error.message.includes('already registered')) {
        setErrors({ email: 'Email already in use' })
      } else {
        setErrors({ general: error.message })
      }
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => navigate('/goal-selection'), 1800)
    }
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-bg flex flex-col max-w-[480px] mx-auto px-6"
    >
      {success && <Confetti />}

      {/* Back button */}
      <div className="pt-4 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Owl */}
      <div className="flex justify-center mt-4 mb-6">
        <GymOwl mood={success ? 'happy' : 'neutral'} size={100} animate={success} />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-black text-text-primary mb-1">Create your account</h1>
      <p className="text-text-secondary mb-8">Start your fitness journey</p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <AuthInput
          id="name"
          label="Display name"
          type="text"
          value={displayName}
          onChange={setDisplayName}
          placeholder="e.g. Alex"
          error={errors.displayName}
          valid={displayName.length >= 2 && !errors.displayName}
        />
        <AuthInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          error={errors.email}
          valid={!!email && !errors.email}
          autoComplete="email"
        />
        <AuthInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Min. 8 characters"
          error={errors.password}
          valid={password.length >= 8 && !errors.password}
          autoComplete="new-password"
        />

        {errors.general && (
          <p className="text-danger text-sm font-semibold text-center">{errors.general}</p>
        )}

        <Button type="submit" fullWidth size="lg" loading={loading} className="mt-2">
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      {/* Login link */}
      <p className="text-text-secondary text-sm text-center mt-6">
        Already have an account?{' '}
        <button
          onClick={() => navigate('/login')}
          className="text-accent font-bold hover:underline"
        >
          Log in
        </button>
      </p>
    </motion.div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { GymOwl } from '../components/auth/GymOwl'
import { AuthInput } from '../components/auth/AuthInput'
import { Button } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { pageTransition, fadeSlideUp } from '../lib/animations'

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

export default function Login() {
  const navigate = useNavigate()
  const { signIn, sendMagicLink } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [showForgot, setShowForgot] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const errs: FormErrors = {}
    if (!email) errs.email = 'Email is required'
    if (!password) errs.password = 'Password is required'
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setErrors({ general: 'Incorrect email or password' })
    } else {
      navigate('/')
    }

    setLoading(false)
  }

  async function handleMagicLink() {
    if (!email) {
      setErrors({ email: 'Enter your email to receive a magic link' })
      return
    }

    setErrors({})
    setLoading(true)
    await sendMagicLink(email)
    setMagicLinkSent(true)
    setLoading(false)
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-bg flex flex-col max-w-[480px] mx-auto px-6"
    >
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

      {/* ─── Magic link sent state ─────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {magicLinkSent ? (
          <motion.div
            key="magic-sent"
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 flex flex-col items-center justify-center text-center gap-6"
          >
            <GymOwl mood="happy" size={120} animate={true} />
            <div>
              <h2 className="text-3xl font-black text-text-primary mb-2">
                Check your inbox! ✉️
              </h2>
              <p className="text-text-secondary max-w-xs mx-auto">
                We sent a magic link to{' '}
                <span className="text-text-primary font-bold">{email}</span>. Click it to log in.
              </p>
            </div>
            <button
              onClick={() => {
                setMagicLinkSent(false)
                setShowForgot(false)
              }}
              className="text-info text-sm font-semibold hover:underline"
            >
              ← Back to login
            </button>
          </motion.div>
        ) : showForgot ? (
          /* ─── Forgot password state ───────────────────────────────────── */
          <motion.div
            key="forgot"
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col mt-6"
          >
            <div className="flex justify-center mb-6">
              <GymOwl mood="neutral" size={100} animate={false} />
            </div>

            <h1 className="text-3xl font-black text-text-primary mb-1">Reset your password</h1>
            <p className="text-text-secondary mb-8">We&apos;ll send a magic link to your email</p>

            <div className="flex flex-col gap-4">
              <AuthInput
                id="reset-email"
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                error={errors.email}
                valid={!!email && !errors.email}
                autoComplete="email"
              />
              <Button fullWidth size="lg" loading={loading} onClick={handleMagicLink}>
                Send magic link
              </Button>
            </div>

            <button
              onClick={() => setShowForgot(false)}
              className="text-info text-sm font-semibold mt-6 text-center hover:underline"
            >
              ← Back to login
            </button>
          </motion.div>
        ) : (
          /* ─── Main login form ─────────────────────────────────────────── */
          <motion.div
            key="login-form"
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col mt-4"
          >
            <div className="flex justify-center mb-6">
              <GymOwl mood="neutral" size={100} animate={false} />
            </div>

            <h1 className="text-3xl font-black text-text-primary mb-1">Welcome back!</h1>
            <p className="text-text-secondary mb-8">Log in to continue your streak</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
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
                placeholder="Your password"
                error={errors.password}
                valid={password.length >= 8 && !errors.password}
                autoComplete="current-password"
              />

              {errors.general && (
                <p className="text-danger text-sm font-semibold text-center">{errors.general}</p>
              )}

              <Button type="submit" fullWidth size="lg" loading={loading}>
                Log in
              </Button>
            </form>

            {/* Forgot password */}
            <div className="text-center mt-4">
              <button
                onClick={() => setShowForgot(true)}
                className="text-info text-sm hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign up link */}
            <p className="text-text-secondary text-sm text-center mt-4">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-accent font-bold hover:underline"
              >
                Sign up
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

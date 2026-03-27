import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { pageTransition } from '../lib/animations'

export default function Lesson() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-bg flex flex-col max-w-[480px] mx-auto"
    >
      {/* Header bar */}
      <div className="h-14 flex items-center px-4 border-b border-border">
        <button
          onClick={() => navigate(-1)}
          className="text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Close lesson"
        >
          <ArrowLeft size={24} />
        </button>
        {/* Progress bar skeleton */}
        <div className="flex-1 mx-4">
          <div className="h-3 rounded-full bg-surface-elevated overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-border"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{ width: '35%' }}
            />
          </div>
        </div>
        <div className="w-6" />
      </div>

      {/* Lesson body skeleton */}
      <div className="flex-1 flex flex-col px-6 pt-8 gap-6">
        {/* Question skeleton */}
        <div className="flex flex-col gap-3">
          <motion.div
            className="h-4 rounded-lg bg-surface-elevated"
            style={{ width: '55%' }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          />
          <motion.div
            className="h-8 rounded-xl bg-surface-elevated"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut', delay: 0.1 }}
          />
          <motion.div
            className="h-8 rounded-xl bg-surface-elevated"
            style={{ width: '80%' }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
          />
        </div>

        {/* Answer choices skeleton */}
        <div className="flex flex-col gap-3 mt-4">
          {[90, 100, 85, 95].map((w, i) => (
            <motion.div
              key={i}
              className="h-16 rounded-2xl bg-surface border border-border"
              style={{ opacity: 0.5 }}
              animate={{ opacity: [0.35, 0.6, 0.35] }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: 'easeInOut',
                delay: i * 0.08,
              }}
            >
              <div className="flex items-center gap-3 h-full px-4">
                <div
                  className="w-8 h-8 rounded-full bg-surface-elevated"
                  style={{ width: `${w}%`, maxWidth: 32, minWidth: 32 }}
                />
                <motion.div
                  className="h-3 rounded-lg bg-surface-elevated"
                  style={{ width: `${w}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Loading label */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-3 border-accent border-t-transparent animate-spin"
              style={{ borderWidth: 3 }}
            />
            <p className="text-text-muted text-sm font-semibold">
              Loading lesson{lessonId ? ` ${lessonId}` : ''}…
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

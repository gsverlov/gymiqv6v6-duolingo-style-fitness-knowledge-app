import { motion } from 'framer-motion'
import { pageTransition } from '../lib/animations'

export default function LessonComplete() {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-bg flex flex-col items-center justify-center px-6"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
          className="text-7xl"
        >
          🎉
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="text-3xl font-black text-text-primary"
        >
          Coming soon
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="text-text-muted font-semibold"
        >
          Lesson completion screen is on its way!
        </motion.p>
      </div>
    </motion.div>
  )
}

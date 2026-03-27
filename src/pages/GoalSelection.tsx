import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Goal } from '../types'
import { GymOwl } from '../components/auth/GymOwl'
import { GoalCard } from '../components/auth/GoalCard'
import { Button } from '../components/ui/Button'
import { useUserStore } from '../store/useUserStore'
import { supabase } from '../lib/supabase'
import { pageTransition, staggerContainer, staggerItem } from '../lib/animations'

const GOALS: { id: Goal; emoji: string; title: string; description: string }[] = [
  { id: 'muscle', emoji: '🏋️', title: 'Build muscle', description: 'Learn hypertrophy & programming' },
  { id: 'nutrition', emoji: '🥗', title: 'Eat better', description: 'Master nutrition & macros' },
  { id: 'anatomy', emoji: '🧠', title: 'Understand my body', description: 'Muscle anatomy & physiology' },
  { id: 'all', emoji: '⚡', title: 'All of the above', description: 'Full curriculum' },
]

export default function GoalSelection() {
  const navigate = useNavigate()
  const session = useUserStore((s) => s.session)
  const updateProfile = useUserStore((s) => s.updateProfile)

  const [selected, setSelected] = useState<Goal | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleContinue() {
    const userId = session?.user?.id
    if (!userId || !selected) return

    setLoading(true)

    await supabase
      .from('users')
      .update({ goal: selected })
      .eq('id', userId)

    updateProfile({ goal: selected })
    navigate('/')
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-bg flex flex-col max-w-[480px] mx-auto px-6 py-8"
    >
      {/* Owl */}
      <div className="flex justify-center">
        <GymOwl mood="happy" size={80} animate={false} />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-black text-text-primary text-center mb-2 mt-4">
        What&apos;s your goal?
      </h1>
      <p className="text-text-secondary text-center mb-8">
        We&apos;ll personalize your curriculum
      </p>

      {/* Goal cards with stagger animation */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-3"
      >
        {GOALS.map((g) => (
          <motion.div key={g.id} variants={staggerItem}>
            <GoalCard
              emoji={g.emoji}
              title={g.title}
              description={g.description}
              selected={selected === g.id}
              onSelect={() => setSelected(g.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Continue button */}
      <Button
        fullWidth
        size="lg"
        disabled={!selected}
        loading={loading}
        onClick={handleContinue}
        className="mt-6"
      >
        Continue
      </Button>
    </motion.div>
  )
}

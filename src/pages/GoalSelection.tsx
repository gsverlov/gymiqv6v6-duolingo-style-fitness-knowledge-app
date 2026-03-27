import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GOALS = [
  { emoji: '💪', title: 'Build Muscle', description: 'Learn muscle anatomy and training principles', value: 'muscle' },
  { emoji: '🥗', title: 'Nutrition', description: 'Master nutrition science and meal planning', value: 'nutrition' },
  { emoji: '🦴', title: 'Anatomy', description: 'Understand how your body works', value: 'anatomy' },
  { emoji: '🏆', title: 'All of the Above', description: 'Complete fitness education', value: 'all' },
] as const;

export default function GoalSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f1a] px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-sm mx-auto flex flex-col gap-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-black text-white">What's Your Goal?</h1>
          <p className="text-[#afafaf] mt-2">Choose a focus to personalize your learning path</p>
        </div>

        <div className="flex flex-col gap-3">
          {GOALS.map((goal) => (
            <motion.button
              key={goal.value}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/home')}
              className="w-full p-4 rounded-2xl bg-[#1a1a2e] border border-[#2a2a4a] text-left flex items-center gap-4 hover:border-[#58cc02] transition-colors"
            >
              <span className="text-3xl">{goal.emoji}</span>
              <div>
                <p className="text-white font-bold">{goal.title}</p>
                <p className="text-[#afafaf] text-sm">{goal.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

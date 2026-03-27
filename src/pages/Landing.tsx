import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f1a] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-8 w-full max-w-sm"
      >
        <div className="text-6xl">🏋️</div>
        <div>
          <h1 className="text-4xl font-black text-white mb-2">GymIQV6V6</h1>
          <p className="text-[#afafaf] text-lg">Learn fitness. Level up your body.</p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/signup')}
            className="w-full h-14 rounded-xl bg-[#58cc02] text-white font-bold text-lg"
          >
            Get Started
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/login')}
            className="w-full h-14 rounded-xl border-2 border-white/30 text-white font-bold text-lg"
          >
            I Already Have an Account
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

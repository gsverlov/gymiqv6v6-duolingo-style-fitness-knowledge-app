import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LessonComplete() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex flex-col items-center justify-center px-6 max-w-[480px] mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center flex flex-col items-center gap-6"
      >
        <div className="text-7xl">🎉</div>
        <div>
          <h1 className="text-3xl font-black text-white">Lesson Complete!</h1>
          <p className="text-[#afafaf] mt-2">Great work! Keep up the streak!</p>
        </div>

        <div className="flex gap-3">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="text-4xl"
            >
              ⭐
            </motion.div>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/home')}
          className="w-full h-14 rounded-xl bg-[#58cc02] text-white font-bold text-lg"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}

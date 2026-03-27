import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f1a] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm flex flex-col gap-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-black text-white">Create Account</h1>
          <p className="text-[#afafaf] mt-1">Start your fitness learning journey</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-[#afafaf] text-sm font-semibold mb-1 block">Display Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full h-12 px-4 rounded-xl bg-[#1a1a2e] border border-[#2a2a4a] text-white placeholder-[#6b6b8a] outline-none focus:border-[#58cc02]"
            />
          </div>
          <div>
            <label className="text-[#afafaf] text-sm font-semibold mb-1 block">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full h-12 px-4 rounded-xl bg-[#1a1a2e] border border-[#2a2a4a] text-white placeholder-[#6b6b8a] outline-none focus:border-[#58cc02]"
            />
          </div>
          <div>
            <label className="text-[#afafaf] text-sm font-semibold mb-1 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full h-12 px-4 rounded-xl bg-[#1a1a2e] border border-[#2a2a4a] text-white placeholder-[#6b6b8a] outline-none focus:border-[#58cc02]"
            />
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full h-14 rounded-xl bg-[#58cc02] text-white font-bold text-lg"
        >
          Create Account
        </motion.button>

        <button
          onClick={() => navigate('/login')}
          className="text-[#afafaf] text-sm text-center"
        >
          Already have an account? <span className="text-[#58cc02] font-bold">Sign In</span>
        </button>
      </motion.div>
    </div>
  );
}

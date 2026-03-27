import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f1a] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm flex flex-col gap-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-black text-white">Welcome Back</h1>
          <p className="text-[#afafaf] mt-1">Sign in to continue your journey</p>
        </div>

        <div className="flex flex-col gap-4">
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
          Sign In
        </motion.button>

        <button
          onClick={() => navigate('/signup')}
          className="text-[#afafaf] text-sm text-center"
        >
          Don't have an account? <span className="text-[#58cc02] font-bold">Sign Up</span>
        </button>
      </motion.div>
    </div>
  );
}

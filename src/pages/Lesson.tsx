import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function Lesson() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex flex-col max-w-[480px] mx-auto">
      <div className="h-14 flex items-center px-4 border-b border-[#2a2a4a]">
        <button onClick={() => navigate(-1)} className="text-[#afafaf]">
          <ArrowLeft size={24} />
        </button>
        <span className="flex-1 text-center text-white font-bold">Lesson</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="text-5xl mb-4">📚</div>
        <h1 className="text-2xl font-black text-white mb-2">Lesson {lessonId}</h1>
        <p className="text-[#afafaf]">Lesson content coming soon!</p>
      </motion.div>
    </div>
  );
}

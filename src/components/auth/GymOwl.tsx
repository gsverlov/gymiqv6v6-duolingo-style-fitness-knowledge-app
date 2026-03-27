import { motion } from 'framer-motion';

interface GymOwlProps {
  mood?: 'happy' | 'sad' | 'neutral';
  size?: number;
  animate?: boolean;
}

interface EyeConfig {
  pupilRadius: number;
  highlightOffset: number;
}

const EYE_CONFIG: Record<'happy' | 'sad' | 'neutral', EyeConfig> = {
  happy: { pupilRadius: 9, highlightOffset: -2.5 },
  neutral: { pupilRadius: 7, highlightOffset: -2 },
  sad: { pupilRadius: 5.5, highlightOffset: -1.5 },
};

function OwlEyes({ mood }: { mood: 'happy' | 'sad' | 'neutral' }) {
  const cfg = EYE_CONFIG[mood];

  // Eyebrow paths per mood
  const leftEyebrow =
    mood === 'happy'
      ? 'M 53 46 Q 63 40 73 44'
      : mood === 'sad'
        ? 'M 53 44 Q 63 50 73 46'
        : 'M 53 46 Q 63 44 73 46';

  const rightEyebrow =
    mood === 'happy'
      ? 'M 87 44 Q 97 40 107 46'
      : mood === 'sad'
        ? 'M 87 46 Q 97 50 107 44'
        : 'M 87 46 Q 97 44 107 46';

  return (
    <g>
      {/* Eyebrows */}
      <path d={leftEyebrow} stroke="#afafaf" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d={rightEyebrow} stroke="#afafaf" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Left eye white */}
      <circle cx="63" cy="60" r="13" fill="white" />
      {/* Left iris */}
      <circle cx="63" cy="61" r={cfg.pupilRadius + 2} fill="#1a2040" />
      {/* Left pupil */}
      <circle cx="63" cy="61" r={cfg.pupilRadius} fill="#0f0f1a" />
      {/* Left highlight */}
      <circle cx={63 + 3} cy={61 + cfg.highlightOffset} r="2.5" fill="white" opacity="0.9" />

      {/* Right eye white */}
      <circle cx="97" cy="60" r="13" fill="white" />
      {/* Right iris */}
      <circle cx="97" cy="61" r={cfg.pupilRadius + 2} fill="#1a2040" />
      {/* Right pupil */}
      <circle cx="97" cy="61" r={cfg.pupilRadius} fill="#0f0f1a" />
      {/* Right highlight */}
      <circle cx={97 + 3} cy={61 + cfg.highlightOffset} r="2.5" fill="white" opacity="0.9" />

      {/* Happy: star sparkles in eyes */}
      {mood === 'happy' && (
        <>
          <circle cx="56" cy="54" r="1.5" fill="white" opacity="0.7" />
          <circle cx="90" cy="54" r="1.5" fill="white" opacity="0.7" />
        </>
      )}

      {/* Sad: half-closed lids */}
      {mood === 'sad' && (
        <>
          <path d="M 50 55 Q 63 50 76 55" fill="#1e2035" />
          <path d="M 84 55 Q 97 50 110 55" fill="#1e2035" />
        </>
      )}
    </g>
  );
}

export function GymOwl({ mood = 'neutral', size = 160, animate: shouldAnimate = true }: GymOwlProps) {
  const isHappyAndAnimated = mood === 'happy' && shouldAnimate;

  const bounceAnimate = isHappyAndAnimated
    ? { y: [0, -12, 0] as number[] }
    : { y: 0 };

  const bounceTransition = isHappyAndAnimated
    ? { repeat: 3, duration: 0.6, ease: 'easeInOut' as const }
    : { duration: 0 };

  return (
    <motion.div
      key={mood}
      style={{ width: size, height: size }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: bounceAnimate.y, opacity: 1 }}
      transition={
        isHappyAndAnimated
          ? { type: 'spring', damping: 10, stiffness: 80, ...bounceTransition }
          : { type: 'spring', damping: 10, stiffness: 80 }
      }
    >
      {/* Separate bounce layer for happy mood after entrance */}
      <motion.div
        animate={bounceAnimate}
        transition={bounceTransition}
      >
        <svg
          viewBox="0 0 160 160"
          width={size}
          height={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── Body ─────────────────────────────────────────── */}
          <ellipse cx="80" cy="110" rx="38" ry="42" fill="#1a1a2e" stroke="#2a2a4a" strokeWidth="2" />

          {/* Belly */}
          <ellipse cx="80" cy="115" rx="22" ry="26" fill="#252540" />

          {/* Belly stripe detail */}
          <ellipse cx="80" cy="120" rx="14" ry="16" fill="#2a2a4a" opacity="0.5" />

          {/* ── Wings ────────────────────────────────────────── */}
          {/* Left wing */}
          <path
            d="M 42 95 Q 28 100 30 120 Q 32 130 42 128 Q 50 126 52 115 Z"
            fill="#151525"
            stroke="#2a2a4a"
            strokeWidth="1.5"
          />
          {/* Left wing feather detail */}
          <path d="M 35 105 Q 40 108 38 116" stroke="#2a2a4a" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M 31 112 Q 37 115 35 122" stroke="#2a2a4a" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* Right wing — extended to hold dumbbell */}
          <path
            d="M 118 95 Q 132 98 135 112 Q 136 120 128 124 Q 120 126 116 118 Z"
            fill="#151525"
            stroke="#2a2a4a"
            strokeWidth="1.5"
          />
          {/* Right wing feather detail */}
          <path d="M 125 105 Q 120 109 122 117" stroke="#2a2a4a" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M 129 112 Q 124 116 126 123" stroke="#2a2a4a" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* ── Dumbbell held in right wing ──────────────────── */}
          {/* Bar */}
          <rect x="118" y="108" width="28" height="5" rx="2.5" fill="#58cc02" />
          {/* Left weight plate */}
          <rect x="113" y="103" width="7" height="15" rx="3" fill="#58cc02" opacity="0.9" />
          {/* Right weight plate */}
          <rect x="144" y="103" width="7" height="15" rx="3" fill="#58cc02" opacity="0.9" />
          {/* Weight shine */}
          <rect x="115" y="105" width="2" height="5" rx="1" fill="white" opacity="0.25" />
          <rect x="146" y="105" width="2" height="5" rx="1" fill="white" opacity="0.25" />

          {/* ── Head ─────────────────────────────────────────── */}
          <circle cx="80" cy="58" r="34" fill="#1e2035" stroke="#2a2a4a" strokeWidth="2" />

          {/* ── Ear tufts ────────────────────────────────────── */}
          <polygon points="58,28 52,10 66,22" fill="#151525" stroke="#2a2a4a" strokeWidth="1.5" strokeLinejoin="round" />
          <polygon points="102,28 94,10 108,22" fill="#151525" stroke="#2a2a4a" strokeWidth="1.5" strokeLinejoin="round" />

          {/* Inner ear tuft detail */}
          <polygon points="59,27 55,15 63,22" fill="#1e2035" opacity="0.6" />
          <polygon points="101,27 97,15 105,22" fill="#1e2035" opacity="0.6" />

          {/* ── Eyes & Eyebrows ───────────────────────────────── */}
          <OwlEyes mood={mood} />

          {/* ── Beak ─────────────────────────────────────────── */}
          <polygon points="80,70 74,79 86,79" fill="#ffc800" stroke="#e6b400" strokeWidth="1" strokeLinejoin="round" />
          {/* Beak center line */}
          <line x1="80" y1="72" x2="80" y2="78" stroke="#e6b400" strokeWidth="1" opacity="0.7" />

          {/* ── Feet ─────────────────────────────────────────── */}
          {/* Left foot */}
          <ellipse cx="66" cy="151" rx="10" ry="4" fill="#ffc800" />
          <line x1="58" y1="151" x2="55" y2="156" stroke="#ffc800" strokeWidth="3" strokeLinecap="round" />
          <line x1="63" y1="152" x2="61" y2="157" stroke="#ffc800" strokeWidth="3" strokeLinecap="round" />
          <line x1="68" y1="152" x2="68" y2="157" stroke="#ffc800" strokeWidth="3" strokeLinecap="round" />
          <line x1="73" y1="151" x2="75" y2="156" stroke="#ffc800" strokeWidth="3" strokeLinecap="round" />

          {/* Right foot */}
          <ellipse cx="94" cy="151" rx="10" ry="4" fill="#ffc800" />
          <line x1="86" y1="151" x2="83" y2="156" stroke="#ffc800" strokeWidth="3" strokeLinecap="round" />
          <line x1="91" y1="152" x2="89" y2="157" stroke="#ffc800" strokeWidth="3" strokeLinecap="round" />
          <line x1="96" y1="152" x2="96" y2="157" stroke="#ffc800" strokeWidth="3" strokeLinecap="round" />
          <line x1="101" y1="151" x2="103" y2="156" stroke="#ffc800" strokeWidth="3" strokeLinecap="round" />

          {/* ── Head-body overlap cover (clean join) ─────────── */}
          <ellipse cx="80" cy="88" rx="30" ry="10" fill="#1a1a2e" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

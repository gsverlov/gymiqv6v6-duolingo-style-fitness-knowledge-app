import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-[#58cc02] text-white hover:brightness-110',
  outline: 'border-2 border-white/30 text-white hover:border-white/60',
  ghost: 'text-[#afafaf] hover:text-white hover:bg-white/10',
  danger: 'bg-[#ff4b4b] text-white hover:brightness-110',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  children,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.08 }}
      className={[
        'inline-flex items-center justify-center gap-2 font-nunito font-bold rounded-xl transition-all',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#58cc02]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {loading && <Loader2 className="animate-spin" size={18} />}
      {children}
    </motion.button>
  );
}

import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { KeyboardEvent } from 'react';

interface AuthInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  valid?: boolean;
  id: string;
  autoComplete?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export function AuthInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  valid,
  id,
  autoComplete,
  onKeyDown,
}: AuthInputProps) {
  const borderClass = error
    ? 'border-danger'
    : valid
      ? 'border-accent'
      : 'border-border focus-within:border-accent';

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="text-text-secondary font-semibold text-sm mb-1"
      >
        {label}
      </label>

      <motion.div
        key={error ?? 'no-error'}
        animate={error ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
        className="relative"
      >
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onKeyDown={onKeyDown}
          className={[
            'w-full h-14 bg-surface-elevated border-2 rounded-xl px-4 pr-12',
            'font-medium text-text-primary placeholder:text-text-muted',
            'focus:outline-none transition-all duration-150',
            borderClass,
          ].join(' ')}
        />

        {/* Right-side validation icon */}
        {valid && !error && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <CheckCircle2 size={20} className="text-accent" />
          </span>
        )}
        {error && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <AlertCircle size={20} className="text-danger" />
          </span>
        )}
      </motion.div>

      {error && (
        <p className="mt-1 text-sm text-danger font-semibold">{error}</p>
      )}
    </div>
  );
}

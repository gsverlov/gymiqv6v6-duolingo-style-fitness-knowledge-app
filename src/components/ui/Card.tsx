import type { ReactNode } from 'react';

interface CardProps {
  glow?: boolean;
  elevated?: boolean;
  className?: string;
  children: ReactNode;
}

export function Card({
  glow = false,
  elevated = false,
  className = '',
  children,
}: CardProps) {
  return (
    <div
      className={[
        'bg-surface border border-border rounded-2xl p-4',
        elevated ? 'bg-surface-elevated' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={glow ? { boxShadow: '0 0 20px rgba(88, 204, 2, 0.25)' } : undefined}
    >
      {children}
    </div>
  );
}

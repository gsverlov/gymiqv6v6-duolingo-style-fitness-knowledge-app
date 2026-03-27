type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  name: string;
  size?: AvatarSize;
  className?: string;
}

const ACCENT_COLORS = [
  '#e74c3c',
  '#e67e22',
  '#58cc02',
  '#1cb0f6',
  '#9b59b6',
  '#ffc800',
];

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  md: 48,
  lg: 80,
};

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return ACCENT_COLORS[Math.abs(hash) % ACCENT_COLORS.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function Avatar({ name, size = 'md', className = '' }: AvatarProps) {
  const px = sizeMap[size];
  const fontSize = Math.round(px * 0.38);
  const bg = getColorFromName(name);
  const initials = getInitials(name);

  return (
    <div
      className={['inline-flex items-center justify-center rounded-full flex-shrink-0 font-bold text-white', className]
        .filter(Boolean)
        .join(' ')}
      style={{ width: px, height: px, backgroundColor: bg, fontSize }}
      aria-label={`Avatar for ${name}`}
    >
      {initials}
    </div>
  );
}

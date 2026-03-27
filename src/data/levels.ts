// ── GymIQV6V6 — Level Data ──────────────────────────────────────────────────

/** Cumulative XP required to reach each level (index 0 = Level 1) */
export const XP_THRESHOLDS = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3700, 5000];

export const MAX_LEVEL = 10;

export interface LevelData {
  level: number;
  xpRequired: number;  // cumulative XP to reach this level
  label: string;
}

export const LEVELS: LevelData[] = [
  { level: 1,  xpRequired: 0,    label: 'Rookie'         },
  { level: 2,  xpRequired: 100,  label: 'Newcomer'       },
  { level: 3,  xpRequired: 250,  label: 'Trainee'        },
  { level: 4,  xpRequired: 500,  label: 'Lifter'         },
  { level: 5,  xpRequired: 900,  label: 'Athlete'        },
  { level: 6,  xpRequired: 1400, label: 'Competitor'     },
  { level: 7,  xpRequired: 2000, label: 'Advanced'       },
  { level: 8,  xpRequired: 2800, label: 'Expert'         },
  { level: 9,  xpRequired: 3700, label: 'Elite'          },
  { level: 10, xpRequired: 5000, label: 'Iron Mind'      },
];

/** Returns the label for a given level number */
export function getLevelLabel(level: number): string {
  return LEVELS.find((l) => l.level === level)?.label ?? 'Trainer';
}

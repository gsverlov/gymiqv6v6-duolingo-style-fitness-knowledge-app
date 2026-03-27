import { X, CheckCircle2, Circle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sheet } from '../ui/Sheet';
import { Button } from '../ui/Button';
import type { UnitWithProgress, Lesson } from '../../types';

interface UnitPreviewSheetProps {
  unit: UnitWithProgress | null;
  onClose: () => void;
}

function getLessonStatus(
  lesson: Lesson,
  unit: UnitWithProgress
): 'completed' | 'locked' | 'available' {
  if (unit.nodeState === 'locked') return 'locked';
  // Check if this lesson is in a completed unit or has individual progress
  if (unit.nodeState === 'completed') return 'completed';
  if (unit.nodeState === 'in_progress' && unit.progress) {
    const completedCount = unit.progress.lessons_completed;
    if (lesson.sort_order <= completedCount) return 'completed';
  }
  return 'available';
}

function getFirstIncompleteLesson(unit: UnitWithProgress): Lesson | null {
  if (!unit.lessons.length) return null;
  if (unit.nodeState === 'completed') {
    return unit.lessons[0];
  }
  if (unit.progress) {
    const completedCount = unit.progress.lessons_completed;
    const nextLesson = unit.lessons.find((l) => l.sort_order > completedCount);
    return nextLesson ?? unit.lessons[0];
  }
  return unit.lessons[0];
}

export function UnitPreviewSheet({ unit, onClose }: UnitPreviewSheetProps) {
  const navigate = useNavigate();

  const open = unit !== null;

  if (!unit) {
    return <Sheet open={false} onClose={onClose}>{null}</Sheet>;
  }

  const startLesson = unit.lessons.length > 0 ? getFirstIncompleteLesson(unit) : null;

  const buttonText =
    unit.nodeState === 'completed'
      ? 'Practice Unit'
      : unit.nodeState === 'in_progress'
      ? 'Continue Unit'
      : 'Start Lesson';

  const handleStart = () => {
    if (!startLesson) return;
    onClose();
    navigate(`/lesson/${startLesson.id}`);
  };

  return (
    <Sheet open={open} onClose={onClose}>
      <div className="p-6">
        {/* Close button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: '#2a2a4a', color: '#afafaf' }}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Unit header */}
        <div className="flex flex-col items-center text-center mb-6">
          <span style={{ fontSize: 64, lineHeight: 1, marginBottom: 12 }}>{unit.emoji}</span>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: '#ffffff',
              margin: 0,
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            {unit.title}
          </h2>
          {unit.description && (
            <p
              style={{
                fontSize: 14,
                color: '#afafaf',
                marginTop: 8,
                lineHeight: 1.5,
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              {unit.description}
            </p>
          )}
        </div>

        {/* Lessons list */}
        <div className="mb-6">
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#6b6b8a',
              letterSpacing: '0.08em',
              marginBottom: 12,
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            LESSONS IN THIS UNIT
          </p>
          <div className="flex flex-col gap-2">
            {unit.lessons.map((lesson, idx) => {
              const status = getLessonStatus(lesson, unit);
              return (
                <div
                  key={lesson.id}
                  className="flex items-center gap-3 py-2 px-3 rounded-xl"
                  style={{ background: '#16213e' }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#6b6b8a',
                      width: 20,
                      flexShrink: 0,
                      fontFamily: 'Nunito, sans-serif',
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontSize: 14,
                      fontWeight: 600,
                      color: status === 'locked' ? '#6b6b8a' : '#ffffff',
                      fontFamily: 'Nunito, sans-serif',
                    }}
                  >
                    {lesson.title}
                  </span>
                  {status === 'completed' && (
                    <CheckCircle2 size={18} color="#58cc02" />
                  )}
                  {status === 'locked' && (
                    <Lock size={16} color="#6b6b8a" />
                  )}
                  {status === 'available' && (
                    <Circle size={18} color="#2a2a4a" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Start button */}
        {unit.nodeState !== 'locked' && (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleStart}
            disabled={!startLesson}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </Sheet>
  );
}

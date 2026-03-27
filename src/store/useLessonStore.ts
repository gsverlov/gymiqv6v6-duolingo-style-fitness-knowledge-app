import { create } from 'zustand';
import type { QuestionWithChoices, LessonPhase } from '../types';

interface LessonState {
  lessonId: string | null;
  questions: QuestionWithChoices[];
  currentIndex: number;
  correctCount: number;
  wrongCount: number;
  phase: LessonPhase;
  lastAnswerCorrect: boolean | null;
  lastCorrectAnswer: string | null;
  lastExplanation: string | null;
  xpEarned: number;
  isPractice: boolean;

  initLesson: (lessonId: string, questions: QuestionWithChoices[], isPractice: boolean) => void;
  submitAnswer: (isCorrect: boolean, correctAnswer: string, explanation: string, xp: number) => void;
  nextQuestion: () => void;
  finishLesson: () => void;
  resetLesson: () => void;
  setPhase: (phase: LessonPhase) => void;
}

export const useLessonStore = create<LessonState>((set, get) => ({
  lessonId: null,
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  wrongCount: 0,
  phase: 'loading',
  lastAnswerCorrect: null,
  lastCorrectAnswer: null,
  lastExplanation: null,
  xpEarned: 0,
  isPractice: false,

  initLesson: (lessonId, questions, isPractice) =>
    set({
      lessonId,
      questions,
      currentIndex: 0,
      correctCount: 0,
      wrongCount: 0,
      phase: 'question',
      lastAnswerCorrect: null,
      lastCorrectAnswer: null,
      lastExplanation: null,
      xpEarned: 0,
      isPractice,
    }),

  submitAnswer: (isCorrect, correctAnswer, explanation, xp) =>
    set((state) => ({
      correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
      wrongCount: !isCorrect ? state.wrongCount + 1 : state.wrongCount,
      xpEarned: state.xpEarned + xp,
      lastAnswerCorrect: isCorrect,
      lastCorrectAnswer: correctAnswer,
      lastExplanation: explanation,
      phase: 'feedback',
    })),

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      set({ phase: 'complete' });
    } else {
      set({ currentIndex: nextIndex, phase: 'question', lastAnswerCorrect: null });
    }
  },

  finishLesson: () => set({ phase: 'complete' }),

  resetLesson: () =>
    set({
      lessonId: null,
      questions: [],
      currentIndex: 0,
      correctCount: 0,
      wrongCount: 0,
      phase: 'loading',
      lastAnswerCorrect: null,
      lastCorrectAnswer: null,
      lastExplanation: null,
      xpEarned: 0,
      isPractice: false,
    }),

  setPhase: (phase) => set({ phase }),
}));

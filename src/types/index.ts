export type QuestionType =
  | 'visual-multiple-choice'
  | 'text-multiple-choice'
  | 'open-ended'
  | 'visual-open-ended'
  | 'drawing';

export interface QuestionOption {
  id: string;
  text?: string;       // For text options
  imageUrl?: string;   // For visual options
  symbol?: string;     // For symbolic options (e.g., "△")
}

export interface Question {
  id: string;
  dimension: string;
  dimensionName: string;
  text?: string;
  memorize?: string;   // sequence shown in phase-1 before the question is revealed
  type?: QuestionType;
  imageUrl?: string;
  options: QuestionOption[];
  correctAnswer: string | string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  timeLimit: number | null;
  explanation?: string | null;
}

export interface Dimension {
  id: string;
  name: string;
  description: string;
  weight: number; // e.g. 0.10, 0.15
  questions: Question[];
}

export interface UserAnswer {
  questionId: string;
  answer: string | string[] | null; // null = skipped
  timeTaken?: number; // in ms
}

export interface Score {
  dimension: string;
  rawScore: number;
  normalizedScore: number; // 0-100
  percentile?: number;
  interpretation: string;
}

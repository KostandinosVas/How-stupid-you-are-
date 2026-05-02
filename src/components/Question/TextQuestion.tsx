import { useState } from 'react';
import styles from './Question.module.css';
import { Question } from '@/types';

interface TextQuestionProps {
  question: Question;
  onAnswer: (answerId: string) => void;
}

export default function TextQuestion({ question, onAnswer }: TextQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSelect = (answerId: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerId);
    onAnswer(answerId);
  };

  return (
    <div className={styles.questionCard}>
      {question.text && (
        <p className={styles.questionText}>{question.text}</p>
      )}
      <div className={styles.optionsGrid}>
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`${styles.optionButton} ${
              selectedAnswer === option.id ? styles.selected : ''
            }`}
            disabled={selectedAnswer !== null}
            aria-label={`Option ${option.id}`}
          >
            {option.text ?? option.symbol}
          </button>
        ))}
      </div>
    </div>
  );
}
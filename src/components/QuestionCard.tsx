import type { Question } from '../data/quizData';
import { AnswerButton } from './AnswerButton';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
  question: Question;
  selectedIndex: number | null;
  onAnswer: (index: number) => void;
  visible: boolean;
}

export function QuestionCard({ question, selectedIndex, onAnswer, visible }: QuestionCardProps) {
  const getState = (index: number) => {
    if (selectedIndex === null) return 'default';
    if (index === question.correctIndex) return 'correct';
    if (index === selectedIndex) return 'incorrect';
    return 'disabled';
  };

  return (
    <div className={`${styles.card} ${visible ? styles.visible : styles.hidden}`}>
      <p className={styles.question}>{question.text}</p>
      <div className={styles.options}>
        {question.options.map((option, i) => (
          <AnswerButton
            key={i}
            index={i}
            text={option}
            state={getState(i)}
            onClick={() => onAnswer(i)}
          />
        ))}
      </div>
    </div>
  );
}

import type { Question } from '../data/quizData';
import { TextAnswerInput } from './TextAnswerInput';
import type { FeedbackState } from './TextAnswerInput';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
  question: Question;
  feedbackState: FeedbackState;
  inputResetKey: number;
  onAnswer: (userInput: string) => void;
  visible: boolean;
}

export function QuestionCard({ question, feedbackState, inputResetKey, onAnswer, visible }: QuestionCardProps) {
  return (
    <div className={`${styles.card} ${visible ? styles.visible : styles.hidden}`}>
      <p className={styles.question}>{question.text}</p>
      <TextAnswerInput key={inputResetKey} feedbackState={feedbackState} onAnswer={onAnswer} />
    </div>
  );
}

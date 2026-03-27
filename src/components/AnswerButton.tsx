import styles from './AnswerButton.module.css';

interface AnswerButtonProps {
  text: string;
  onClick: () => void;
  state: 'default' | 'correct' | 'incorrect' | 'disabled';
  index: number;
}

const LABELS = ['A', 'B', 'C', 'D'];

export function AnswerButton({ text, onClick, state, index }: AnswerButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[state]}`}
      onClick={state === 'default' ? onClick : undefined}
      disabled={state === 'disabled'}
      aria-label={`Option ${LABELS[index]}: ${text}`}
    >
      <span className={styles.label}>{LABELS[index]}</span>
      <span className={styles.text}>{text}</span>
    </button>
  );
}

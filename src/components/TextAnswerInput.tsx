import { useState, useEffect, useRef } from 'react';
import styles from './TextAnswerInput.module.css';

export type FeedbackState = 'idle' | 'correct' | 'incorrect';

interface TextAnswerInputProps {
  feedbackState: FeedbackState;
  onAnswer: (value: string) => void;
}

export function TextAnswerInput({ feedbackState, onAnswer }: TextAnswerInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when it is first mounted (new question or after reset)
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || feedbackState !== 'idle') return;
    onAnswer(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputRow}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={feedbackState !== 'idle'}
          className={`${styles.input} ${feedbackState !== 'idle' ? styles[feedbackState] : ''}`}
          placeholder="Deine Antwort …"
          autoComplete="off"
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={feedbackState !== 'idle' || !value.trim()}
          aria-label="Antwort prüfen"
        >
          ✓
        </button>
      </div>
      {feedbackState === 'correct' && (
        <p className={styles.feedbackCorrect}>✓ Richtig!</p>
      )}
      {feedbackState === 'incorrect' && (
        <p className={styles.feedbackIncorrect}>✗ Falsch – versuch es nochmal!</p>
      )}
    </form>
  );
}

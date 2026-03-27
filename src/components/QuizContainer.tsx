import { useState, useCallback } from 'react';
import { questions } from '../data/quizData';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { PuzzleBoard } from './PuzzleBoard';
import type { FeedbackState } from './TextAnswerInput';
import styles from './QuizContainer.module.css';

type Phase = 'question' | 'transitioning' | 'puzzle';

/** Fold German umlauts and normalise decimal separators so comparisons
 *  are accent-insensitive and accept "2.5" as well as "2,5".
 *  Applied to BOTH the user input and the correctAnswer before comparing. */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/ü/g, 'u')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ß/g, 'ss')
    .replace(/\./g, ','); // accept "2.5" as well as "2,5"
}

function checkAnswer(userInput: string, correctAnswer: string): boolean {
  return normalize(userInput).includes(normalize(correctAnswer));
}

export function QuizContainer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackState, setFeedbackState] = useState<FeedbackState>('idle');
  const [inputResetKey, setInputResetKey] = useState(0);
  const [phase, setPhase] = useState<Phase>('question');
  const [cardVisible, setCardVisible] = useState(true);
  const [puzzleAnimate, setPuzzleAnimate] = useState(false);

  const isLastQuestion = currentIndex === questions.length - 1;
  const currentQuestion = questions[currentIndex];

  const handleAnswer = useCallback(
    (userInput: string) => {
      if (feedbackState !== 'idle' || phase !== 'question') return;

      const isCorrect = checkAnswer(userInput, currentQuestion.correctAnswer);

      if (isCorrect) {
        setFeedbackState('correct');
        if (navigator.vibrate) navigator.vibrate(80);

        if (isLastQuestion) {
          setTimeout(() => {
            setCardVisible(false);
            setTimeout(() => {
              setPhase('puzzle');
              setPuzzleAnimate(true);
            }, 400);
          }, 1200);
        } else {
          setTimeout(() => {
            setPhase('transitioning');
            setCardVisible(false);
            setTimeout(() => {
              setCurrentIndex((prev) => prev + 1);
              setFeedbackState('idle');
              setCardVisible(true);
              setPhase('question');
            }, 400);
          }, 1500);
        }
      } else {
        setFeedbackState('incorrect');
        // Re-enable input after a short delay; remount it so the typed text clears
        setTimeout(() => {
          setFeedbackState('idle');
          setInputResetKey((k) => k + 1);
        }, 1200);
      }
    },
    [feedbackState, phase, currentQuestion, isLastQuestion]
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setFeedbackState('idle');
    setInputResetKey((k) => k + 1);
    setPhase('question');
    setCardVisible(true);
    setPuzzleAnimate(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badge}>🔍 Detektiv-Quiz</div>
      </header>

      {phase !== 'puzzle' && (
        <ProgressBar current={currentIndex + 1} total={questions.length} />
      )}

      <main className={styles.main}>
        {phase !== 'puzzle' ? (
          <QuestionCard
            key={currentIndex}
            question={currentQuestion}
            feedbackState={feedbackState}
            inputResetKey={inputResetKey}
            onAnswer={handleAnswer}
            visible={cardVisible}
          />
        ) : (
          <>
            <PuzzleBoard animate={puzzleAnimate} />
            <button className={styles.restartButton} onClick={handleRestart}>
              🔄 Neu starten
            </button>
          </>
        )}
      </main>
    </div>
  );
}

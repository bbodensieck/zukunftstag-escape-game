import { useState, useEffect, useCallback } from 'react';
import { questions } from '../data/quizData';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { PuzzleBoard } from './PuzzleBoard';
import styles from './QuizContainer.module.css';

type Phase = 'question' | 'transitioning' | 'puzzle';

export function QuizContainer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('question');
  const [cardVisible, setCardVisible] = useState(true);
  const [puzzleAnimate, setPuzzleAnimate] = useState(false);

  const isLastQuestion = currentIndex === questions.length - 1;
  const currentQuestion = questions[currentIndex];

  const handleAnswer = useCallback(
    (index: number) => {
      if (selectedIndex !== null || phase !== 'question') return;
      setSelectedIndex(index);

      const isCorrect = index === currentQuestion.correctIndex;

      // Vibration on mobile
      if (isCorrect && navigator.vibrate) {
        navigator.vibrate(80);
      }

      if (isCorrect && isLastQuestion) {
        // Trigger puzzle after short delay
        setTimeout(() => {
          setCardVisible(false);
          setTimeout(() => {
            setPhase('puzzle');
            setPuzzleAnimate(true);
          }, 400);
        }, 1200);
      } else {
        // Move to next question after delay
        setTimeout(() => {
          setPhase('transitioning');
          setCardVisible(false);
          setTimeout(() => {
            if (!isLastQuestion) {
              setCurrentIndex((prev) => prev + 1);
            }
            setSelectedIndex(null);
            setCardVisible(true);
            setPhase('question');
          }, 400);
        }, 1500);
      }
    },
    [selectedIndex, phase, currentQuestion, isLastQuestion]
  );

  // Ensure card starts visible
  useEffect(() => {
    setCardVisible(true);
  }, [currentIndex]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
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
            question={currentQuestion}
            selectedIndex={selectedIndex}
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

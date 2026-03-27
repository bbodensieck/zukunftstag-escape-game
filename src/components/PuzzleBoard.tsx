import { useEffect, useState } from 'react';
import styles from './PuzzleBoard.module.css';

interface PuzzleCell {
  row: number;
  col: number;
  emoji: string;
  isMissing: boolean;
}

// 3×3 detective-themed grid. Position [2][2] is the missing piece.
const PUZZLE_EMOJIS = [
  ['🔍', '🗂️', '🖊️'],
  ['🔦', '🕵️', '📋'],
  ['🗝️', '👣', '⭐'],
];

const MISSING_ROW = 2;
const MISSING_COL = 2;

function buildCells(): PuzzleCell[] {
  const cells: PuzzleCell[] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      cells.push({
        row: r,
        col: c,
        emoji: PUZZLE_EMOJIS[r][c],
        isMissing: r === MISSING_ROW && c === MISSING_COL,
      });
    }
  }
  return cells;
}

interface PuzzleBoardProps {
  animate: boolean;
}

export function PuzzleBoard({ animate }: PuzzleBoardProps) {
  const [pieceVisible, setPieceVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (animate) {
      const t1 = setTimeout(() => setPieceVisible(true), 400);
      const t2 = setTimeout(() => setShowSuccess(true), 1400);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [animate]);

  const cells = buildCells();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>🕵️ Das Puzzle</h2>
      <div className={styles.grid}>
        {cells.map((cell) => {
          if (cell.isMissing) {
            return (
              <div
                key={`${cell.row}-${cell.col}`}
                className={`${styles.cell} ${styles.missingSlot} ${pieceVisible ? styles.filled : ''}`}
              >
                <span className={styles.emoji}>{cell.emoji}</span>
              </div>
            );
          }
          return (
            <div key={`${cell.row}-${cell.col}`} className={styles.cell}>
              <span className={styles.emoji}>{cell.emoji}</span>
            </div>
          );
        })}
      </div>

      {showSuccess && (
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>🏆</div>
          <div className={styles.successText}>Fall gelöst!</div>
          <div className={styles.successSubtext}>Mission erfolgreich!</div>
        </div>
      )}
    </div>
  );
}

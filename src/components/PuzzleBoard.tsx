import { useEffect, useState } from 'react';
import styles from './PuzzleBoard.module.css';

// Size of each puzzle piece cell in SVG user units
const CELL = 90;
// How far the jigsaw tab protrudes
const T = CELL * 0.27;
// Half the tab neck width
const N = CELL * 0.13;

// Piece connections: [top, right, bottom, left]
// 0 = flat (outer edge), 1 = tab (protrudes outward), -1 = blank (indents inward)
// Each shared edge must sum to 0: one side has 1, the adjacent side has -1.
const CONNECTIONS: [number, number, number, number][][] = [
  [[0, 1, 1, 0],    [0, 1, -1, -1],  [0, 0, 1, -1]],
  [[-1, 1, -1, 0],  [1, -1, 1, -1],  [-1, 0, -1, 1]],
  [[1, -1, 0, 0],   [-1, 1, 0, 1],   [1, 0, 0, -1]],
];

const GRID_SIZE = 3;

const MISSING_ROW = 2;
const MISSING_COL = 2;

// Piece colour palette
const COLOR_PIECE_FILL = '#0f3f72';
const COLOR_PIECE_STROKE = '#2f7fc3';
const COLOR_SLOT_FILL = '#051c34';
const COLOR_SLOT_STROKE = '#40c0ff';
const COLOR_FINAL_FILL = '#0d4b74';
const COLOR_FINAL_STROKE = '#f2ca3c';

/**
 * Generate the SVG path for a single jigsaw piece.
 * The piece occupies the bounding box (0,0)→(CELL,CELL) in local coordinates.
 * Tabs protrude outside this box; blanks indent into it.
 */
function jigsawPath(top: number, right: number, bottom: number, left: number): string {
  const W = CELL;
  const H = CELL;
  const segs: string[] = ['M 0 0'];

  // Top edge: (0,0) → (W,0)
  if (top === 0) {
    segs.push(`L ${W} 0`);
  } else {
    const d = -top; // tab=1 → d=−1 (up); blank=−1 → d=1 (down)
    segs.push(
      `L ${W / 2 - N} 0`,
      `C ${W / 2 - N} ${d * T * 0.4} ${W / 2 - T * 0.6} ${d * T} ${W / 2} ${d * T}`,
      `C ${W / 2 + T * 0.6} ${d * T} ${W / 2 + N} ${d * T * 0.4} ${W / 2 + N} 0`,
      `L ${W} 0`,
    );
  }

  // Right edge: (W,0) → (W,H)
  if (right === 0) {
    segs.push(`L ${W} ${H}`);
  } else {
    const d = right; // tab=1 → d=1 (right); blank=−1 → d=−1 (left)
    segs.push(
      `L ${W} ${H / 2 - N}`,
      `C ${W + d * T * 0.4} ${H / 2 - N} ${W + d * T} ${H / 2 - T * 0.6} ${W + d * T} ${H / 2}`,
      `C ${W + d * T} ${H / 2 + T * 0.6} ${W + d * T * 0.4} ${H / 2 + N} ${W} ${H / 2 + N}`,
      `L ${W} ${H}`,
    );
  }

  // Bottom edge: (W,H) → (0,H)
  if (bottom === 0) {
    segs.push(`L 0 ${H}`);
  } else {
    const d = bottom; // tab=1 → d=1 (down); blank=−1 → d=−1 (up)
    segs.push(
      `L ${W / 2 + N} ${H}`,
      `C ${W / 2 + N} ${H + d * T * 0.4} ${W / 2 + T * 0.6} ${H + d * T} ${W / 2} ${H + d * T}`,
      `C ${W / 2 - T * 0.6} ${H + d * T} ${W / 2 - N} ${H + d * T * 0.4} ${W / 2 - N} ${H}`,
      `L 0 ${H}`,
    );
  }

  // Left edge: (0,H) → (0,0)
  if (left === 0) {
    segs.push('L 0 0');
  } else {
    const d = -left; // tab=1 → d=−1 (left); blank=−1 → d=1 (right)
    segs.push(
      `L 0 ${H / 2 + N}`,
      `C ${d * T * 0.4} ${H / 2 + N} ${d * T} ${H / 2 + T * 0.6} ${d * T} ${H / 2}`,
      `C ${d * T} ${H / 2 - T * 0.6} ${d * T * 0.4} ${H / 2 - N} 0 ${H / 2 - N}`,
      'L 0 0',
    );
  }

  segs.push('Z');
  return segs.join(' ');
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

  const SVG_SIZE = CELL * 3;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>🕵️ Das Puzzle</h2>
      <div className={styles.svgWrapper}>
        <svg
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          className={styles.puzzleSvg}
          aria-label="Jigsaw puzzle"
        >
          <defs>
            <filter id="pieceShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.5" />
            </filter>
          </defs>

          {Array.from({ length: GRID_SIZE }, (_, r) =>
            Array.from({ length: GRID_SIZE }, (_, c) => {
              const [tp, rg, bt, lt] = CONNECTIONS[r][c];
              const pathD = jigsawPath(tp, rg, bt, lt);
              const isMissing = r === MISSING_ROW && c === MISSING_COL;
              const tx = c * CELL;
              const ty = r * CELL;

              if (isMissing && !pieceVisible) {
                // Empty slot: dashed outline only
                return (
                  <g key={`${r}-${c}`} transform={`translate(${tx} ${ty})`}>
                    <path
                      d={pathD}
                      fill={COLOR_SLOT_FILL}
                      stroke={COLOR_SLOT_STROKE}
                      strokeWidth="2"
                      strokeDasharray="5 3"
                    />
                  </g>
                );
              }

              return (
                <g
                  key={`${r}-${c}`}
                  transform={`translate(${tx} ${ty})`}
                  filter="url(#pieceShadow)"
                >
                  <g className={isMissing && pieceVisible ? styles.dropIn : undefined}>
                    <path
                      d={pathD}
                      fill={isMissing ? COLOR_FINAL_FILL : COLOR_PIECE_FILL}
                      stroke={isMissing ? COLOR_FINAL_STROKE : COLOR_PIECE_STROKE}
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </g>
                </g>
              );
            }),
          )}
        </svg>
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

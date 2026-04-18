import { useEffect, useRef } from 'react';
import styles from './VictoryScreen.module.css';

interface VictoryScreenProps {
  onRestart: () => void;
}

export function VictoryScreen({ onRestart }: VictoryScreenProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('zukunftstag-song.mp3');
    audio.loop = true;
    audioRef.current = audio;
    audio.play().catch(() => {
      // Autoplay may be blocked by the browser; silently ignore
    });
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <img
        src="festnahme.png"
        alt="Festnahme der Gangster"
        className={styles.image}
      />
      <div className={styles.message}>
        <div className={styles.icon}>🏆</div>
        <div className={styles.title}>Fall gelöst!</div>
        <div className={styles.subtitle}>Die Gangster wurden gefasst!</div>
      </div>
      <button className={styles.restartButton} onClick={onRestart}>
        🔄 Neu starten
      </button>
    </div>
  );
}

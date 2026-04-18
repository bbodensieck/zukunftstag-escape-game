import styles from './VictoryScreen.module.css';

interface VictoryScreenProps {
  onRestart: () => void;
}

export function VictoryScreen({ onRestart }: VictoryScreenProps) {
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
      <audio
        className={styles.audioPlayer}
        autoPlay
        controls
        loop
        src="zukunftstag-song.mp3"
      />
      <button className={styles.restartButton} onClick={onRestart}>
        🔄 Neu starten
      </button>
    </div>
  );
}

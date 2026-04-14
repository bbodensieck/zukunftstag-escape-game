import styles from './SplashScreen.module.css';

interface SplashScreenProps {
  onStart: () => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <div className={styles.wrapper}>
      <img
        src="blaues-juwel.png"
        alt="Blaues Juwel"
        className={styles.image}
      />
      <button className={styles.startButton} onClick={onStart}>
        Quiz starten
      </button>
    </div>
  );
}

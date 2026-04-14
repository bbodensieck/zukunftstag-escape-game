export interface Question {
  id: number;
  text: string;
  /** Keyword that must appear (case-insensitive) somewhere in the user's answer. */
  correctAnswer: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Station LFZ: Wie heißt die Meldende aus dem Landesmuseum mit Namen?",
    correctAnswer: "Jansen",
  },
  {
    id: 2,
    text: "Station Spurensicherung: Von welcher Marke war die kleinere Schuhabdruckspur?",
    correctAnswer: "Adidas",
  },
  {
    id: 3,
    text: "Station Videoauswertung: Ist die Täterin Linkshänderin oder Rechtshänderin?",
    correctAnswer: "Rechtshänderin",
  },
  {
    id: 4,
    text: "Station Verwaltung: Wie lautet der Name der Putzfirma?",
    correctAnswer: "Glanzwerk",
  },
  {
    id: 5,
    text: "Station Zeugenvernehmung: Wie ist der Spitzname der Täterin?",
    correctAnswer: "Tina",
  },
  {
    id: 6,
    text: "Station Fahrzeuge/Ausrüstung: Welches ist das wichtigste Einsatzmittel für einen Polizeibeamten im Streifendienst?",
    correctAnswer: "Funkgerät",
  },
  {
    id: 7,
    text: "Station aktive Fragerunde: Wer ist von der Polizei in der Regel zuerst am Einsatzort? (Abkürzung)",
    correctAnswer: "ESD",
  },
  {
    id: 8,
    text: "Station PG: Welches Tier zeigt das Tattoo des männlichen Täters?",
    correctAnswer: "Schlange",
  },
];

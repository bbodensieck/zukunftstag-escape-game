export interface Question {
  id: number;
  text: string;
  /** Keyword that must appear (case-insensitive) somewhere in the user's answer. */
  correctAnswer: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Ein Verdächtiger hinterließ am Tatort Spuren. Welche Spur ist am häufigsten auswertbar?",
    correctAnswer: "Fingerabdruck",
  },
  {
    id: 2,
    text: "Der Täter floh um 23:47 Uhr. Wie nennt man diesen Zeitraum im Polizeijargon?",
    correctAnswer: "Tatzeit",
  },
  {
    id: 3,
    text: "Ein Verdächtiger hat ein auffälliges Tattoo. Welches Tier ist darauf zu sehen?",
    correctAnswer: "Schlange",
  },
  {
    id: 4,
    text: "Die Detektivin muss 5 Zeugen befragen. Sie schafft 2 Befragungen pro Stunde. Wie viele Stunden braucht sie?",
    correctAnswer: "2,5",
  },
  {
    id: 5,
    text: "Ein Zeuge beschreibt den Fluchtwagen als 'einen dunklen Wagen mit vier Türen'. Welche Fahrzeugklasse ist das?",
    correctAnswer: "Limousine",
  },
  {
    id: 6,
    text: "Im Tagebuch steht: 'Das Treffen war drei Tage vor Freitag.' An welchem Wochentag fand es statt?",
    correctAnswer: "Dienstag",
  },
  {
    id: 7,
    text: "Welcher Fachbereich der Wissenschaft hilft bei der Analyse von Tatortspuren wie DNA und Fingerabdrücken?",
    correctAnswer: "Forensik",
  },
  {
    id: 8,
    text: "Das letzte Puzzlestück wurde gefunden! Welcher Angestellte des Hauses hatte Zugang zum Garten und zum Hintereingang?",
    correctAnswer: "Gärtner",
  },
];

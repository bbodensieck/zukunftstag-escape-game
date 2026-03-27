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
    text: "Das letzte Puzzlestück wurde gefunden! Welcher Angestellte des Hauses hatte Zugang zum Garten und zum Hintereingang?",
    correctAnswer: "Gärtner",
  },
];

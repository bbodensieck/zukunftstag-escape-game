export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Ein Verdächtiger hinterließ am Tatort Spuren. Welche Spur ist am häufigsten auswertbar?",
    options: ["Fingerabdrücke", "Haarproben", "Schuhspuren", "DNA-Proben"],
    correctIndex: 0,
  },
  {
    id: 2,
    text: "Der Täter floh um 23:47 Uhr. Wie nennt man diesen Zeitraum im Polizeijargon?",
    options: ["Mitternacht", "Tatzeit", "Fluchtzeit", "Nullstunde"],
    correctIndex: 1,
  },
  {
    id: 3,
    text: "Am Tatort wurde ein verschlüsselter Code gefunden: 3-1-19-5. Welcher Buchstabe entspricht der Zahl 19?",
    options: ["R", "S", "T", "U"],
    correctIndex: 1,
  },
  {
    id: 4,
    text: "Die Detektivin muss 5 Zeugen befragen. Sie schafft 2 Befragungen pro Stunde. Wie lange braucht sie?",
    options: ["1,5 Stunden", "2 Stunden", "2,5 Stunden", "3 Stunden"],
    correctIndex: 2,
  },
  {
    id: 5,
    text: "Ein Zeuge beschreibt den Fluchtwagen als 'einen dunklen Wagen mit vier Türen'. Welche Fahrzeugklasse ist das?",
    options: ["Coupé", "Limousine", "Kombi", "Cabrio"],
    correctIndex: 1,
  },
  {
    id: 6,
    text: "Im Tagebuch des Verdächtigen steht: 'Ich traf X am Dienstag, drei Tage vor dem Freitag'. An welchem Tag war das Treffen?",
    options: ["Montag", "Dienstag", "Mittwoch", "Donnerstag"],
    correctIndex: 1,
  },
  {
    id: 7,
    text: "Der Kriminalist findet ein Beweisstück, das 48 Stunden alt ist. Wie lange liegt es dort in Tagen?",
    options: ["1 Tag", "2 Tage", "3 Tage", "4 Tage"],
    correctIndex: 1,
  },
  {
    id: 8,
    text: "Das letzte Puzzlestück wurde gefunden! Wer hat den Auftrag gegeben?",
    options: ["Der Butler", "Die Haushälterin", "Der Gärtner", "Der Doktor"],
    correctIndex: 2,
  },
];

// ============================================================
// SHSG ESCAPE ROOM — ZENTRALE KONFIGURATION
// ============================================================

export const DOORS = {

  // ── ERDGESCHOSS — Team neuer Vorstand ──────────────────────

  'eg-start': {
    id: 'eg-start',
    team: 'EG',
    teamLabel: 'Neuer Vorstand',
    number: '★',
    title: 'Eingang Erdgeschoss',
    room: 'Terrasse → 05-001',
    unlockCode: 'DELTA EINS',
    successMessage: 'Zugang gewährt. Willkommen im Gebäude.',
    nextDoor: 'eg-1',
    nextLabel: 'Raum 05-001 — Der Drucker lügt',
    briefing: `MISSION BRIEFING — TEAM NEUER VORSTAND

Das alte Präsidium hat die Amtsgewalt der SHSG in einem gesicherten
Archiv im Untergeschoss hinterlegt.

Euer Auftrag: Verschafft euch Zugang zum Gebäude, sichert alle
Codeteile, und öffnet gemeinsam mit dem alten Vorstand den Tresor.

Der alte Vorstand wartet bereits im Untergeschoss.
Kommuniziert via Walkie Talkie. Vertraut niemandem — ausser euch.

Viel Erfolg.`,
    puzzle: {
      type: 'intercom',
      scenario: 'Die Operation beginnt draussen. An der Sprechanlage hängen die Namen aller, die dieses Amt je getragen haben. Einer hat den Einlasscode hinterlassen — verschlüsselt in der Logik der Übergaben.',
      data: {},
    },
    hints: [
      'Das NATO-Panel ist ausklappbar. Der Code = ein NATO-Wort + eine Zahl als Wort.',
      'Zähl die abgeschlossenen Übergaben zwischen den fünf Schildern. Übersetz die Zahl ins NATO-Alphabet.',
      'Vier vollendete Übergaben → DELTA. Neuer Vorstand, erste Amtszeit → EINS.',
    ],
    gmHint: 'Lösung: DELTA EINS — 4 vollendete Übergaben (1→2, 2→3, 3→4, 4→5) = D im NATO = DELTA. Neue Amtszeit #1 = EINS.',
  },

  'eg-1': {
    id: 'eg-1',
    team: 'EG',
    teamLabel: 'Neuer Vorstand',
    number: '1',
    title: 'Der Drucker lügt',
    room: '05-001 · Büro · 20.7 m²',
    roomCode: 'TONER',
    unlockCode: '4',
    successMessage: 'Quorum verifiziert.',
    revealAfterSolve: 'CODEWORT A = ATLAS',
    nextDoor: 'eg-2',
    nextLabel: 'Raum 05-002 — Bänziger & Irrgang',
    puzzle: {
      type: 'documents',
      scenario: 'Im Vorzimmer hat ein Drucker dreimal dasselbe Statut ausgespuckt — die Versionen weichen voneinander ab. Nur eine entspricht den echten SHSG-Statuten. Findet die echte, dann findet ihr die Zahl.',
      data: { correctIndex: 0 },
    },
    hints: [
      'Nicht jeder Unterschied ist inhaltlich — manchmal verrät die Grammatik die Fälschung.',
      'Vergleicht die Zahlen UND den Dativ: «mit drei weiteren Vorstandsmitgliedern».',
      'Der fehlerfreie Ausdruck nennt ein Quorum (Mindestzahl Anwesende). Das ist eure Ziffer.',
    ],
    gmHint: 'Richtig: Ausdruck I. Quorum = 4. Ausdruck II = falsche Zahlen (Quorum 5). Ausdruck III = falsche Zahlen (Quorum 3) + Grammatikfehler («Vorstandsmitglieder» statt «Vorstandsmitgliedern»).',
  },

  'eg-2': {
    id: 'eg-2',
    team: 'EG',
    teamLabel: 'Neuer Vorstand',
    number: '2',
    title: 'Bänziger & Irrgang',
    room: '05-002 · Büro · 19.5 m²',
    roomCode: 'NOTIZ',
    unlockCode: '3',
    successMessage: 'Position gesichert.',
    revealAfterSolve: 'CODEWORT B = KLANG',
    nextDoor: 'eg-3',
    nextLabel: 'Raum 05-004 — Das Sitzungszimmer',
    puzzle: {
      type: 'postit',
      scenario: 'Dieses Büro teilen sich Manuel Bänziger und David Irrgang. Beide haben eine Notiz hinterlassen — und sie widersprechen sich. Nur das UG-Team hat die Liste, die den Streit entscheidet. Funkt sie an.',
      data: {},
    },
    hints: [
      '«Jüngst» = zuletzt eingeführt, nicht alphabetisch. Welches Ressort ist das?',
      'Funkt das UG-Team an — sie haben die vollständige nummerierte Ressort-Liste.',
      'Nachhaltigkeit ist das jüngste Ressort. Schaut, auf welcher Position es in der UG-Liste steht.',
    ],
    gmHint: 'Nachhaltigkeit = jüngstes Ressort. In UG-3 Panel B auf Position 3. Antwort: 3. Codewort B: KLANG.',
  },

  'eg-3': {
    id: 'eg-3',
    team: 'EG',
    teamLabel: 'Neuer Vorstand',
    number: '3',
    title: 'Das Sitzungszimmer',
    room: '05-004 · Büro SKK · 16.5 m²',
    roomCode: 'BOARD',
    unlockCode: '17',
    successMessage: 'Gleichung verifiziert.',
    nextDoor: 'eg-4',
    nextLabel: 'Raum 05-005 — Die Schaltzentrale',
    puzzle: {
      type: 'equation',
      scenario: 'Auf dem Whiteboard steht eine Gleichung. Die fehlende Zahl ist zu ermitteln.',
      data: {},
    },
    hints: [
      'Die fehlende Zahl ? steht in Verbindung mit der HSG-Führungsstruktur.',
      'Wie viele Personen haben das Rektorenamt der Universität St.Gallen seit 2016 bekleidet?',
      'Bieger (bis 2020), Ehrenzeller (2020–2022), Ammann (ab 2022) → 3. Dann: (6×3)+3−4 = 17.',
    ],
    gmHint: 'Fehlende Zahl [?] = 3 (HSG-Rektoren seit 2016: Bieger, Ehrenzeller, Ammann). (6×3)+3−4 = 17.',
  },

  'eg-4': {
    id: 'eg-4',
    team: 'EG',
    teamLabel: 'Neuer Vorstand',
    number: '4',
    title: 'Die Schaltzentrale',
    room: '05-005 · Büro mit Leinwand · 21.1 m²',
    roomCode: 'POWER',
    unlockCode: 'STAB',
    successMessage: 'Zugangscode Finale gesichert. Geht zum Tresor 05-U106.',
    nextDoor: null,
    nextLabel: null,
    puzzle: {
      type: 'colorcircles',
      scenario: 'Auf der Leinwand pulsiert eine Farbsequenz — eine verschlüsselte Botschaft. Den Schlüssel hat das UG-Team. Koordiniert euch — das hier ist euer Zugangscode fürs Finale.',
      data: {},
    },
    hints: [
      'Ihr braucht den Farb-Schlüssel — den hat das UG-Team. Funkt an.',
      'Achtet genau auf die Farbnuancen — nicht alle Kreise sind identisch.',
      'Die ersten vier Kreise ergeben mit dem UG-Schlüssel übersetzt das Codewort: STAB.',
    ],
    gmHint: 'Schlüssel (UG-3 Panel A): ROT mittel=S, BLAU mittel=T, GELB mittel=A, GRÜN mittel=B. Erste 4 Kreise → S,T,A,B = STAB.',
  },

  // ── UNTERGESCHOSS — Team alter Vorstand ────────────────────

  'ug-start': {
    id: 'ug-start',
    team: 'UG',
    teamLabel: 'Alter Vorstand',
    number: '★',
    title: 'Eingang Untergeschoss',
    room: 'Haupteingang UG',
    unlockCode: 'MEMORIA',
    successMessage: 'Archiv entriegelt. Beginnt.',
    nextDoor: 'ug-1',
    nextLabel: 'Raum 05-U120 — Das geschwärzte Protokoll',
    briefing: `MISSION BRIEFING — TEAM ALTER VORSTAND

Ihr habt die Amtsgewalt der SHSG in diesem Archiv gesichert.
Jetzt ist es Zeit, sie weiterzugeben — aber nicht einfach so.

Das neue Präsidium muss beweisen, dass es bereit ist.
Euer Auftrag: Hütet die Codes im Untergeschoss, helft dem neuen
Team via Walkie Talkie — aber nur so viel wie nötig.

Der Tresor öffnet sich nur wenn beide Teams bereit sind.`,
    puzzle: {
      type: 'memoriatext',
      scenario: 'Das Archiv des alten Vorstands. Was bleibt, wenn ein Vorstand geht? Die Erinnerung. Auf Latein.',
      data: {},
    },
    hints: [
      'Es ist ein lateinisches Wort.',
      'Es bedeutet das Gegenteil von Vergessen.',
      'MEMORIA.',
    ],
    gmHint: 'Lösung: MEMORIA.',
  },

  'ug-1': {
    id: 'ug-1',
    team: 'UG',
    teamLabel: 'Alter Vorstand',
    number: '1',
    title: 'Das geschwärzte Protokoll',
    room: '05-U120 · 25.1 m²',
    roomCode: 'AKTE',
    unlockCode: '5',
    successMessage: 'Erste Archiv-Ziffer gesichert.',
    nextDoor: 'ug-2',
    nextLabel: 'Raum 05-U121 — Die Porträtgalerie',
    puzzle: {
      type: 'redactedprotocol',
      scenario: 'Das Protokoll der 47. ausserordentlichen Vorstandssitzung. Vieles wurde geschwärzt — aber nicht alles lässt sich verbergen.',
      data: { hiddenNumber: 5 },
    },
    hints: [
      'Geschwärzt heisst nicht unlesbar — manche Balken reagieren auf Berührung.',
      'Tippt die schwarzen Balken an (oder haltet gedrückt). Eine Zahl wird kurz sichtbar.',
      'Anwesend waren 5 von 6. Eure erste Ziffer ist 5.',
    ],
    gmHint: 'Der antippbare Balken in TOP 2 zeigt: 5 Anwesende. Antwort: 5.',
  },

  'ug-2': {
    id: 'ug-2',
    team: 'UG',
    teamLabel: 'Alter Vorstand',
    number: '2',
    title: 'Die Porträtgalerie',
    room: '05-U121 · Korridor · 38.7 m²',
    roomCode: 'RAHMEN',
    unlockCode: '5',
    successMessage: 'Zweite Archiv-Ziffer gesichert.',
    nextDoor: 'ug-3',
    nextLabel: 'Raum 05-U112 — Cipher & Gitter',
    puzzle: {
      type: 'portraits',
      scenario: 'Im Korridor hängen die Porträts der letzten Präsidien. Jedes verbirgt eine Ziffer in seinen Metadaten. Findet alle, addiert, teilt.',
      data: {},
    },
    hints: [
      'Jedes Porträt versteckt eine Ziffer — das letzte Digit der Jahres-Metazahl.',
      'Die letzten Digits sind 2, 4, 6, 8.',
      '2+4+6+8 = 20. Teilt durch 4 → 5.',
    ],
    gmHint: 'Letzte Digits von 12,14,16,18 = 2,4,6,8. Summe 20 ÷ 4 = 5.',
  },

  'ug-3': {
    id: 'ug-3',
    team: 'UG',
    teamLabel: 'Alter Vorstand',
    number: '3',
    title: 'Cipher & Gitter',
    room: '05-U112 & 05-U113',
    roomCode: 'CHIFFRE',
    unlockCode: '7',
    successMessage: 'Dritte Archiv-Ziffer gesichert.',
    nextDoor: 'ug-4',
    nextLabel: 'Raum 05-U119 — Der Safe',
    puzzle: {
      type: 'gridcipher',
      scenario: 'Zwei Räume, zwei Hälften. Ihr habt die Schlüssel, die das EG-Team braucht — und das EG-Team hat eine Zahl, die ihr noch nicht kennt. Funk ist hier Pflicht.',
      data: {},
    },
    hints: [
      'Gebt zuerst beide Panels (Farben + Ressortliste) an Team EG durch, dann setzt die Checkbox.',
      'Das Gitter verbirgt seine Lösung in den Zellen, deren Zeilen- und Spaltenindex übereinstimmen: 3, 4, 7, 6.',
      '3+4+7+6 = 20. 20 − 13 = 7.',
    ],
    gmHint: 'Panel A: ROT mittel=S, BLAU mittel=T, GELB mittel=A, GRÜN mittel=B (korrekte Farbtöne). Panel B: Nachhaltigkeit steht auf Position 3. Gitter-Diagonale: 3,4,7,6 → 20 → 20-13=7.',
  },

  'ug-4': {
    id: 'ug-4',
    team: 'UG',
    teamLabel: 'Alter Vorstand',
    number: '4',
    title: 'Der Safe',
    room: '05-U119 · Küche/Aufenthalt · 22.4 m²',
    roomCode: 'KOMBI',
    unlockCode: '1',
    successMessage: 'Vierte Archiv-Ziffer gesichert.',
    nextDoor: 'ug-5',
    nextLabel: 'Raum 05-U119 — Die Schatzkammer',
    puzzle: {
      type: 'safedial',
      scenario: 'Auf dem Küchentisch ein Safe und eine Notiz. Manchmal ist die kleinste Zahl die wichtigste.',
      data: {},
    },
    hints: [
      'Es geht um das höchste Einzelamt der SHSG — nicht um die Vorstandsgrösse.',
      'Co-Präsidium? Gibt es nicht. Wie viele Präsidien führen gleichzeitig?',
      'Genau eines. Eure Ziffer ist 1.',
    ],
    gmHint: 'Genau 1 Präsidium. Antwort: 1.',
  },

  'ug-5': {
    id: 'ug-5',
    team: 'UG',
    teamLabel: 'Alter Vorstand',
    number: '5',
    title: 'Die Schatzkammer',
    room: '05-U119 · Zusammenführung',
    roomCode: 'KAMMER',
    unlockCode: '5571',
    successMessage: 'Codeteil C gesichert.',
    revealAfterSolve: 'CODETEIL C = 5571',
    nextDoor: null,
    nextLabel: null,
    puzzle: {
      type: 'assembly',
      scenario: 'Alle vier Archiv-Ziffern sind beisammen. Setzt sie zusammen — und wartet auf das EG-Team.',
      data: {},
    },
    hints: [
      'Die vier Ziffern kommen aus euren vier vorherigen Rätseln — in Reihenfolge.',
      'Schaut in eurem Verlauf nach: Protokoll, Porträts, Gitter, Safe.',
      '5, 5, 7, 1 → 5571.',
    ],
    gmHint: '5 (Protokoll) + 5 (Portraits) + 7 (Gitter) + 1 (Safe) → 5571.',
  },

  // ── FINALE ─────────────────────────────────────────────────

  'finale': {
    id: 'finale',
    team: 'BEIDE',
    teamLabel: 'Gemeinsam',
    number: '⊕',
    title: 'Der Tresor',
    room: '05-U106 · Archiv · 172.4 m²',
    codeA: 'ATLAS',
    codeB: 'KLANG',
    codeC: '5571',
    successMessage: 'TRESOR GEÖFFNET',
  },
}

// Team-Farben
export const TEAM_COLORS = {
  EG: { primary: '#c8b560', bg: 'rgba(200,181,96,0.08)', border: 'rgba(200,181,96,0.25)' },
  UG: { primary: '#c45c3a', bg: 'rgba(196,92,58,0.08)', border: 'rgba(196,92,58,0.25)' },
  BEIDE: { primary: '#4a8c5c', bg: 'rgba(74,140,92,0.08)', border: 'rgba(74,140,92,0.25)' },
}

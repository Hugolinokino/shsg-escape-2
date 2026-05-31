# SHSG Escape Room — Deploy & Setup

## 1. Auf Vercel deployen (5 Minuten)

```bash
# Vercel CLI installieren (einmalig)
npm install -g vercel

# Im Projektordner
cd shsg-escape
vercel deploy --prod
```

→ Du bekommst eine URL wie `shsg-escape.vercel.app`

**Alternativ: GitHub → Vercel**
1. Projekt auf GitHub pushen
2. vercel.com → "New Project" → GitHub Repo wählen
3. Automatisch deployed

---

## 2. Vor dem Spiel anpassen (src/config.js)

Folgende Werte MÜSSEN angepasst werden:

| Feld | Wo | Was |
|------|-----|-----|
| `unlockCode` in `eg-1` | Rätsel Drucker | Dein gewählter Quorum-Nenner |
| `unlockCode` in `eg-2` | Rätsel Leonardo | Nummer des jüngsten Ressorts |
| `unlockCode` in `eg-3` | Whiteboard | Echte Vorstandsgrösse + Ressorts |
| `unlockCode` in `ug-4` | Küche QR | SHSG-Gründungsjahr |
| `codeA/B/C` in `finale` | Tresor | Alle drei finalen Codes |
| Brief-Text in `FinalePage.jsx` | Finale | Namen beider Vorstände eintragen |

---

## 3. QR-Codes generieren

URL-Struktur: `https://DEINE-URL/tuer/[tür-id]`

| Tür | URL | Raum |
|-----|-----|------|
| eg-start | /tuer/eg-start | Haupteingang EG |
| eg-1 | /tuer/eg-1 | 05-001 |
| eg-2 | /tuer/eg-2 | 05-002 |
| eg-3 | /tuer/eg-3 | 05-004 |
| eg-4 | /tuer/eg-4 | 05-005 |
| ug-start | /tuer/ug-start | Eingang UG |
| ug-1 | /tuer/ug-1 | 05-U120 |
| ug-2 | /tuer/ug-2 | 05-U121 |
| ug-3 | /tuer/ug-3 | 05-U112/113 |
| ug-4 | /tuer/ug-4 | 05-U119 |
| ug-5 | /tuer/ug-5 | Schatzkammer |
| finale | /finale | 05-U106 |

QR-Codes generieren: **qr.io** oder **qrcodegenerator.com**
→ Als A5-Blatt ausdrucken, laminieren (falls vorhanden), an Tür kleben.

---

## 4. Vercel: SPA Routing fix

Datei `vercel.json` im Root erstellen:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## 5. Hinweis-System

Jede Tür hat einen «Hinweis anfordern»-Button.
Dieser zeigt +5 Min Zeitstrafe an — Ehrensystem, der GM notiert.

GM-Lösungsblatt: alle unlockCodes aus config.js ausdrucken.

import React from 'react'

const DOCUMENTS = [
  {
    label: 'Ausdruck I',
    text: 'Art. 15: Der Vorstand besteht aus Präsident:in, Vizepräsident:in, dem für Finanzen zuständigen Vorstandsmitglied und mindestens drei weiteren Vorstandsmitgliedern. Für einen gültigen Beschluss ist die Anwesenheit von mindestens vier Mitgliedern erforderlich.',
  },
  {
    label: 'Ausdruck II',
    text: 'Art. 15: Der Vorstand besteht aus Präsident:in, Vizepräsident:in, dem für Finanzen zuständigen Vorstandsmitglied und mindestens vier weiteren Vorstandsmitgliedern. Für einen gültigen Beschluss ist die Anwesenheit von mindestens fünf Mitgliedern erforderlich.',
  },
  {
    label: 'Ausdruck III',
    text: 'Art. 15: Der Vorstand besteht aus Präsident:in, Vizepräsident:in, dem für Finanzen zuständigen Vorstandsmitglied und mindestens zwei weiteren Vorstandsmitglieder. Für einen gültigen Beschluss ist die Anwesenheit von mindestens drei Mitgliedern erforderlich.',
  },
]

export default function DocumentsPuzzle() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'var(--text3)', letterSpacing: '0.1em', marginBottom: 4,
      }}>
        Drei Ausdrucke — nur einer ist fehlerfrei:
      </div>

      {DOCUMENTS.map((doc, i) => (
        <div
          key={i}
          style={{
            background: 'rgba(232,228,217,0.04)',
            border: '1px solid var(--border2)',
            borderRadius: 2,
            padding: '14px 16px',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10, letterSpacing: '0.15em',
            color: 'var(--text3)',
            textTransform: 'uppercase', marginBottom: 10,
          }}>
            {doc.label}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12, lineHeight: 1.85,
            color: 'var(--text2)', letterSpacing: '0.03em',
          }}>
            {doc.text}
          </div>
        </div>
      ))}
    </div>
  )
}

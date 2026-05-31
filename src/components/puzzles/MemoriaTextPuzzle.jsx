import React from 'react'

export default function MemoriaTextPuzzle() {
  return (
    <div style={{
      background: 'rgba(232,228,217,0.04)',
      border: '1px solid var(--border)',
      borderRadius: 2,
      padding: '28px 24px',
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      lineHeight: 2,
      color: 'var(--text)',
      letterSpacing: '0.04em',
      textAlign: 'center',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
    }}>
      <div style={{
        fontSize: 10, letterSpacing: '0.25em', color: 'var(--text3)',
        textTransform: 'uppercase', marginBottom: 20,
        borderBottom: '1px solid var(--border)', paddingBottom: 12,
      }}>
        ARCHIV — EINLASS
      </div>
      <div style={{ color: 'var(--text2)', fontStyle: 'italic' }}>
        «Was ein Vorstand hinterlässt,<br />
        ist kein Gegenstand, sondern ein Wort.<br />
        Das lateinische Wort für Gedächtnis,<br />
        Erinnerung — das, was bleibt.»
      </div>
    </div>
  )
}

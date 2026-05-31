import React from 'react'

// First 4 are the signal (→ STAB); last 4 are different shades / noise
const CIRCLES = [
  { color: '#e53935', label: 'ROT',  key: 'c1' },  // ROT mittel → S
  { color: '#1e88e5', label: 'BLAU', key: 'c2' },  // BLAU mittel → T
  { color: '#f9a825', label: 'GELB', key: 'c3' },  // GELB mittel → A
  { color: '#43a047', label: 'GRÜN', key: 'c4' },  // GRÜN mittel → B
  { color: '#ef5350', label: 'ROT',  key: 'c5' },  // ROT hell → Q
  { color: '#0d47a1', label: 'BLAU', key: 'c6' },  // BLAU dunkel → N
  { color: '#66bb6a', label: 'GRÜN', key: 'c7' },  // GRÜN hell → P
  { color: '#f57f17', label: 'GELB', key: 'c8' },  // GELB dunkel → M
]

export default function ColorCirclesPuzzle() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Circles */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 4, padding: '24px 16px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
      }}>
        <div style={{
          fontSize: 10, letterSpacing: '0.2em', color: 'var(--text3)',
          textTransform: 'uppercase',
        }}>
          LEINWAND — FARBSEQUENZ
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {CIRCLES.map((c, i) => (
            <div key={c.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: c.color,
                boxShadow: `0 0 12px ${c.color}66`,
                animation: 'pulse 2s infinite',
                animationDelay: `${i * 0.18}s`,
                border: '2px solid rgba(255,255,255,0.15)',
              }} />
              <div style={{
                fontSize: 9, letterSpacing: '0.08em',
                color: 'var(--text2)',
                fontFamily: 'var(--font-mono)',
              }}>
                {c.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

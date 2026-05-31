import React, { useState, useEffect } from 'react'

export default function SafeDialPuzzle() {
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setAngle(a => (a + 0.8) % 360)
    }, 30)
    return () => clearInterval(t)
  }, [])

  const marks = Array.from({ length: 10 }, (_, i) => i * 36)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      {/* Safe dial */}
      <div style={{
        width: 160, height: 160, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #3a3a3a, #111)',
        border: '4px solid #555',
        boxShadow: '0 0 0 2px #222, 0 0 0 4px #444, 0 8px 24px rgba(0,0,0,0.8)',
        position: 'relative', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Tick marks */}
        {marks.map((deg, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 2, height: 12,
            background: '#888',
            top: 12,
            left: '50%',
            transformOrigin: '50% 68px',
            transform: `translateX(-50%) rotate(${deg}deg)`,
          }} />
        ))}
        {/* Rotating inner dial */}
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, #4a4a4a, #1e1e1e)',
          border: '2px solid #666',
          transform: `rotate(${angle}deg)`,
          transition: 'none',
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Dial pointer */}
          <div style={{
            position: 'absolute', top: 8, left: '50%',
            width: 4, height: 20,
            background: 'var(--accent)',
            transform: 'translateX(-50%)',
            borderRadius: 2,
          }} />
          <div style={{ fontSize: 10, color: '#888', letterSpacing: '0.1em' }}>●</div>
        </div>
        {/* Fixed arrow */}
        <div style={{
          position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
          color: 'var(--red)', fontSize: 12,
        }}>▼</div>
      </div>

      {/* Question */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 2, padding: '16px 18px',
        fontFamily: 'var(--font-mono)', fontSize: 12,
        lineHeight: 1.85, color: 'var(--text2)', letterSpacing: '0.04em',
        maxWidth: '100%',
      }}>
        «Die SHSG hat genau EIN Präsidium an der Spitze ihres Vorstands — kein Co-Präsidium, kein Kollektiv. Wie viele Personen halten zu jedem Zeitpunkt das Präsidialamt? Das ist eure letzte Ziffer.»
      </div>
    </div>
  )
}

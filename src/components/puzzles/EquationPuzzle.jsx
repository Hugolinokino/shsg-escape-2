import React from 'react'

export default function EquationPuzzle() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Whiteboard */}
      <div style={{
        background: '#f0eeea',
        border: '3px solid #d0ccc4',
        borderRadius: 4,
        padding: '28px 20px',
        boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.1), 2px 3px 10px rgba(0,0,0,0.4)',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: '#8a8680', letterSpacing: '0.2em',
          textTransform: 'uppercase', marginBottom: 20,
        }}>
          WHITEBOARD
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28, fontWeight: 700,
          color: '#2a4a8a',
          letterSpacing: '0.06em',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 10, flexWrap: 'wrap',
        }}>
          <span>( 6 × 3 )</span>
          <span style={{ color: '#555' }}>+</span>
          <span style={{
            display: 'inline-block',
            border: '2px dashed #8a9ab0',
            borderRadius: 3,
            padding: '2px 12px',
            color: '#8a9ab0',
            fontSize: 26,
          }}>?</span>
          <span style={{ color: '#555' }}>−</span>
          <span>4</span>
          <span style={{ color: '#555' }}>=</span>
          <span style={{
            borderBottom: '3px solid #2a4a8a',
            minWidth: 48, display: 'inline-block',
            textAlign: 'center', color: '#2a4a8a',
          }}>___</span>
        </div>
        <div style={{
          marginTop: 20,
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: '#6a7a8a', letterSpacing: '0.06em',
          fontStyle: 'italic', lineHeight: 1.6,
        }}>
          ? = Anzahl der Personen, die das Rektorenamt<br />
          der Universität St.Gallen seit 2016 bekleidet haben
        </div>
      </div>
    </div>
  )
}

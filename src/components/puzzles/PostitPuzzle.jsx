import React from 'react'

export default function PostitPuzzle() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Two post-it notes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PostIt name="Manuel Bänziger" color="#f5e642">
          «Das jüngste Ressort der SHSG ist entscheidend. Nicht sein Name zählt, sondern seine POSITION in der offiziellen Ressort-Liste. Fragt das UG-Team — die haben die vollständige Liste.»
        </PostIt>
        <PostIt name="David Irrgang" color="#a8e6cf">
          «Ich sag nur: es ist NICHT, was alphabetisch zuletzt kommt. ‹Jüngst› heisst zuletzt EINGEFÜHRT. Der Rest steht beim UG-Team.»
        </PostIt>
      </div>

      {/* Partial list */}
      <div style={{
        background: 'rgba(232,228,217,0.04)',
        border: '1px solid var(--border)',
        borderRadius: 2,
        padding: '14px 16px',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        lineHeight: 1.9,
        color: 'var(--text2)',
      }}>
        <div style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--text3)', marginBottom: 10, textTransform: 'uppercase' }}>
          SHSG-RESSORTS (offizielle Liste — Auszug)
        </div>
        <div>1. Clubs</div>
        <div>2. IT</div>
        <div style={{ color: 'var(--text3)', fontStyle: 'italic' }}>3. [UNLESBAR — UG-Team fragen]</div>
        <div style={{ color: 'var(--text3)' }}>…</div>
        <div style={{ color: 'var(--text3)', fontStyle: 'italic' }}>9. [UNLESBAR — UG-Team fragen]</div>
      </div>

    </div>
  )
}

function PostIt({ name, color, children }) {
  return (
    <div style={{
      background: color,
      borderRadius: 2,
      padding: '14px 16px',
      boxShadow: '2px 3px 8px rgba(0,0,0,0.4)',
      transform: `rotate(${Math.random() > 0.5 ? 0.5 : -0.7}deg)`,
    }}>
      <div style={{
        fontSize: 10, letterSpacing: '0.12em', color: 'rgba(0,0,0,0.5)',
        textTransform: 'uppercase', marginBottom: 8,
        fontFamily: 'var(--font-mono)',
      }}>
        {name}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 12, lineHeight: 1.7,
        color: 'rgba(0,0,0,0.8)', letterSpacing: '0.03em',
      }}>
        {children}
      </div>
    </div>
  )
}

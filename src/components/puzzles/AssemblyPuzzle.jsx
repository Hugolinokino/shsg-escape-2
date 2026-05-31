import React, { useState } from 'react'

const SLOTS = [
  { label: 'Ziffer 1', hint: '← aus Raum 1 (Geschwärztes Protokoll)' },
  { label: 'Ziffer 2', hint: '← aus Raum 2 (Porträtgalerie)' },
  { label: 'Ziffer 3', hint: '← aus Raum 3 (Gitter)' },
  { label: 'Ziffer 4', hint: '← aus Raum 4 (Safe)' },
]

export default function AssemblyPuzzle({ onCodeChange }) {
  const [values, setValues] = useState(['', '', '', ''])

  const handleChange = (i, val) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 1)
    const next = [...values]
    next[i] = cleaned
    setValues(next)
    const combined = next.join('')
    onCodeChange(combined)
  }

  const combined = values.join('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 2, padding: '16px 16px',
        fontFamily: 'var(--font-mono)', fontSize: 10,
        letterSpacing: '0.15em', color: 'var(--text3)', textTransform: 'uppercase',
        marginBottom: 4,
      }}>
        SCHATZKAMMER — CODE ZUSAMMENSETZEN
      </div>

      {SLOTS.map((slot, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.12em', color: 'var(--text3)', textTransform: 'uppercase',
            }}>
              {slot.label}
            </label>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--text3)', fontStyle: 'italic',
            }}>
              {slot.hint}
            </span>
          </div>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            value={values[i]}
            onChange={e => handleChange(i, e.target.value)}
            placeholder="_"
            style={{
              width: '100%',
              background: 'var(--bg3)',
              border: `1px solid ${values[i] ? 'var(--accent)' : 'var(--border2)'}`,
              borderRadius: 2,
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
              fontSize: 22,
              letterSpacing: '0.3em',
              padding: '12px 16px',
              outline: 'none',
              textAlign: 'center',
              transition: 'border-color 0.2s',
            }}
          />
        </div>
      ))}

      {/* Combined preview */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px',
        background: combined.length === 4 ? 'rgba(200,181,96,0.08)' : 'var(--bg2)',
        border: `1px solid ${combined.length === 4 ? 'rgba(200,181,96,0.3)' : 'var(--border)'}`,
        borderRadius: 2, transition: 'all 0.2s',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          Zusammengesetzt:
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 22,
          color: combined.length === 4 ? 'var(--accent)' : 'var(--text3)',
          letterSpacing: '0.3em', fontWeight: 700,
          minWidth: 80, textAlign: 'right',
        }}>
          {combined || '____'}
        </span>
      </div>
    </div>
  )
}

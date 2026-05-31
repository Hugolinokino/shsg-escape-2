import React, { useState } from 'react'

// Grid: diagonal (0,0)(1,1)(2,2)(3,3) = 3,4,7,6 → sum=20 → 20-13=7
const GRID = [
  [3, 7, 2, 9],
  [1, 4, 8, 5],
  [6, 2, 7, 3],
  [4, 9, 1, 6],
]

const RESSORTS = [
  ['1. Clubs',                        '6. Marketing'],
  ['2. IT',                            '7. Finanzen & Corporate Relations'],
  ['3. Nachhaltigkeit',               '8. Campus Culture'],
  ['4. Interessenvertretung & Lehre', '9. Events'],
  ['5. HR',                            ''],
]

// Three shades of each base color for maximum confusion
const FARB_KEY = [
  { color: '#b71c1c', bg: 'rgba(183,28,28,0.15)',   label: 'ROT',     shade: 'dunkel', val: 'F' },
  { color: '#e53935', bg: 'rgba(229,57,53,0.15)',    label: 'ROT',     shade: 'mittel', val: 'S' },
  { color: '#ef5350', bg: 'rgba(239,83,80,0.15)',    label: 'ROT',     shade: 'hell',   val: 'Q' },
  { color: '#0d47a1', bg: 'rgba(13,71,161,0.15)',    label: 'BLAU',    shade: 'dunkel', val: 'N' },
  { color: '#1e88e5', bg: 'rgba(30,136,229,0.15)',   label: 'BLAU',    shade: 'mittel', val: 'T' },
  { color: '#64b5f6', bg: 'rgba(100,181,246,0.15)',  label: 'BLAU',    shade: 'hell',   val: 'W' },
  { color: '#f57f17', bg: 'rgba(245,127,23,0.15)',   label: 'GELB',    shade: 'dunkel', val: 'M' },
  { color: '#f9a825', bg: 'rgba(249,168,37,0.15)',   label: 'GELB',    shade: 'mittel', val: 'A' },
  { color: '#2e7d32', bg: 'rgba(46,125,50,0.15)',    label: 'GRÜN',    shade: 'dunkel', val: 'H' },
  { color: '#43a047', bg: 'rgba(67,160,71,0.15)',    label: 'GRÜN',    shade: 'mittel', val: 'B' },
  { color: '#66bb6a', bg: 'rgba(102,187,106,0.15)',  label: 'GRÜN',    shade: 'hell',   val: 'P' },
  { color: '#e65100', bg: 'rgba(230,81,0,0.15)',      label: 'ORANGE',  shade: 'dunkel', val: 'E' },
  { color: '#fb8c00', bg: 'rgba(251,140,0,0.15)',    label: 'ORANGE',  shade: 'mittel', val: 'X' },
  { color: '#ffb74d', bg: 'rgba(255,183,77,0.15)',   label: 'ORANGE',  shade: 'hell',   val: 'J' },
  { color: '#4a148c', bg: 'rgba(74,20,140,0.15)',    label: 'VIOLETT', shade: 'dunkel', val: 'L' },
  { color: '#7b1fa2', bg: 'rgba(123,31,162,0.15)',   label: 'VIOLETT', shade: 'mittel', val: 'Z' },
  { color: '#ce93d8', bg: 'rgba(206,147,216,0.15)',  label: 'VIOLETT', shade: 'hell',   val: 'V' },
]

export default function GridCipherPuzzle({ onGateCheck }) {
  const [gateChecked, setGateChecked] = useState(false)

  const handleCheck = (e) => {
    setGateChecked(e.target.checked)
    if (onGateCheck) onGateCheck(e.target.checked)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Panel A: Farb-Schlüssel */}
      <Panel title="PANEL A — FARB-SCHLÜSSEL (an EG-4 durchgeben)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {FARB_KEY.map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: f.bg, border: `1px solid ${f.color}44`,
              borderRadius: 2, padding: '6px 8px',
            }}>
              <div style={{
                width: 14, height: 14, borderRadius: '50%',
                background: f.color, flexShrink: 0,
              }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text)' }}>
                {f.label}{f.shade ? ` ${f.shade}` : ''}{' '}={' '}
                <strong style={{ color: 'var(--text2)' }}>{f.val}</strong>
              </span>
            </div>
          ))}
        </div>
      </Panel>

      {/* Panel B: Ressort-Liste */}
      <Panel title="PANEL B — RESSORT-LISTE (an EG-2 durchgeben)">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text2)', lineHeight: 1.9 }}>
          {RESSORTS.map((row, i) => (
            <div key={i} style={{ display: 'flex', gap: 16 }}>
              <span style={{ flex: 1, color: 'var(--text2)' }}>{row[0]}</span>
              <span style={{ flex: 1, color: 'var(--text2)' }}>{row[1]}</span>
            </div>
          ))}
        </div>
      </Panel>

      {/* Panel C: Gitter */}
      <Panel title="PANEL C — GITTER (selbst lösen)">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 44px)',
            gap: 4,
          }}>
            {GRID.map((row, r) =>
              row.map((cell, c) => {
                return (
                  <div key={`${r}-${c}`} style={{
                    width: 44, height: 44,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--bg3)',
                    border: '1px solid var(--border)',
                    borderRadius: 2,
                    fontFamily: 'var(--font-mono)', fontSize: 16,
                    fontWeight: 400,
                    color: 'var(--text2)',
                  }}>
                    {cell}
                  </div>
                )
              })
            )}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)',
            textAlign: 'center', lineHeight: 1.8, padding: '0 8px',
          }}>
            Jene vier Zelleneinträge, deren Positions-Koordinaten im Schema (Reihe, Spalte) — von der ersten zur letzten — eine strenge Gleichheit des ersten und zweiten Wertepaars aufweisen, bilden in ihrer arithmetischen Summe die Ausgangsziffer, vermindert um jenen ganzzahligen Betrag, der im römischen Zahlensystem als »XIII« notiert wird.
          </div>
        </div>
      </Panel>

      {/* Gate checkbox */}
      <label style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '14px 14px',
        border: `1px solid ${gateChecked ? 'rgba(200,181,96,0.4)' : 'var(--border)'}`,
        background: gateChecked ? 'rgba(200,181,96,0.06)' : 'var(--bg2)',
        borderRadius: 2, cursor: 'pointer',
      }}>
        <input
          type="checkbox"
          checked={gateChecked}
          onChange={handleCheck}
          style={{ width: 20, height: 20, marginTop: 1, cursor: 'pointer', accentColor: 'var(--accent)', flexShrink: 0 }}
        />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: gateChecked ? 'var(--accent)' : 'var(--text2)',
          lineHeight: 1.6,
        }}>
          Wir haben Farb-Schlüssel UND Ressort-Position an Team EG durchgegeben.
        </span>
      </label>

      {!gateChecked && (
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--text3)', textAlign: 'center', fontStyle: 'italic',
        }}>
          Erst dem neuen Vorstand helfen. Dann öffnet sich euer Weg.
        </div>
      )}
    </div>
  )
}

function Panel({ title, children }) {
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 2, overflow: 'hidden',
    }}>
      <div style={{
        padding: '8px 14px',
        background: 'var(--bg3)', borderBottom: '1px solid var(--border)',
        fontFamily: 'var(--font-mono)', fontSize: 9,
        letterSpacing: '0.18em', color: 'var(--text3)', textTransform: 'uppercase',
      }}>
        {title}
      </div>
      <div style={{ padding: '14px' }}>
        {children}
      </div>
    </div>
  )
}

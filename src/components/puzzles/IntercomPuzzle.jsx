import React, { useState } from 'react'

const NATO = [
  ['A','Alpha'],['B','Bravo'],['C','Charlie'],['D','Delta'],['E','Echo'],
  ['F','Foxtrot'],['G','Golf'],['H','Hotel'],['I','India'],['J','Juliet'],
  ['K','Kilo'],['L','Lima'],['M','Mike'],['N','November'],['O','Oscar'],
  ['P','Papa'],['Q','Quebec'],['R','Romeo'],['S','Sierra'],['T','Tango'],
  ['U','Uniform'],['V','Victor'],['W','Whiskey'],['X','X-Ray'],['Y','Yankee'],
  ['Z','Zulu'],
]

const BELLS = [
  { num: '1', name: 'ZUMBRUNN, L.', years: '2021–2022' },
  { num: '2', name: 'KOPATZ, I.',   years: '2022–2023' },
  { num: '3', name: 'SEVRAY, A.J.', years: '2023–2024' },
  { num: '4', name: 'MILITI, L.',   years: '2024–2025' },
  { num: '5', name: 'MOSER, L.',    years: '2025–2026' },
]

function playBuzzer() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.setValueAtTime(440, ctx.currentTime)
    osc.frequency.setValueAtTime(330, ctx.currentTime + 0.06)
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.15)
  } catch (_) {}
}

export default function IntercomPuzzle() {
  const [ringing, setRinging] = useState(null)
  const [natoOpen, setNatoOpen] = useState(false)

  const handleBell = (i) => {
    playBuzzer()
    setRinging(i)
    setTimeout(() => setRinging(null), 800)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Intercom panel */}
      <div style={{
        background: '#111',
        border: '2px solid #2a2a2a',
        borderRadius: 6,
        padding: '16px 12px',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)',
      }}>
        <div style={{
          fontSize: 9, letterSpacing: '0.25em', color: 'var(--text3)',
          textTransform: 'uppercase', textAlign: 'center', marginBottom: 14,
          borderBottom: '1px solid #222', paddingBottom: 8,
        }}>
          SPRECHANLAGE — SHSG PRÄSIDIEN
        </div>
        {BELLS.map((b, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 8px',
            borderBottom: i < BELLS.length - 1 ? '1px solid #1e1e1e' : 'none',
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: 2,
              background: '#1a1a1a', border: '1px solid #333',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, color: 'var(--text3)', fontFamily: 'var(--font-mono)',
              flexShrink: 0,
            }}>
              {b.num}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, letterSpacing: '0.06em', color: 'var(--text)' }}>{b.name}</div>
              <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.06em' }}>{b.years}</div>
            </div>
            <button
              onPointerDown={() => handleBell(i)}
              style={{
                width: 40, height: 40,
                borderRadius: '50%',
                background: ringing === i ? 'rgba(200,181,96,0.3)' : '#1e1e1e',
                border: `2px solid ${ringing === i ? 'var(--accent)' : '#444'}`,
                color: ringing === i ? 'var(--accent)' : '#666',
                fontSize: 16,
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                minWidth: 40,
              }}
              aria-label={`Klingel ${b.name}`}
            >
              ◉
            </button>
          </div>
        ))}
      </div>

      {/* Task text */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 2, padding: '14px 16px',
        fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8,
        color: 'var(--text2)', letterSpacing: '0.04em',
      }}>
        «Zähle die VOLLENDETEN Übergaben zwischen den fünf gelisteten Präsidien — das ergibt über das NATO-Alphabet das erste Codewort. Die zweite Hälfte ist die Ordnungszahl der Amtszeit, in die der neue Vorstand jetzt eintritt — als Wort ausgeschrieben.»
      </div>

      {/* NATO toggle */}
      <div>
        <button
          onClick={() => setNatoOpen(o => !o)}
          style={{
            width: '100%', padding: '10px 14px',
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 2, color: 'var(--text2)',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            cursor: 'pointer', textAlign: 'left',
            display: 'flex', justifyContent: 'space-between',
          }}
        >
          <span>NATO-Alphabet</span>
          <span style={{ color: 'var(--accent)' }}>{natoOpen ? '▲' : '▼'}</span>
        </button>
        {natoOpen && (
          <div style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderTop: 'none', borderRadius: '0 0 2px 2px',
            padding: '12px 14px',
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px 16px',
            animation: 'fadeIn 0.2s ease',
          }}>
            {NATO.map(([letter, word]) => (
              <div key={letter} style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                color: 'var(--text2)',
                letterSpacing: '0.06em', padding: '2px 0',
              }}>
                <span style={{ minWidth: 16, display: 'inline-block' }}>{letter}</span>
                <span style={{ color: 'var(--text3)', margin: '0 4px' }}>=</span>
                <span>{word}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

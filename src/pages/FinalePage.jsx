import React, { useState, useEffect } from 'react'
import { DOORS } from '../config.js'
import { GlitchText, PageWrap, TopBar, CodeInput, Divider } from '../components/UI.jsx'

const door = DOORS['finale']

export default function FinalePage() {
  const [codeA, setCodeA] = useState('')
  const [codeB, setCodeB] = useState('')
  const [codeC, setCodeC] = useState('')
  const [status, setStatus] = useState(null) // null | 'wrong' | 'opening' | 'open'
  const [phase, setPhase] = useState(0)
  const [showLetter, setShowLetter] = useState(false)

  const handleUnlock = () => {
    const a = codeA.trim().toUpperCase()
    const b = codeB.trim().toUpperCase()
    const c = codeC.trim().toUpperCase()

    if (
      a === door.codeA.toUpperCase() &&
      b === door.codeB.toUpperCase() &&
      c === door.codeC.toUpperCase()
    ) {
      setStatus('opening')
      // Sequence of phases
      setTimeout(() => setPhase(1), 500)
      setTimeout(() => setPhase(2), 1200)
      setTimeout(() => setPhase(3), 2000)
      setTimeout(() => setStatus('open'), 2800)
      setTimeout(() => setShowLetter(true), 3400)
    } else {
      setStatus('wrong')
      setTimeout(() => setStatus(null), 2500)
    }
  }

  if (status === 'open' || showLetter) {
    return <VaultOpen showLetter={showLetter} />
  }

  return (
    <PageWrap>
      <TopBar label="Beide Teams" />

      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10, letterSpacing: '0.25em',
          color: 'var(--text3)', textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          ⊕ FINALER TRESOR
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 26, fontWeight: 800,
          letterSpacing: '0.04em',
          marginBottom: 4,
        }}>
          {status === 'opening'
            ? <GlitchText text="ENTRIEGLE..." />
            : <GlitchText text="DER TRESOR" />
          }
        </div>
        <div style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: '0.1em' }}>
          05-U106 · Beide Teams · Gemeinsam
        </div>
      </div>

      {/* Vault dial visualization */}
      <VaultDial phase={phase} status={status} />

      <Divider />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        <CodeField
          label="CODEWORT A — Neuer Vorstand, EG"
          sublabel="Aus Raum 05-001"
          value={codeA}
          onChange={setCodeA}
          color="var(--accent)"
        />
        <CodeField
          label="CODEWORT B — Neuer Vorstand, EG"
          sublabel="Aus Raum 05-002"
          value={codeB}
          onChange={setCodeB}
          color="var(--accent)"
        />
        <CodeField
          label="CODETEIL C — Alter Vorstand, UG"
          sublabel="Zusammengesetzt aus Untergeschoss"
          value={codeC}
          onChange={setCodeC}
          color="var(--red)"
        />
      </div>

      {status === 'wrong' && (
        <div style={{
          padding: '12px 16px',
          border: '1px solid rgba(196,92,58,0.4)',
          background: 'rgba(196,92,58,0.08)',
          borderRadius: 2,
          color: 'var(--red)',
          fontFamily: 'var(--font-mono)',
          fontSize: 12, letterSpacing: '0.08em',
          marginBottom: 16,
          animation: 'fadeIn 0.3s ease',
        }}>
          ✗ FALSCHER CODE — ZUGANG VERWEIGERT
        </div>
      )}

      <button
        onClick={handleUnlock}
        disabled={status === 'opening'}
        style={{
          width: '100%',
          padding: '16px',
          background: 'rgba(200,181,96,0.1)',
          border: '1px solid rgba(200,181,96,0.4)',
          borderRadius: 2,
          color: 'var(--accent)',
          fontFamily: 'var(--font-mono)',
          fontSize: 14,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          cursor: status === 'opening' ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          if (status !== 'opening') {
            e.target.style.background = 'rgba(200,181,96,0.2)'
          }
        }}
        onMouseLeave={e => {
          e.target.style.background = 'rgba(200,181,96,0.1)'
        }}
      >
        {status === 'opening' ? 'ENTRIEGLE...' : '⊕ TRESOR ÖFFNEN'}
      </button>
    </PageWrap>
  )
}

function CodeField({ label, sublabel, value, onChange, color }) {
  return (
    <div>
      <div style={{
        fontSize: 10, letterSpacing: '0.15em', color,
        textTransform: 'uppercase', marginBottom: 4,
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 10, color: 'var(--text3)', letterSpacing: '0.08em', marginBottom: 6,
      }}>
        {sublabel}
      </div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value.toUpperCase())}
        style={{
          width: '100%',
          background: 'var(--bg2)',
          border: `1px solid ${color}44`,
          borderRadius: 2,
          color,
          fontFamily: 'var(--font-mono)',
          fontSize: 18,
          letterSpacing: '0.15em',
          padding: '12px 16px',
          outline: 'none',
          textTransform: 'uppercase',
        }}
        onFocus={e => e.target.style.borderColor = color}
        onBlur={e => e.target.style.borderColor = `${color}44`}
      />
    </div>
  )
}

function VaultDial({ phase, status }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '32px 0',
      gap: 24,
    }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 64, height: 64,
          border: `2px solid ${phase > i ? 'var(--green)' : status === 'wrong' ? 'var(--red)' : 'var(--border2)'}`,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
          color: phase > i ? 'var(--green)' : status === 'wrong' ? 'var(--red)' : 'var(--text3)',
          transition: 'all 0.4s ease',
          boxShadow: phase > i ? '0 0 20px rgba(74,140,92,0.3)' : 'none',
          transform: status === 'wrong' ? `rotate(${(i - 1) * 10}deg)` : 'none',
        }}>
          {phase > i ? '✓' : '○'}
        </div>
      ))}
    </div>
  )
}

function VaultOpen({ showLetter }) {
  return (
    <PageWrap>
      <TopBar />
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{
          fontSize: 64,
          marginBottom: 16,
          animation: 'unlock 0.6s ease',
        }}>
          ⊕
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 32, fontWeight: 800,
          color: 'var(--green)',
          letterSpacing: '0.04em',
          marginBottom: 8,
          animation: 'fadeIn 0.5s ease',
        }}>
          TRESOR GEÖFFNET
        </div>
        <div style={{
          fontSize: 11, color: 'var(--text3)',
          letterSpacing: '0.2em', textTransform: 'uppercase',
        }}>
          Stabsübergabe vollzogen
        </div>
      </div>

      {showLetter && (
        <div style={{
          background: 'var(--bg2)',
          border: '1px solid rgba(74,140,92,0.3)',
          borderRadius: 2,
          padding: '32px',
          animation: 'fadeIn 0.8s ease',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10, letterSpacing: '0.2em',
            color: 'var(--text3)', textTransform: 'uppercase',
            marginBottom: 24, borderBottom: '1px solid var(--border)',
            paddingBottom: 16,
          }}>
            Brief des alten Vorstands an den neuen Vorstand
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13, lineHeight: 2,
            letterSpacing: '0.04em',
            color: 'var(--text)',
            whiteSpace: 'pre-line',
          }}>
{`Ihr habt eingebrochen, entschlüsselt,
miteinander geflucht und trotzdem nicht aufgehört.

Das ist genau das, was diesen Vorstand ausgemacht hat.

Wir übergeben euch nicht nur ein Amt.
Wir übergeben euch zehntausend Studierende,
einen Stapel ungelöster Probleme,
und das Beste was wir je hatten: dieses Team.

Macht es besser als wir.
Oder zumindest genauso laut.

In diesem Sinne: Willkommen.
Jetzt ist es eures.

— Der alte Vorstand`}
          </div>
          <div style={{
            marginTop: 32,
            paddingTop: 16,
            borderTop: '1px solid var(--border)',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 28,
              color: 'var(--accent)',
              letterSpacing: '0.08em',
            }}>
              ⬡ SHSG ⬡
            </div>
            <div style={{
              fontSize: 10, color: 'var(--text3)',
              letterSpacing: '0.2em', marginTop: 8,
            }}>
              STUDENTENSCHAFT DER UNIVERSITÄT ST. GALLEN
            </div>
          </div>
        </div>
      )}
    </PageWrap>
  )
}

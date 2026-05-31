import React, { useState } from 'react'

// hiddenNumber lives only in JS state, never in initial DOM
export default function RedactedProtocol({ data }) {
  const [revealed, setRevealed] = useState(false)
  const [displayNum, setDisplayNum] = useState(null)

  const handleToggle = () => {
    if (!revealed) setDisplayNum(String(data.hiddenNumber))
    setRevealed(r => !r)
  }

  return (
    <div style={{
      background: '#f5f2ec',
      border: '1px solid #c8c4bc',
      borderRadius: 2,
      padding: '20px',
      fontFamily: '"Courier New", Courier, monospace',
      fontSize: 12,
      lineHeight: 2,
      color: '#1a1a1a',
      boxShadow: '2px 3px 12px rgba(0,0,0,0.5)',
    }}>
      <div style={{
        textAlign: 'center', borderBottom: '1px solid #c8c4bc',
        paddingBottom: 12, marginBottom: 16,
      }}>
        <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.08em' }}>
          SITZUNGSPROTOKOLL — SHSG VORSTAND
        </div>
        <div style={{ fontSize: 11, color: '#555' }}>47. ausserordentliche Sitzung</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 4, fontSize: 11 }}>
          <span>Datum: <Redacted /></span>
          <span>Ort: <Redacted /></span>
        </div>
      </div>

      <div><strong>TOP 1:</strong> <Redacted wide /></div>
      <div style={{ marginTop: 8 }}>
        <strong>TOP 2:</strong> Anwesend waren{' '}
        <RevealableBar revealed={revealed} displayNum={displayNum} onToggle={handleToggle} />
        {' '}von insgesamt 6 Vorstandsmitgliedern.
      </div>
      <div style={{ marginTop: 8 }}><strong>TOP 3–5:</strong> <Redacted wide /></div>
    </div>
  )
}

function Redacted({ wide = false }) {
  return (
    <span style={{
      display: 'inline-block',
      background: '#111',
      color: '#111',
      borderRadius: 1,
      width: wide ? 140 : 80,
      height: '1em',
      verticalAlign: 'middle',
      userSelect: 'none',
    }}>
      &nbsp;
    </span>
  )
}

function RevealableBar({ revealed, displayNum, onToggle }) {
  return (
    <span
      onClick={onToggle}
      style={{
        display: 'inline-block',
        background: revealed ? '#2a2a2a' : '#111',
        color: revealed ? '#f5f2ec' : '#111',
        borderRadius: 1,
        padding: '0 6px',
        minWidth: 24,
        textAlign: 'center',
        verticalAlign: 'middle',
        cursor: 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        fontWeight: 700,
        fontSize: 13,
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      {revealed ? displayNum : '   '}
    </span>
  )
}

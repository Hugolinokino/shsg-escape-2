import React from 'react'

const PORTRAITS = [
  { name: 'Lukas Zumbrunn',   meta: 'Ehrenmitglied seit Jahr 12', shapes: ['#c8b560', '#3a6a9c', '#4a8c5c'] },
  { name: 'Irina Kopatz',     meta: 'Ehrenmitglied seit Jahr 14', shapes: ['#c45c3a', '#c8b560', '#3a6a9c'] },
  { name: 'Ann Julie Sevray', meta: 'Ehrenmitglied seit Jahr 16', shapes: ['#4a8c5c', '#c45c3a', '#c8b560'] },
  { name: 'Lisa Militi',      meta: 'Ehrenmitglied seit Jahr 18', shapes: ['#3a6a9c', '#4a8c5c', '#c45c3a'] },
]

export default function PortraitsPuzzle() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {PORTRAITS.map((p, i) => (
          <Portrait key={i} portrait={p} />
        ))}
      </div>
    </div>
  )
}

function Portrait({ portrait }) {
  const [c1, c2, c3] = portrait.shapes
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 2, overflow: 'hidden',
    }}>
      {/* Abstract portrait drawing */}
      <div style={{
        height: 110, background: 'var(--bg3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background circle */}
        <div style={{
          position: 'absolute', width: 70, height: 70, borderRadius: '50%',
          background: `${c1}22`, border: `2px solid ${c1}44`,
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        }} />
        {/* Head */}
        <div style={{
          position: 'absolute', width: 36, height: 42, borderRadius: '50% 50% 45% 45%',
          background: `${c2}33`, border: `1px solid ${c2}66`,
          top: 14,
        }} />
        {/* Body */}
        <div style={{
          position: 'absolute', width: 50, height: 30, borderRadius: '3px 3px 0 0',
          background: `${c3}33`, border: `1px solid ${c3}55`,
          bottom: 0,
        }} />
        {/* Accent dot */}
        <div style={{
          position: 'absolute', width: 8, height: 8, borderRadius: '50%',
          background: c1, top: 28, right: 28, opacity: 0.8,
        }} />
      </div>
      {/* Info */}
      <div style={{ padding: '10px 10px 10px' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--text)', letterSpacing: '0.04em', marginBottom: 4,
        }}>
          {portrait.name}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--accent)', letterSpacing: '0.06em',
        }}>
          {portrait.meta}
        </div>
      </div>
    </div>
  )
}

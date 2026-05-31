import React, { useState, useEffect } from 'react'

export function DoorAnimation({ onComplete }) {
  const [phase, setPhase] = useState('beeping') // beeping → unlocking → open

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('unlocking'), 800)
    const t2 = setTimeout(() => setPhase('open'), 2000)
    const t3 = setTimeout(() => onComplete(), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 24,
      padding: '40px 0',
    }}>
      {/* Door SVG */}
      <div style={{ position: 'relative', width: 120, height: 160 }}>
        {/* Frame */}
        <div style={{
          position: 'absolute', inset: 0,
          border: '2px solid var(--border2)',
          borderRadius: 2,
        }} />
        {/* Door panel — slides right when open */}
        <div style={{
          position: 'absolute', inset: 2,
          background: 'var(--bg3)',
          border: '1px solid var(--border)',
          borderRadius: 1,
          transition: phase === 'open' ? 'transform 0.7s cubic-bezier(0.4,0,0.2,1)' : 'none',
          transform: phase === 'open' ? 'perspective(400px) rotateY(-75deg) translateX(-10px)' : 'none',
          transformOrigin: 'left center',
        }}>
          {/* Door handle */}
          <div style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            width: 8, height: 24,
            background: phase === 'unlocking' || phase === 'open' ? 'var(--green)' : phase === 'beeping' ? 'var(--red)' : 'var(--accent)',
            borderRadius: 4,
            transition: 'background 0.3s',
            boxShadow: phase === 'unlocking' || phase === 'open' ? '0 0 12px rgba(74,140,92,0.6)' : 'none',
          }} />
          {/* Lock indicator */}
          <div style={{
            position: 'absolute', right: 10, top: '35%',
            width: 12, height: 12,
            borderRadius: '50%',
            background: phase === 'open' ? 'var(--green)' : phase === 'unlocking' ? 'var(--accent)' : 'var(--red)',
            transition: 'background 0.3s',
            boxShadow: `0 0 8px ${phase === 'open' ? 'rgba(74,140,92,0.8)' : phase === 'unlocking' ? 'rgba(200,181,96,0.8)' : 'rgba(196,92,58,0.6)'}`,
            animation: phase === 'beeping' ? 'pulse 0.6s infinite' : 'none',
          }} />
        </div>
      </div>

      {/* Status text */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.2em',
        color: phase === 'open' ? 'var(--green)' : phase === 'unlocking' ? 'var(--accent)' : 'var(--red)',
        textTransform: 'uppercase',
        transition: 'color 0.3s',
      }}>
        {phase === 'beeping' && '● VERIFIZIERE CODE...'}
        {phase === 'unlocking' && '◆ ENTRIEGLE...'}
        {phase === 'open' && '✓ ZUGANG GEWÄHRT'}
      </div>

      {/* Progress bar */}
      <div style={{
        width: 200, height: 2,
        background: 'var(--border)',
        borderRadius: 1,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: phase === 'open' ? 'var(--green)' : 'var(--accent)',
          width: phase === 'beeping' ? '30%' : phase === 'unlocking' ? '70%' : '100%',
          transition: 'width 0.8s ease, background 0.3s',
          borderRadius: 1,
        }} />
      </div>
    </div>
  )
}

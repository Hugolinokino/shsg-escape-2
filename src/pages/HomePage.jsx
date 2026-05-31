import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DOORS, TEAM_COLORS } from '../config.js'
import { GlitchText, PageWrap, TopBar } from '../components/UI.jsx'

export default function HomePage() {
  const navigate = useNavigate()

  const egDoors = Object.values(DOORS).filter(d => d.team === 'EG')
  const ugDoors = Object.values(DOORS).filter(d => d.team === 'UG')

  return (
    <PageWrap>
      <TopBar />

      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: '0.04em',
          marginBottom: 8,
        }}>
          <GlitchText text="OPERATION STABSÜBERGABE" />
        </div>
        <div style={{
          fontSize: 11,
          color: 'var(--text3)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          Studentenschaft der Universität St.Gallen
        </div>
      </div>

      {/* EG */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          fontSize: 10, letterSpacing: '0.2em', color: TEAM_COLORS.EG.primary,
          textTransform: 'uppercase', marginBottom: 12,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ width: 24, height: 1, background: TEAM_COLORS.EG.border, display: 'inline-block' }} />
          Erdgeschoss — Neuer Vorstand
          <span style={{ flex: 1, height: 1, background: TEAM_COLORS.EG.border, display: 'inline-block' }} />
        </div>
        {egDoors.map(door => (
          <DoorListItem key={door.id} door={door} onClick={() => navigate(`/tuer/${door.id}`)} />
        ))}
      </div>

      {/* UG */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          fontSize: 10, letterSpacing: '0.2em', color: TEAM_COLORS.UG.primary,
          textTransform: 'uppercase', marginBottom: 12,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ width: 24, height: 1, background: TEAM_COLORS.UG.border, display: 'inline-block' }} />
          Untergeschoss — Alter Vorstand
          <span style={{ flex: 1, height: 1, background: TEAM_COLORS.UG.border, display: 'inline-block' }} />
        </div>
        {ugDoors.map(door => (
          <DoorListItem key={door.id} door={door} onClick={() => navigate(`/tuer/${door.id}`)} />
        ))}
      </div>

      {/* Finale */}
      <DoorListItem
        door={{ id: 'finale', number: '⊕', title: 'Der Tresor', room: '05-U106 · Beide Teams', team: 'BEIDE' }}
        onClick={() => navigate('/finale')}
      />

      <div style={{
        marginTop: 16,
        padding: '10px 16px',
        border: '1px solid var(--border)',
        borderRadius: 2,
        fontSize: 10,
        color: 'var(--text3)',
        letterSpacing: '0.05em',
        lineHeight: 1.7,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span>QR-Codes an jeder Station</span>
        <button
          onClick={() => navigate('/gm')}
          style={{
            fontSize: 10, color: 'var(--text3)', letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '4px 8px',
            border: '1px solid var(--border)', borderRadius: 2,
            background: 'none', cursor: 'pointer',
          }}
        >
          GM ›
        </button>
      </div>
    </PageWrap>
  )
}

function DoorListItem({ door, onClick }) {
  const [hover, setHover] = useState(false)
  const colors = TEAM_COLORS[door.team] || TEAM_COLORS.EG

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '12px 16px',
        marginBottom: 6,
        border: `1px solid ${hover ? colors.border : 'var(--border)'}`,
        borderRadius: 2,
        cursor: 'pointer',
        background: hover ? colors.bg : 'transparent',
        transition: 'all 0.15s',
      }}
    >
      <div style={{
        width: 28, height: 28,
        border: `1px solid ${colors.border}`,
        borderRadius: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, color: colors.primary, flexShrink: 0,
        fontFamily: 'var(--font-mono)',
      }}>
        {door.number}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 400, letterSpacing: '0.04em' }}>{door.title}</div>
        <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.08em', marginTop: 2 }}>{door.room}</div>
      </div>
      <div style={{ fontSize: 14, color: 'var(--text3)' }}>→</div>
    </div>
  )
}

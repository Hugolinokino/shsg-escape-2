import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageWrap, TopBar, GlitchText } from '../components/UI.jsx'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <PageWrap>
      <TopBar />
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 80, fontWeight: 800,
          color: 'var(--border2)',
          lineHeight: 1,
          marginBottom: 16,
        }}>404</div>
        <div style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 32 }}>
          <GlitchText text="SEITE NICHT GEFUNDEN" />
        </div>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: '1px solid var(--border2)',
            borderRadius: 2,
            padding: '12px 24px',
            color: 'var(--text)',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.12em',
            cursor: 'pointer',
            textTransform: 'uppercase',
          }}
        >
          ← Zurück zur Übersicht
        </button>
      </div>
    </PageWrap>
  )
}

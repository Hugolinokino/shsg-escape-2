import React, { useState, useEffect } from 'react'
import { TEAM_COLORS } from '../config.js'

// ── Glitch text effect ──────────────────────────────────────
const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

export function GlitchText({ text, className = '', style = {}, animate = true }) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!animate) { setDisplay(text); return }
    let iter = 0
    const interval = setInterval(() => {
      setDisplay(text.split('').map((char, i) => {
        if (char === ' ') return ' '
        if (i < iter) return text[i]
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
      }).join(''))
      iter += 0.5
      if (iter >= text.length) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [text, animate])

  return <span className={className} style={style}>{display}</span>
}

// ── Blinking cursor ─────────────────────────────────────────
export function Cursor() {
  const [on, setOn] = useState(true)
  useEffect(() => {
    const t = setInterval(() => setOn(p => !p), 530)
    return () => clearInterval(t)
  }, [])
  return <span style={{ opacity: on ? 1 : 0, color: 'var(--accent)' }}>█</span>
}

// ── Team badge ──────────────────────────────────────────────
export function TeamBadge({ team, label }) {
  const colors = TEAM_COLORS[team] || TEAM_COLORS.EG
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '4px 12px',
      border: `1px solid ${colors.border}`,
      background: colors.bg,
      borderRadius: 2,
      fontSize: 11,
      letterSpacing: '0.12em',
      color: colors.primary,
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: colors.primary,
        animation: 'pulse 2s infinite',
        display: 'inline-block',
      }} />
      {label}
    </div>
  )
}

// ── Code input field ────────────────────────────────────────
export const CodeInput = React.forwardRef(function CodeInput(
  { value, onChange, onSubmit, placeholder = 'CODE EINGEBEN', disabled = false },
  ref
) {
  return (
    <div style={{ position: 'relative' }}>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value.toUpperCase())}
        onKeyDown={e => e.key === 'Enter' && onSubmit()}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        autoCapitalize="characters"
        style={{
          width: '100%',
          background: 'var(--bg2)',
          border: '1px solid var(--border2)',
          borderRadius: 2,
          color: 'var(--accent)',
          fontFamily: 'var(--font-mono)',
          fontSize: 20,
          letterSpacing: '0.18em',
          padding: '16px 20px',
          outline: 'none',
          textTransform: 'uppercase',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--accent2)'}
        onBlur={e => e.target.style.borderColor = 'var(--border2)'}
      />
    </div>
  )
})

// ── Submit button ───────────────────────────────────────────
export function SubmitButton({ onClick, children, variant = 'primary' }) {
  const [hover, setHover] = useState(false)
  const isPrimary = variant === 'primary'
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%',
        padding: '14px 24px',
        background: hover ? 'var(--accent)' : 'transparent',
        border: `1px solid ${hover ? 'var(--accent)' : 'var(--border2)'}`,
        borderRadius: 2,
        color: hover ? 'var(--bg)' : 'var(--text)',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        transition: 'all 0.15s',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

// ── Status message ──────────────────────────────────────────
export function StatusMsg({ type, children }) {
  const colors = {
    error: { color: 'var(--red)', border: 'rgba(196,92,58,0.3)', bg: 'rgba(196,92,58,0.05)' },
    success: { color: 'var(--green)', border: 'rgba(74,140,92,0.3)', bg: 'rgba(74,140,92,0.05)' },
    info: { color: 'var(--text2)', border: 'var(--border)', bg: 'var(--bg2)' },
  }
  const c = colors[type] || colors.info
  return (
    <div style={{
      padding: '12px 16px',
      border: `1px solid ${c.border}`,
      background: c.bg,
      borderRadius: 2,
      color: c.color,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.08em',
      animation: 'fadeIn 0.3s ease',
    }}>
      {type === 'error' && '✗ '}{type === 'success' && '✓ '}{children}
    </div>
  )
}

// ── Divider ─────────────────────────────────────────────────
export function Divider() {
  return (
    <div style={{
      height: 1,
      background: 'linear-gradient(90deg, transparent, var(--border2), transparent)',
      margin: '24px 0',
    }} />
  )
}

// ── Page wrapper ─────────────────────────────────────────────
export function PageWrap({ children }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 480,
        animation: 'fadeIn 0.4s ease',
      }}>
        {children}
      </div>
    </div>
  )
}

// ── Typewriter text ──────────────────────────────────────────
export function TypewriterText({ text, speed = 28, style = {} }) {
  const [display, setDisplay] = useState('')
  useEffect(() => {
    setDisplay('')
    let i = 0
    const t = setInterval(() => {
      i++
      setDisplay(text.slice(0, i))
      if (i >= text.length) clearInterval(t)
    }, speed)
    return () => clearInterval(t)
  }, [text, speed])
  return <span style={style}>{display}</span>
}

// ── Top bar ──────────────────────────────────────────────────
export function TopBar({ label }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 32,
      paddingBottom: 16,
      borderBottom: '1px solid var(--border)',
    }}>
      <span style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text3)', textTransform: 'uppercase' }}>
        SHSG // OPERATION STABSÜBERGABE
      </span>
      {label && (
        <span style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--text3)' }}>
          {label}
        </span>
      )}
    </div>
  )
}

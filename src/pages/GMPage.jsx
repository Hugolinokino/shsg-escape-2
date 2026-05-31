import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DOORS } from '../config.js'

const GM_PASSWORD = 'GM2026'

const SOLUTIONS = [
  { id: 'eg-start', label: 'EG-START — Klingelschilder',   solution: 'DELTA EINS', notes: '5 Präsidien → 4 vollendete Übergaben = D = DELTA. Neue Amtszeit #1 = EINS.' },
  { id: 'eg-1',     label: 'EG-1 — Der Drucker lügt',      solution: '4',          notes: 'Echt = Ausdruck I (korrekte Grammatik + korrekte Zahl). Quorum = 4. → Codewort A = ATLAS.' },
  { id: 'eg-2',     label: 'EG-2 — Bänziger & Irrgang',    solution: '3',          notes: 'Jüngstes Ressort = Nachhaltigkeit. In UG-3-Liste: Position 3. → Codewort B = KLANG.' },
  { id: 'eg-3',     label: 'EG-3 — Whiteboard-Gleichung',  solution: '17',         notes: 'Fehlende Zahl [?] = 3 (von UG-3). (6×3)+3−4 = 18+3−4 = 17.' },
  { id: 'eg-4',     label: 'EG-4 — Farb-Cipher',           solution: 'STAB',       notes: 'Schlüssel (nur UG-3): ROT=S, BLAU=T, GELB=A, GRÜN=B. Erste 4: ROT,BLAU,GELB,GRÜN → S,T,A,B = STAB.' },
  { id: 'ug-start', label: 'UG-START — Archiv-Einlass',    solution: 'MEMORIA',    notes: 'Lat. Wort für Gedächtnis/Erinnerung.' },
  { id: 'ug-1',     label: 'UG-1 — Geschwärztes Protokoll', solution: '5',          notes: 'Tappbarer Balken in TOP 2 → 5 von 6 anwesend → Ziffer 1 = 5.' },
  { id: 'ug-2',     label: 'UG-2 — Porträtgalerie',        solution: '5',          notes: 'Letzte Digits 12,14,16,18 → 2,4,6,8. Summe 20 ÷ 4 = 5. Ziffer 2 = 5.' },
  { id: 'ug-3',     label: 'UG-3 — Cipher & Gitter',       solution: '7',          notes: 'Diagonale 3,4,7,6 → 20. 20−13 = 7. Ziffer 3 = 7. AUCH: Farb-Schlüssel (ROT=S,BLAU=T,GELB=A,GRÜN=B) + Ressort-Position 3 an EG.' },
  { id: 'ug-4',     label: 'UG-4 — Der Safe',              solution: '1',          notes: 'Genau 1 Präsidium. Ziffer 4 = 1.' },
  { id: 'ug-5',     label: 'UG-5 — Schatzkammer',          solution: '5571',       notes: '5+5+7+1 → 5571. Codeteil C = 5571.' },
  { id: 'finale',   label: 'FINALE — Der Tresor',          solution: 'ATLAS · KLANG · 5571', notes: 'Codewort A = ATLAS (EG-1), Codewort B = KLANG (EG-2), Codeteil C = 5571 (UG-5).' },
]

function getDoorStatus(id) {
  if (typeof window === 'undefined') return 'pending'
  const opened = localStorage.getItem(`shsg_${id}_opened`) === 'true'
  const solved = localStorage.getItem(`shsg_${id}_solved`) === 'true'
  if (solved) return 'solved'
  if (opened) return 'opened'
  return 'pending'
}

function clearDoorStatus(id) {
  localStorage.removeItem(`shsg_${id}_opened`)
  localStorage.removeItem(`shsg_${id}_solved`)
  localStorage.removeItem(`shsg_${id}_gm_hint`)
}

export default function GMPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [statuses, setStatuses] = useState({})
  const [tab, setTab] = useState('progress') // 'progress' | 'solutions'
  const [gmHintStates, setGmHintStates] = useState({})
  const [resetTarget, setResetTarget] = useState(null)

  const refreshStatuses = () => {
    const s = {}
    const gh = {}
    Object.keys(DOORS).filter(id => id !== 'finale').forEach(id => {
      s[id] = getDoorStatus(id)
      gh[id] = localStorage.getItem(`shsg_${id}_gm_hint`) === 'true'
    })
    setStatuses(s)
    setGmHintStates(gh)
  }

  useEffect(() => {
    if (authed) {
      refreshStatuses()
      const t = setInterval(refreshStatuses, 3000)
      return () => clearInterval(t)
    }
  }, [authed])

  const handleAuth = () => {
    if (password === GM_PASSWORD) {
      setAuthed(true)
      setAuthError(false)
    } else {
      setAuthError(true)
      setPassword('')
    }
  }

  const toggleGmHint = (id) => {
    const current = localStorage.getItem(`shsg_${id}_gm_hint`) === 'true'
    if (current) {
      localStorage.removeItem(`shsg_${id}_gm_hint`)
    } else {
      localStorage.setItem(`shsg_${id}_gm_hint`, 'true')
    }
    refreshStatuses()
  }

  const handleReset = (id) => {
    clearDoorStatus(id)
    setResetTarget(null)
    refreshStatuses()
  }

  const handleResetAll = () => {
    Object.keys(DOORS).forEach(id => clearDoorStatus(id))
    refreshStatuses()
  }

  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}>
        <div style={{
          width: '100%', maxWidth: 380,
          background: 'var(--bg2)', border: '2px solid var(--red)',
          borderRadius: 2, padding: '32px',
          boxShadow: '0 0 40px rgba(196,92,58,0.15)',
        }}>
          <div style={{
            textAlign: 'center', marginBottom: 28,
          }}>
            <div style={{
              fontSize: 10, letterSpacing: '0.3em', color: 'var(--red)',
              textTransform: 'uppercase', marginBottom: 8,
            }}>
              ⚑ VERTRAULICH
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
              color: 'var(--text)', letterSpacing: '0.04em',
            }}>
              GM-DASHBOARD
            </div>
            <div style={{
              fontSize: 10, color: 'var(--text3)', letterSpacing: '0.12em', marginTop: 4,
            }}>
              OPERATION STABSÜBERGABE
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAuth()}
              placeholder="GM-PASSWORT"
              autoFocus
              style={{
                width: '100%', background: 'var(--bg3)',
                border: `1px solid ${authError ? 'var(--red)' : 'var(--border2)'}`,
                borderRadius: 2, color: 'var(--text)',
                fontFamily: 'var(--font-mono)', fontSize: 16,
                letterSpacing: '0.2em', padding: '14px 16px',
                outline: 'none', textTransform: 'uppercase',
              }}
            />
            {authError && (
              <div style={{ fontSize: 11, color: 'var(--red)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
                ✗ Falsches Passwort.
              </div>
            )}
            <button
              onClick={handleAuth}
              style={{
                padding: '14px', background: 'rgba(196,92,58,0.15)',
                border: '1px solid rgba(196,92,58,0.4)', borderRadius: 2,
                color: 'var(--red)', fontFamily: 'var(--font-mono)',
                fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Zugang
            </button>
          </div>
        </div>
      </div>
    )
  }

  const egDoors = Object.values(DOORS).filter(d => d.team === 'EG')
  const ugDoors = Object.values(DOORS).filter(d => d.team === 'UG')

  return (
    <div style={{
      minHeight: '100vh', padding: '24px 16px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* CLASSIFIED watermark */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%) rotate(-35deg)',
        fontSize: 72, fontWeight: 900, letterSpacing: '0.1em',
        color: 'rgba(196,92,58,0.04)', fontFamily: 'var(--font-display)',
        pointerEvents: 'none', zIndex: 0, userSelect: 'none',
        whiteSpace: 'nowrap',
      }}>
        CLASSIFIED
      </div>

      {/* Red accent stripe */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 3,
        background: 'var(--red)',
      }} />

      <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 24, paddingBottom: 16,
          borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <div style={{
              fontSize: 9, letterSpacing: '0.3em', color: 'var(--red)',
              textTransform: 'uppercase', marginBottom: 4,
            }}>
              ⚑ VERTRAULICH — NUR GM
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800,
              color: 'var(--text)',
            }}>
              GM-Dashboard
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '6px 12px', background: 'none',
                border: '1px solid var(--border)', borderRadius: 2,
                color: 'var(--text3)', fontFamily: 'var(--font-mono)',
                fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              ← Home
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid var(--border)' }}>
          {[['progress', 'Fortschritt'], ['solutions', 'Lösungsblatt']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                padding: '10px 20px', background: 'none',
                border: 'none', borderBottom: tab === key ? '2px solid var(--red)' : '2px solid transparent',
                color: tab === key ? 'var(--text)' : 'var(--text3)',
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                cursor: 'pointer', marginBottom: -1,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── PROGRESS TAB ─────────────────────────────────── */}
        {tab === 'progress' && (
          <div>
            {/* Sync panel */}
            <SyncPanel statuses={statuses} navigate={navigate} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {/* EG column */}
              <div>
                <SectionLabel color="#c8b560">EG — Neuer Vorstand</SectionLabel>
                {egDoors.map(d => (
                  <DoorStatusRow
                    key={d.id}
                    door={d}
                    status={statuses[d.id] || 'pending'}
                    gmHint={gmHintStates[d.id]}
                    onToggleHint={() => toggleGmHint(d.id)}
                    onReset={() => setResetTarget(d.id)}
                  />
                ))}
              </div>
              {/* UG column */}
              <div>
                <SectionLabel color="#c45c3a">UG — Alter Vorstand</SectionLabel>
                {ugDoors.map(d => (
                  <DoorStatusRow
                    key={d.id}
                    door={d}
                    status={statuses[d.id] || 'pending'}
                    gmHint={gmHintStates[d.id]}
                    onToggleHint={() => toggleGmHint(d.id)}
                    onReset={() => setResetTarget(d.id)}
                  />
                ))}
              </div>
            </div>

            {/* Reset confirm */}
            {resetTarget && (
              <div style={{
                padding: '14px', border: '1px solid rgba(196,92,58,0.4)',
                background: 'rgba(196,92,58,0.06)', borderRadius: 2, marginBottom: 12,
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text2)', marginBottom: 10,
                }}>
                  Fortschritt für <strong>{resetTarget}</strong> wirklich zurücksetzen?
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => handleReset(resetTarget)} style={dangerBtn}>Ja, zurücksetzen</button>
                  <button onClick={() => setResetTarget(null)} style={cancelBtn}>Abbrechen</button>
                </div>
              </div>
            )}

            <button
              onClick={handleResetAll}
              style={{ ...dangerBtn, width: '100%', marginTop: 8 }}
            >
              ⚠ ALLES ZURÜCKSETZEN (Spielstart)
            </button>
          </div>
        )}

        {/* ── SOLUTIONS TAB ────────────────────────────────── */}
        {tab === 'solutions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              padding: '10px 14px', border: '1px solid rgba(196,92,58,0.3)',
              background: 'rgba(196,92,58,0.06)', borderRadius: 2,
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--red)',
              letterSpacing: '0.08em',
            }}>
              ⚑ VERTRAULICH — Nur für den Spielleiter. NIEMALS Spielern zeigen.
            </div>
            {SOLUTIONS.map(s => (
              <div key={s.id} style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 2, padding: '14px 16px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    letterSpacing: '0.15em', color: 'var(--text3)', textTransform: 'uppercase',
                  }}>
                    {s.label}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800,
                    color: 'var(--accent)', letterSpacing: '0.1em',
                  }}>
                    {s.solution}
                  </div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: 'var(--text2)', lineHeight: 1.7, letterSpacing: '0.03em',
                }}>
                  {s.notes}
                </div>
              </div>
            ))}

            {/* Cross-team notes */}
            <div style={{
              background: 'var(--bg2)', border: '1px solid rgba(200,181,96,0.3)',
              borderRadius: 2, padding: '14px 16px', marginTop: 4,
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 8,
              }}>
                CROSS-TEAM SCHLÜSSEL (UG-3 liefert an EG)
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                color: 'var(--text2)', lineHeight: 1.9,
              }}>
                <div>→ <strong>EG-2</strong>: UG-3 gibt Ressort-Position durch → 3 (Nachhaltigkeit)</div>
                <div>→ <strong>EG-3</strong>: UG-3 gibt Gitter-Zahl durch → 3 (Ergebnis: 17)</div>
                <div>→ <strong>EG-4</strong>: UG-3 gibt Farb-Schlüssel durch → ROT=S, BLAU=T, GELB=A, GRÜN=B</div>
              </div>
            </div>
          </div>
        )}

        <div style={{
          marginTop: 32, padding: '12px', textAlign: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 9,
          color: 'var(--text3)', letterSpacing: '0.15em', textTransform: 'uppercase',
          borderTop: '1px solid var(--border)',
        }}>
          SHSG · Operation Stabsübergabe · GM-Konsole
        </div>
      </div>
    </div>
  )
}

const STATUS_ICON = { pending: '⬜', opened: '🟡', solved: '✅' }
const STATUS_COLOR = { pending: 'var(--text3)', opened: '#c8a820', solved: 'var(--green)' }

function DoorStatusRow({ door, status, gmHint, onToggleHint, onReset }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '8px 10px', marginBottom: 4,
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 2,
    }}>
      <span style={{ fontSize: 14, flexShrink: 0 }}>{STATUS_ICON[status] || '⬜'}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: STATUS_COLOR[status] || 'var(--text3)',
          letterSpacing: '0.06em', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
        }}>
          {door.number} {door.title}
        </div>
      </div>
      <button
        onClick={onToggleHint}
        title={gmHint ? 'GM-Hinweis deaktivieren' : 'GM-Hinweis aktivieren'}
        style={{
          padding: '3px 7px', fontSize: 9,
          background: gmHint ? 'rgba(196,92,58,0.2)' : 'none',
          border: `1px solid ${gmHint ? 'rgba(196,92,58,0.5)' : 'var(--border)'}`,
          borderRadius: 2, color: gmHint ? 'var(--red)' : 'var(--text3)',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
          cursor: 'pointer', textTransform: 'uppercase', flexShrink: 0,
        }}
      >
        {gmHint ? 'HINT ✓' : 'HINT'}
      </button>
      <button
        onClick={onReset}
        title="Fortschritt zurücksetzen"
        style={{
          padding: '3px 7px', fontSize: 9,
          background: 'none', border: '1px solid var(--border)',
          borderRadius: 2, color: 'var(--text3)',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
          cursor: 'pointer', flexShrink: 0,
        }}
      >
        ↺
      </button>
    </div>
  )
}

function SyncPanel({ statuses, navigate }) {
  const egDone = Object.entries(statuses)
    .filter(([id]) => id.startsWith('eg'))
    .every(([, s]) => s === 'solved')
  const ugDone = Object.entries(statuses)
    .filter(([id]) => id.startsWith('ug'))
    .every(([, s]) => s === 'solved')
  const bothReady = egDone && ugDone

  return (
    <div style={{
      padding: '14px 16px', marginBottom: 20,
      border: `2px solid ${bothReady ? 'var(--green)' : 'var(--border)'}`,
      background: bothReady ? 'rgba(74,140,92,0.08)' : 'var(--bg2)',
      borderRadius: 2, transition: 'all 0.3s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <StatusPill label="EG bereit" ok={egDone} />
        <span style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>+</span>
        <StatusPill label="UG bereit" ok={ugDone} />
        <span style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>→</span>
        <StatusPill label="FINALE" ok={bothReady} />
      </div>
      {bothReady && (
        <button
          onClick={() => navigate('/finale')}
          style={{
            width: '100%', padding: '12px',
            background: 'rgba(74,140,92,0.2)',
            border: '1px solid rgba(74,140,92,0.4)', borderRadius: 2,
            color: 'var(--green)', fontFamily: 'var(--font-mono)',
            fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
            cursor: 'pointer', animation: 'pulse 2s infinite',
          }}
        >
          🔔 BEIDE TEAMS BEREIT — FINALE ÖFFNEN
        </button>
      )}
    </div>
  )
}

function StatusPill({ label, ok }) {
  return (
    <span style={{
      padding: '4px 10px',
      border: `1px solid ${ok ? 'rgba(74,140,92,0.5)' : 'var(--border)'}`,
      background: ok ? 'rgba(74,140,92,0.1)' : 'none',
      borderRadius: 2, fontFamily: 'var(--font-mono)',
      fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: ok ? 'var(--green)' : 'var(--text3)',
    }}>
      {ok ? '✓ ' : '○ '}{label}
    </span>
  )
}

function SectionLabel({ color, children }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)', fontSize: 9,
      letterSpacing: '0.2em', color, textTransform: 'uppercase',
      marginBottom: 8, paddingBottom: 4,
      borderBottom: `1px solid ${color}33`,
    }}>
      {children}
    </div>
  )
}

const dangerBtn = {
  padding: '8px 14px', background: 'rgba(196,92,58,0.15)',
  border: '1px solid rgba(196,92,58,0.3)', borderRadius: 2,
  color: 'var(--red)', fontFamily: 'var(--font-mono)',
  fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
  cursor: 'pointer',
}

const cancelBtn = {
  padding: '8px 14px', background: 'none',
  border: '1px solid var(--border)', borderRadius: 2,
  color: 'var(--text3)', fontFamily: 'var(--font-mono)',
  fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
  cursor: 'pointer',
}

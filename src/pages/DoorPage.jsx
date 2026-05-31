import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DOORS, TEAM_COLORS } from '../config.js'
import { DoorAnimation } from '../components/DoorAnimation.jsx'
import {
  GlitchText, TeamBadge, CodeInput, SubmitButton,
  StatusMsg, Divider, PageWrap, TopBar, TypewriterText,
} from '../components/UI.jsx'

import IntercomPuzzle from '../components/puzzles/IntercomPuzzle.jsx'
import DocumentsPuzzle from '../components/puzzles/DocumentsPuzzle.jsx'
import PostitPuzzle from '../components/puzzles/PostitPuzzle.jsx'
import EquationPuzzle from '../components/puzzles/EquationPuzzle.jsx'
import ColorCirclesPuzzle from '../components/puzzles/ColorCirclesPuzzle.jsx'
import MemoriaTextPuzzle from '../components/puzzles/MemoriaTextPuzzle.jsx'
import RedactedProtocol from '../components/puzzles/RedactedProtocol.jsx'
import PortraitsPuzzle from '../components/puzzles/PortraitsPuzzle.jsx'
import GridCipherPuzzle from '../components/puzzles/GridCipherPuzzle.jsx'
import SafeDialPuzzle from '../components/puzzles/SafeDialPuzzle.jsx'
import AssemblyPuzzle from '../components/puzzles/AssemblyPuzzle.jsx'

const PUZZLE_MAP = {
  intercom: IntercomPuzzle,
  documents: DocumentsPuzzle,
  postit: PostitPuzzle,
  equation: EquationPuzzle,
  colorcircles: ColorCirclesPuzzle,
  memoriatext: MemoriaTextPuzzle,
  redactedprotocol: RedactedProtocol,
  portraits: PortraitsPuzzle,
  gridcipher: GridCipherPuzzle,
  safedial: SafeDialPuzzle,
  assembly: AssemblyPuzzle,
}

const WRONG_MSGS = [
  'ZUGANG VERWEIGERT.',
  'FALSCHER CODE.',
  'UNGÜLTIG.',
  'NICHT MAL NETT VERSUCHT.',
  'ZUGANG: NEIN.',
  'FEHLER. DENKT NACH.',
]

export default function DoorPage() {
  const { doorId } = useParams()
  const navigate = useNavigate()
  const door = DOORS[doorId]

  const [code, setCode] = useState('')
  const [submitStatus, setSubmitStatus] = useState(null) // null | 'wrong' | 'animating' | 'success'
  const [wrongMsg, setWrongMsg] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [shakeInput, setShakeInput] = useState(false)

  // For documents puzzle gate (kept for API compatibility)
  const [puzzleGateOpen, setPuzzleGateOpen] = useState(true)

  // Room entry lock
  const [roomLocked, setRoomLocked] = useState(() =>
    !!(door?.roomCode) && localStorage.getItem(`shsg_${doorId}_room_unlocked`) !== 'true'
  )
  const [roomEntry, setRoomEntry] = useState('')
  const [roomEntryWrong, setRoomEntryWrong] = useState(false)
  const [roomEntryShake, setRoomEntryShake] = useState(false)
  // For gridcipher: code input hidden until gate checkbox ticked
  const [gridGateChecked, setGridGateChecked] = useState(false)

  // Hint system
  const [hintRevealedAt, setHintRevealedAt] = useState([null, null, null])
  const [confirmingHint, setConfirmingHint] = useState(null)
  const [now, setNow] = useState(Date.now())

  // Briefing panel (start doors)
  const [briefingOpen, setBriefingOpen] = useState(true)

  const codeInputRef = useRef(null)

  // Live clock for hint timers
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  // Mark door as opened
  useEffect(() => {
    if (doorId) {
      localStorage.setItem(`shsg_${doorId}_opened`, 'true')
    }
  }, [doorId])

  // GM hint flag
  const gmHintActive = typeof window !== 'undefined' &&
    localStorage.getItem(`shsg_${doorId}_gm_hint`) === 'true'

  if (!door) {
    return (
      <PageWrap>
        <TopBar />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>404</div>
          <div style={{ color: 'var(--text2)', fontSize: 13 }}>Tür nicht gefunden.</div>
          <div style={{ marginTop: 24 }}>
            <SubmitButton onClick={() => navigate('/')}>← Zurück</SubmitButton>
          </div>
        </div>
      </PageWrap>
    )
  }

  const colors = TEAM_COLORS[door.team] || TEAM_COLORS.EG
  const puzzle = door.puzzle
  const PuzzleComponent = puzzle ? PUZZLE_MAP[puzzle.type] : null
  const hints = door.hints || []

  // Gate logic — which puzzles need prerequisite before showing code input
  const needsDocGate = puzzle?.type === 'documents'
  const needsGridGate = puzzle?.type === 'gridcipher'
  // gridcipher and assembly have their own input blocks below; exclude them here
  const isCodeInputVisible =
    (!needsDocGate || puzzleGateOpen) &&
    !needsGridGate &&
    puzzle?.type !== 'assembly'

  // Hint availability
  const hintAvailable = (i) => {
    if (hints.length <= i) return false
    if (i === 0) return hintRevealedAt[0] === null
    if (i === 1) return hintRevealedAt[0] !== null && hintRevealedAt[1] === null && now - hintRevealedAt[0] >= 60000
    if (i === 2) return hintRevealedAt[1] !== null && hintRevealedAt[2] === null && now - hintRevealedAt[1] >= 60000
    return false
  }
  const hintWaitSeconds = (i) => {
    const base = i === 1 ? hintRevealedAt[0] : hintRevealedAt[1]
    if (!base) return 0
    return Math.max(0, 60 - Math.floor((now - base) / 1000))
  }

  const revealHint = (i) => {
    const next = [...hintRevealedAt]
    next[i] = Date.now()
    setHintRevealedAt(next)
    setConfirmingHint(null)
  }

  const handleSubmit = () => {
    if (submitStatus === 'animating' || submitStatus === 'success') return
    const input = code.trim().toUpperCase().replace(/\s+/g, ' ')
    const correct = door.unlockCode.toString().toUpperCase()
    if (input === correct) {
      localStorage.setItem(`shsg_${doorId}_solved`, 'true')
      setSubmitStatus('animating')
    } else {
      setAttempts(a => a + 1)
      setWrongMsg(WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)])
      setSubmitStatus('wrong')
      setShakeInput(true)
      setCode('')
      setTimeout(() => setShakeInput(false), 600)
      setTimeout(() => setSubmitStatus(null), 2500)
    }
  }

  const handleRoomEntry = () => {
    const input = roomEntry.trim().toUpperCase()
    const correct = (door.roomCode || '').toUpperCase()
    if (input === correct) {
      localStorage.setItem(`shsg_${doorId}_room_unlocked`, 'true')
      setRoomLocked(false)
    } else {
      setRoomEntry('')
      setRoomEntryWrong(true)
      setRoomEntryShake(true)
      setTimeout(() => setRoomEntryShake(false), 600)
      setTimeout(() => setRoomEntryWrong(false), 2500)
    }
  }

  // ── ROOM LOCKED ─────────────────────────────────────────────
  if (roomLocked) {
    return (
      <PageWrap>
        <TopBar label={door.teamLabel} />

        <div style={{ marginBottom: 20 }}>
          <TeamBadge team={door.team} label={door.teamLabel} />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 14, marginBottom: 2 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: colors.primary, letterSpacing: '0.15em',
              border: `1px solid ${colors.border}`, padding: '2px 8px', borderRadius: 2,
            }}>
              {door.number}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, letterSpacing: '0.02em' }}>
              {door.title}
            </div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: '0.1em' }}>{door.room}</div>
        </div>

        <Divider />

        <div style={{
          background: 'var(--bg2)', border: `1px solid ${colors.border}`,
          borderRadius: 2, padding: '20px 18px', marginBottom: 20,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center',
        }}>
          <div style={{ fontSize: 22, marginBottom: 4 }}>🔒</div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.22em', color: colors.primary, textTransform: 'uppercase',
          }}>
            RAUM GESICHERT
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 12,
            color: 'var(--text2)', lineHeight: 1.7,
          }}>
            Durchsucht den Raum.<br />Findet den Zugangscode und gebt ihn ein.
          </div>
        </div>

        <div
          className={roomEntryShake ? 'shake' : ''}
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <CodeInput
            value={roomEntry}
            onChange={setRoomEntry}
            onSubmit={handleRoomEntry}
            placeholder="RAUMCODE EINGEBEN"
          />
          {roomEntryWrong && (
            <StatusMsg type="error">FALSCHER CODE.</StatusMsg>
          )}
        </div>
        <div style={{ marginTop: 10 }}>
          <SubmitButton onClick={handleRoomEntry}>Entriegeln →</SubmitButton>
        </div>
      </PageWrap>
    )
  }

  // ── ANIMATION ───────────────────────────────────────────────
  if (submitStatus === 'animating') {
    return (
      <PageWrap>
        <TopBar label={door.teamLabel} />
        <DoorAnimation onComplete={() => setSubmitStatus('success')} />
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text3)', letterSpacing: '0.1em' }}>
          {door.successMessage}
        </div>
      </PageWrap>
    )
  }

  // ── SUCCESS ─────────────────────────────────────────────────
  if (submitStatus === 'success') {
    return (
      <PageWrap>
        <TopBar label={door.teamLabel} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '4px 12px',
          border: '1px solid rgba(74,140,92,0.4)',
          background: 'rgba(74,140,92,0.08)',
          borderRadius: 2,
          fontSize: 11, letterSpacing: '0.15em', color: 'var(--green)',
          marginBottom: 24, animation: 'fadeIn 0.5s ease',
        }}>
          ✓ ENTRIEGELT
        </div>

        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700,
          marginBottom: 4, letterSpacing: '0.02em',
        }}>
          {door.title}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: '0.1em', marginBottom: 20 }}>
          {door.room}
        </div>

        <div style={{
          fontSize: 12, color: 'var(--text2)', lineHeight: 1.7,
          fontFamily: 'var(--font-mono)', marginBottom: 20,
          animation: 'fadeIn 0.4s ease 0.1s both',
        }}>
          {door.successMessage}
        </div>

        {/* Reveal codewort/codeteil after solve — never in initial DOM */}
        {door.revealAfterSolve && (
          <div style={{
            padding: '16px 20px',
            border: '1px solid rgba(200,181,96,0.4)',
            background: 'rgba(200,181,96,0.08)',
            borderRadius: 2, marginBottom: 20,
            animation: 'fadeIn 0.5s ease 0.2s both',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.2em', color: 'var(--accent)',
              textTransform: 'uppercase', marginBottom: 8,
            }}>
              GESICHERT
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800,
              color: 'var(--accent)', letterSpacing: '0.12em',
            }}>
              {door.revealAfterSolve}
            </div>
          </div>
        )}

        {door.id === 'ug-5' && (
          <div style={{
            padding: '14px 16px',
            border: '1px solid rgba(196,92,58,0.3)',
            background: 'rgba(196,92,58,0.06)',
            borderRadius: 2, marginBottom: 20,
            fontFamily: 'var(--font-mono)', fontSize: 12,
            color: 'var(--text2)', lineHeight: 1.7,
            animation: 'fadeIn 0.4s ease 0.3s both',
          }}>
            Wartet auf Team EG. Wenn ihr ‹STAB› per Funk hört — geht gemeinsam zum Tresor 05-U106.
          </div>
        )}

        {door.id === 'eg-4' && (
          <div style={{
            padding: '14px 16px',
            border: '1px solid rgba(200,181,96,0.3)',
            background: 'rgba(200,181,96,0.06)',
            borderRadius: 2, marginBottom: 20,
            fontFamily: 'var(--font-mono)', fontSize: 12,
            color: 'var(--accent)', lineHeight: 1.7,
            animation: 'fadeIn 0.4s ease 0.3s both',
          }}>
            Gebt den Code per Funk durch. Geht dann ins Untergeschoss zum Tresor 05-U106.
          </div>
        )}

        {door.nextDoor && (
          <div style={{ animation: 'fadeIn 0.4s ease 0.3s both' }}>
            <Divider />
            <div style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: '0.1em', marginBottom: 12 }}>
              Nächster Raum:
            </div>
            <SubmitButton onClick={() => navigate(`/tuer/${door.nextDoor}`)}>
              {door.nextLabel} →
            </SubmitButton>
          </div>
        )}
      </PageWrap>
    )
  }

  // ── MAIN PUZZLE SCREEN ──────────────────────────────────────
  return (
    <PageWrap>
      <TopBar label={door.teamLabel} />

      {/* Team badge + door number + title */}
      <div style={{ marginBottom: 20 }}>
        <TeamBadge team={door.team} label={door.teamLabel} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 14, marginBottom: 2 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: colors.primary,
            letterSpacing: '0.15em', border: `1px solid ${colors.border}`,
            padding: '2px 8px', borderRadius: 2,
          }}>
            {door.number}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700,
            letterSpacing: '0.02em',
          }}>
            <GlitchText text={door.title} />
          </div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: '0.1em' }}>
          {door.room}
        </div>
      </div>

      {/* Mission briefing (start doors) — collapsible */}
      {door.briefing && (
        <div style={{ marginBottom: 16 }}>
          <button
            onClick={() => setBriefingOpen(o => !o)}
            style={{
              width: '100%', padding: '8px 12px',
              background: 'var(--bg2)', border: `1px solid ${colors.border}`,
              borderRadius: briefingOpen ? '2px 2px 0 0' : 2,
              color: colors.primary, fontFamily: 'var(--font-mono)',
              fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
              cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
            }}
          >
            <span>Mission Briefing</span>
            <span>{briefingOpen ? '▲' : '▼'}</span>
          </button>
          {briefingOpen && (
            <div style={{
              background: 'var(--bg2)', border: `1px solid ${colors.border}`,
              borderTop: 'none', borderRadius: '0 0 2px 2px',
              padding: '16px 16px',
              fontFamily: 'var(--font-mono)', fontSize: 11,
              lineHeight: 2, color: 'var(--text2)', whiteSpace: 'pre-line',
              animation: 'fadeIn 0.2s ease',
            }}>
              {door.briefing}
            </div>
          )}
        </div>
      )}

      <Divider />

      {/* Scenario */}
      {puzzle?.scenario && (
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 12,
          lineHeight: 1.85, color: 'var(--text2)',
          letterSpacing: '0.04em', marginBottom: 20,
          borderLeft: `2px solid ${colors.border}`,
          paddingLeft: 12,
          fontStyle: 'italic',
        }}>
          <TypewriterText text={puzzle.scenario} />
        </div>
      )}

      {/* Puzzle component */}
      {PuzzleComponent && (
        <div style={{ marginBottom: 20 }}>
          <PuzzleComponent
            data={puzzle.data}
            onGateOpen={() => {
              setPuzzleGateOpen(true)
              setTimeout(() => codeInputRef.current?.focus(), 100)
            }}
            onGateCheck={setGridGateChecked}
            onCodeChange={setCode}
          />
        </div>
      )}

      <Divider />

      {/* Code input area */}
      {isCodeInputVisible && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          <div
            className={shakeInput ? 'shake' : ''}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
          >
            <CodeInput
              ref={codeInputRef}
              value={code}
              onChange={setCode}
              onSubmit={handleSubmit}
              placeholder={
                puzzle?.type === 'intercom' ? 'NATO-WORT + ZAHL (als Wort)' :
                puzzle?.type === 'documents' ? 'QUORUM EINGEBEN' :
                'CODE EINGEBEN'
              }
            />
            {submitStatus === 'wrong' && (
              <StatusMsg type="error">
                {wrongMsg}{attempts >= 3 ? ` — ${attempts} Versuche` : ''}
              </StatusMsg>
            )}
          </div>
          <SubmitButton onClick={handleSubmit}>Entriegeln →</SubmitButton>
        </div>
      )}

      {/* Assembly puzzle: only show submit button, no text input */}
      {puzzle?.type === 'assembly' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {submitStatus === 'wrong' && (
            <StatusMsg type="error">
              {wrongMsg}{attempts >= 3 ? ` — ${attempts} Versuche` : ''}
            </StatusMsg>
          )}
          <div className={shakeInput ? 'shake' : ''}>
            <SubmitButton onClick={handleSubmit}>Entriegeln →</SubmitButton>
          </div>
        </div>
      )}

      {/* Waiting gate messages */}
      {needsDocGate && !puzzleGateOpen && (
        <div style={{
          marginBottom: 16, padding: '10px 14px',
          border: '1px solid var(--border)', borderRadius: 2,
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--text3)', letterSpacing: '0.06em',
        }}>
          Wählt zuerst den echten Ausdruck aus.
        </div>
      )}
      {needsGridGate && !gridGateChecked && (
        <div style={{
          marginBottom: 16, padding: '10px 14px',
          border: '1px solid var(--border)', borderRadius: 2,
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--text3)', letterSpacing: '0.06em',
        }}>
          Setzt erst die Checkbox — dann öffnet sich das Eingabefeld.
        </div>
      )}
      {needsGridGate && gridGateChecked && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          <div className={shakeInput ? 'shake' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <CodeInput
              value={code}
              onChange={setCode}
              onSubmit={handleSubmit}
              placeholder="GITTER-ERGEBNIS"
            />
            {submitStatus === 'wrong' && (
              <StatusMsg type="error">
                {wrongMsg}{attempts >= 3 ? ` — ${attempts} Versuche` : ''}
              </StatusMsg>
            )}
          </div>
          <SubmitButton onClick={handleSubmit}>Entriegeln →</SubmitButton>
        </div>
      )}

      {attempts > 0 && (
        <div style={{
          fontSize: 10, color: 'var(--text3)',
          letterSpacing: '0.08em', textAlign: 'right', marginBottom: 8,
        }}>
          {attempts} fehlgeschlagene Versuch{attempts !== 1 ? 'e' : ''}
        </div>
      )}

      {/* GM hint */}
      {gmHintActive && (
        <div style={{
          marginBottom: 12, padding: '10px 14px',
          border: '1px solid rgba(196,92,58,0.4)',
          background: 'rgba(196,92,58,0.06)',
          borderRadius: 2, fontFamily: 'var(--font-mono)',
          fontSize: 11, color: 'var(--red)', letterSpacing: '0.04em', lineHeight: 1.6,
        }}>
          ⚑ GM-HINWEIS: {door.gmHint}
        </div>
      )}

      {/* Hint system */}
      {hints.length > 0 && (
        <HintSystem
          hints={hints}
          hintRevealedAt={hintRevealedAt}
          hintAvailable={hintAvailable}
          hintWaitSeconds={hintWaitSeconds}
          confirmingHint={confirmingHint}
          setConfirmingHint={setConfirmingHint}
          revealHint={revealHint}
        />
      )}
    </PageWrap>
  )
}

function HintSystem({ hints, hintRevealedAt, hintAvailable, hintWaitSeconds, confirmingHint, setConfirmingHint, revealHint }) {
  const anyRevealed = hintRevealedAt.some(t => t !== null)
  const nextAvailableIndex = [0, 1, 2].find(i => hintAvailable(i))
  const waitingIndex = [1, 2].find(i =>
    hintRevealedAt[i - 1] !== null && hintRevealedAt[i] === null && hintWaitSeconds(i) > 0
  )

  return (
    <div style={{ marginTop: 16 }}>
      <Divider />

      {/* Revealed hints */}
      {hintRevealedAt.map((revAt, i) => revAt !== null && (
        <div key={i} style={{
          marginBottom: 10, padding: '10px 14px',
          border: '1px solid var(--border)',
          background: 'var(--bg2)',
          borderRadius: 2, animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 9,
            letterSpacing: '0.2em', color: 'var(--text3)', textTransform: 'uppercase',
            marginBottom: 6,
          }}>
            HINWEIS {i + 1}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 12,
            color: 'var(--text2)', lineHeight: 1.7,
          }}>
            {hints[i]}
          </div>
        </div>
      ))}

      {/* Waiting indicator */}
      {waitingIndex !== undefined && (
        <div style={{
          marginBottom: 10, padding: '8px 14px',
          border: '1px solid var(--border)', borderRadius: 2,
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--text3)', letterSpacing: '0.06em',
        }}>
          Hinweis {waitingIndex + 1} verfügbar in {hintWaitSeconds(waitingIndex)}s…
        </div>
      )}

      {/* Confirm dialog */}
      {confirmingHint !== null && (
        <div style={{
          marginBottom: 10, padding: '14px',
          border: '1px solid rgba(196,92,58,0.3)',
          background: 'rgba(196,92,58,0.05)',
          borderRadius: 2, animation: 'fadeIn 0.2s ease',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 12,
            color: 'var(--text2)', marginBottom: 12, lineHeight: 1.6,
          }}>
            Wirklich Hinweis {confirmingHint + 1} anfordern?<br />
            <span style={{ color: 'var(--text3)', fontSize: 11 }}>(+5 Min Zeitstrafe — Ehrensystem)</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => revealHint(confirmingHint)}
              style={{
                flex: 1, padding: '10px',
                background: 'rgba(196,92,58,0.15)',
                border: '1px solid rgba(196,92,58,0.3)',
                borderRadius: 2, color: 'var(--red)',
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Ja, Hinweis
            </button>
            <button
              onClick={() => setConfirmingHint(null)}
              style={{
                flex: 1, padding: '10px',
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 2, color: 'var(--text3)',
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* Request next hint button */}
      {nextAvailableIndex !== undefined && confirmingHint === null && (
        <button
          onClick={() => setConfirmingHint(nextAvailableIndex)}
          style={{
            width: '100%', padding: '10px 14px',
            background: 'none', border: '1px solid var(--border)',
            borderRadius: 2, color: 'var(--text3)',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          ⚠ Hinweis {nextAvailableIndex + 1} anfordern (+5 Min Zeitstrafe)
        </button>
      )}
    </div>
  )
}

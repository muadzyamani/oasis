import { AppShell } from '@/components/ui/AppShell'
import { ScenePlaceholder } from '@/components/scene/ScenePlaceholder'
import { NavigationRail } from '@/components/ui/NavigationRail'

/* ==========================================================================
   App Root
   Phase 1: Scene placeholder + timer stub widget + navigation rail
   Phase 2: Live animated scene + functional Pomodoro timer
   ========================================================================== */

function App() {
  return (
    <AppShell>
      {/* Layer 0 — Living environment */}
      <ScenePlaceholder />

      {/* Layer 1 — Timer widget */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 'var(--z-widget)' }}
      >
        {/* Outer Apple Glass card */}
        <div
          className="pointer-events-auto glass-panel flex flex-col items-center"
          style={{
            width: 380,
            borderRadius: 36,
            padding: '48px 44px 40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Specular top-edge shimmer — Apple Glass signature */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: '10%',
              right: '10%',
              height: 1,
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.55) 30%, rgba(255,255,255,0.55) 70%, transparent)',
              borderRadius: '0 0 4px 4px',
            }}
          />

          {/* Oasis name — EB Garamond italic, small caps feel */}
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-text-on-dark)',
              marginBottom: 28,
            }}
          >
            My Oasis
          </p>

          {/* Timer digits */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 400,
              fontSize: '5rem',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: 32,
              textShadow: '0 1px 12px rgba(255,255,255,0.15)',
            }}
          >
            25:00
          </div>

          {/* Session type pills — glass-surface nested layer */}
          <div
            className="glass-surface flex"
            style={{
              borderRadius: 999,
              padding: '4px',
              gap: 2,
              marginBottom: 32,
            }}
          >
            {(['Focus', 'Short Break', 'Long Break'] as const).map((label) => {
              const isActive = label === 'Focus'
              return (
                <button
                  key={label}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    padding: '6px 14px',
                    borderRadius: 999,
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 200ms ease',
                    background: isActive
                      ? 'rgba(240, 192, 96, 0.18)'
                      : 'transparent',
                    color: isActive
                      ? 'var(--color-lantern-gold)'
                      : 'var(--color-text-on-dark)',
                    boxShadow: isActive
                      ? '0 1px 0 0 rgba(255,255,255,0.1) inset'
                      : 'none',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Begin Session button — warm gradient, pill shaped */}
          <button
            id="btn-start-session"
            style={{
              width: '100%',
              padding: '14px 0',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'var(--color-text-primary)',
              background:
                'linear-gradient(135deg, #f5c842 0%, #e89a3c 100%)',
              boxShadow:
                '0 1px 0 0 rgba(255,255,255,0.3) inset, 0 4px 16px rgba(240,192,96,0.35)',
              transition: 'transform 150ms ease, box-shadow 150ms ease',
              marginBottom: 20,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.018)'
              e.currentTarget.style.boxShadow =
                '0 1px 0 0 rgba(255,255,255,0.3) inset, 0 6px 24px rgba(240,192,96,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow =
                '0 1px 0 0 rgba(255,255,255,0.3) inset, 0 4px 16px rgba(240,192,96,0.35)'
            }}
          >
            Enter Oasis
          </button>

          {/* Streak pill */}
          <div
            className="glass-surface flex items-center"
            style={{
              borderRadius: 999,
              padding: '6px 14px',
              gap: 6,
            }}
          >
            <span
              style={{
                color: 'var(--color-lantern-gold)',
                fontSize: '0.7rem',
              }}
            >
              ✦
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 400,
                color: 'var(--color-text-on-dark)',
                letterSpacing: '0.03em',
              }}
            >
              0 day streak
            </span>
          </div>
        </div>
      </div>

      {/* Layer 2 — Navigation rail */}
      <NavigationRail />
    </AppShell>
  )
}

export default App

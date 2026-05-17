import { AppShell } from '@/components/ui/AppShell'
import { ScenePlaceholder } from '@/components/scene/ScenePlaceholder'
import { NavigationRail } from '@/components/ui/NavigationRail'
import { GlassPanel } from '@/components/ui/GlassPanel'

/* ==========================================================================
   App Root
   Composes the full-screen layered shell.

   Phase 1: Scene placeholder + timer stub + navigation rail
   Phase 2: Live animated scene + full timer widget
   Phase 3: Overlays, onboarding, audio
   ========================================================================== */

function App() {
  return (
    <AppShell>
      {/* Layer 0 — Living environment (Phase 2 will replace placeholder) */}
      <ScenePlaceholder />

      {/* Layer 1 — Timer widget (Phase 2) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 'var(--z-widget)' }}
      >
        <GlassPanel
          className="pointer-events-auto rounded-3xl p-10 flex flex-col items-center gap-6"
          style={{ minWidth: 280 }}
        >
          {/* Oasis name */}
          <p
            className="text-sm tracking-[0.2em] uppercase"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-on-dark-muted)',
            }}
          >
            My Oasis
          </p>

          {/* Timer display */}
          <div
            className="text-7xl leading-none tracking-tight"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 300,
              color: 'var(--color-text-on-dark)',
            }}
          >
            25:00
          </div>

          {/* Session type pills */}
          <div className="flex gap-2">
            {(['Focus', 'Short Break', 'Long Break'] as const).map((label) => (
              <button
                key={label}
                className="
                  px-3 py-1 rounded-full text-xs tracking-wide
                  transition-all duration-300
                  hover:bg-[var(--glass-bg-hover)]
                "
                style={{
                  fontFamily: 'var(--font-body)',
                  color: label === 'Focus'
                    ? 'var(--color-lantern-gold)'
                    : 'var(--color-text-on-dark-muted)',
                  border: `1px solid ${label === 'Focus' ? 'var(--color-lantern-gold)' : 'transparent'}`,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Start button */}
          <button
            id="btn-start-session"
            className="
              w-full py-3 rounded-2xl text-sm tracking-[0.15em] uppercase font-medium
              transition-all duration-300
              hover:scale-[1.02] active:scale-[0.98]
            "
            style={{
              fontFamily: 'var(--font-body)',
              background: 'linear-gradient(135deg, var(--color-lantern-gold), var(--color-dusk-amber))',
              color: 'var(--color-text-primary)',
              boxShadow: 'var(--shadow-lantern)',
            }}
          >
            Begin Session
          </button>

          {/* Streak pill */}
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-full"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <span style={{ color: 'var(--color-lantern-gold)' }}>✦</span>
            <span
              className="text-xs"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-on-dark-muted)',
              }}
            >
              0 day streak
            </span>
          </div>
        </GlassPanel>
      </div>

      {/* Layer 2 — Navigation rail */}
      <NavigationRail />
    </AppShell>
  )
}

export default App

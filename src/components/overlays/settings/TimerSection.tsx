/* ==========================================================================
   TimerSection
   Focus / break duration steppers + long-break cadence.
   Reads/writes timerStore.config.
   ========================================================================== */

import { useTimerStore } from '@/stores/timerStore'
import { SettingsStepper } from '@/components/ui/SettingsStepper'

export function TimerSection() {
  const { config, setConfig, status } = useTimerStore()

  const isSessionActive = status === 'active' || status === 'paused'

  return (
    <section>
      <SectionHeading>Timer</SectionHeading>

      {isSessionActive && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--color-lantern-gold)',
            marginBottom: 14,
            opacity: 0.85,
            letterSpacing: '0.02em',
          }}
        >
          Changes apply after the current session.
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <SettingsStepper
          label="Focus"
          value={config.focusDurationMinutes}
          onChange={(v) => setConfig({ focusDurationMinutes: v })}
          min={5}
          max={120}
          step={5}
          unit="min"
          disabled={isSessionActive}
        />
        <SettingsStepper
          label="Short break"
          value={config.shortBreakMinutes}
          onChange={(v) => setConfig({ shortBreakMinutes: v })}
          min={1}
          max={30}
          step={1}
          unit="min"
          disabled={isSessionActive}
        />
        <SettingsStepper
          label="Long break"
          value={config.longBreakMinutes}
          onChange={(v) => setConfig({ longBreakMinutes: v })}
          min={5}
          max={60}
          step={5}
          unit="min"
          disabled={isSessionActive}
        />
        <SettingsStepper
          label="Long break after"
          value={config.longBreakAfterSessions}
          onChange={(v) => setConfig({ longBreakAfterSessions: v })}
          min={2}
          max={8}
          step={1}
          unit="×"
          disabled={isSessionActive}
        />
      </div>
    </section>
  )
}

/* ── shared heading sub-component ─────────────────────────────────────────── */
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--color-lantern-gold)',
        opacity: 0.8,
        marginBottom: 16,
      }}
    >
      {children}
    </h3>
  )
}

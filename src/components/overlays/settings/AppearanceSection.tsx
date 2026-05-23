/* ==========================================================================
   AppearanceSection
   Theme selector (Auto / Light / Dark) + Reduce Motion toggle.
   Reads/writes settingsStore.
   ========================================================================== */

import { useSettingsStore, type AppTheme } from '@/stores/settingsStore'
import { SettingsToggle } from '@/components/ui/SettingsToggle'
import { SectionHeading } from './TimerSection'

const THEMES: { value: AppTheme; label: string }[] = [
  { value: 'auto', label: 'Auto' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

export function AppearanceSection() {
  const { theme, setTheme, reducedMotion, setReducedMotion } = useSettingsStore()

  return (
    <section>
      <SectionHeading>Appearance</SectionHeading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Theme — segmented pill control */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--color-text-on-dark-muted)',
              flex: 1,
            }}
          >
            Theme
          </span>

          <div
            style={{
              display: 'flex',
              gap: 2,
              background: 'rgba(255,252,245,0.06)',
              borderRadius: 999,
              padding: 3,
              border: '1px solid var(--glass-border)',
            }}
          >
            {THEMES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  padding: '4px 12px',
                  borderRadius: 999,
                  border: 'none',
                  cursor: 'pointer',
                  background: theme === value ? 'rgba(240,192,96,0.35)' : 'transparent',
                  color:
                    theme === value
                      ? 'var(--color-lantern-gold)'
                      : 'var(--color-text-on-dark-muted)',
                  transition: 'background 200ms, color 200ms',
                  fontWeight: theme === value ? 500 : 400,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <SettingsToggle
          label="Reduce motion"
          description="Simplify scene animations"
          value={reducedMotion}
          onChange={setReducedMotion}
        />
      </div>
    </section>
  )
}

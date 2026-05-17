/* ==========================================================================
   AutomationSection
   Auto-start break and focus toggles.
   Reads/writes timerStore.config.
   ========================================================================== */

import { useTimerStore } from '@/stores/timerStore'
import { SettingsToggle } from '@/components/ui/SettingsToggle'
import { SectionHeading } from './TimerSection'

export function AutomationSection() {
  const { config, setConfig } = useTimerStore()

  return (
    <section>
      <SectionHeading>Automation</SectionHeading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SettingsToggle
          label="Auto-start breaks"
          description="Begin break timer automatically when focus ends"
          value={config.autoStartBreaks}
          onChange={(v) => setConfig({ autoStartBreaks: v })}
        />
        <SettingsToggle
          label="Auto-start focus"
          description="Resume focus automatically after a break"
          value={config.autoStartFocus}
          onChange={(v) => setConfig({ autoStartFocus: v })}
        />
      </div>
    </section>
  )
}
